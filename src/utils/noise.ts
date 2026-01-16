export const generateNoise = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 256;
    canvas.height = 256;

    if (!ctx) return '';

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const buffer32 = new Uint32Array(imageData.data.buffer);

    for (let i = 0; i < buffer32.length; i++) {
        if (Math.random() < 0.5) {
            buffer32[i] = 0xff000000;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
};
