import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';

/* ═══════════════════════════════════════════════════════════════════════
   SWIPE TO APPLY — Full-screen modal overlay

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
const SwipeScreen = ({ onClose, cards: externalCards, initialIndex = 0, onAction }) => {
    const t = T.c;

    const CARDS_BUILTIN = [
        {
            role: "Frontend Dev Intern", co: "Zepto", loc: "Remote", pay: "₹15K/mo", match: 94, ch: "Z",
            tags: ["React", "TypeScript", "TailwindCSS"], type: "Internship",
            grad: "linear-gradient(145deg, #1C0D00, #2D1600)", accentGrad: "linear-gradient(90deg,#FF7A1A,#FF9A45)",
            desc: "Build and ship features used by 10M+ users. Fast-paced, high-ownership culture. Strong mentorship from senior engineers."
        },
        {
            role: "UI/UX Designer", co: "Groww", loc: "Bengaluru", pay: "₹20K/mo", match: 88, ch: "G",
            tags: ["Figma", "Prototyping", "Design Systems"], type: "Internship",
            grad: "linear-gradient(145deg, #001A0D, #002E1A)", accentGrad: "linear-gradient(90deg,#22C55E,#4ADE80)",
            desc: "Own end-to-end design for new investor features. Work directly with PMs. Portfolio-building opportunity."
        },
        {
            role: "Backend Intern", co: "Razorpay", loc: "Hybrid", pay: "₹25K/mo", match: 91, ch: "R",
            tags: ["Node.js", "MongoDB", "AWS"], type: "Internship",
            grad: "linear-gradient(145deg, #00101A, #001C2E)", accentGrad: "linear-gradient(90deg,#3B82F6,#60A5FA)",
            desc: "Work on payment infrastructure serving 8M+ businesses. Real ownership, real impact. Pre-placement offer possible."
        },
        {
            role: "Data Analyst", co: "Meesho", loc: "Noida", pay: "₹12K/mo", match: 79, ch: "M",
            tags: ["Python", "SQL", "Power BI"], type: "Internship",
            grad: "linear-gradient(145deg, #120018, #1E0028)", accentGrad: "linear-gradient(90deg,#A855F7,#C084FC)",
            desc: "Analyze seller and buyer behavior data. Build dashboards used by leadership. Strong data team culture."
        },
        {
            role: "Product Intern", co: "CRED", loc: "Bengaluru", pay: "₹22K/mo", match: 86, ch: "C",
            tags: ["Product Thinking", "SQL", "Figma"], type: "Internship",
            grad: "linear-gradient(145deg, #1A1000, #2D1E00)", accentGrad: "linear-gradient(90deg,#F59E0B,#FBBF24)",
            desc: "Define product specs for CRED's rewards engine. Work with design + eng. Weekly reviews with CPO."
        },
    ];

    const CARDS = externalCards || CARDS_BUILTIN;

    const [idx, setIdx] = useState(initialIndex);
    const [drag, setDrag] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [stamp, setStamp] = useState(null);
    const [applied, setApplied] = useState([]);
    const [skipped, setSkipped] = useState([]);
    const [saved, setSaved] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [lastAction, setLastAction] = useState(null);

    const done = idx >= CARDS.length;
    const card = done ? null : CARDS[idx];
    const nextCard = done ? null : CARDS[Math.min(idx + 1, CARDS.length - 1)];

    const swipeDir = drag > 40 ? "apply" : drag < -40 ? "skip" : null;
    const rotation = drag * 0.04;
    const opacity = 1 - Math.abs(drag) / 500;

    const triggerAction = (action) => {
        setStamp(action);
        setTimeout(() => {
            setStamp(null);
            if (onAction) {
                onAction(action, idx);
                onClose();
                return;
            }
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

    const onPointerDown = (e) => { setIsDragging(true); setDragStart(e.clientX); };
    const onPointerMove = (e) => { if (!isDragging) return; setDrag(e.clientX - dragStart); };
    const onPointerUp = () => {
        setIsDragging(false);
        if (drag > 100) triggerAction("apply");
        else if (drag < -100) triggerAction("skip");
        else setDrag(0);
    };

    const applyGlow = drag > 40 ? `0 0 60px rgba(34,197,94,${Math.min(drag / 200, 0.6)})` : "none";
    const skipGlow = drag < -40 ? `0 0 60px rgba(239,68,68,${Math.min(-drag / 200, 0.6)})` : "none";

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

            {/* Card stack */}
            <div style={{ flex: 1, position: "relative", padding: "0 22px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                {/* Background card */}
                {nextCard && (
                    <div style={{ position: "absolute", left: 36, right: 36, top: 10, borderRadius: 28, background: T.c.s1, border: `1px solid ${T.c.border}`, height: "82%", transform: `scale(${0.94 + Math.min(Math.abs(drag) / 1000, 0.04)})`, transition: isDragging ? "none" : "transform 0.3s ease", zIndex: 0 }} />
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
                        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(34,197,94,${Math.min(drag / 300, 0.18)}), transparent)`, borderRadius: 28, pointerEvents: "none", zIndex: 10 }} />
                    )}
                    {drag < -20 && (
                        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(225deg, rgba(239,68,68,${Math.min(-drag / 300, 0.18)}), transparent)`, borderRadius: 28, pointerEvents: "none", zIndex: 10 }} />
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

                        {/* AI match badge */}
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

                {/* Directional hint labels */}
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
                <button onClick={() => triggerAction("skip")} style={{ width: 60, height: 60, borderRadius: 30, background: "rgba(239,68,68,0.1)", border: "2px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.1s" }}>
                    <Svg d={IC.x} s={24} c={T.c.red} w={2.5} />
                </button>
                <button onClick={() => triggerAction("save")} style={{ width: 50, height: 50, borderRadius: 25, background: "rgba(245,158,11,0.1)", border: "2px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Svg d={IC.star} s={20} c="#F59E0B" w={2} />
                </button>
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

export default SwipeScreen;
