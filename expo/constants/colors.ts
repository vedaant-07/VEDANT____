/** SE7EN FIT Design System — Dark Neon Theme */
export const Colors = {
  // Primary palette
  background: "#050505" as const,
  surface: "#0A0A0A" as const,
  surfaceElevated: "#111111" as const,
  card: "#0D0D0D" as const,
  cardBorder: "#1A1A1A" as const,

  // Accent
  neonGreen: "#29E06B" as const,
  neonGreenDim: "#1DB954" as const,
  neonGreenGlow: "rgba(41, 224, 107, 0.15)" as const,
  limeAccent: "#D4FF00" as const,
  limeAccentDim: "#A8CC00" as const,

  // Text
  textPrimary: "#FFFFFF" as const,
  textSecondary: "#999999" as const,
  textMuted: "#666666" as const,
  textInverse: "#050505" as const,

  // Status
  success: "#29E06B" as const,
  error: "#FF4444" as const,
  warning: "#FFB444" as const,
  info: "#44A4FF" as const,

  // Misc
  divider: "#1A1A1A" as const,
  overlay: "rgba(0, 0, 0, 0.6)" as const,
  skeleton: "#1A1A1A" as const,
  skeletonHighlight: "#222222" as const,
} as const;

export const Spacing = {
  xs: 4 as const,
  sm: 8 as const,
  md: 16 as const,
  lg: 24 as const,
  xl: 32 as const,
  xxl: 48 as const,
} as const;

export const Radius = {
  sm: 8 as const,
  md: 12 as const,
  lg: 16 as const,
  xl: 20 as const,
  xxl: 24 as const,
  full: 9999 as const,
} as const;

export const FontSize = {
  xs: 11 as const,
  sm: 13 as const,
  md: 15 as const,
  lg: 17 as const,
  xl: 20 as const,
  xxl: 24 as const,
  xxxl: 32 as const,
  hero: 40 as const,
} as const;
