"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChordDiagram } from "@/components/chord-diagram";
import type { ChordDefinition } from "@/lib/chords";
import { cn } from "@/lib/utils";

interface ChordCardProps {
  chord: ChordDefinition;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ChordCard({ chord, isSelected, onClick, className }: ChordCardProps) {
  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected && "ring-2 ring-primary",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{chord.displayName}</CardTitle>
            <CardDescription className="mt-1">{chord.description}</CardDescription>
          </div>
          <Badge className={cn("capitalize", difficultyColors[chord.difficulty])}>
            {chord.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center pt-2">
        <ChordDiagram chord={chord} size="md" showName={false} />
      </CardContent>
    </Card>
  );
}
