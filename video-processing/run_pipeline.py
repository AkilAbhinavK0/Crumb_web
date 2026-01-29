import cv2
import numpy as np
from tqdm import tqdm
import os
import subprocess

def analyze_video(video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError(f"Cannot open video: {video_path}")
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    cap.release()
    return width, height, fps, total_frames

def create_luminance_alpha(frame, threshold=10, blur_sigma=1.5, feather_radius=2):
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    luminance = (0.299 * rgb[:,:,0] + 0.587 * rgb[:,:,1] + 0.114 * rgb[:,:,2])
    alpha = luminance.copy()
    alpha[alpha < threshold] = 0
    if blur_sigma > 0:
        alpha = cv2.GaussianBlur(alpha, (0, 0), blur_sigma)
    if feather_radius > 0:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (feather_radius*2+1, feather_radius*2+1))
        alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, kernel)
        alpha = cv2.GaussianBlur(alpha, (0, 0), 0.5)
    alpha = np.clip(alpha, 0, 255).astype(np.uint8)
    rgba = np.dstack((rgb, alpha))
    return rgba

def process_video_accurate(input_video, output_dir, threshold=10, blur_sigma=1.5):
    print(f"Processing {input_video}...")
    width, height, fps, total_frames = analyze_video(input_video)
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(input_video)
    
    for frame_idx in tqdm(range(total_frames), desc="Processing frames"):
        ret, frame = cap.read()
        if not ret: break
        rgba = create_luminance_alpha(frame, threshold, blur_sigma)
        cv2.imwrite(os.path.join(output_dir, f"frame_{frame_idx:06d}.png"), cv2.cvtColor(rgba, cv2.COLOR_RGBA2BGRA))
    
    cap.release()
    return fps

def convert_frames_to_webm(frames_dir, output_file, fps=30):
    print(f"Converting to {output_file}...")
    input_pattern = os.path.join(frames_dir, "frame_%06d.png")
    cmd = [
        "ffmpeg", "-y", "-framerate", str(fps), "-i", input_pattern,
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-auto-alt-ref", "0",
        "-b:v", "2M", "-quality", "good", "-cpu-used", "0",
        output_file
    ]
    subprocess.run(cmd, check=True)

if __name__ == "__main__":
    # Robust path resolution
    base_dir = os.getcwd() # Should be .../video-processing
    parent_dir = os.path.dirname(base_dir) # Should be .../Crumb_corp_Website_
    
    # Try multiple common locations
    possible_paths = [
        os.path.join(parent_dir, "Branding.mp4"),
        os.path.join(parent_dir, "public", "Crumb-Branding.mp4"),
        os.path.join(base_dir, "..", "Branding.mp4"),
        "p:/Crumb_corp_Website_/Branding.mp4",
        "../Branding.mp4"
    ]
    
    input_video = None
    print(f"Listing parent dir {parent_dir}: {os.listdir(parent_dir)}")
    for p in possible_paths:
        if os.path.exists(p):
            input_video = p
            break
            
    frames_dir = "temp_frames"
    output_file = os.path.join(parent_dir, "public", "Crumb-Branding.webm")
    
    print(f"Working directory: {base_dir}")
    if input_video:
        print(f"Found video at: {input_video}")
        fps = process_video_accurate(input_video, frames_dir)
        convert_frames_to_webm(frames_dir, output_file, fps)
        print("Done!")
    else:
        print(f"File not found. Checked: {possible_paths}")
