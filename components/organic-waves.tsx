"use client";

export function HeroWaves() {
  return (
    <svg
      viewBox="0 0 800 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Teal wave - back layer */}
      <path
        d="M0 200 Q 200 100, 400 180 Q 600 260, 800 150 L 800 600 L 0 600 Z"
        className="fill-teal"
      />
      {/* Orange wave - middle layer */}
      <path
        d="M0 280 Q 150 200, 350 260 Q 550 320, 800 220 L 800 600 L 0 600 Z"
        className="fill-primary"
      />
      {/* Burgundy wave - front layer */}
      <path
        d="M0 380 Q 200 300, 400 350 Q 600 400, 800 320 L 800 600 L 0 600 Z"
        className="fill-burgundy"
      />
    </svg>
  );
}

export function SectionWaves({ variant = "default" }: { variant?: "default" | "inverted" | "bottom" }) {
  if (variant === "inverted") {
    return (
      <svg
        viewBox="0 0 1440 200"
        className="absolute left-0 top-0 h-24 w-full -translate-y-full transform sm:h-32"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200 Q 360 120, 720 160 Q 1080 200, 1440 100 L 1440 200 L 0 200 Z"
          className="fill-secondary"
        />
      </svg>
    );
  }

  if (variant === "bottom") {
    return (
      <svg
        viewBox="0 0 1440 200"
        className="absolute bottom-0 left-0 h-24 w-full translate-y-full transform sm:h-32"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 Q 360 80, 720 40 Q 1080 0, 1440 100 L 1440 0 L 0 0 Z"
          className="fill-secondary"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1440 200"
      className="absolute bottom-0 left-0 h-24 w-full sm:h-32"
      preserveAspectRatio="none"
    >
      <path
        d="M0 100 Q 360 20, 720 60 Q 1080 100, 1440 0 L 1440 200 L 0 200 Z"
        className="fill-background"
      />
    </svg>
  );
}

export function FeatureWaves() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="absolute bottom-0 right-0 h-full w-2/3 opacity-90"
      preserveAspectRatio="xMaxYMax slice"
    >
      {/* Teal layer */}
      <path
        d="M100 0 Q 200 100, 300 50 Q 400 0, 500 80 Q 600 160, 600 0 L 600 400 L 100 400 Q 50 300, 100 200 Q 150 100, 100 0 Z"
        className="fill-teal"
      />
      {/* Orange layer */}
      <path
        d="M200 0 Q 300 80, 400 30 Q 500 -20, 600 60 L 600 400 L 200 400 Q 150 300, 200 200 Q 250 100, 200 0 Z"
        className="fill-primary"
      />
      {/* Burgundy layer */}
      <path
        d="M350 100 Q 450 50, 550 100 Q 600 130, 600 100 L 600 400 L 350 400 Q 300 300, 350 200 Q 400 150, 350 100 Z"
        className="fill-burgundy"
      />
    </svg>
  );
}

export function CTAWaves() {
  return (
    <svg
      viewBox="0 0 800 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Teal base */}
      <rect x="0" y="0" width="800" height="300" className="fill-teal" />
      {/* Orange wave */}
      <path
        d="M-100 150 Q 100 50, 300 120 Q 500 190, 700 100 Q 900 10, 1000 80 L 1000 300 L -100 300 Z"
        className="fill-primary"
      />
      {/* Burgundy accent */}
      <path
        d="M-100 200 Q 200 150, 400 200 Q 600 250, 800 180 Q 900 140, 1000 170 L 1000 300 L -100 300 Z"
        className="fill-burgundy"
      />
    </svg>
  );
}
