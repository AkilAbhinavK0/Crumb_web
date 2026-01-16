import React, { useEffect, useRef } from 'react';
import { Renderer, Transform, Plane, Program, Mesh, Vec2 } from 'ogl';
import { useMouse } from '../../context/MouseMotionContext';

const vertexShader = `
  attribute vec3 position;
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uDensity;
  uniform float uStarSpeed;
  uniform float uHueShift;
  uniform float uSaturation;
  uniform float uRepulsionStrength;

  // Hash function for randomness
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // HSV to RGB conversion
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  // Triangle sine for twinkle (smoother than regular sine)
  float trisin(float x) {
    return abs(fract(x / 6.28318) * 2.0 - 1.0) * 2.0 - 1.0;
  }

  // Star Layer with depth-based parallax
  vec3 starLayer(vec2 uv, float layerIndex, float speed) {
    // Depth calculation as per PDR: fract(i + uStarSpeed * uSpeed)
    float depth = fract(layerIndex + uStarSpeed * speed);
    
    // Apply parallax based on depth
    vec2 parallaxUV = uv * (1.0 + depth * 2.0);
    
    vec2 id = floor(parallaxUV);
    vec2 gv = fract(parallaxUV) - 0.5;
    float n = hash21(id);
    
    vec3 starColor = vec3(0.0);
    
    // Density control (uDensity = 0.4 means ~40% chance)
    if (n > (1.0 - uDensity)) {
      // Random size and position offset
      float size = fract(n * 123.32) * 0.5 + 0.5;
      vec2 offset = vec2(n - 0.5, fract(n * 34.0) - 0.5) * 0.3;
      float d = length(gv - offset);
      
      // Twinkle using triangle sine
      float twinkle = trisin(uTime * (1.0 + n * 2.0) + n * 100.0) * 0.5 + 0.5;
      
      // Star intensity
      float star = smoothstep(0.05 * size, 0.0, d) * twinkle;
      
      // HSV-based color with hue shift
      float hue = fract(n * 0.5 + uHueShift);
      vec3 color = hsv2rgb(vec3(hue, uSaturation, 1.0));
      
      starColor = color * star * (0.5 + depth * 0.5); // Brightness varies by depth
    }
    
    return starColor;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    
    // Mouse position normalized
    vec2 mouse = (uMouse.xy - 0.5 * uResolution.xy) / uResolution.y;
    mouse.y *= -1.0;
    
    // Mouse repulsion effect
    float mouseDist = length(uv - mouse);
    vec2 repulsion = (uv - mouse) * uRepulsionStrength * exp(-mouseDist * 3.0);
    uv += repulsion;
    
    vec3 col = vec3(0.0);
    
    // 4 Layers of stars as per PDR
    col += starLayer(uv, 0.0, 0.1);
    col += starLayer(uv, 1.0, 0.05);
    col += starLayer(uv, 2.0, 0.02);
    col += starLayer(uv, 3.0, 0.01);
    
    // Background gradient for depth
    float bg = 1.0 - length(uv) * 0.8;
    col += vec3(0.05, 0.0, 0.1) * bg * 0.3;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export const Galaxy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMouse();

  // Refs for uniforms directly handled in animate loop
  // const mouseRef = useRef(new Vec2(0, 0));
  // const timeRef = useRef(0);

  // useEffect(() => {
  //    mouseRef.current.set(x.current, y.current);
  // }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    // Handle resize
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);
    resize();

    const scene = new Transform();

    const geometry = new Plane(gl, { width: 2, height: 2 });

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new Vec2(0, 0) },
        uDensity: { value: 0.4 },
        uStarSpeed: { value: 0.2 },
        uHueShift: { value: 0.6 }, // Blue/purple range
        uSaturation: { value: 0.3 },
        uRepulsionStrength: { value: 0.05 },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let animationId: number;
    const animate = (t: number) => {
      animationId = requestAnimationFrame(animate);

      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
      program.uniforms.uMouse.value.set(x.current, y.current);

      renderer.render({ scene });
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && gl.canvas) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, [x, y]);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
};
