import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   HYRUP — COMPLETE DESIGN SYSTEM v5
   Synthesized from 10 reference apps — premium, editorial, modern

   CAREER  →  Deep black #0F0F0F  · Warm Orange #FF7A1A  (dark mode)
   SOCIAL  →  Pure white #FFFFFF  · Vivid Orange #FF5722  (light mode)

   Typography: "Bricolage Grotesque" display + "DM Sans" body
   Card radius: 20px career · 22px social
   Motion: tab fade, mode crossfade, card press scale
═══════════════════════════════════════════════════════════════════════ */

const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
`;

const FD = "'Bricolage Grotesque', sans-serif";  // display
const FB = "'DM Sans', sans-serif";               // body

/* ── TOKEN MAP ── */
const T = {
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

/* ── SVG ICON LIBRARY ── */
const IC = {
  home:    "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  brief:   "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  chat:    "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  news:    "M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v8a2 2 0 0 1-2 2zM14 4v6h6",
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  layers:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  bell:    "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  search:  "M21 21l-4.35-4.35M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3z",
  bmark:   "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
  heart:   "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  share:   "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  plus:    "M12 5v14M5 12h14",
  check:   "M20 6L9 17l-5-5",
  x:       "M18 6 6 18M6 6l12 12",
  zap:     "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  spark:   "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z",
  loc:     "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  arrow:   "M5 12h14M12 5l7 7-7 7",
  menu:    "M3 12h18M3 6h18M3 18h18",
  dot3:    "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  award:   "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  grid:    "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  hash:    "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  send:    "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  img:     "M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h4l2 3h3a2 2 0 0 1 2 2v11zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  attach:  "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
  swipe:   "M7 16l-4-4 4-4M17 8l4 4-4 4M3 12h18",
  fire:    "M12 2c0 0-5 5.5-5 9a5 5 0 0 0 10 0c0-3.5-5-9-5-9zM9.5 14a2.5 2.5 0 0 0 5 0c0-2-2.5-5-2.5-5S9.5 12 9.5 14z",
  undo:    "M9 14L4 9l5-5M4 9h11a4 4 0 0 1 0 8h-1",
};

const Svg = ({ d, s = 20, c = "#fff", w = 1.85, fill = "none" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "block" }}>
    <path d={d} />
  </svg>
);

/* ── LAYOUT HELPERS ── */
const Row = ({ children, g = 0, ai = "center", jc = "flex-start", sx = {} }) =>
  <div style={{ display: "flex", gap: g, alignItems: ai, justifyContent: jc, ...sx }}>{children}</div>;

const Col = ({ children, g = 0, sx = {} }) =>
  <div style={{ display: "flex", flexDirection: "column", gap: g, ...sx }}>{children}</div>;

/* ── MODE TOGGLE — lives in header ── */
const ModeToggle = ({ mode, onToggle }) => {
  const isC = mode === "career";
  return (
    <div onClick={onToggle} style={{
      width: 178, height: 34, borderRadius: 100,
      background: isC ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      border: `1px solid ${isC ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)"}`,
      display: "flex", alignItems: "center", padding: 3, cursor: "pointer", position: "relative",
    }}>
      <div style={{
        position: "absolute", width: "calc(50% - 3px)", height: 28, borderRadius: 100,
        background: isC ? "linear-gradient(105deg, #FF7A1A 0%, #FF9A45 100%)" : "linear-gradient(105deg, #FF5722 0%, #FF7A4A 100%)",
        left: isC ? 3 : "50%",
        transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
        boxShadow: "0 2px 10px rgba(255,87,34,0.35)",
      }} />
      {[["career", IC.brief, "Career"], ["social", IC.users, "Social"]].map(([id, ic, label]) => {
        const sel = mode === id;
        return (
          <div key={id} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, position: "relative", zIndex: 1 }}>
            <Svg d={ic} s={12} c={sel ? "#fff" : isC ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)"} w={sel ? 2.2 : 1.7} />
            <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 12, color: sel ? "#fff" : isC ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)" }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

/* ── BOTTOM NAV — indicator dot above icon (ref image 1 pattern) ── */
const BottomNav = ({ mode, active, onSelect }) => {
  const t = mode === "career" ? T.c : T.s;
  const isC = mode === "career";
  const items = isC
    ? [["home", IC.home, "Home"], ["jobs", IC.brief, "Jobs"], ["chat", IC.chat, "Chat"], ["news", IC.news, "News"], ["profile", IC.user, "Me"]]
    : [["feed", IC.home, "Feed"], ["connect", IC.users, "Connect"], ["chat", IC.chat, "Chat"], ["groups", IC.layers, "Groups"], ["profile", IC.user, "Me"]];

  return (
    <div style={{
      height: 72, background: t.s1,
      borderTop: `1px solid ${t.border}`,
      display: "flex", alignItems: "center", padding: "0 4px 8px", flexShrink: 0,
      boxShadow: isC ? "none" : "0 -8px 32px rgba(0,0,0,0.06)",
    }}>
      {items.map(([id, ic, label]) => {
        const sel = active === id;
        return (
          <button key={id} onClick={() => onSelect(id)} style={{
            flex: 1, background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0", position: "relative",
          }}>
            {sel && <div style={{ position: "absolute", top: 2, width: 4, height: 4, borderRadius: 2, background: t.orange }} />}
            <div style={{ width: 40, height: 26, borderRadius: 13, background: sel ? t.orangeLo : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .18s" }}>
              <Svg d={ic} s={19} c={sel ? t.orange : t.t2} w={sel ? 2.2 : 1.7} />
            </div>
            <span style={{ fontFamily: FB, fontSize: 10, fontWeight: sel ? 700 : 500, color: sel ? t.orange : t.t2 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

/* ── PHONE SHELL ── */
const Phone = ({ children, mode }) => {
  const isC = mode === "career";
  const t = isC ? T.c : T.s;
  return (
    <div style={{
      width: 393, height: 852, background: t.bg, borderRadius: 52,
      border: `1.5px solid ${isC ? "#1E1E1E" : "#D8D4CC"}`,
      overflow: "hidden", display: "flex", flexDirection: "column", position: "relative",
      boxShadow: isC
        ? "0 0 0 1px #0A0A0A, 0 60px 120px rgba(0,0,0,0.95), 0 0 80px rgba(255,122,26,0.04)"
        : "0 0 0 1px #C8C2B8, 0 60px 120px rgba(0,0,0,0.14)",
      transition: "box-shadow 0.5s ease, border-color 0.5s ease",
    }}>
      {/* Status bar */}
      <div style={{ height: 46, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", flexShrink: 0 }}>
        <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: t.t1 }}>9:41</span>
        <div style={{ width: 108, height: 27, background: isC ? "#060606" : "#E0DDD7", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: isC ? "#222" : "#C8C4BC" }} />
        </div>
        <div style={{ width: 14, height: 7, borderRadius: 2, border: `1.5px solid ${t.t2}`, overflow: "hidden" }}>
          <div style={{ width: "75%", height: "100%", background: T.c.green }} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {children}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   ░░░ CAREER SCREENS ░░░
═══════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════
   ░░░ SWIPE TO APPLY — Full-screen modal overlay ░░░

   UX RATIONALE:
   • Accessed from Home "Quick Apply" CTA (habit-forming daily action)
   • Also toggled from Jobs screen view switcher (deliberate browser → quick decider)
   • Full-screen immersive — no nav distraction, one job at a time
   • Left drag = skip (red glow) · Right drag = apply (green glow)
   • Button row fallback for thumb accessibility
   • "Super Save" (⭐) saves to shortlist without applying
   • Stack dots show progress — gamified session
   • Stamp animation: "APPLYING ✓" / "SKIPPING ✗" overlay on decision
   • Undo last action (30s window)
═══════════════════════════════════════════════════════════════════════ */
const SwipeScreen = ({ onClose }) => {
  const t = T.c;

  const CARDS = [
    { role: "Frontend Dev Intern", co: "Zepto", loc: "Remote", pay: "₹15K/mo", match: 94, ch: "Z",
      tags: ["React", "TypeScript", "TailwindCSS"], type: "Internship",
      grad: "linear-gradient(145deg, #1C0D00, #2D1600)", accentGrad: "linear-gradient(90deg,#FF7A1A,#FF9A45)",
      desc: "Build and ship features used by 10M+ users. Fast-paced, high-ownership culture. Strong mentorship from senior engineers." },
    { role: "UI/UX Designer", co: "Groww", loc: "Bengaluru", pay: "₹20K/mo", match: 88, ch: "G",
      tags: ["Figma", "Prototyping", "Design Systems"], type: "Internship",
      grad: "linear-gradient(145deg, #001A0D, #002E1A)", accentGrad: "linear-gradient(90deg,#22C55E,#4ADE80)",
      desc: "Own end-to-end design for new investor features. Work directly with PMs. Portfolio-building opportunity." },
    { role: "Backend Intern", co: "Razorpay", loc: "Hybrid", pay: "₹25K/mo", match: 91, ch: "R",
      tags: ["Node.js", "MongoDB", "AWS"], type: "Internship",
      grad: "linear-gradient(145deg, #00101A, #001C2E)", accentGrad: "linear-gradient(90deg,#3B82F6,#60A5FA)",
      desc: "Work on payment infrastructure serving 8M+ businesses. Real ownership, real impact. Pre-placement offer possible." },
    { role: "Data Analyst", co: "Meesho", loc: "Noida", pay: "₹12K/mo", match: 79, ch: "M",
      tags: ["Python", "SQL", "Power BI"], type: "Internship",
      grad: "linear-gradient(145deg, #120018, #1E0028)", accentGrad: "linear-gradient(90deg,#A855F7,#C084FC)",
      desc: "Analyze seller and buyer behavior data. Build dashboards used by leadership. Strong data team culture." },
    { role: "Product Intern", co: "CRED", loc: "Bengaluru", pay: "₹22K/mo", match: 86, ch: "C",
      tags: ["Product Thinking", "SQL", "Figma"], type: "Internship",
      grad: "linear-gradient(145deg, #1A1000, #2D1E00)", accentGrad: "linear-gradient(90deg,#F59E0B,#FBBF24)",
      desc: "Define product specs for CRED's rewards engine. Work with design + eng. Weekly reviews with CPO." },
  ];

  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState(0);           // px offset during drag
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [stamp, setStamp] = useState(null);       // "apply" | "skip" | "save"
  const [applied, setApplied] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [saved, setSaved] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const done = idx >= CARDS.length;
  const card = done ? null : CARDS[idx];
  const nextCard = done ? null : CARDS[Math.min(idx + 1, CARDS.length - 1)];

  // drag direction signal
  const swipeDir = drag > 40 ? "apply" : drag < -40 ? "skip" : null;
  const rotation = drag * 0.04;
  const opacity = 1 - Math.abs(drag) / 500;

  const triggerAction = (action) => {
    setStamp(action);
    setTimeout(() => {
      setStamp(null);
      if (action === "apply") setApplied(a => [...a, idx]);
      else if (action === "skip") setSkipped(s => [...s, idx]);
      else if (action === "save") setSaved(s => [...s, idx]);
      setLastAction({ action, idx });
      setIdx(i => i + 1);
      setDrag(0);
    }, 400);
  };

  const handleUndo = () => {
    if (!lastAction || idx === 0) return;
    setIdx(i => i - 1);
    setApplied(a => a.filter(x => x !== lastAction.idx));
    setSkipped(s => s.filter(x => x !== lastAction.idx));
    setSaved(s => s.filter(x => x !== lastAction.idx));
    setLastAction(null);
  };

  // pointer drag handlers (simulated, works with mouse in browser)
  const onPointerDown = (e) => { setIsDragging(true); setDragStart(e.clientX); };
  const onPointerMove = (e) => { if (!isDragging) return; setDrag(e.clientX - dragStart); };
  const onPointerUp = () => {
    setIsDragging(false);
    if (drag > 100) triggerAction("apply");
    else if (drag < -100) triggerAction("skip");
    else setDrag(0);
  };

  const applyGlow = drag > 40 ? `0 0 60px rgba(34,197,94,${Math.min(drag/200,0.6)})` : "none";
  const skipGlow  = drag < -40 ? `0 0 60px rgba(239,68,68,${Math.min(-drag/200,0.6)})` : "none";

  if (showResult || done) {
    return (
      <div style={{ position: "absolute", inset: 0, background: T.c.bg, zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 28, color: T.c.t1, textAlign: "center", marginBottom: 8 }}>Session complete!</span>
        <span style={{ fontFamily: FB, fontSize: 14, color: T.c.t2, textAlign: "center", marginBottom: 32 }}>You reviewed all {CARDS.length} matched jobs</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, width: "100%", marginBottom: 32 }}>
          {[[applied.length, "Applied", T.c.green], [skipped.length, "Skipped", T.c.t3], [saved.length, "Saved ⭐", "#F59E0B"]].map(([n, l, col]) => (
            <div key={l} style={{ background: T.c.s2, borderRadius: 18, padding: "16px 8px", textAlign: "center" }}>
              <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 26, color: col, display: "block" }}>{n}</span>
              <span style={{ fontFamily: FB, fontSize: 11, color: T.c.t2 }}>{l}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ width: "100%", height: 50, borderRadius: 16, background: T.c.orange, border: "none", color: "#fff", fontFamily: FB, fontSize: 15, fontWeight: 800, cursor: "pointer" }}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: T.c.bg, zIndex: 100, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "52px 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <button onClick={onClose} style={{ width: 38, height: 38, borderRadius: 12, background: T.c.s2, border: `1px solid ${T.c.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Svg d={IC.x} s={16} c={T.c.t2} />
        </button>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: T.c.t1 }}>Quick Apply</span>
          <div style={{ fontFamily: FB, fontSize: 11, color: T.c.t2, marginTop: 1 }}>{idx + 1} of {CARDS.length} matched jobs</div>
        </div>
        <button onClick={handleUndo} disabled={!lastAction} style={{ width: 38, height: 38, borderRadius: 12, background: lastAction ? T.c.s2 : "transparent", border: `1px solid ${lastAction ? T.c.border : "transparent"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: lastAction ? "pointer" : "default", opacity: lastAction ? 1 : 0.3 }}>
          <Svg d={IC.undo} s={16} c={T.c.t2} />
        </button>
      </div>

      {/* Stack progress dots */}
      <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 14, flexShrink: 0 }}>
        {CARDS.map((_, i) => (
          <div key={i} style={{ width: i === idx ? 20 : 6, height: 6, borderRadius: 3, background: i < idx ? T.c.orange : i === idx ? T.c.orange : T.c.s3, transition: "all 0.25s ease", opacity: i < idx ? 0.35 : 1 }} />
        ))}
      </div>

      {/* Card stack — shadow card behind for depth */}
      <div style={{ flex: 1, position: "relative", padding: "0 22px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>

        {/* Background card (next card peeking) */}
        {nextCard && (
          <div style={{ position: "absolute", left: 36, right: 36, top: 10, borderRadius: 28, background: T.c.s1, border: `1px solid ${T.c.border}`, height: "82%", transform: `scale(${0.94 + Math.min(Math.abs(drag)/1000, 0.04)})`, transition: isDragging ? "none" : "transform 0.3s ease", zIndex: 0 }} />
        )}

        {/* Main swipeable card */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            width: "100%", borderRadius: 28, overflow: "hidden",
            background: card.grad,
            border: `1px solid ${T.c.border}`,
            transform: `translateX(${drag}px) rotate(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            position: "relative", zIndex: 1,
            boxShadow: applyGlow !== "none" ? applyGlow : skipGlow !== "none" ? skipGlow : "0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* Directional glow overlays */}
          {drag > 20 && (
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(34,197,94,${Math.min(drag/300,0.18)}), transparent)`, borderRadius: 28, pointerEvents: "none", zIndex: 10 }} />
          )}
          {drag < -20 && (
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(225deg, rgba(239,68,68,${Math.min(-drag/300,0.18)}), transparent)`, borderRadius: 28, pointerEvents: "none", zIndex: 10 }} />
          )}

          {/* STAMP overlay */}
          {stamp && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, pointerEvents: "none" }}>
              <div style={{
                padding: "12px 28px", borderRadius: 16,
                border: `4px solid ${stamp === "apply" ? T.c.green : stamp === "skip" ? T.c.red : "#F59E0B"}`,
                transform: `rotate(${stamp === "skip" ? 10 : -10}deg)`,
              }}>
                <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 28, color: stamp === "apply" ? T.c.green : stamp === "skip" ? T.c.red : "#F59E0B", letterSpacing: 2 }}>
                  {stamp === "apply" ? "APPLYING ✓" : stamp === "skip" ? "SKIPPING ✗" : "SAVED ⭐"}
                </span>
              </div>
            </div>
          )}

          {/* Card top — company hero section */}
          <div style={{ padding: "24px 22px 20px", position: "relative" }}>
            {/* Glow blob */}
            <div style={{ position: "absolute", top: -20, right: -20, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,122,26,0.15)", filter: "blur(50px)", pointerEvents: "none" }} />

            {/* AI match badge — top right */}
            <div style={{ position: "absolute", top: 20, right: 20, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "6px 12px", border: `1px solid rgba(255,255,255,0.1)` }}>
              <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: "#fff" }}>{card.match}<span style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>%</span></span>
              <div style={{ fontFamily: FB, fontSize: 9, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>AI Match</div>
            </div>

            {/* Type badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "4px 12px", marginBottom: 16 }}>
              <Svg d={IC.brief} s={11} c="rgba(255,255,255,0.5)" />
              <span style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{card.type}</span>
            </div>

            {/* Logo */}
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 26, color: "#fff" }}>{card.ch}</span>
            </div>

            <div style={{ fontFamily: FD, fontWeight: 900, fontSize: 24, color: "#fff", lineHeight: 1.2, marginBottom: 4 }}>{card.role}</div>
            <div style={{ fontFamily: FB, fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>{card.co}  ·  {card.loc}</div>

            <p style={{ fontFamily: FB, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 22px" }} />

          {/* Card bottom — details */}
          <div style={{ padding: "18px 22px 22px" }}>
            {/* Stipend bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px 14px" }}>
              <Svg d={IC.zap} s={15} c={T.c.orange} />
              <div>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: "#fff" }}>{card.pay}</span>
                <span style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.35)", marginLeft: 6 }}>stipend · up to 6 months</span>
              </div>
            </div>

            {/* Skill tags */}
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {card.tags.map(tg => (
                <span key={tg} style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", padding: "5px 12px", borderRadius: 100 }}>{tg}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Directional hint labels — appear on drag */}
        {drag > 40 && (
          <div style={{ position: "absolute", left: 34, top: "40%", transform: "rotate(-15deg)", opacity: Math.min((drag - 40) / 60, 1) }}>
            <div style={{ padding: "8px 20px", border: `3px solid ${T.c.green}`, borderRadius: 12 }}>
              <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 22, color: T.c.green, letterSpacing: 2 }}>APPLY ✓</span>
            </div>
          </div>
        )}
        {drag < -40 && (
          <div style={{ position: "absolute", right: 34, top: "40%", transform: "rotate(15deg)", opacity: Math.min((-drag - 40) / 60, 1) }}>
            <div style={{ padding: "8px 20px", border: `3px solid ${T.c.red}`, borderRadius: 12 }}>
              <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 22, color: T.c.red, letterSpacing: 2 }}>SKIP ✗</span>
            </div>
          </div>
        )}
      </div>

      {/* Hint text */}
      <div style={{ textAlign: "center", padding: "10px 0 4px", flexShrink: 0 }}>
        <span style={{ fontFamily: FB, fontSize: 11, color: T.c.t3 }}>← swipe left to skip  ·  swipe right to apply →</span>
      </div>

      {/* Action button row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "12px 22px 22px", flexShrink: 0 }}>
        {/* Skip */}
        <button onClick={() => triggerAction("skip")} style={{ width: 60, height: 60, borderRadius: 30, background: "rgba(239,68,68,0.1)", border: "2px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.1s" }}>
          <Svg d={IC.x} s={24} c={T.c.red} w={2.5} />
        </button>
        {/* Super Save ⭐ */}
        <button onClick={() => triggerAction("save")} style={{ width: 50, height: 50, borderRadius: 25, background: "rgba(245,158,11,0.1)", border: "2px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Svg d={IC.star} s={20} c="#F59E0B" w={2} />
        </button>
        {/* Apply */}
        <button onClick={() => triggerAction("apply")} style={{ width: 60, height: 60, borderRadius: 30, background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.35)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Svg d={IC.check} s={24} c={T.c.green} w={2.5} />
        </button>
      </div>

      {/* Session stats bar */}
      <div style={{ display: "flex", justifyContent: "space-around", padding: "0 22px 24px", flexShrink: 0 }}>
        {[[applied.length, "Applied", T.c.green], [skipped.length, "Skipped", T.c.t3], [saved.length, "Saved", "#F59E0B"]].map(([n, l, col]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: col, display: "block" }}>{n}</span>
            <span style={{ fontFamily: FB, fontSize: 10, color: T.c.t3 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


/* ── CAREER HOME ── ref: fitness home hero + smart home layout */
const CareerHome = ({ mode, onToggle }) => {
  const t = T.c;
  const [showSwipe, setShowSwipe] = useState(false);
  const jobs = [
    { role: "Frontend Dev Intern", co: "Zepto", loc: "Remote", pay: "₹15K", match: 94, ch: "Z", tags: ["React", "TypeScript"] },
    { role: "UI/UX Designer", co: "Groww", loc: "Bengaluru", pay: "₹20K", match: 88, ch: "G", tags: ["Figma"] },
    { role: "Backend Intern", co: "Razorpay", loc: "Hybrid", pay: "₹25K", match: 91, ch: "R", tags: ["Node.js"] },
  ];

  if (showSwipe) return <SwipeScreen onClose={() => setShowSwipe(false)} />;

  return (
    <>
      <Col g={0}>
      {/* Header — ref: meditation app personal greeting */}
      <div style={{ padding: "10px 22px 16px" }}>
        <Row ai="flex-start" jc="space-between">
          <Col g={2}>
            <span style={{ fontFamily: FB, fontSize: 12, color: t.t2, fontWeight: 500 }}>Good morning 👋</span>
            <span style={{ fontFamily: FD, fontSize: 26, fontWeight: 800, color: t.t1, letterSpacing: -0.8, lineHeight: 1.1 }}>Rahul Sharma</span>
          </Col>
          <Row g={10} ai="center" sx={{ marginTop: 4 }}>
            <ModeToggle mode={mode} onToggle={onToggle} />
            <div style={{ position: "relative" }}>
              <div style={{ width: 38, height: 38, borderRadius: 14, background: t.s2, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Svg d={IC.bell} s={17} c={t.t2} />
              </div>
              <div style={{ position: "absolute", top: 8, right: 9, width: 7, height: 7, borderRadius: 4, background: t.orange, border: `1.5px solid ${t.bg}` }} />
            </div>
          </Row>
        </Row>
      </div>

      {/* Hero card — ref: meditation app "Relief Meditation" full-bleed card */}
      <div style={{ margin: "0 22px 20px", height: 158, borderRadius: 24, background: `linear-gradient(135deg, #1C0D00 0%, #2E1600 60%, #1C0D00 100%)`, position: "relative", overflow: "hidden", padding: "20px 20px" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: t.orangeMid, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,122,26,0.08)", filter: "blur(40px)" }} />
        <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: t.orange, letterSpacing: 1.5, position: "relative", zIndex: 1, display: "block", marginBottom: 6 }}>PROFILE STRENGTH</span>
        <span style={{ fontFamily: FD, fontSize: 36, fontWeight: 800, color: t.t1, position: "relative", zIndex: 1, display: "block", lineHeight: 1, marginBottom: 4 }}>72<span style={{ fontSize: 18, fontWeight: 500, color: t.t2 }}>%</span></span>
        <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.4)", position: "relative", zIndex: 1 }}>Add 2 skills to unlock Recruiter-Ready</span>
        <div style={{ position: "absolute", bottom: 16, left: 20, right: 20, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg, ${t.orange}, #FFB36B)`, borderRadius: 2 }} />
        </div>
      </div>

      {/* 3-stat row — ref: skincare score pattern */}
      <Row g={10} sx={{ padding: "0 22px 20px" }}>
        {[["12", "Applied", t.orange], ["3", "Shortlisted", T.c.green], ["48", "Views", T.c.blue]].map(([n, l, col]) => (
          <div key={l} style={{ flex: 1, background: t.s2, borderRadius: 18, padding: "16px 12px", border: `1px solid ${t.border}`, textAlign: "center" }}>
            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, color: col, display: "block", lineHeight: 1 }}>{n}</span>
            <span style={{ fontFamily: FB, fontSize: 10, color: t.t2, marginTop: 3, display: "block" }}>{l}</span>
          </div>
        ))}
      </Row>

      {/* Section label */}
      <Row ai="center" jc="space-between" sx={{ padding: "0 22px 12px" }}>
        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 17, color: t.t1 }}>Matched for you</span>
        <span style={{ fontFamily: FB, fontSize: 12, color: t.orange, fontWeight: 600 }}>See all →</span>
      </Row>

      {/* ── QUICK APPLY CTA — swipe entry point ── */}
      {/* UX: lives on Home as daily action card — habit loop like Duolingo streak */}
      <div onClick={() => setShowSwipe(true)} style={{
        margin: "0 22px 20px", borderRadius: 22,
        background: "linear-gradient(125deg, #1C0D00 0%, #2D1600 50%, #1A0A00 100%)",
        border: `1px solid ${t.orange}30`,
        padding: "18px 20px", cursor: "pointer", position: "relative", overflow: "hidden",
        boxShadow: `0 8px 32px rgba(255,122,26,0.15)`,
      }}>
        {/* Glow effects */}
        <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,122,26,0.18)", filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,122,26,0.08)", filter: "blur(40px)", pointerEvents: "none" }} />

        <Row ai="center" jc="space-between" sx={{ position: "relative", zIndex: 1 }}>
          <Col g={6}>
            {/* Animated swipe hint */}
            <Row g={8} ai="center" sx={{ marginBottom: 4 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: i === 1 ? 24 : 16, height: 5, borderRadius: 3, background: i === 0 ? "rgba(239,68,68,0.7)" : i === 1 ? t.orange : "rgba(34,197,94,0.7)" }} />
                ))}
              </div>
              <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: t.orange, letterSpacing: 1.2 }}>QUICK APPLY</span>
            </Row>
            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: "#fff", lineHeight: 1.2 }}>
              5 jobs waiting<br />for your decision
            </span>
            <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
              Swipe right to apply · left to skip
            </span>
          </Col>
          {/* Visual swipe card stack */}
          <div style={{ position: "relative", width: 64, height: 80, flexShrink: 0 }}>
            {[2, 1, 0].map(i => (
              <div key={i} style={{
                position: "absolute", width: 52, height: 70,
                background: i === 0 ? "rgba(255,122,26,0.2)" : i === 1 ? "rgba(255,122,26,0.1)" : "rgba(255,122,26,0.05)",
                border: `1px solid rgba(255,122,26,${0.15 - i * 0.04})`,
                borderRadius: 14,
                top: i * 5, left: i * 4,
                transform: `rotate(${i === 1 ? 6 : i === 2 ? 12 : 0}deg)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {i === 0 && <Svg d={IC.swipe} s={20} c={t.orange} />}
              </div>
            ))}
          </div>
        </Row>
        {/* CTA button */}
        <button onClick={e => { e.stopPropagation(); setShowSwipe(true); }} style={{
          marginTop: 16, width: "100%", height: 42, borderRadius: 13,
          background: t.orange, border: "none", color: "#fff",
          fontFamily: FB, fontSize: 14, fontWeight: 800, cursor: "pointer",
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: `0 4px 16px rgba(255,122,26,0.3)`,
        }}>
          <Svg d={IC.swipe} s={16} c="#fff" />
          Start Swiping
        </button>
      </div>

      {/* Horizontal job cards — ref: meditation "practice of day" scroll cards */}
      <div style={{ display: "flex", gap: 12, padding: "0 22px 20px", overflowX: "auto" }}>
        {jobs.map((j, i) => (
          <div key={i} style={{ background: t.s2, borderRadius: t.r, padding: 16, minWidth: 188, border: `1px solid ${t.border}`, flexShrink: 0 }}>
            <Row g={10} ai="center" sx={{ marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: t.s3, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: t.orange }}>{j.ch}</span>
              </div>
              <Col g={2} sx={{ flex: 1 }}>
                <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: t.t1, lineHeight: 1.3 }}>{j.role}</span>
                <span style={{ fontFamily: FB, fontSize: 11, color: t.t2 }}>{j.co} · {j.loc}</span>
              </Col>
            </Row>
            <Row g={5} sx={{ flexWrap: "wrap", marginBottom: 12 }}>
              {j.tags.map(tg => <span key={tg} style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: t.orange, background: t.orangeLo, padding: "3px 9px", borderRadius: 100 }}>{tg}</span>)}
              <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: T.c.green, background: `${T.c.green}15`, padding: "3px 9px", borderRadius: 100 }}>{j.pay}</span>
            </Row>
            <Row ai="center" jc="space-between">
              <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: t.orange, background: t.orangeLo, padding: "4px 10px", borderRadius: 8 }}>{j.match}%</span>
              <button style={{ height: 30, padding: "0 14px", borderRadius: 100, background: t.orange, border: "none", color: "#fff", fontFamily: FB, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Apply</button>
            </Row>
          </div>
        ))}
      </div>

      {/* News strip — compact list ref: skincare routine list */}
      <Row ai="center" jc="space-between" sx={{ padding: "0 22px 10px" }}>
        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 17, color: t.t1 }}>Tech Pulse ⚡</span>
        <span style={{ fontFamily: FB, fontSize: 12, color: t.orange, fontWeight: 600 }}>More →</span>
      </Row>
      {[
        { h: "Anthropic raises $2B — AI talent demand surges across India", src: "TechCrunch", time: "2h" },
        { h: "Top 10 skills hiring managers want in 2025 interns", src: "Forbes", time: "5h" },
      ].map((n, i) => (
        <div key={i} style={{ margin: "0 22px 10px", display: "flex", gap: 12, padding: "12px 14px", background: t.s2, borderRadius: 16, border: `1px solid ${t.border}`, alignItems: "center" }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: t.s3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Svg d={IC.zap} s={20} c={t.orange} />
          </div>
          <Col g={4} sx={{ flex: 1 }}>
            <span style={{ fontFamily: FB, fontWeight: 600, fontSize: 13, color: t.t1, lineHeight: 1.4 }}>{n.h}</span>
            <Row g={8}>
              <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: t.orange, background: t.orangeLo, padding: "2px 7px", borderRadius: 100 }}>{n.src}</span>
              <span style={{ fontFamily: FB, fontSize: 10, color: t.t3 }}>{n.time} ago</span>
            </Row>
          </Col>
        </div>
      ))}
      <div style={{ height: 24 }} />
      </Col>
    </>
  );
};

/* ── CAREER JOBS ── ref: Explore screen large list items */
const CareerJobs = ({ mode, onToggle }) => {
  const t = T.c;
  const [tab, setTab] = useState("Internships");
  const [viewMode, setViewMode] = useState("list"); // "list" | "swipe"
  const jobs = [
    { role: "Frontend Dev Intern", co: "Zepto", loc: "Remote", pay: "₹15K/mo", tags: ["React", "TypeScript"], m: 94, ch: "Z", saved: false },
    { role: "Backend Developer", co: "Razorpay", loc: "Bengaluru · Hybrid", pay: "₹18K/mo", tags: ["Node.js", "MongoDB"], m: 88, ch: "R", saved: true },
    { role: "UI/UX Designer", co: "Groww", loc: "Remote", pay: "₹20K/mo", tags: ["Figma", "Prototyping"], m: 85, ch: "G", saved: false },
    { role: "Data Analyst", co: "Meesho", loc: "Noida · On-site", pay: "₹12K/mo", tags: ["Python", "SQL"], m: 79, ch: "M", saved: false },
  ];

  if (viewMode === "swipe") return <SwipeScreen onClose={() => setViewMode("list")} />;

  return (
    <>
      <Col>
        <div style={{ padding: "10px 22px 16px" }}>
          <Row ai="flex-start" jc="space-between" sx={{ marginBottom: 16 }}>
            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, color: t.t1, letterSpacing: -0.5 }}>Opportunities</span>
            <ModeToggle mode={mode} onToggle={onToggle} />
          </Row>
          {/* Search */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", background: t.s2, borderRadius: 14, padding: "11px 15px", marginBottom: 14, border: `1px solid ${t.border}` }}>
            <Svg d={IC.search} s={15} c={t.t2} />
            <span style={{ fontFamily: FB, fontSize: 13, color: t.t3 }}>Search roles, companies, skills...</span>
          </div>
          {/* View mode toggle + tabs */}
          <Row ai="center" jc="space-between" sx={{ marginBottom: 0 }}>
            <Row g={8}>
              {["Internships", "Jobs", "Saved"].map(tb => (
                <button key={tb} onClick={() => setTab(tb)} style={{
                  padding: "7px 14px", borderRadius: 100,
                  background: tab === tb ? t.orange : t.s2,
                  border: `1px solid ${tab === tb ? t.orange : t.border}`,
                  color: tab === tb ? "#fff" : t.t2,
                  fontFamily: FB, fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}>{tb}</button>
              ))}
            </Row>
            {/* Swipe mode toggle — icon button */}
            <button onClick={() => setViewMode("swipe")} style={{
              height: 34, padding: "0 12px", borderRadius: 10,
              background: t.orangeLo, border: `1px solid ${t.orange}33`,
              display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
            }}>
              <Svg d={IC.swipe} s={13} c={t.orange} />
              <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 800, color: t.orange }}>Swipe</span>
            </button>
          </Row>
        </div>

        {/* Job list */}
        <Col g={2} sx={{ padding: "0 22px 24px" }}>
        {jobs.map((j, i) => (
          <div key={i} style={{ background: t.s2, borderRadius: t.r, padding: 16, border: `1px solid ${t.border}`, marginBottom: 10 }}>
            <Row g={14} ai="flex-start" sx={{ marginBottom: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 17, background: t.s3, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 22, color: t.orange }}>{j.ch}</span>
              </div>
              <Col g={3} sx={{ flex: 1 }}>
                <Row ai="flex-start" jc="space-between">
                  <Col g={2}>
                    <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 15, color: t.t1 }}>{j.role}</span>
                    <span style={{ fontFamily: FB, fontSize: 12, color: t.t2 }}>{j.co} · {j.loc}</span>
                  </Col>
                  <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: t.orange, background: t.orangeLo, padding: "4px 9px", borderRadius: 8, flexShrink: 0 }}>{j.m}%</span>
                </Row>
              </Col>
            </Row>
            <Row g={6} sx={{ flexWrap: "wrap", marginBottom: 14 }}>
              {j.tags.map(tg => <span key={tg} style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: t.orange, background: t.orangeLo, padding: "3px 9px", borderRadius: 100 }}>{tg}</span>)}
              <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: T.c.green, background: `${T.c.green}15`, padding: "3px 9px", borderRadius: 100 }}>{j.pay}</span>
            </Row>
            <Row g={10}>
              <button style={{ flex: 1, height: 42, borderRadius: 13, background: t.orange, border: "none", color: "#fff", fontFamily: FB, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Apply Now</button>
              <button style={{ width: 42, height: 42, borderRadius: 13, background: j.saved ? t.orangeLo : t.s3, border: `1px solid ${j.saved ? t.orange + "44" : t.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Svg d={IC.bmark} s={16} c={j.saved ? t.orange : t.t2} />
              </button>
            </Row>
          </div>
        ))}
        </Col>
      </Col>
    </>
  );
};

/* ── CAREER CHAT ── */
const CareerChat = ({ mode, onToggle }) => {
  const t = T.c;
  const convos = [
    { name: "Zepto HR — Priya S.", msg: "Your profile is great! Thursday call?", time: "10:42", u: 2, online: true, ch: "Z" },
    { name: "Mentor: Arjun Verma", msg: "Check this roadmap I made for you 👇", time: "Yesterday", u: 0, online: false, ch: "A" },
    { name: "Razorpay Recruiter", msg: "Moving you to next round 🎉", time: "Mon", u: 1, online: false, ch: "R" },
    { name: "HYRUP AI Bot", msg: "Resume score improved +12 points!", time: "Sun", u: 0, online: true, ch: "H" },
  ];

  return (
    <Col>
      <div style={{ padding: "10px 22px 16px" }}>
        <Row ai="center" jc="space-between" sx={{ marginBottom: 16 }}>
          <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, color: t.t1 }}>Messages</span>
          <ModeToggle mode={mode} onToggle={onToggle} />
        </Row>
        <div style={{ display: "flex", gap: 10, alignItems: "center", background: t.s2, border: `1px solid ${t.border}`, borderRadius: 14, padding: "11px 15px" }}>
          <Svg d={IC.search} s={15} c={t.t2} />
          <span style={{ fontFamily: FB, fontSize: 13, color: t.t3 }}>Search conversations...</span>
        </div>
      </div>
      {convos.map((c, i) => (
        <Row key={i} g={12} ai="center" sx={{ padding: "13px 22px", borderBottom: `1px solid ${t.border}`, cursor: "pointer" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 50, height: 50, borderRadius: 17, background: t.s2, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: t.orange }}>{c.ch}</span>
            </div>
            {c.online && <div style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: 6, background: T.c.green, border: `2px solid ${t.bg}` }} />}
          </div>
          <Col g={3} sx={{ flex: 1, minWidth: 0 }}>
            <Row ai="center" jc="space-between">
              <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 14, color: t.t1 }}>{c.name}</span>
              <span style={{ fontFamily: FB, fontSize: 11, color: t.t3, flexShrink: 0 }}>{c.time}</span>
            </Row>
            <span style={{ fontFamily: FB, fontSize: 12, color: t.t2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 210 }}>{c.msg}</span>
          </Col>
          {c.u > 0 && <div style={{ minWidth: 22, height: 22, borderRadius: 11, background: t.orange, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>
            <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 800, color: "#fff" }}>{c.u}</span>
          </div>}
        </Row>
      ))}
    </Col>
  );
};

