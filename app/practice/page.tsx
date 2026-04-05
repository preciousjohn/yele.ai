"use client";

import { useState, useCallback } from "react";
import { CameraFeed } from "@/components/camera-feed";
import { ChordDiagram } from "@/components/chord-diagram";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { chords, type ChordDefinition } from "@/lib/chords";
import type { ChordRecognitionResult } from "@/lib/chord-recognition";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const practiceChords = chords.filter((c) => c.difficulty === "beginner").slice(0, 6);

export default function PracticePage() {
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [completedChords, setCompletedChords] = useState<Set<string>>(new Set());
  const [lastDetectedChord, setLastDetectedChord] = useState<ChordRecognitionResult | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentChord = practiceChords[currentChordIndex];

  const handleChordDetected = useCallback(
    (result: ChordRecognitionResult) => {
      setLastDetectedChord(result);

      if (result.chord === currentChord.name && result.confidence > 0.6) {
        if (!completedChords.has(currentChord.name)) {
          setCompletedChords((prev) => new Set([...prev, currentChord.name]));
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 2000);
        }
      }
    },
    [currentChord.name, completedChords]
  );

  const goToNextChord = () => {
    setCurrentChordIndex((prev) => (prev + 1) % practiceChords.length);
    setShowSuccess(false);
  };

  const goToPreviousChord = () => {
    setCurrentChordIndex((prev) => (prev - 1 + practiceChords.length) % practiceChords.length);
    setShowSuccess(false);
  };

  const resetProgress = () => {
    setCompletedChords(new Set());
    setCurrentChordIndex(0);
    setShowSuccess(false);
  };

  const selectChord = (index: number) => {
    setCurrentChordIndex(index);
    setShowSuccess(false);
  };

  const isCurrentCompleted = completedChords.has(currentChord.name);
  const progressPercent = (completedChords.size / practiceChords.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Practice Mode
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Practice chords with real-time hand detection feedback.
        </p>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Progress: {completedChords.size} / {practiceChords.length} chords
            </span>
            <Button variant="ghost" size="sm" onClick={resetProgress} className="gap-1">
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Camera Feed */}
        <div>
          <CameraFeed
            onChordDetected={handleChordDetected}
            targetChord={currentChord.name}
          />

          {/* Success overlay */}
          {showSuccess && (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-100 p-4 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Great job! You played {currentChord.displayName} correctly!</span>
            </div>
          )}
        </div>

        {/* Current Chord Info */}
        <div className="space-y-6">
          <Card className={cn(
            "transition-all",
            isCurrentCompleted && "ring-2 ring-green-500"
          )}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    {currentChord.displayName}
                    {isCurrentCompleted && (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {currentChord.description}
                  </CardDescription>
                </div>
                <Badge className="capitalize">{currentChord.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <ChordDiagram chord={currentChord} size="lg" showName={false} />
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Tips:</h4>
                <ul className="space-y-2">
                  {currentChord.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline" onClick={goToPreviousChord} className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentChordIndex + 1} / {practiceChords.length}
                </span>
                <Button onClick={goToNextChord} className="gap-1">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Chord Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">All Practice Chords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {practiceChords.map((chord, index) => {
                  const isCompleted = completedChords.has(chord.name);
                  const isCurrent = index === currentChordIndex;

                  return (
                    <button
                      key={chord.name}
                      onClick={() => selectChord(index)}
                      className={cn(
                        "relative flex flex-col items-center justify-center rounded-lg border p-3 transition-all hover:bg-secondary",
                        isCurrent && "border-primary bg-primary/10",
                        isCompleted && !isCurrent && "border-green-500 bg-green-50 dark:bg-green-950"
                      )}
                    >
                      <span className={cn(
                        "text-lg font-bold",
                        isCurrent ? "text-primary" : "text-foreground"
                      )}>
                        {chord.name}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="absolute -right-1 -top-1 h-4 w-4 text-green-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
