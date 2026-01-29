import cv2
import numpy as np
import os

def analyze_alignment(video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Cannot open {video_path}")
        return

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    center_x = width // 2
    center_y = height // 2
    
    print(f"Frame Size: {width}x{height}")
    print(f"Frame Center: ({center_x}, {center_y})")
    
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Total Frames: {total_frames}")
    
    # Analyze a few frames (start, middle, end)
    # Actually, we want the average center of the "Branding" text which appears later.
    # The text fades in/animates. We should check frames where content is visible.
    # Let's check every 10th frame.
    
    offsets_x = []
    offsets_y = []
    
    for i in range(0, total_frames, 5):
        cap.set(cv2.CAP_PROP_POS_FRAMES, i)
        ret, frame = cap.read()
        if not ret: break
        
        # Check alpha channel if available, or convert BGR to Gray and threshold
        # Does the available video have alpha? 
        # WebM with VP9 usually does, but OpenCV might read it as BGR if not specified.
        # "branding_transparent.webm" has alpha.
        # But cv2.VideoCapture might drop alpha unless using specific backend or just thresholding black.
        # The user has "Crumb-Branding.webm".
        
        # Let's assume non-black pixels are content (since it's transparent/black BG).
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Threshold to find non-background pixels - Higher threshold to ignore noise
        _, thresh = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)
        
        # Find contours to get bounding box
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        if contours:
            # Find largest contour by area (the main logo)
            main_contour = max(contours, key=cv2.contourArea)
            x, y, w, h = cv2.boundingRect(main_contour)
            
            # Box Center
            box_cx = x + w // 2
            box_cy = y + h // 2
            
            off_x = box_cx - center_x
            off_y = box_cy - center_y
            
            offsets_x.append(off_x)
            offsets_y.append(off_y)
            
            if i % 30 == 0:
                print(f"Frame {i}: Box Center ({box_cx}, {box_cy}), Offset ({off_x}, {off_y})")
        else:
            if i % 30 == 0:
                print(f"Frame {i}: Empty")
            
    cap.release()
    
    if offsets_x:
        avg_x = sum(offsets_x) / len(offsets_x)
        avg_y = sum(offsets_y) / len(offsets_y)
        print(f"\nAverage Offset: X={avg_x:.2f}, Y={avg_y:.2f}")
        print(f"Suggestion: Apply 'translate({-avg_x:.0f}px, {-avg_y:.0f}px)' to center it.")
    else:
        print("No content found.")

if __name__ == "__main__":
    # Check public folder
    possible_paths = [
        "../public/Crumb-Branding.webm",
        "../public/branding_transparent.webm",
        "p:/Crumb_corp_Website_/public/Crumb-Branding.webm"
    ]
    
    target = None
    for p in possible_paths:
        if os.path.exists(p):
            target = p
            break
            
    if target:
        print(f"Analyzing {target}...")
        analyze_alignment(target)
    else:
        print("Video not found.")
