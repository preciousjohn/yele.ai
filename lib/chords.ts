export interface ChordDefinition {
  name: string;
  displayName: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  frets: number[]; // [G, C, E, A] - 0 means open, -1 means muted
  fingers: number[]; // Which finger to use (1=index, 2=middle, 3=ring, 4=pinky, 0=none)
  barreInfo?: {
    fret: number;
    strings: number[]; // Which strings are barred
  };
  description: string;
  tips: string[];
}

export const chords: ChordDefinition[] = [
  {
    name: "C",
    displayName: "C Major",
    difficulty: "beginner",
    frets: [0, 0, 0, 3],
    fingers: [0, 0, 0, 3],
    description: "One of the easiest chords to learn. Just one finger!",
    tips: [
      "Press the A string (bottom) at the 3rd fret with your ring finger",
      "Keep your other fingers relaxed and out of the way",
      "Make sure the other strings ring clearly",
    ],
  },
  {
    name: "Am",
    displayName: "A Minor",
    difficulty: "beginner",
    frets: [2, 0, 0, 0],
    fingers: [2, 0, 0, 0],
    description: "A melancholic sounding chord, perfect for emotional songs.",
    tips: [
      "Press the G string (top) at the 2nd fret with your middle finger",
      "Let all other strings ring open",
      "A great chord to pair with C major",
    ],
  },
  {
    name: "F",
    displayName: "F Major",
    difficulty: "beginner",
    frets: [2, 0, 1, 0],
    fingers: [2, 0, 1, 0],
    description: "A bright, cheerful chord used in many popular songs.",
    tips: [
      "Index finger on E string, 1st fret",
      "Middle finger on G string, 2nd fret",
      "Keep fingers curved to avoid muting other strings",
    ],
  },
  {
    name: "G",
    displayName: "G Major",
    difficulty: "beginner",
    frets: [0, 2, 3, 2],
    fingers: [0, 1, 3, 2],
    description: "A versatile chord that appears in countless songs.",
    tips: [
      "Index on C string, 2nd fret",
      "Middle on A string, 2nd fret",
      "Ring finger on E string, 3rd fret",
    ],
  },
  {
    name: "D",
    displayName: "D Major",
    difficulty: "beginner",
    frets: [2, 2, 2, 0],
    fingers: [1, 2, 3, 0],
    description: "A happy, uplifting chord with a full sound.",
    tips: [
      "Barre or use three fingers across G, C, E at 2nd fret",
      "Keep A string open",
      "Can also be played with a mini-barre using index finger",
    ],
  },
  {
    name: "Em",
    displayName: "E Minor",
    difficulty: "beginner",
    frets: [0, 4, 3, 2],
    fingers: [0, 3, 2, 1],
    description: "A deep, resonant minor chord with a unique voicing.",
    tips: [
      "Index on A string, 2nd fret",
      "Middle on E string, 3rd fret",
      "Ring on C string, 4th fret",
    ],
  },
  {
    name: "A",
    displayName: "A Major",
    difficulty: "beginner",
    frets: [2, 1, 0, 0],
    fingers: [2, 1, 0, 0],
    description: "A bright chord with a distinctive tone.",
    tips: [
      "Index on C string, 1st fret",
      "Middle on G string, 2nd fret",
      "Let E and A strings ring open",
    ],
  },
  {
    name: "E",
    displayName: "E Major",
    difficulty: "intermediate",
    frets: [1, 4, 0, 2],
    fingers: [1, 4, 0, 2],
    description: "A less common but useful chord shape.",
    tips: [
      "Index on G string, 1st fret",
      "Middle on A string, 2nd fret",
      "Pinky on C string, 4th fret",
    ],
  },
  {
    name: "Dm",
    displayName: "D Minor",
    difficulty: "intermediate",
    frets: [2, 2, 1, 0],
    fingers: [2, 3, 1, 0],
    description: "A sad, contemplative chord often used in ballads.",
    tips: [
      "Index on E string, 1st fret",
      "Middle on G string, 2nd fret",
      "Ring on C string, 2nd fret",
    ],
  },
  {
    name: "B7",
    displayName: "B Dominant 7",
    difficulty: "intermediate",
    frets: [2, 3, 2, 2],
    fingers: [1, 2, 3, 4],
    description: "A jazzy chord that adds tension and leads back to E.",
    tips: [
      "This chord uses all four fingers",
      "Keep your hand relaxed",
      "Practice transitioning from E to B7",
    ],
  },
  {
    name: "G7",
    displayName: "G Dominant 7",
    difficulty: "beginner",
    frets: [0, 2, 1, 2],
    fingers: [0, 2, 1, 3],
    description: "Adds a bluesy feel, great for leading to C.",
    tips: [
      "Similar to G but with index on E string, 1st fret",
      "Often used before C in chord progressions",
    ],
  },
  {
    name: "C7",
    displayName: "C Dominant 7",
    difficulty: "beginner",
    frets: [0, 0, 0, 1],
    fingers: [0, 0, 0, 1],
    description: "A bluesy variation of C major.",
    tips: [
      "Just one finger on A string, 1st fret",
      "Similar ease to C major",
    ],
  },
];

export const getChordsByDifficulty = (difficulty: ChordDefinition["difficulty"]) => {
  return chords.filter((chord) => chord.difficulty === difficulty);
};

export const getChordByName = (name: string) => {
  return chords.find((chord) => chord.name === name);
};
