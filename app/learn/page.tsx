"use client";

import { useState } from "react";
import { chords, type ChordDefinition } from "@/lib/chords";
import { ChordCard } from "@/components/chord-card";
import { ChordDiagram } from "@/components/chord-diagram";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, X } from "lucide-react";

export default function LearnPage() {
  const [selectedChord, setSelectedChord] = useState<ChordDefinition | null>(null);

  const beginnerChords = chords.filter((c) => c.difficulty === "beginner");
  const intermediateChords = chords.filter((c) => c.difficulty === "intermediate");
  const advancedChords = chords.filter((c) => c.difficulty === "advanced");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Chord Library
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Learn the essential ukulele chords with detailed diagrams and tips.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Chord Grid */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="beginner" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="beginner">
                Beginner ({beginnerChords.length})
              </TabsTrigger>
              <TabsTrigger value="intermediate">
                Intermediate ({intermediateChords.length})
              </TabsTrigger>
              <TabsTrigger value="advanced">
                Advanced ({advancedChords.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="beginner">
              <div className="grid gap-4 sm:grid-cols-2">
                {beginnerChords.map((chord) => (
                  <ChordCard
                    key={chord.name}
                    chord={chord}
                    isSelected={selectedChord?.name === chord.name}
                    onClick={() => setSelectedChord(chord)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="intermediate">
              <div className="grid gap-4 sm:grid-cols-2">
                {intermediateChords.map((chord) => (
                  <ChordCard
                    key={chord.name}
                    chord={chord}
                    isSelected={selectedChord?.name === chord.name}
                    onClick={() => setSelectedChord(chord)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced">
              {advancedChords.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {advancedChords.map((chord) => (
                    <ChordCard
                      key={chord.name}
                      chord={chord}
                      isSelected={selectedChord?.name === chord.name}
                      onClick={() => setSelectedChord(chord)}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-muted-foreground">
                      Advanced chords coming soon! Master the beginner and intermediate chords first.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Selected Chord Detail */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {selectedChord ? (
              <Card>
                <CardHeader className="relative">
                  <button
                    onClick={() => setSelectedChord(null)}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </button>
                  <CardTitle className="text-2xl">{selectedChord.displayName}</CardTitle>
                  <CardDescription>{selectedChord.description}</CardDescription>
                  <Badge
                    className="mt-2 w-fit capitalize"
                    variant={
                      selectedChord.difficulty === "beginner"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedChord.difficulty}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex justify-center">
                    <ChordDiagram chord={selectedChord} size="lg" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Tips
                      </h4>
                      <ul className="space-y-2">
                        {selectedChord.tips.map((tip, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground"
                          >
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold text-foreground">
                        Finger Legend
                      </h4>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <Badge variant="outline" className="gap-1">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(25,95%,53%)] text-[10px] text-white">
                            1
                          </span>
                          Index
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(35,100%,50%)] text-[10px] text-white">
                            2
                          </span>
                          Middle
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(15,90%,45%)] text-[10px] text-white">
                            3
                          </span>
                          Ring
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(0,70%,50%)] text-[10px] text-white">
                            4
                          </span>
                          Pinky
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-secondary/30">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    Select a chord
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Click on any chord card to see detailed information and tips.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
