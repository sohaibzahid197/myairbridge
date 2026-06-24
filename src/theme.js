// HungerQuest design tokens — derived from ANALYSIS.md

export const colors = {
  // Primary accent (buttons, active tabs, links, prices)
  primary: '#7C3AED',
  primaryDark: '#5B21B6',
  // Secondary pill button
  pink: '#F9C4D8',
  // Success CTA ("Open & serving")
  green: '#1FBF75',
  // Status dots
  openDot: '#22C55E',
  closedDot: '#9CA3AF',
  // Text
  text: '#1F1235',
  textMuted: '#6B5B7B',
  textOnPrimary: '#FFFFFF',
  // Surfaces
  card: 'rgba(255,255,255,0.85)',
  cardSolid: '#FFFFFF',
  cardTranslucent: 'rgba(255,255,255,0.55)',
  // Dark integration card (Square POS)
  darkCard: '#1E1B3A',
  darkCardEnd: '#3B2C73',
  demoBadge: '#D9C84A',
  // Gradient background stops (top -> bottom) — soft pastel warm
  gradient: ['#FDEBA0', '#FBC08E', '#F2A0C4'],
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
};

export const font = {
  // weights
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  // sizes
  eyebrow: 12,
  body: 15,
  title: 28,
  hero: 34,
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
};
