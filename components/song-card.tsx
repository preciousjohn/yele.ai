import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChordDiagram } from "@/components/chord-diagram";
import type { Song } from "@/lib/songs";
import { getChordByName } from "@/lib/chords";
import { Music, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SongCardProps {
  song: Song;
  className?: string;
}

export function SongCard({ song, className }: SongCardProps) {
  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  // Get first 4 chord diagrams
  const chordDiagrams = song.chords
    .slice(0, 4)
    .map((name) => getChordByName(name))
    .filter(Boolean);

  return (
    <Link href={`/songs/${song.slug}`}>
      <Card className={cn("h-full transition-all hover:shadow-lg hover:-translate-y-1", className)}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{song.title}</CardTitle>
              <CardDescription className="mt-1">{song.artist}</CardDescription>
            </div>
            <Badge className={cn("capitalize", difficultyColors[song.difficulty])}>
              {song.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Music className="h-4 w-4" />
              {song.chords.length} chords
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {song.tempo} BPM
            </span>
          </div>

          {/* Mini chord previews */}
          <div className="flex items-center gap-2">
            {chordDiagrams.map((chord) => (
              chord && (
                <div key={chord.name} className="flex flex-col items-center">
                  <ChordDiagram chord={chord} size="sm" showName={false} />
                  <span className="mt-1 text-xs font-medium text-muted-foreground">
                    {chord.name}
                  </span>
                </div>
              )
            ))}
            {song.chords.length > 4 && (
              <div className="flex h-[100px] w-[60px] items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
                +{song.chords.length - 4}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
