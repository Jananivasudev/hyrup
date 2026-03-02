/* ═══════════════════════════════════════════════════════════════════════
   HYRUP — DESIGN TOKENS
   CAREER  →  Deep black #0F0F0F  · Warm Orange #FF7A1A  (dark mode)
   SOCIAL  →  Pure white #FFFFFF  · Vivid Orange #FF5722  (light mode)
═══════════════════════════════════════════════════════════════════════ */

export const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
`;

export const FD = "'Bricolage Grotesque', sans-serif";  // display
export const FB = "'DM Sans', sans-serif";               // body

/* ── TOKEN MAP ── */
export const T = {
  c: { /* CAREER – dark */
    bg: "#0F0F0F", s1: "#161616", s2: "#1E1E1E", s3: "#272727", s4: "#333333",
    orange: "#FF7A1A", orangeLo: "rgba(255,122,26,0.12)", orangeMid: "rgba(255,122,26,0.22)",
    t1: "#FFFFFF", t2: "#8A8A8A", t3: "#444444",
    border: "#242424", green: "#22C55E", red: "#EF4444", blue: "#3B82F6",
    r: 20,
  },
  s: { /* SOCIAL – light */
    bg: "#F8F7F5", s1: "#FFFFFF", s2: "#F2F0EC", s3: "#EDEAE4", s4: "#E3DED6",
    orange: "#FF5722", orangeLo: "rgba(255,87,34,0.09)", orangeMid: "rgba(255,87,34,0.18)",
    t1: "#111111", t2: "#7A746C", t3: "#BFBAB2",
    border: "#E8E4DC", green: "#16A34A", red: "#DC2626",
    r: 22,
  }
};
