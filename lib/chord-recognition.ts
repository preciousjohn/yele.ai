import type { HandLandmark } from "./use-hand-detection";
import { FINGER_LANDMARKS, getFingerCurl } from "./use-hand-detection";

export interface ChordRecognitionResult {
  chord: string | null;
  confidence: number;
  fingerStates: {
    index: number;
    middle: number;
    ring: number;
    pinky: number;
  };
}

// Simple chord recognition based on finger curl patterns
// Note: This is a simplified algorithm for demonstration
// Real chord recognition would require detecting the ukulele fretboard position
export function recognizeChord(landmarks: HandLandmark[]): ChordRecognitionResult {
  if (landmarks.length < 21) {
    return { chord: null, confidence: 0, fingerStates: { index: 0, middle: 0, ring: 0, pinky: 0 } };
  }

  const fingerStates = {
    index: getFingerCurl(landmarks, "INDEX"),
    middle: getFingerCurl(landmarks, "MIDDLE"),
    ring: getFingerCurl(landmarks, "RING"),
    pinky: getFingerCurl(landmarks, "PINKY"),
  };

  // Chord patterns based on finger curls (simplified)
  // 0 = extended, 1 = curled
  const chordPatterns: { [key: string]: { index: number; middle: number; ring: number; pinky: number } } = {
    // C chord - only ring finger pressed (A string, 3rd fret)
    C: { index: 0, middle: 0, ring: 0.7, pinky: 0 },
    // Am chord - only middle finger pressed (G string, 2nd fret)
    Am: { index: 0, middle: 0.6, ring: 0, pinky: 0 },
    // F chord - index on E, middle on G
    F: { index: 0.5, middle: 0.6, ring: 0, pinky: 0 },
    // G chord - index on C, middle on A, ring on E
    G: { index: 0.5, middle: 0.5, ring: 0.6, pinky: 0 },
    // D chord - three fingers barred
    D: { index: 0.6, middle: 0.6, ring: 0.6, pinky: 0 },
  };

  let bestMatch = { chord: null as string | null, confidence: 0 };

  for (const [chordName, pattern] of Object.entries(chordPatterns)) {
    const indexDiff = Math.abs(fingerStates.index - pattern.index);
    const middleDiff = Math.abs(fingerStates.middle - pattern.middle);
    const ringDiff = Math.abs(fingerStates.ring - pattern.ring);
    const pinkyDiff = Math.abs(fingerStates.pinky - pattern.pinky);

    const totalDiff = indexDiff + middleDiff + ringDiff + pinkyDiff;
    const confidence = Math.max(0, 1 - totalDiff / 4);

    if (confidence > bestMatch.confidence && confidence > 0.5) {
      bestMatch = { chord: chordName, confidence };
    }
  }

  return {
    chord: bestMatch.chord,
    confidence: bestMatch.confidence,
    fingerStates,
  };
}

// Get description of what fingers are doing
export function describeHandPosition(fingerStates: ChordRecognitionResult["fingerStates"]): string {
  const curled: string[] = [];
  const extended: string[] = [];

  if (fingerStates.index > 0.5) curled.push("index");
  else extended.push("index");

  if (fingerStates.middle > 0.5) curled.push("middle");
  else extended.push("middle");

  if (fingerStates.ring > 0.5) curled.push("ring");
  else extended.push("ring");

  if (fingerStates.pinky > 0.5) curled.push("pinky");
  else extended.push("pinky");

  if (curled.length === 0) return "All fingers extended";
  if (extended.length === 0) return "All fingers curled";

  return `${curled.join(", ")} curled; ${extended.join(", ")} extended`;
}
