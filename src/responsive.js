import { Dimensions } from 'react-native';

// The walkthrough mockup was captured at 400 × 834 logical px.
// Everything in the design is sized against that reference width, so we
// scale proportionally to whatever device we actually run on. This keeps
// the layout — and the text line breaks — consistent across phones/tablets,
// Android and iOS.
const BASE_WIDTH = 400;

const { width, height } = Dimensions.get('window');

// Clamp the effective width so tablets / very large phones don't blow the
// design up, and tiny phones don't shrink into illegibility.
const effWidth = Math.min(Math.max(width, 320), 480);
const ratio = effWidth / BASE_WIDTH;

// Proportional scale — use for spacing, sizes, radii, icon sizes.
export const s = (n) => Math.round(n * ratio);

// Font scale — a gentler curve than `s` so the smallest phones stay
// readable while large phones still grow. Exactly `n` at the 400px reference.
export const f = (n) => {
  const scaled = n * (0.4 + 0.6 * ratio);
  return Math.round(scaled * 10) / 10;
};

export const screen = { width, height };
export const isSmallDevice = width < 360;
