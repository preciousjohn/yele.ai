import { notFound } from "next/navigation";
import Link from "next/link";
import { songs, getSongBySlug } from "@/lib/songs";
import { getChordByName } from "@/lib/chords";
import { ChordDiagram } from "@/components/chord-diagram";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Music, Clock, Lightbulb, Play } from "lucide-react";

interface SongPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return songs.map((song) => ({
    slug: song.slug,
  }));
}

export default async function SongPage({ params }: SongPageProps) {
  const { slug } = await params;
  const song = getSongBySlug(slug);

  if (!song) {
    notFound();
  }

  const chordDiagrams = song.chords
    .map((name) => getChordByName(name))
    .filter(Boolean);

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6 gap-2">
        <Link href="/songs">
          <ArrowLeft className="h-4 w-4" />
          Back to Songs
        </Link>
      </Button>

      {/* Song Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {song.title}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">{song.artist}</p>
          </div>
          <Badge className={difficultyColors[song.difficulty]} variant="secondary">
            {song.difficulty}
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Music className="h-4 w-4" />
            {song.chords.length} chords
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {song.tempo} BPM
          </span>
          <span className="flex items-center gap-1">
            <Play className="h-4 w-4" />
            Strumming: {song.strummingPattern}
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Song Sections */}
          {song.sections.map((section, sectionIndex) => (
            <Card key={sectionIndex}>
              <CardHeader>
                <CardTitle className="text-xl">{section.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="space-y-1">
                    {/* Chord line */}
                    <div className="relative h-8 font-mono text-sm">
                      {line.chords.map((chordPos, i) => (
                        <span
                          key={i}
                          className="absolute font-bold text-primary"
                          style={{ left: `${chordPos.position * 0.6}ch` }}
                        >
                          {chordPos.chord}
                        </span>
                      ))}
                    </div>
                    {/* Lyrics line */}
                    <p className="text-foreground leading-relaxed">{line.lyrics}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Tips */}
          {song.tips.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Tips for This Song
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {song.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Chords */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chords Used</CardTitle>
                <CardDescription>
                  Learn these chords to play this song
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {chordDiagrams.map(
                    (chord) =>
                      chord && (
                        <div
                          key={chord.name}
                          className="flex flex-col items-center rounded-lg border p-3"
                        >
                          <ChordDiagram chord={chord} size="sm" />
                        </div>
                      )
                  )}
                </div>

                <div className="mt-6">
                  <Button asChild className="w-full gap-2">
                    <Link href="/practice">
                      <Play className="h-4 w-4" />
                      Practice These Chords
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Strumming Pattern */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Strumming Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="font-mono text-2xl font-bold tracking-widest text-foreground">
                    {song.strummingPattern}
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  D = Down strum, U = Up strum
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
