export interface Song {
  slug: string;
  title: string;
  artist: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  chords: string[];
  strummingPattern: string;
  tempo: number; // BPM
  sections: SongSection[];
  tips: string[];
}

export interface SongSection {
  name: string;
  lines: SongLine[];
}

export interface SongLine {
  lyrics: string;
  chords: { chord: string; position: number }[];
}

export const songs: Song[] = [
  {
    slug: "somewhere-over-the-rainbow",
    title: "Somewhere Over the Rainbow",
    artist: "Israel Kamakawiwo'ole",
    difficulty: "beginner",
    chords: ["C", "Em", "Am", "F", "G"],
    strummingPattern: "D DU UDU",
    tempo: 80,
    sections: [
      {
        name: "Intro/Verse",
        lines: [
          {
            lyrics: "Somewhere over the rainbow",
            chords: [
              { chord: "C", position: 0 },
              { chord: "Em", position: 10 },
            ],
          },
          {
            lyrics: "Way up high",
            chords: [
              { chord: "Am", position: 0 },
              { chord: "F", position: 8 },
            ],
          },
          {
            lyrics: "And the dreams that you dream of",
            chords: [
              { chord: "C", position: 0 },
              { chord: "G", position: 15 },
            ],
          },
          {
            lyrics: "Once in a lullaby",
            chords: [
              { chord: "Am", position: 0 },
              { chord: "F", position: 10 },
            ],
          },
        ],
      },
      {
        name: "Chorus",
        lines: [
          {
            lyrics: "Someday I'll wish upon a star",
            chords: [
              { chord: "C", position: 0 },
              { chord: "G", position: 12 },
            ],
          },
          {
            lyrics: "Wake up where the clouds are far behind me",
            chords: [
              { chord: "Am", position: 0 },
              { chord: "F", position: 20 },
            ],
          },
          {
            lyrics: "Where trouble melts like lemon drops",
            chords: [
              { chord: "C", position: 0 },
              { chord: "G", position: 15 },
            ],
          },
          {
            lyrics: "High above the chimney top",
            chords: [
              { chord: "Am", position: 0 },
              { chord: "F", position: 12 },
            ],
          },
        ],
      },
    ],
    tips: [
      "Start slow and focus on smooth chord transitions",
      "The strumming pattern is relaxed and flowing",
      "This version uses a simplified chord progression",
    ],
  },
  {
    slug: "riptide",
    title: "Riptide",
    artist: "Vance Joy",
    difficulty: "beginner",
    chords: ["Am", "G", "C"],
    strummingPattern: "D DU UDU",
    tempo: 102,
    sections: [
      {
        name: "Verse",
        lines: [
          {
            lyrics: "I was scared of dentists and the dark",
            chords: [
              { chord: "Am", position: 0 },
              { chord: "G", position: 18 },
            ],
          },
          {
            lyrics: "I was scared of pretty girls and starting conversations",
            chords: [
              { chord: "C", position: 0 },
            ],
          },
          {
            lyrics: "Oh, all my friends are turning green",
            chords: [
              { chord: "Am", position: 0 },
              { chord: "G", position: 15 },
            ],
          },
          {
            lyrics: "You're the magician's assistant in their dreams",
            chords: [
              { chord: "C", position: 0 },
            ],
          },
        ],
      },
      {
        name: "Chorus",
        lines: [
          {
            lyrics: "Lady, running down to the riptide",
            chords: [
              { chord: "Am", position: 0 },
              { chord: "G", position: 20 },
            ],
          },
          {
            lyrics: "Taken away to the dark side",
            chords: [
              { chord: "C", position: 0 },
            ],
          },
          {
            lyrics: "I wanna be your left hand man",
            chords: [
              { chord: "Am", position: 0 },
              { chord: "G", position: 15 },
            ],
          },
          {
            lyrics: "I love you when you're singing that song",
            chords: [
              { chord: "C", position: 0 },
            ],
          },
        ],
      },
    ],
    tips: [
      "Only three chords - perfect for beginners!",
      "Keep the strumming steady and consistent",
      "Focus on transitioning quickly between Am and G",
    ],
  },
  {
    slug: "im-yours",
    title: "I'm Yours",
    artist: "Jason Mraz",
    difficulty: "beginner",
    chords: ["C", "G", "Am", "F"],
    strummingPattern: "D DU UDU",
    tempo: 75,
    sections: [
      {
        name: "Verse",
        lines: [
          {
            lyrics: "Well, you done done me and you bet I felt it",
            chords: [
              { chord: "C", position: 0 },
            ],
          },
          {
            lyrics: "I tried to be chill but you're so hot that I melted",
            chords: [
              { chord: "G", position: 0 },
            ],
          },
          {
            lyrics: "I fell right through the cracks",
            chords: [
              { chord: "Am", position: 0 },
            ],
          },
          {
            lyrics: "Now I'm trying to get back",
            chords: [
              { chord: "F", position: 0 },
            ],
          },
        ],
      },
      {
        name: "Chorus",
        lines: [
          {
            lyrics: "I won't hesitate no more, no more",
            chords: [
              { chord: "C", position: 0 },
            ],
          },
          {
            lyrics: "It cannot wait, I'm yours",
            chords: [
              { chord: "G", position: 0 },
              { chord: "Am", position: 12 },
              { chord: "F", position: 20 },
            ],
          },
        ],
      },
    ],
    tips: [
      "The four-chord progression repeats throughout",
      "Keep the tempo relaxed and laid-back",
      "Focus on the reggae-inspired strumming feel",
    ],
  },
  {
    slug: "hey-soul-sister",
    title: "Hey, Soul Sister",
    artist: "Train",
    difficulty: "beginner",
    chords: ["C", "G", "Am", "F"],
    strummingPattern: "D U D U",
    tempo: 97,
    sections: [
      {
        name: "Intro/Verse",
        lines: [
          {
            lyrics: "Hey, hey, hey",
            chords: [
              { chord: "C", position: 0 },
              { chord: "G", position: 6 },
            ],
          },
          {
            lyrics: "Your lipstick stains on the front lobe of my left side brains",
            chords: [
              { chord: "Am", position: 0 },
              { chord: "F", position: 30 },
            ],
          },
          {
            lyrics: "I knew I wouldn't forget you",
            chords: [
              { chord: "C", position: 0 },
              { chord: "G", position: 12 },
            ],
          },
        ],
      },
      {
        name: "Chorus",
        lines: [
          {
            lyrics: "Hey, soul sister, ain't that Mr. Mister",
            chords: [
              { chord: "C", position: 0 },
              { chord: "G", position: 18 },
            ],
          },
          {
            lyrics: "On the radio, stereo",
            chords: [
              { chord: "Am", position: 0 },
              { chord: "F", position: 12 },
            ],
          },
          {
            lyrics: "The way you move ain't fair, you know",
            chords: [
              { chord: "C", position: 0 },
              { chord: "G", position: 18 },
            ],
          },
        ],
      },
    ],
    tips: [
      "This song uses the same four chords as 'I'm Yours'",
      "Strumming is more upbeat and energetic",
      "Practice the transitions at a slower tempo first",
    ],
  },
  {
    slug: "can't-help-falling-in-love",
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    difficulty: "intermediate",
    chords: ["C", "Em", "Am", "F", "G", "G7"],
    strummingPattern: "D D DU",
    tempo: 68,
    sections: [
      {
        name: "Verse",
        lines: [
          {
            lyrics: "Wise men say only fools rush in",
            chords: [
              { chord: "C", position: 0 },
              { chord: "Em", position: 8 },
              { chord: "Am", position: 18 },
            ],
          },
          {
            lyrics: "But I can't help falling in love with you",
            chords: [
              { chord: "F", position: 0 },
              { chord: "C", position: 10 },
              { chord: "G", position: 22 },
            ],
          },
          {
            lyrics: "Shall I stay, would it be a sin",
            chords: [
              { chord: "C", position: 0 },
              { chord: "Em", position: 8 },
              { chord: "Am", position: 18 },
            ],
          },
          {
            lyrics: "If I can't help falling in love with you",
            chords: [
              { chord: "F", position: 0 },
              { chord: "C", position: 10 },
              { chord: "G7", position: 22 },
              { chord: "C", position: 30 },
            ],
          },
        ],
      },
    ],
    tips: [
      "This is a slower, more romantic song",
      "Pay attention to the G7 to C transition",
      "The finger-picking version is also popular on ukulele",
    ],
  },
];

export const getSongBySlug = (slug: string) => {
  return songs.find((song) => song.slug === slug);
};

export const getSongsByDifficulty = (difficulty: Song["difficulty"]) => {
  return songs.filter((song) => song.difficulty === difficulty);
};
