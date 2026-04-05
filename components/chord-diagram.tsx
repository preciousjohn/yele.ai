"use client";

import { cn } from "@/lib/utils";
import type { ChordDefinition } from "@/lib/chords";

interface ChordDiagramProps {
  chord: ChordDefinition;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

export function ChordDiagram({
  chord,
  size = "md",
  showName = true,
  className,
}: ChordDiagramProps) {
  const dimensions = {
    sm: { width: 100, height: 120, dotSize: 8, fontSize: 10 },
    md: { width: 140, height: 170, dotSize: 12, fontSize: 14 },
    lg: { width: 200, height: 240, dotSize: 16, fontSize: 18 },
  };

  const { width, height, dotSize, fontSize } = dimensions[size];
  const stringSpacing = (width - 40) / 3;
  const fretSpacing = (height - 60) / 4;
  const startX = 20;
  const startY = 40;

  const stringNames = ["G", "C", "E", "A"];
  const fingerColors = [
    "transparent",
    "hsl(25 95% 53%)", // Index - primary orange
    "hsl(35 100% 50%)", // Middle - accent amber
    "hsl(15 90% 45%)", // Ring - darker orange
    "hsl(0 70% 50%)", // Pinky - reddish
  ];

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {showName && (
        <span
          className="mb-2 font-bold text-foreground"
          style={{ fontSize: fontSize * 1.2 }}
        >
          {chord.name}
        </span>
      )}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="drop-shadow-sm"
      >
        {/* Nut (top bar) */}
        <rect
          x={startX - 2}
          y={startY - 4}
          width={stringSpacing * 3 + 4}
          height={6}
          fill="hsl(var(--foreground))"
          rx={2}
        />

        {/* Frets */}
        {[0, 1, 2, 3, 4].map((fret) => (
          <line
            key={`fret-${fret}`}
            x1={startX}
            y1={startY + fret * fretSpacing}
            x2={startX + stringSpacing * 3}
            y2={startY + fret * fretSpacing}
            stroke="hsl(var(--border))"
            strokeWidth={fret === 0 ? 0 : 2}
          />
        ))}

        {/* Strings */}
        {[0, 1, 2, 3].map((string) => (
          <line
            key={`string-${string}`}
            x1={startX + string * stringSpacing}
            y1={startY}
            x2={startX + string * stringSpacing}
            y2={startY + fretSpacing * 4}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1.5}
          />
        ))}

        {/* String names */}
        {stringNames.map((name, i) => (
          <text
            key={`name-${name}`}
            x={startX + i * stringSpacing}
            y={startY - 12}
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            fontSize={fontSize * 0.8}
          >
            {name}
          </text>
        ))}

        {/* Finger positions */}
        {chord.frets.map((fret, string) => {
          const finger = chord.fingers[string];
          const x = startX + string * stringSpacing;

          if (fret === 0) {
            // Open string - circle outline
            return (
              <circle
                key={`pos-${string}`}
                cx={x}
                cy={startY - 12}
                r={dotSize / 2.5}
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth={1.5}
              />
            );
          }

          if (fret === -1) {
            // Muted string - X
            return (
              <text
                key={`pos-${string}`}
                x={x}
                y={startY - 8}
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize={fontSize}
                fontWeight="bold"
              >
                x
              </text>
            );
          }

          // Pressed fret
          const y = startY + (fret - 0.5) * fretSpacing;
          return (
            <g key={`pos-${string}`}>
              <circle
                cx={x}
                cy={y}
                r={dotSize / 2}
                fill={fingerColors[finger] || "hsl(var(--foreground))"}
              />
              {finger > 0 && (
                <text
                  x={x}
                  y={y + fontSize / 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize={fontSize * 0.7}
                  fontWeight="bold"
                >
                  {finger}
                </text>
              )}
            </g>
          );
        })}

        {/* Fret numbers */}
        {[1, 2, 3, 4].map((fret) => (
          <text
            key={`fretnum-${fret}`}
            x={startX + stringSpacing * 3 + 12}
            y={startY + (fret - 0.5) * fretSpacing + fontSize / 3}
            fill="hsl(var(--muted-foreground))"
            fontSize={fontSize * 0.7}
          >
            {fret}
          </text>
        ))}
      </svg>
    </div>
  );
}
