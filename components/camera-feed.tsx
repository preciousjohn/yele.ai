"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { useHandDetection, type HandDetectionResult } from "@/lib/use-hand-detection";
import { recognizeChord, describeHandPosition, type ChordRecognitionResult } from "@/lib/chord-recognition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, CameraOff, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraFeedProps {
  onChordDetected?: (result: ChordRecognitionResult) => void;
  targetChord?: string;
  className?: string;
}

export function CameraFeed({ onChordDetected, targetChord, className }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectedChord, setDetectedChord] = useState<ChordRecognitionResult | null>(null);
  const [handDescription, setHandDescription] = useState<string>("");
  const [cameraStarted, setCameraStarted] = useState(false);

  const handleResults = useCallback((results: HandDetectionResult[]) => {
    if (results.length > 0) {
      const result = recognizeChord(results[0].landmarks);
      setDetectedChord(result);
      setHandDescription(describeHandPosition(result.fingerStates));
      onChordDetected?.(result);
    } else {
      setDetectedChord(null);
      setHandDescription("");
    }
  }, [onChordDetected]);

  const { isLoading, error, isDetecting, startDetection, stopDetection, initializeMediaPipe } = useHandDetection({
    onResults: handleResults,
  });

  // Pre-load MediaPipe when component mounts
  useEffect(() => {
    initializeMediaPipe();
  }, [initializeMediaPipe]);

  const handleStartCamera = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      setCameraStarted(true);
      await startDetection(videoRef.current, canvasRef.current);
    }
  }, [startDetection]);

  const handleStopCamera = useCallback(() => {
    stopDetection();
    setCameraStarted(false);
    setDetectedChord(null);
    setHandDescription("");
  }, [stopDetection]);

  const isCorrectChord = targetChord && detectedChord?.chord === targetChord;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="relative p-0">
        {/* Video/Canvas container */}
        <div className="relative aspect-[4/3] bg-muted">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-0"
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              !isDetecting && "hidden"
            )}
            width={640}
            height={480}
          />

          {/* Overlay when camera not started */}
          {!isDetecting && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Camera className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-foreground">Camera Preview</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Click below to start hand detection
                </p>
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {isLoading && cameraStarted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading MediaPipe Hands...</p>
            </div>
          )}

          {/* Error overlay */}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-destructive/10 p-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <p className="text-center text-sm text-destructive">{error}</p>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reload Page
              </Button>
            </div>
          )}

          {/* Target chord indicator */}
          {targetChord && isDetecting && (
            <div className="absolute left-4 top-4 rounded-lg bg-background/90 px-4 py-2 shadow-lg">
              <p className="text-xs text-muted-foreground">Target Chord</p>
              <p className="text-2xl font-bold text-foreground">{targetChord}</p>
            </div>
          )}

          {/* Detected chord indicator */}
          {isDetecting && (
            <div
              className={cn(
                "absolute right-4 top-4 rounded-lg px-4 py-2 shadow-lg transition-colors",
                isCorrectChord
                  ? "bg-green-500 text-white"
                  : detectedChord?.chord
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/90"
              )}
            >
              <p className="text-xs opacity-80">
                {isCorrectChord ? "Correct!" : "Detected"}
              </p>
              <p className="text-2xl font-bold">
                {detectedChord?.chord || "---"}
              </p>
              {detectedChord && (
                <p className="text-xs opacity-80">
                  {Math.round(detectedChord.confidence * 100)}% confidence
                </p>
              )}
            </div>
          )}

          {/* Hand position description */}
          {isDetecting && handDescription && (
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/90 px-4 py-2 shadow-lg">
              <p className="text-xs text-muted-foreground">Hand Position</p>
              <p className="text-sm font-medium text-foreground">{handDescription}</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 p-4">
          {!isDetecting ? (
            <Button onClick={handleStartCamera} disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4" />
                  Start Camera
                </>
              )}
            </Button>
          ) : (
            <Button onClick={handleStopCamera} variant="outline" className="gap-2">
              <CameraOff className="h-4 w-4" />
              Stop Camera
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
