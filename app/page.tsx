import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroWaves, FeatureWaves, CTAWaves } from "@/components/organic-waves";
import { Camera, BookOpen, ListMusic, ArrowRight, Hand, Heart, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden bg-background">
        <div className="container relative z-10 mx-auto grid min-h-[90vh] gap-8 px-4 py-20 lg:grid-cols-2 lg:py-0">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Learn Ukulele the Smart Way
            </p>
            <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Master chords with real-time hand detection.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Using <span className="font-semibold text-foreground">MediaPipe Hands</span>, 
              we help you learn ukulele by analyzing your finger positions through your camera.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="group gap-2">
                <Link href="/practice">
                  Start Learning
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <HeroWaves />
          </div>
        </div>
        {/* Mobile waves */}
        <div className="absolute bottom-0 left-0 right-0 h-48 lg:hidden">
          <svg
            viewBox="0 0 400 200"
            className="h-full w-full"
            preserveAspectRatio="xMidYMax slice"
          >
            <path
              d="M0 80 Q 100 40, 200 80 Q 300 120, 400 60 L 400 200 L 0 200 Z"
              className="fill-teal"
            />
            <path
              d="M0 120 Q 100 80, 200 110 Q 300 140, 400 100 L 400 200 L 0 200 Z"
              className="fill-primary"
            />
            <path
              d="M0 160 Q 100 130, 200 150 Q 300 170, 400 140 L 400 200 L 0 200 Z"
              className="fill-burgundy"
            />
          </svg>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="relative bg-card px-4 py-20 sm:py-28">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative overflow-hidden rounded-2xl">
              <FeatureWaves />
              <div className="relative z-10 aspect-square lg:aspect-auto lg:h-full" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Who This Is For
              </p>
              <h2 className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                Beginners and Musicians Exploring New Instruments
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  { icon: Hand, label: "Complete Beginners" },
                  { icon: Heart, label: "Music Enthusiasts" },
                  { icon: Zap, label: "Self-Taught Learners" },
                  { icon: Camera, label: "Tech-Savvy Musicians" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Different Standard Section */}
      <section className="bg-background px-4 py-20 sm:py-28">
        <div className="container mx-auto text-center">
          <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
            A Different Way to Learn
          </h2>
          <div className="mx-auto mt-16 grid max-w-4xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Camera, title: "Real-Time Feedback", desc: "See your progress instantly" },
              { icon: Hand, title: "Hand Tracking", desc: "21 landmark detection" },
              { icon: BookOpen, title: "Chord Library", desc: "All essential chords" },
              { icon: ListMusic, title: "Song Tutorials", desc: "Learn popular songs" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative overflow-hidden bg-secondary px-4 py-20 sm:py-28">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                The Process
              </p>
              <h2 className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                A Learning Journey Rooted in Practice
              </h2>
              <p className="mt-6 text-muted-foreground">
                What to expect from learning with us:
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Camera-based hand position analysis",
                  "Interactive chord diagrams with finger guides",
                  "Progressive song tutorials from easy to advanced",
                  "Instant visual feedback on your technique",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-card p-8 sm:p-12">
              <div className="relative z-10 aspect-[4/3]">
                <svg
                  viewBox="0 0 400 300"
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M50 250 Q 150 180, 250 220 Q 350 260, 400 200 L 400 300 L 0 300 L 0 250 Z"
                    className="fill-teal"
                  />
                  <path
                    d="M0 280 Q 100 240, 200 260 Q 300 280, 400 240 L 400 300 L 0 300 Z"
                    className="fill-primary"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-background px-4 py-20 sm:py-28">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Getting Started
            </p>
            <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
              Three Steps to Playing
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
            {[
              {
                num: "01.",
                title: "Learn the Chords",
                desc: "Study our interactive chord diagrams to understand finger positions. Start with the basics like C, Am, F, and G.",
              },
              {
                num: "02.",
                title: "Practice with Camera",
                desc: "Use your camera to practice chords with real-time MediaPipe hand tracking. Get instant feedback on your finger placement.",
              },
              {
                num: "03.",
                title: "Play Songs",
                desc: "Apply your skills with our song tutorials. Follow along with chord progressions and strumming patterns.",
              },
            ].map((step) => (
              <div key={step.num} className="rounded-xl border bg-card p-6 sm:p-8">
                <span className="font-serif text-4xl font-medium text-primary">{step.num}</span>
                <h3 className="mt-4 font-serif text-xl font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-28">
        <CTAWaves />
        <div className="container relative z-10 mx-auto text-center text-white">
          <h2 className="font-serif text-3xl font-medium sm:text-4xl lg:text-5xl">
            Ready to start your ukulele journey?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/80">
            Jump into practice mode and learn your first chord today. No signup required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/practice">
                Start Practicing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href="/learn">
                Browse Chords
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card px-4 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Hand className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-medium">UkeLearn</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Built with MediaPipe Hands for real-time hand detection.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
