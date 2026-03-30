import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, BookOpen, ListMusic, Play, Sparkles, Hand } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Camera,
      title: "Camera Recognition",
      description:
        "Use your camera to detect hand positions in real-time using MediaPipe Hands technology.",
      href: "/practice",
    },
    {
      icon: BookOpen,
      title: "Chord Library",
      description:
        "Learn all the essential ukulele chords with detailed diagrams and finger placement guides.",
      href: "/learn",
    },
    {
      icon: ListMusic,
      title: "Song Tutorials",
      description:
        "Follow along with step-by-step tutorials for popular songs perfect for beginners.",
      href: "/songs",
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background px-4 py-20 sm:py-32">
        <div className="container mx-auto text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Hand className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Learn Ukulele with Real-Time Hand Detection
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            Master ukulele chords using your camera and MediaPipe Hands. Get instant feedback on your finger positions and track your progress as you learn.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/practice">
                <Play className="h-5 w-5" />
                Start Practicing
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/learn">
                <BookOpen className="h-5 w-5" />
                Browse Chords
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to Learn
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From beginner chords to complete songs, we have got you covered.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} href={feature.href}>
                  <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary/30 px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three simple steps to start learning ukulele today.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Learn the Chords",
                description:
                  "Study our interactive chord diagrams to understand finger positions for each chord.",
              },
              {
                step: "2",
                title: "Practice with Camera",
                description:
                  "Use your camera to practice chords and get real-time feedback on your hand position.",
              },
              {
                step: "3",
                title: "Play Songs",
                description:
                  "Apply your skills by following along with song tutorials featuring your favorite songs.",
              },
            ].map((item) => (
              <Card key={item.step} className="relative overflow-hidden">
                <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary/30">
                  {item.step}
                </div>
                <CardHeader className="pt-8">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <Card className="overflow-hidden bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center justify-between gap-6 p-8 sm:flex-row sm:p-12">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold sm:text-3xl">
                  Ready to start your ukulele journey?
                </h3>
                <p className="mt-2 text-primary-foreground/80">
                  Jump into practice mode and start learning your first chord today.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="shrink-0 gap-2"
              >
                <Link href="/practice">
                  <Sparkles className="h-5 w-5" />
                  Get Started Free
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-card px-4 py-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Built with MediaPipe Hands for real-time hand detection.</p>
          <p className="mt-1">UkeLearn - Learn ukulele the smart way.</p>
        </div>
      </footer>
    </div>
  );
}
