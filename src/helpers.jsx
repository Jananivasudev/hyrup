/* ═══════════════════════════════════════════════════════════════════════
   HYRUP — LAYOUT HELPERS
═══════════════════════════════════════════════════════════════════════ */

export const Row = ({ children, g = 0, ai = "center", jc = "flex-start", sx = {} }) =>
    <div style={{ display: "flex", gap: g, alignItems: ai, justifyContent: jc, ...sx }}>{children}</div>;

export const Col = ({ children, g = 0, ai, sx = {} }) =>
    <div style={{ display: "flex", flexDirection: "column", gap: g, alignItems: ai, ...sx }}>{children}</div>;
