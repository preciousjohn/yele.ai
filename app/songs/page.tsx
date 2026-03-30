"use client";

import { songs } from "@/lib/songs";
import { SongCard } from "@/components/song-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function SongsPage() {
  const beginnerSongs = songs.filter((s) => s.difficulty === "beginner");
  const intermediateSongs = songs.filter((s) => s.difficulty === "intermediate");
  const advancedSongs = songs.filter((s) => s.difficulty === "advanced");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Song Tutorials
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Learn to play popular songs with step-by-step chord progressions.
        </p>
      </div>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="beginner">
            Beginner ({beginnerSongs.length})
          </TabsTrigger>
          <TabsTrigger value="intermediate">
            Intermediate ({intermediateSongs.length})
          </TabsTrigger>
          <TabsTrigger value="advanced">
            Advanced ({advancedSongs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="beginner">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beginnerSongs.map((song) => (
              <SongCard key={song.slug} song={song} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="intermediate">
          {intermediateSongs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {intermediateSongs.map((song) => (
                <SongCard key={song.slug} song={song} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">
                  More intermediate songs coming soon!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="advanced">
          {advancedSongs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {advancedSongs.map((song) => (
                <SongCard key={song.slug} song={song} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">
                  Advanced songs coming soon! Master the beginner and intermediate songs first.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
