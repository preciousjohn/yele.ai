"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface HandDetectionResult {
  landmarks: HandLandmark[];
  handedness: "Left" | "Right";
}

interface UseHandDetectionOptions {
  onResults?: (results: HandDetectionResult[]) => void;
}

export function useHandDetection(options: UseHandDetectionOptions = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  
  const handsRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onResultsRef = useRef(options.onResults);
  onResultsRef.current = options.onResults;

  const initializeMediaPipe = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Dynamically import MediaPipe modules
      const [handsModule, drawingUtils] = await Promise.all([
        import("@mediapipe/hands"),
        import("@mediapipe/drawing_utils"),
      ]);
      
      const { Hands, HAND_CONNECTIONS } = handsModule;

      const hands = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: any) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        
        if (canvas && ctx && videoRef.current) {
          ctx.save();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            for (const landmarks of results.multiHandLandmarks) {
              drawingUtils.drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
                color: "#F97316",
                lineWidth: 3,
              });
              drawingUtils.drawLandmarks(ctx, landmarks, {
                color: "#FFF",
                fillColor: "#F97316",
                lineWidth: 1,
                radius: 4,
              });
            }

            // Convert to our format and call callback
            const handResults: HandDetectionResult[] = results.multiHandLandmarks.map(
              (landmarks: any[], index: number) => ({
                landmarks: landmarks.map((l: any) => ({
                  x: l.x,
                  y: l.y,
                  z: l.z,
                })),
                handedness:
                  results.multiHandedness?.[index]?.label || "Right",
              })
            );

            onResultsRef.current?.(handResults);
          } else {
            onResultsRef.current?.([]);
          }

          ctx.restore();
        }
      });

      handsRef.current = hands;
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to initialize MediaPipe Hands:", err);
      setError("Failed to initialize hand detection. Please refresh and try again.");
      setIsLoading(false);
    }
  }, []);

  const startDetection = useCallback(
    async (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
      if (!handsRef.current) {
        await initializeMediaPipe();
      }

      videoRef.current = video;
      canvasRef.current = canvas;

      try {
        const { Camera } = await import("@mediapipe/camera_utils");

        const camera = new Camera(video, {
          onFrame: async () => {
            if (handsRef.current && video.readyState >= 2) {
              await handsRef.current.send({ image: video });
            }
          },
          width: 640,
          height: 480,
        });

        cameraRef.current = camera;
        await camera.start();
        setIsDetecting(true);
      } catch (err) {
        console.error("Failed to start camera:", err);
        setError("Failed to access camera. Please ensure camera permissions are granted.");
      }
    },
    [initializeMediaPipe]
  );

  const stopDetection = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }
    setIsDetecting(false);
  }, []);

  useEffect(() => {
    return () => {
      stopDetection();
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, [stopDetection]);

  return {
    isLoading,
    error,
    isDetecting,
    startDetection,
    stopDetection,
    initializeMediaPipe,
  };
}

// Finger landmark indices
export const FINGER_LANDMARKS = {
  WRIST: 0,
  THUMB: { CMC: 1, MCP: 2, IP: 3, TIP: 4 },
  INDEX: { MCP: 5, PIP: 6, DIP: 7, TIP: 8 },
  MIDDLE: { MCP: 9, PIP: 10, DIP: 11, TIP: 12 },
  RING: { MCP: 13, PIP: 14, DIP: 15, TIP: 16 },
  PINKY: { MCP: 17, PIP: 18, DIP: 19, TIP: 20 },
};

// Helper to check if a finger is extended
export function isFingerExtended(landmarks: HandLandmark[], finger: "INDEX" | "MIDDLE" | "RING" | "PINKY"): boolean {
  const fingerData = FINGER_LANDMARKS[finger];
  const tip = landmarks[fingerData.TIP];
  const pip = landmarks[fingerData.PIP];
  const mcp = landmarks[fingerData.MCP];
  
  // Finger is extended if tip is above (lower y) than PIP joint
  return tip.y < pip.y && pip.y < mcp.y;
}

// Helper to check thumb extension
export function isThumbExtended(landmarks: HandLandmark[]): boolean {
  const tip = landmarks[FINGER_LANDMARKS.THUMB.TIP];
  const ip = landmarks[FINGER_LANDMARKS.THUMB.IP];
  const mcp = landmarks[FINGER_LANDMARKS.THUMB.MCP];
  
  // Thumb extended if tip is further from palm than MCP
  return tip.x < mcp.x; // For right hand; inverse for left
}

// Get finger curl amount (0 = fully extended, 1 = fully curled)
export function getFingerCurl(landmarks: HandLandmark[], finger: "INDEX" | "MIDDLE" | "RING" | "PINKY"): number {
  const fingerData = FINGER_LANDMARKS[finger];
  const tip = landmarks[fingerData.TIP];
  const dip = landmarks[fingerData.DIP];
  const pip = landmarks[fingerData.PIP];
  const mcp = landmarks[fingerData.MCP];
  
  // Calculate angle between segments
  const dist1 = Math.sqrt(Math.pow(tip.x - dip.x, 2) + Math.pow(tip.y - dip.y, 2));
  const dist2 = Math.sqrt(Math.pow(mcp.x - pip.x, 2) + Math.pow(mcp.y - pip.y, 2));
  const tipToMcp = Math.sqrt(Math.pow(tip.x - mcp.x, 2) + Math.pow(tip.y - mcp.y, 2));
  
  const maxDist = dist1 + dist2;
  const curl = 1 - (tipToMcp / maxDist);
  
  return Math.max(0, Math.min(1, curl));
}
