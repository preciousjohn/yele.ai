"use client";

// Using inline styles for SVG fills since Tailwind custom colors need this approach
const colors = {
  teal: "hsl(180 45% 40%)",
  primary: "hsl(25 95% 53%)",
  burgundy: "hsl(350 60% 35%)",
  secondary: "hsl(35 20% 90%)",
  background: "hsl(35 30% 96%)",
};

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
        fill={colors.teal}
      />
      {/* Orange wave - middle layer */}
      <path
        d="M0 280 Q 150 200, 350 260 Q 550 320, 800 220 L 800 600 L 0 600 Z"
        fill={colors.primary}
      />
      {/* Burgundy wave - front layer */}
      <path
        d="M0 380 Q 200 300, 400 350 Q 600 400, 800 320 L 800 600 L 0 600 Z"
        fill={colors.burgundy}
      />
    </svg>
  );
}

export function MobileHeroWaves() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="h-full w-full"
      preserveAspectRatio="xMidYMax slice"
    >
      <path
        d="M0 80 Q 100 40, 200 80 Q 300 120, 400 60 L 400 200 L 0 200 Z"
        fill={colors.teal}
      />
      <path
        d="M0 120 Q 100 80, 200 110 Q 300 140, 400 100 L 400 200 L 0 200 Z"
        fill={colors.primary}
      />
      <path
        d="M0 160 Q 100 130, 200 150 Q 300 170, 400 140 L 400 200 L 0 200 Z"
        fill={colors.burgundy}
      />
    </svg>
  );
}

export function FeatureWaves() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Background cream */}
      <rect x="0" y="0" width="400" height="400" fill={colors.background} />
      {/* Teal layer */}
      <path
        d="M0 150 Q 100 80, 200 130 Q 300 180, 400 100 L 400 400 L 0 400 Z"
        fill={colors.teal}
      />
      {/* Orange layer */}
      <path
        d="M0 220 Q 100 160, 200 200 Q 300 240, 400 170 L 400 400 L 0 400 Z"
        fill={colors.primary}
      />
      {/* Burgundy layer */}
      <path
        d="M0 300 Q 100 250, 200 280 Q 300 310, 400 260 L 400 400 L 0 400 Z"
        fill={colors.burgundy}
      />
    </svg>
  );
}

export function ProcessWaves() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width="400" height="300" fill={colors.background} />
      <path
        d="M50 250 Q 150 180, 250 220 Q 350 260, 400 200 L 400 300 L 0 300 L 0 250 Z"
        fill={colors.teal}
      />
      <path
        d="M0 280 Q 100 240, 200 260 Q 300 280, 400 240 L 400 300 L 0 300 Z"
        fill={colors.primary}
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
      <rect x="0" y="0" width="800" height="300" fill={colors.teal} />
      {/* Orange wave */}
      <path
        d="M-100 150 Q 100 50, 300 120 Q 500 190, 700 100 Q 900 10, 1000 80 L 1000 300 L -100 300 Z"
        fill={colors.primary}
      />
      {/* Burgundy accent */}
      <path
        d="M-100 200 Q 200 150, 400 200 Q 600 250, 800 180 Q 900 140, 1000 170 L 1000 300 L -100 300 Z"
        fill={colors.burgundy}
      />
    </svg>
  );
}