/* ── CAREER NEWS ── */
const CareerNews = ({ mode, onToggle }) => {
  const t = T.c;
  const stories = [
    { h: "Anthropic raises $2B — AI talent demand surges across India", src: "TechCrunch", time: "2h ago", big: true },
    { h: "Top skills hiring managers want in 2025 interns", src: "Forbes India", time: "5h ago" },
    { h: "Meta lays off 5% — what it means for fresh grads", src: "ET", time: "1d ago" },
    { h: "Is AI replacing or creating jobs? A nuanced take", src: "Wired", time: "2d ago" },
  ];

  return (
    <Col>
      <div style={{ padding: "10px 22px 16px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, color: t.t1 }}>Tech Pulse</span>
        <ModeToggle mode={mode} onToggle={onToggle} />
      </div>
      {/* Big hero news card */}
      <div style={{ margin: "0 22px 16px", borderRadius: 24, overflow: "hidden", border: `1px solid ${t.border}`, background: t.s2 }}>
        <div style={{ height: 148, background: `linear-gradient(135deg, #1A0C00, #2D1600)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 60% 50%, ${t.orangeMid}, transparent 65%)` }} />
          <Svg d={IC.zap} s={56} c={`${t.orange}28`} fill={`${t.orange}08`} />
        </div>
        <div style={{ padding: 16 }}>
          <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 15, color: t.t1, display: "block", lineHeight: 1.45, marginBottom: 10 }}>{stories[0].h}</span>
          <Row ai="center" jc="space-between">
            <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: t.orange, background: t.orangeLo, padding: "3px 9px", borderRadius: 100 }}>{stories[0].src}</span>
            <span style={{ fontFamily: FB, fontSize: 11, color: t.t3 }}>{stories[0].time}</span>
          </Row>
        </div>
      </div>
      {/* List */}
      <Col sx={{ padding: "0 22px 24px" }}>
        {stories.slice(1).map((s, i) => (
          <Row key={i} g={12} ai="flex-start" sx={{ paddingBottom: 14, marginBottom: 14, borderBottom: `1px solid ${t.border}` }}>
            <div style={{ width: 54, height: 54, borderRadius: 16, background: t.s2, border: `1px solid ${t.border}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Svg d={IC.news} s={20} c={t.t3} />
            </div>
            <Col g={6} sx={{ flex: 1 }}>
              <span style={{ fontFamily: FB, fontWeight: 600, fontSize: 13, color: t.t1, lineHeight: 1.4 }}>{s.h}</span>
              <Row g={8}>
                <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: t.orange, background: t.orangeLo, padding: "2px 7px", borderRadius: 100 }}>{s.src}</span>
                <span style={{ fontFamily: FB, fontSize: 10, color: t.t3 }}>{s.time}</span>
              </Row>
            </Col>
          </Row>
        ))}
      </Col>
    </Col>
  );
};

/* ── CAREER PROFILE — ref: QClay profile (centered, black, stats row, grid) */
const CareerProfile = ({ mode, onToggle }) => {
  const t = T.c;
  return (
    <Col>
      {/* Cover — full bleed ref: Ritilo profile cover */}
      <div style={{ height: 160, background: `linear-gradient(160deg, #1A0C00 0%, #2D1600 50%, #0F0F0F 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 65% 40%, ${t.orangeMid}, transparent 60%)` }} />
        <div style={{ position: "absolute", top: 14, right: 18 }}>
          <ModeToggle mode={mode} onToggle={onToggle} />
        </div>
        {/* Avatar centered bottom — ref: QClay */}
        <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: 72, height: 72, borderRadius: 24, background: t.s2, border: `3px solid ${t.bg}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 28, color: t.orange }}>R</span>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 38, textAlign: "center", padding: "38px 22px 0" }}>
        <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: t.t1, display: "block", marginBottom: 2 }}>Rahul Sharma</span>
        <span style={{ fontFamily: FB, fontSize: 12, color: t.t2, display: "block", marginBottom: 16 }}>B.Tech CSE · RGPV Bhopal · 2026</span>

        {/* Stats row — ref: QClay "100 posts / 294K followers / 10 following" */}
        <Row ai="center" jc="center" g={0} sx={{ marginBottom: 18, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: "14px 0" }}>
          {[["47", "Connections"], ["7", "Skills"], ["2", "Wins"], ["12", "Applied"]].map(([n, l], i, arr) => (
            <div key={l} style={{ flex: 1, textAlign: "center", borderRight: i < arr.length - 1 ? `1px solid ${t.border}` : "none" }}>
              <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: t.t1, display: "block" }}>{n}</span>
              <span style={{ fontFamily: FB, fontSize: 10, color: t.t2 }}>{l}</span>
            </div>
          ))}
        </Row>

        {/* Skill badges */}
        <Row g={6} jc="center" sx={{ flexWrap: "wrap", marginBottom: 18 }}>
          {["React ✓", "Node.js ✓", "Figma ✓", "MongoDB ✓"].map((s, i) => {
            const cols = [t.orange, T.c.green, "#A78BFA", "#22C55E"];
            return <span key={s} style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: cols[i], background: `${cols[i]}15`, padding: "5px 12px", borderRadius: 100 }}>{s}</span>;
          })}
        </Row>

        {/* AI Resume button */}
        <button style={{ width: "100%", height: 46, borderRadius: 14, background: t.orange, border: "none", color: "#fff", fontFamily: FB, fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Svg d={IC.spark} s={15} c="#fff" />
          AI Resume Builder
        </button>

        {/* Tab view — ref: Ritilo post type tabs */}
        <Row g={0} sx={{ borderBottom: `1px solid ${t.border}`, marginBottom: 16 }}>
          {[["grid", IC.grid], ["spark", IC.spark], ["bmark", IC.bmark]].map(([id, ic], idx) => (
            <div key={id} style={{ flex: 1, display: "flex", justifyContent: "center", padding: "10px 0", borderBottom: idx === 0 ? `2px solid ${t.orange}` : "none" }}>
              <Svg d={ic} s={18} c={idx === 0 ? t.orange : t.t3} />
            </div>
          ))}
        </Row>

        {/* Project grid — ref: QClay / profile image grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {["Todo App", "Weather UI", "Chat Bot", "Portfolio", "E-Comm", "Resume AI"].map((p, i) => {
            const bgs = ["#1C0D00", "#001C0D", "#0D001C", "#1C1000", "#001C1C", "#180016"];
            const cols = [t.orange, T.c.green, "#A78BFA", "#F59E0B", T.c.blue, "#EC4899"];
            return (
              <div key={p} style={{ aspectRatio: "1", background: bgs[i], display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, position: "relative" }}>
                <Svg d={IC.grid} s={22} c={`${cols[i]}50`} />
                <span style={{ fontFamily: FB, fontSize: 9, color: `${cols[i]}99`, fontWeight: 600 }}>{p}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ height: 28 }} />
    </Col>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   ░░░ SOCIAL SCREENS — LIGHT THEME ░░░
   Ref: fitness social home, personal feed, smart home light
═══════════════════════════════════════════════════════════════════════ */

/* ── SOCIAL FEED — ref: Fitness "Your Journey With Friends", Personal Feed */
const SocialFeed = ({ mode, onToggle }) => {
  const t = T.s;
  const [filter, setFilter] = useState(0);

  /* Friend story rings — ref: fitness app friend circles */
  const friends = [
    { ch: "+", col: t.orange, bg: t.orangeLo, label: "Add" },
    { ch: "P", col: "#16A34A", bg: "#E8F8EF", label: "Priya K." },
    { ch: "D", col: "#2563EB", bg: "#EFF6FF", label: "Dev M." },
    { ch: "A", col: t.orange, bg: t.orangeLo, label: "Ananya" },
    { ch: "S", col: "#9333EA", bg: "#FAF5FF", label: "Sneha R." },
  ];

  const posts = [
    { user: "Priya K.", college: "NIT Trichy", content: "Just won 1st place at HackIndia 2025! 🏆 Built an AI resume analyzer in 24hrs. Six months of grinding paying off!", type: "🏆 Win", tCol: "#16A34A", tBg: "#E8F8EF", likes: 142, comments: 28, time: "2h", hasImg: true },
    { user: "Dev M.", college: "VIT Vellore", content: "Shipped my first full-stack project 🚀 Real-time collaborative editor with WebSockets. Open source — link in bio!", type: "🚀 Project", tCol: "#2563EB", tBg: "#EFF6FF", likes: 89, comments: 15, time: "5h", hasImg: false },
  ];

  return (
    <Col>
      {/* Greeting header — ref: smart home "Hi Daniel" / fitness "Your Journey" */}
      <div style={{ padding: "10px 22px 16px" }}>
        <Row ai="flex-start" jc="space-between">
          <Col g={2}>
            <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 28, color: t.t1, lineHeight: 1.1, letterSpacing: -0.8 }}>
              Hi <span style={{ color: t.orange }}>Rahul!</span> 👋<br />
              <span style={{ fontFamily: FB, fontWeight: 500, fontSize: 14, color: t.t2, letterSpacing: 0 }}>What are you building today?</span>
            </span>
          </Col>
          <Row g={8} ai="center" sx={{ marginTop: 6 }}>
            <ModeToggle mode={mode} onToggle={onToggle} />
            <div style={{ width: 38, height: 38, borderRadius: 14, background: t.s1, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", position: "relative" }}>
              <Svg d={IC.bell} s={17} c={t.t2} />
              <div style={{ position: "absolute", top: 9, right: 9, width: 7, height: 7, borderRadius: 4, background: t.orange, border: `1.5px solid ${t.bg}` }} />
            </div>
          </Row>
        </Row>
      </div>

      {/* Friend circles — ref: fitness app horizontal circles */}
      <div style={{ display: "flex", gap: 14, padding: "0 22px 18px", overflowX: "auto" }}>
        {friends.map((f, i) => (
          <Col key={i} g={5} ai="center" sx={{ flexShrink: 0 }}>
            <div style={{ width: 54, height: 54, borderRadius: 27, background: f.bg, border: `2.5px solid ${f.col}44`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 10px ${f.col}25` }}>
              <span style={{ fontFamily: FD, fontWeight: 900, fontSize: i === 0 ? 22 : 20, color: f.col }}>{f.ch}</span>
            </div>
            <span style={{ fontFamily: FB, fontSize: 10, color: t.t2, fontWeight: 500, maxWidth: 52, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.label}</span>
          </Col>
        ))}
      </div>

      {/* Filter chips */}
      <Row g={8} sx={{ padding: "0 22px 16px", overflowX: "auto" }}>
        {["For You", "My College", "My Domain", "National"].map((f, i) => (
          <button key={f} onClick={() => setFilter(i)} style={{
            flexShrink: 0, padding: "8px 18px", borderRadius: 100, fontFamily: FB, fontSize: 13, fontWeight: 700,
            background: filter === i ? t.t1 : t.s2, color: filter === i ? t.bg : t.t2,
            border: `1.5px solid ${filter === i ? t.t1 : t.border}`,
            boxShadow: filter === i ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
            cursor: "pointer",
          }}>{f}</button>
        ))}
      </Row>

      {/* Create post — ref: fitness "Start a post" */}
      <div style={{ margin: "0 22px 16px", background: t.s1, borderRadius: 20, padding: "14px 14px 12px", border: `1px solid ${t.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <Row g={12} sx={{ marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: `linear-gradient(135deg, ${t.orange}, #FF8A5E)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: "#fff" }}>R</span>
          </div>
          <div style={{ flex: 1, height: 40, background: t.s2, borderRadius: 20, padding: "0 16px", display: "flex", alignItems: "center", border: `1px solid ${t.border}` }}>
            <span style={{ fontFamily: FB, fontSize: 13, color: t.t3 }}>Share a win, project, or thought... ✨</span>
          </div>
        </Row>
        <div style={{ height: 1, background: t.border, margin: "0 0 10px" }} />
        <Row jc="space-around">
          {[["📷 Photo", IC.img], ["✦ AI Write", IC.spark], ["# Tag", IC.hash]].map(([l, ic]) => (
            <button key={l} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", gap: 5, alignItems: "center" }}>
              <Svg d={ic} s={14} c={t.t2} />
              <span style={{ fontFamily: FB, fontSize: 11, color: t.t2, fontWeight: 700 }}>{l}</span>
            </button>
          ))}
        </Row>
      </div>

      {/* Posts — ref: Personal Feed mixed cards, fitness post cards */}
      {posts.map((p, i) => (
        <div key={i} style={{ margin: "0 22px 16px", background: t.s1, borderRadius: t.r, padding: 16, border: `1px solid ${t.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <Row g={10} ai="flex-start" sx={{ marginBottom: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 21, background: `${t.orange}18`, border: `2px solid ${t.orange}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: t.orange }}>{p.user[0]}</span>
            </div>
            <Col g={2} sx={{ flex: 1 }}>
              <Row ai="flex-start" jc="space-between">
                <Col g={1}>
                  <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 14, color: t.t1 }}>{p.user}</span>
                  <span style={{ fontFamily: FB, fontSize: 11, color: t.t2 }}>{p.college} · {p.time} ago</span>
                </Col>
                <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 800, color: p.tCol, background: p.tBg, padding: "4px 10px", borderRadius: 100 }}>{p.type}</span>
              </Row>
            </Col>
          </Row>
          <p style={{ fontFamily: FB, fontSize: 14, color: t.t1, lineHeight: 1.65, margin: "0 0 12px" }}>{p.content}</p>
          {p.hasImg && (
            <div style={{ height: 150, borderRadius: 14, background: `linear-gradient(135deg, #F0E8DC, #E8D8C8)`, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${t.border}` }}>
              <Svg d={IC.award} s={40} c={`${t.orange}25`} />
            </div>
          )}
          {/* AI suggestion strip */}
          <div style={{ background: t.s2, borderRadius: 10, padding: "8px 12px", marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
            <Svg d={IC.spark} s={13} c={t.orange} />
            <span style={{ fontFamily: FB, fontSize: 11, color: t.t2 }}>AI: <span style={{ color: t.orange, fontWeight: 700 }}>#HackIndia2025  #ReactDev  #Winner</span></span>
          </div>
          <Row g={0}>
            {[[IC.heart, p.likes], [IC.chat, p.comments], [IC.share, null]].map(([ic, val], ai) => (
              <button key={ai} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", gap: 5, alignItems: "center", marginRight: 16 }}>
                <Svg d={ic} s={19} c={t.t2} />
                {val != null && <span style={{ fontFamily: FB, fontSize: 13, color: t.t2, fontWeight: 600 }}>{val}</span>}
              </button>
            ))}
            <button style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "auto" }}>
              <Svg d={IC.bmark} s={19} c={t.t2} />
            </button>
          </Row>
        </div>
      ))}
      <div style={{ height: 24 }} />
    </Col>
  );
};

/* ── SOCIAL CONNECT — ref: explore list + fitness friend flow */
const SocialConnect = ({ mode, onToggle }) => {
  const t = T.s;
  const [tab, setTab] = useState("Suggested");
  const users = [
    { n: "Sneha R.", college: "Amity Noida", skills: ["UI/UX", "Figma"], xp: "Lv 8", why: "Same domain 🎨", sCol: "#9333EA", sBg: "#FAF5FF" },
    { n: "Kiran B.", college: "LPU Punjab", skills: ["Full Stack", "React"], xp: "Lv 12", why: "Same city 📍", sCol: "#2563EB", sBg: "#EFF6FF" },
    { n: "Ananya T.", college: "SRM Chennai", skills: ["ML", "Python"], xp: "Lv 6", why: "3 mutual friends 👥", sCol: "#16A34A", sBg: "#E8F8EF" },
  ];

  return (
    <Col>
      <div style={{ padding: "10px 22px 16px" }}>
        <Row ai="flex-start" jc="space-between" sx={{ marginBottom: 16 }}>
          <Col g={2}>
            <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 26, color: t.t1, lineHeight: 1.1 }}>Find your<br /><span style={{ color: t.orange }}>Tribe 🤝</span></span>
          </Col>
          <ModeToggle mode={mode} onToggle={onToggle} />
        </Row>
        <div style={{ display: "flex", gap: 8, alignItems: "center", background: t.s1, border: `1px solid ${t.border}`, borderRadius: 14, padding: "11px 15px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <Svg d={IC.search} s={15} c={t.t2} />
          <span style={{ fontFamily: FB, fontSize: 13, color: t.t3 }}>Search by name, college, skill...</span>
        </div>
        <Row g={8}>
          {["Suggested", "Requests", "Nearby"].map(tb => (
            <button key={tb} onClick={() => setTab(tb)} style={{
              flex: 1, height: 38, borderRadius: 100,
              background: tab === tb ? t.t1 : t.s1,
              border: `1.5px solid ${tab === tb ? t.t1 : t.border}`,
              color: tab === tb ? t.bg : t.t2,
              fontFamily: FB, fontSize: 12, fontWeight: 700, cursor: "pointer",
              boxShadow: tab === tb ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
            }}>{tb}{tb === "Requests" ? " (2)" : ""}</button>
          ))}
        </Row>
      </div>

      <Col sx={{ padding: "0 22px 24px" }}>
        {tab === "Suggested" && users.map((u, i) => (
          <div key={i} style={{ background: t.s1, borderRadius: t.r, padding: 16, marginBottom: 12, border: `1px solid ${t.border}`, boxShadow: "0 2px 14px rgba(0,0,0,0.06)" }}>
            <Row g={12} ai="flex-start" sx={{ marginBottom: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 19, background: u.sBg, border: `2px solid ${u.sCol}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 22, color: u.sCol }}>{u.n[0]}</span>
              </div>
              <Col g={3} sx={{ flex: 1 }}>
                <Row ai="flex-start" jc="space-between">
                  <Col g={1}>
                    <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 16, color: t.t1 }}>{u.n}</span>
                    <span style={{ fontFamily: FB, fontSize: 12, color: t.t2 }}>{u.college}</span>
                  </Col>
                  <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: T.c.green, background: "#E8F8EF", padding: "3px 9px", borderRadius: 100 }}>{u.xp}</span>
                </Row>
                <Row g={5} sx={{ flexWrap: "wrap", marginTop: 6 }}>
                  {u.skills.map(s => <span key={s} style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: u.sCol, background: u.sBg, padding: "3px 9px", borderRadius: 100 }}>{s}</span>)}
                </Row>
              </Col>
            </Row>
            <Row g={5} sx={{ marginBottom: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: u.sCol }} />
              <span style={{ fontFamily: FB, fontSize: 12, color: u.sCol, fontWeight: 700 }}>{u.why}</span>
            </Row>
            <Row g={8}>
              <button style={{ flex: 1, height: 42, borderRadius: 13, background: t.t1, border: `1.5px solid ${t.t1}`, color: t.bg, fontFamily: FB, fontSize: 13, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>Connect</button>
              <button style={{ flex: 1, height: 42, borderRadius: 13, background: t.s2, border: `1px solid ${t.border}`, color: t.t2, fontFamily: FB, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Skip</button>
            </Row>
          </div>
        ))}
        {tab === "Requests" && (
          <Col g={10}>
            <span style={{ fontFamily: FB, fontSize: 13, color: t.t2, marginBottom: 4 }}>2 pending requests</span>
            {[{ n: "Amit S.", info: "KIIT · Backend Dev · Lv 9" }, { n: "Nisha P.", info: "BIT · Data Science · Lv 6" }].map((u, i) => (
              <Row key={i} g={12} ai="center" sx={{ background: t.s1, borderRadius: 18, padding: 14, border: `1px solid ${t.border}`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 50, height: 50, borderRadius: 17, background: t.s2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 20, color: t.t1 }}>{u.n[0]}</span>
                </div>
                <Col g={2} sx={{ flex: 1 }}>
                  <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 14, color: t.t1 }}>{u.n}</span>
                  <span style={{ fontFamily: FB, fontSize: 12, color: t.t2 }}>{u.info}</span>
                </Col>
                <Row g={8}>
                  <button style={{ width: 40, height: 40, borderRadius: 12, background: "#E8F8EF", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Svg d={IC.check} s={16} c={T.c.green} w={2.5} />
                  </button>
                  <button style={{ width: 40, height: 40, borderRadius: 12, background: "#FFF1F0", border: "1px solid #FECACA", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Svg d={IC.x} s={16} c={T.c.red} w={2.5} />
                  </button>
                </Row>
              </Row>
            ))}
          </Col>
        )}
        {tab === "Nearby" && (
          <Col g={12}>
            <div style={{ background: "#E8F8EF", borderRadius: 16, padding: 14, display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <Svg d={IC.loc} s={18} c={T.c.green} />
              </div>
              <Col g={2}>
                <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: t.t1 }}>Location Active</span>
                <span style={{ fontFamily: FB, fontSize: 11, color: t.t2 }}>Showing students within 10km</span>
              </Col>
            </div>
            <Row g={8}>
              {["10km", "50km", "100km"].map((r, i) => (
                <button key={r} style={{ flex: 1, height: 36, borderRadius: 100, background: i === 0 ? t.t1 : t.s1, border: `1.5px solid ${t.border}`, color: i === 0 ? t.bg : t.t2, fontFamily: FB, fontSize: 12, fontWeight: 800, cursor: "pointer", boxShadow: i === 0 ? "0 2px 10px rgba(0,0,0,0.1)" : "none" }}>{r}</button>
              ))}
            </Row>
            {[{ n: "Ravi K.", dist: "2.3 km", college: "GGSIPU", domain: "DevOps" }, { n: "Meena S.", dist: "4.8 km", college: "Jamia", domain: "Android Dev" }].map((u, i) => (
              <Row key={i} g={12} ai="center" sx={{ background: t.s1, borderRadius: 18, padding: 14, border: `1px solid ${t.border}`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 50, height: 50, borderRadius: 17, background: t.orangeLo, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 20, color: t.orange }}>{u.n[0]}</span>
                </div>
                <Col g={2} sx={{ flex: 1 }}>
                  <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 14, color: t.t1 }}>{u.n}</span>
                  <span style={{ fontFamily: FB, fontSize: 12, color: t.t2 }}>{u.college} · {u.domain}</span>
                </Col>
                <Col g={5} ai="flex-end">
                  <span style={{ fontFamily: FB, fontSize: 11, color: t.orange, fontWeight: 700 }}>📍 {u.dist}</span>
                  <button style={{ padding: "6px 14px", borderRadius: 100, background: t.t1, border: "none", color: t.bg, fontFamily: FB, fontSize: 11, fontWeight: 800, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>Connect</button>
                </Col>
              </Row>
            ))}
          </Col>
        )}
      </Col>
    </Col>
  );
};

/* ── SOCIAL CHAT ── */
const SocialChat = ({ mode, onToggle }) => {
  const t = T.s;
  const convos = [
    { n: "React Builders 🔥", msg: "Kiran: shipped the landing page! 🚀", time: "9:12", u: 5, group: true, ch: "R", col: "#2563EB", bg: "#EFF6FF" },
    { n: "Sneha R.", msg: "Congrats on the hackathon!! 🎉", time: "10:20", u: 1, group: false, ch: "S", col: "#9333EA", bg: "#FAF5FF" },
    { n: "GATE 2026 Prep 📚", msg: "Today: DP on trees — solve by 10pm", time: "Yesterday", u: 0, group: true, ch: "G", col: "#16A34A", bg: "#E8F8EF" },
    { n: "Dev M.", msg: "Can we collab on the OSS project?", time: "Mon", u: 0, group: false, ch: "D", col: t.orange, bg: t.orangeLo },
  ];

  return (
    <Col>
      <div style={{ padding: "10px 22px 16px" }}>
        <Row ai="center" jc="space-between" sx={{ marginBottom: 16 }}>
          <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, color: t.t1 }}>Messages 💬</span>
          <ModeToggle mode={mode} onToggle={onToggle} />
        </Row>
        <div style={{ display: "flex", gap: 8, alignItems: "center", background: t.s1, border: `1px solid ${t.border}`, borderRadius: 14, padding: "11px 15px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <Svg d={IC.search} s={15} c={t.t2} />
          <span style={{ fontFamily: FB, fontSize: 13, color: t.t3 }}>Search messages...</span>
        </div>
      </div>
      {convos.map((c, i) => (
        <Row key={i} g={12} ai="center" sx={{ padding: "13px 22px", borderBottom: `1px solid ${t.border}`, cursor: "pointer" }}>
          <div style={{ width: 52, height: 52, borderRadius: c.group ? 18 : 26, background: c.bg, border: `2px solid ${c.col}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 20, color: c.col }}>{c.ch}</span>
          </div>
          <Col g={3} sx={{ flex: 1, minWidth: 0 }}>
            <Row ai="center" jc="space-between">
              <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 14, color: t.t1 }}>{c.n}</span>
              <span style={{ fontFamily: FB, fontSize: 11, color: t.t3, flexShrink: 0 }}>{c.time}</span>
            </Row>
            <span style={{ fontFamily: FB, fontSize: 12, color: t.t2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{c.msg}</span>
          </Col>
          {c.u > 0 && <div style={{ minWidth: 22, height: 22, borderRadius: 11, background: c.col, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>
            <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 800, color: "#fff" }}>{c.u}</span>
          </div>}
        </Row>
      ))}
    </Col>
  );
};

/* ── SOCIAL GROUPS — ref: smart home room grid */
const SocialGroups = ({ mode, onToggle }) => {
  const t = T.s;
  const [tab, setTab] = useState("discover");
  const groups = [
    { n: "React Builders", type: "⚡ Hack", members: 234, desc: "Build fast, ship faster.", col: "#2563EB", bg: "#EFF6FF", joined: false },
    { n: "GATE 2026", type: "📚 Study", members: 891, desc: "Crack it together.", col: "#16A34A", bg: "#E8F8EF", joined: true },
    { n: "ML Paper Club", type: "📚 Study", members: 320, desc: "Read. Discuss. Build.", col: "#9333EA", bg: "#FAF5FF", joined: false },
    { n: "Founders Circle", type: "🎮 Fun", members: 156, desc: "0→1, no fluff.", col: t.orange, bg: t.orangeLo, joined: false },
  ];

  return (
    <Col>
      <div style={{ padding: "10px 22px 16px" }}>
        <Row ai="flex-start" jc="space-between" sx={{ marginBottom: 16 }}>
          <Col g={2}>
            <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 26, color: t.t1, lineHeight: 1.15 }}>Join a Cult 🔥</span>
            <span style={{ fontFamily: FB, fontSize: 12, color: t.t2 }}>Find your study · build · fun group</span>
          </Col>
          <ModeToggle mode={mode} onToggle={onToggle} />
        </Row>
        <div style={{ display: "flex", gap: 8, alignItems: "center", background: t.s1, border: `1px solid ${t.border}`, borderRadius: 14, padding: "11px 15px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <Svg d={IC.search} s={15} c={t.t2} />
          <span style={{ fontFamily: FB, fontSize: 13, color: t.t3 }}>Search groups...</span>
        </div>
        <Row g={8} sx={{ marginBottom: 12 }}>
          {[["discover", "Discover"], ["my", "My Cults"]].map(([id, l]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, height: 38, borderRadius: 100,
              background: tab === id ? t.t1 : t.s1, border: `1.5px solid ${tab === id ? t.t1 : t.border}`,
              color: tab === id ? t.bg : t.t2, fontFamily: FB, fontSize: 13, fontWeight: 700, cursor: "pointer",
              boxShadow: tab === id ? "0 4px 14px rgba(0,0,0,0.1)" : "none",
            }}>{l}</button>
          ))}
        </Row>
        {/* Category filter */}
        <Row g={8} sx={{ overflowX: "auto" }}>
          {[{ l: "All", col: t.t1, bg: t.s1 }, { l: "⚡ Hack", col: "#2563EB", bg: "#EFF6FF" }, { l: "📚 Study", col: "#16A34A", bg: "#E8F8EF" }, { l: "🎮 Fun", col: t.orange, bg: t.orangeLo }].map((cat, i) => (
            <button key={cat.l} style={{ flexShrink: 0, padding: "7px 14px", borderRadius: 100, background: cat.bg, border: "none", color: cat.col, fontFamily: FB, fontSize: 12, fontWeight: 800, cursor: "pointer" }}>{cat.l}</button>
          ))}
        </Row>
      </div>

      <div style={{ padding: "0 22px 24px" }}>
        {/* 2-col grid — ref: smart home device grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {groups.map((g, i) => (
            <div key={i} style={{ background: t.s1, borderRadius: 20, padding: 14, border: `1px solid ${t.border}`, boxShadow: "0 2px 14px rgba(0,0,0,0.06)" }}>
              <div style={{ width: 46, height: 46, borderRadius: 15, background: g.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Svg d={IC.layers} s={22} c={g.col} />
              </div>
              <span style={{ fontFamily: FB, fontWeight: 800, fontSize: 14, color: t.t1, display: "block", marginBottom: 2 }}>{g.n}</span>
              <span style={{ fontFamily: FB, fontSize: 10, color: t.t2, display: "block", marginBottom: 4 }}>{g.members} members</span>
              <span style={{ fontFamily: FB, fontSize: 11, color: t.t2, background: g.bg, padding: "2px 8px", borderRadius: 100, display: "inline-block", marginBottom: 10 }}>{g.type}</span>
              <p style={{ fontFamily: FB, fontSize: 11, color: t.t2, margin: "0 0 10px", lineHeight: 1.4 }}>{g.desc}</p>
              <button style={{
                width: "100%", height: 36, borderRadius: 11,
                background: g.joined ? t.s2 : t.t1,
                border: `1.5px solid ${g.joined ? t.border : t.t1}`,
                color: g.joined ? t.t2 : t.bg,
                fontFamily: FB, fontSize: 12, fontWeight: 800, cursor: "pointer",
                boxShadow: g.joined ? "none" : "0 2px 10px rgba(0,0,0,0.1)",
              }}>{g.joined ? "✓ Joined" : "Join"}</button>
            </div>
          ))}
        </div>

        {/* FAB-style Create CTA — ref: smart home orange + button, fitness app FAB */}
        <div style={{ background: t.s1, borderRadius: 22, padding: 20, textAlign: "center", border: `1px solid ${t.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
          <div style={{ width: 60, height: 60, borderRadius: 20, background: t.orange, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: `0 8px 24px ${t.orangeMid}` }}>
            <Svg d={IC.plus} s={26} c="#fff" w={2.5} />
          </div>
          <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: t.t1, display: "block", marginBottom: 6 }}>Start your own Cult</span>
          <p style={{ fontFamily: FB, fontSize: 13, color: t.t2, margin: "0 0 16px", lineHeight: 1.5 }}>Study group · hackathon team · project crew</p>
          <button style={{ padding: "12px 32px", borderRadius: 100, background: t.t1, border: "none", color: t.bg, fontFamily: FB, fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>+ Create Group</button>
        </div>
      </div>
    </Col>
  );
};

/* ── SOCIAL PROFILE — ref: QClay centered + Ritilo post types + profile grid */
const SocialProfile = ({ mode, onToggle }) => {
  const t = T.s;
  return (
    <Col>
      {/* Cover */}
      <div style={{ height: 160, background: `linear-gradient(160deg, #FFF1EB 0%, #FFE4D6 50%, #F5F0E8 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: "50%", background: `${t.orange}10`, filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: 14, right: 18 }}>
          <ModeToggle mode={mode} onToggle={onToggle} />
        </div>
        {/* Avatar centered — ref: QClay profile */}
        <div style={{ position: "absolute", bottom: -32, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: t.s1, border: `3px solid ${t.bg}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 28, color: t.orange }}>R</span>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 44, textAlign: "center", padding: "44px 22px 0" }}>
        <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: t.t1, display: "block" }}>Rahul Sharma</span>
        <span style={{ fontFamily: FB, fontSize: 13, color: t.t2, display: "block", marginBottom: 16 }}>B.Tech CSE · RGPV · 2026 · Full Stack Dev</span>

        {/* Stats row — ref: QClay stats */}
        <Row ai="center" jc="center" g={0} sx={{ borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: "14px 0", marginBottom: 18 }}>
          {[["47", "Connections"], ["12", "Posts"], ["7", "Skills"], ["2", "Wins"]].map(([n, l], i, arr) => (
            <div key={l} style={{ flex: 1, textAlign: "center", borderRight: i < arr.length - 1 ? `1px solid ${t.border}` : "none" }}>
              <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: t.t1, display: "block" }}>{n}</span>
              <span style={{ fontFamily: FB, fontSize: 10, color: t.t2 }}>{l}</span>
            </div>
          ))}
        </Row>

        {/* Skill badges */}
        <Row g={6} jc="center" sx={{ flexWrap: "wrap", marginBottom: 18 }}>
          {[["React ✓", "#2563EB", "#EFF6FF"], ["Node.js ✓", "#16A34A", "#E8F8EF"], ["Figma ✓", "#9333EA", "#FAF5FF"], ["Python ✓", "#D97706", "#FEF3C7"]].map(([s, col, bg]) => (
            <span key={s} style={{ fontFamily: FB, fontSize: 12, fontWeight: 700, color: col, background: bg, padding: "5px 12px", borderRadius: 100 }}>{s}</span>
          ))}
        </Row>

        {/* Action row — ref: QClay "Follow / Message" */}
        <Row g={10} sx={{ marginBottom: 22 }}>
          <button style={{ flex: 1, height: 44, borderRadius: 14, background: t.orange, border: "none", color: "#fff", fontFamily: FB, fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: `0 4px 16px ${t.orangeMid}` }}>✦ AI Resume</button>
          <button style={{ flex: 1, height: 44, borderRadius: 14, background: t.s1, border: `1.5px solid ${t.border}`, color: t.t1, fontFamily: FB, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>Edit Profile</button>
        </Row>

        {/* Tab icons — ref: QClay grid / spark / reels tab */}
        <Row g={0} sx={{ borderBottom: `1px solid ${t.border}`, marginBottom: 2 }}>
          {[[IC.grid, true], [IC.spark, false], [IC.bmark, false]].map(([ic, sel], idx) => (
            <div key={idx} style={{ flex: 1, display: "flex", justifyContent: "center", padding: "10px 0", borderBottom: sel ? `2.5px solid ${t.orange}` : "none" }}>
              <Svg d={ic} s={19} c={sel ? t.orange : t.t3} />
            </div>
          ))}
        </Row>

        {/* Project grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {[["Todo App", "#FFF1EB", t.orange], ["Weather UI", "#EFF6FF", "#2563EB"], ["Chat Bot", "#FAF5FF", "#9333EA"], ["Portfolio", "#FEF3C7", "#D97706"], ["E-Commerce", "#E8F8EF", "#16A34A"], ["Resume AI", "#FFF1EB", t.orange]].map(([p, bg, col], i) => (
            <div key={p} style={{ aspectRatio: "1", background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, border: "1px solid rgba(0,0,0,0.04)" }}>
              <Svg d={IC.grid} s={22} c={`${col}55`} />
              <span style={{ fontFamily: FB, fontSize: 9, color: `${col}99`, fontWeight: 700 }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 28 }} />
    </Col>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════════════ */
export default function HYRUPApp() {
  const [mode, setMode] = useState("career");
  const [cTab, setCTab] = useState("home");
  const [sTab, setSTab] = useState("feed");
  const [fading, setFading] = useState(false);

  const toggleMode = () => {
    setFading(true);
    setTimeout(() => { setMode(m => m === "career" ? "social" : "career"); setFading(false); }, 160);
  };

  const isC = mode === "career";
  const p = { mode, onToggle: toggleMode };
  const t = isC ? T.c : T.s;

  const renderScreen = () => {
    if (isC) {
      if (cTab === "home") return <CareerHome {...p} />;
      if (cTab === "jobs") return <CareerJobs {...p} />;
      if (cTab === "chat") return <CareerChat {...p} />;
      if (cTab === "news") return <CareerNews {...p} />;
      if (cTab === "profile") return <CareerProfile {...p} />;
    } else {
      if (sTab === "feed") return <SocialFeed {...p} />;
      if (sTab === "connect") return <SocialConnect {...p} />;
      if (sTab === "chat") return <SocialChat {...p} />;
      if (sTab === "groups") return <SocialGroups {...p} />;
      if (sTab === "profile") return <SocialProfile {...p} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#030303", display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 0 48px" }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        button { font-family: 'DM Sans', sans-serif; outline: none; -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* Wordmark */}
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 32, letterSpacing: -1, color: "#fff" }}>
          HY<span style={{ color: "#FF7A1A" }}>R</span>UP
        </span>
        <div style={{ fontFamily: FB, fontSize: 11, color: "#2A2A2A", marginTop: 3 }}>MVP Phase 2 · Career & Social · Mobile UI System</div>
      </div>

      {/* Mode label */}
      <div style={{ marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ width: 6, height: 6, borderRadius: 3, background: t.orange, boxShadow: `0 0 8px ${t.orange}` }} />
        <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: t.orange }}>
          {isC ? "Career Mode — #0F0F0F dark, orange accent" : "Social Mode — #F8F7F5 warm light, vivid orange"}
        </span>
        <div style={{ width: 6, height: 6, borderRadius: 3, background: t.orange, boxShadow: `0 0 8px ${t.orange}` }} />
      </div>

      <Phone mode={mode}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", opacity: fading ? 0 : 1, transition: "opacity 0.16s ease" }}>
          <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
            {renderScreen()}
          </div>
          <BottomNav mode={mode} active={isC ? cTab : sTab} onSelect={isC ? setCTab : setSTab} />
        </div>
      </Phone>

      {/* Design system legend */}
      <div style={{ marginTop: 24, maxWidth: 393, padding: "0 20px", textAlign: "center" }}>
        <p style={{ fontFamily: FB, fontSize: 10, color: "#222", lineHeight: 1.9 }}>
          <span style={{ color: "#444" }}>TYPOGRAPHY</span> — Bricolage Grotesque (display) + DM Sans (body)<br />
          <span style={{ color: "#444" }}>CAREER</span> — <span style={{ color: "#FF7A1A" }}>#FF7A1A</span> · <span style={{ color: "#555" }}>#0F0F0F bg · #161616 card · r20</span><br />
          <span style={{ color: "#444" }}>SOCIAL</span> — <span style={{ color: "#FF5722" }}>#FF5722</span> · <span style={{ color: "#888" }}>#F8F7F5 bg · #FFFFFF card · r22</span><br />
          <span style={{ color: "#444" }}>NAV</span> — dot indicator above icon · toggle in header · crossfade on switch
        </p>
      </div>
    </div>
  );
}
