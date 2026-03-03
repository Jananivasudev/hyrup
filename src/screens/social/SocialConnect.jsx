import { useState, useRef } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

/* ── SOCIAL CONNECT — FULL-PHOTO SWIPE CARDS ── */
const SocialConnect = ({ mode, onToggle }) => {
    const t = T.s;
    const [tab, setTab] = useState("Suggested");
    const [cardIdx, setCardIdx] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [swipeAction, setSwipeAction] = useState(null);
    const [exitAnim, setExitAnim] = useState(null);
    const startX = useRef(0);

    const users = [
        { n: "Sneha R.", college: "Amity Noida", avatar: "/images/profile_sneha.png", skills: ["UI/UX", "Figma", "Prototyping"], xp: "Lv 8", why: "Same domain 🎨", sCol: "#9333EA", sBg: "#FAF5FF", bio: "Design systems nerd. Currently interning at Razorpay." },
        { n: "Kiran B.", college: "LPU Punjab", avatar: "/images/profile_kiran.png", skills: ["Full Stack", "React", "Node.js"], xp: "Lv 12", why: "Same city 📍", sCol: "#2563EB", sBg: "#EFF6FF", bio: "Building open source tools for Indian developers." },
        { n: "Ananya T.", college: "SRM Chennai", avatar: "/images/profile_ananya.png", skills: ["ML", "Python", "TensorFlow"], xp: "Lv 6", why: "3 mutual friends 👥", sCol: "#16A34A", sBg: "#E8F8EF", bio: "AI + Healthcare researcher. Published 2 papers." },
        { n: "Rohan P.", college: "BITS Pilani", avatar: "/images/profile_kiran.png", skills: ["DevOps", "AWS", "Docker"], xp: "Lv 10", why: "Complementary skills ⚡", sCol: t.orange, sBg: t.orangeLo, bio: "Cloud architect. Certified AWS Solutions Architect." },
    ];

    const current = users[cardIdx % users.length];

    const onPointerDown = (e) => { startX.current = e.clientX; setDragging(true); setSwipeAction(null); };
    const onPointerMove = (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX.current;
        setDragX(dx);
        if (dx > 50) setSwipeAction("connect");
        else if (dx < -50) setSwipeAction("skip");
        else setSwipeAction(null);
    };
    const onPointerUp = () => {
        setDragging(false);
        if (Math.abs(dragX) > 90) {
            const dir = dragX > 0 ? "right" : "left";
            setExitAnim(dir);
            setTimeout(() => { setCardIdx(i => i + 1); setExitAnim(null); setSwipeAction(null); }, 250);
        }
        setDragX(0);
    };
    const handleButton = (dir) => {
        setExitAnim(dir);
        setTimeout(() => { setCardIdx(i => i + 1); setExitAnim(null); }, 250);
    };
    const getCardTransform = () => {
        if (exitAnim === "right") return "translateX(120%) rotate(15deg)";
        if (exitAnim === "left") return "translateX(-120%) rotate(-15deg)";
        return `translateX(${dragX}px) rotate(${dragX * 0.04}deg)`;
    };

    return (
        <Col sx={{ height: "100%" }}>
            <div style={{ padding: "10px 22px 14px" }}>
                <Row ai="flex-start" jc="space-between" sx={{ marginBottom: 14 }}>
                    <Col g={2}>
                        <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 24, color: t.t1, lineHeight: 1.1 }}>Find your<br /><span style={{ color: t.orange }}>Tribe 🤝</span></span>
                    </Col>
                    <ModeToggle mode={mode} onToggle={onToggle} />
                </Row>
                <Row g={8}>
                    {["Suggested", "Requests", "Nearby"].map(tb => (
                        <button key={tb} onClick={() => setTab(tb)} style={{
                            flex: 1, height: 36, borderRadius: 100,
                            background: tab === tb ? t.t1 : t.s1, border: `1.5px solid ${tab === tb ? t.t1 : t.border}`,
                            color: tab === tb ? t.bg : t.t2, fontFamily: FB, fontSize: 12, fontWeight: 700, cursor: "pointer",
                            boxShadow: tab === tb ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
                        }}>{tb}{tb === "Requests" ? " (2)" : ""}</button>
                    ))}
                </Row>
            </div>

            {tab === "Suggested" && (
                <div style={{ flex: 1, position: "relative", margin: "8px 22px 0", overflow: "hidden" }}>
                    {/* Back card shadow */}
                    <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "#222", transform: "scale(0.94) translateY(8px)", opacity: 0.3 }} />

                    {/* Main card — full-photo style */}
                    <div
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerLeave={() => { if (dragging) onPointerUp(); }}
                        style={{
                            position: "absolute", inset: 0,
                            borderRadius: 24, overflow: "hidden",
                            boxShadow: "0 12px 48px rgba(0,0,0,0.2)",
                            transform: getCardTransform(),
                            transition: dragging ? "none" : "transform 0.25s ease",
                            cursor: "grab", userSelect: "none", touchAction: "none",
                        }}
                    >
                        {/* Full photo */}
                        <img src={current.avatar} alt={current.n} style={{
                            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                        }} />

                        {/* Dark gradient overlay — bottom */}
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
                            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
                        }} />

                        {/* Swipe indicator — connect */}
                        {swipeAction === "connect" && (
                            <div style={{ position: "absolute", top: 30, left: 20, zIndex: 5, padding: "8px 20px", borderRadius: 14, background: "rgba(22,163,74,0.8)", backdropFilter: "blur(8px)" }}>
                                <span style={{ fontFamily: FB, fontWeight: 800, fontSize: 16, color: "#fff" }}>✓ Connect</span>
                            </div>
                        )}
                        {swipeAction === "skip" && (
                            <div style={{ position: "absolute", top: 30, right: 20, zIndex: 5, padding: "8px 20px", borderRadius: 14, background: "rgba(220,38,38,0.8)", backdropFilter: "blur(8px)" }}>
                                <span style={{ fontFamily: FB, fontWeight: 800, fontSize: 16, color: "#fff" }}>✗ Skip</span>
                            </div>
                        )}

                        {/* Top badge — why reason */}
                        <div style={{ position: "absolute", top: 16, left: 16, zIndex: 3 }}>
                            <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", padding: "6px 14px", borderRadius: 100 }}>{current.why}</span>
                        </div>

                        {/* Level badge — top right */}
                        <div style={{ position: "absolute", top: 16, right: 16, zIndex: 3 }}>
                            <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 800, color: "#fff", background: "rgba(22,163,74,0.7)", backdropFilter: "blur(10px)", padding: "6px 14px", borderRadius: 100 }}>{current.xp}</span>
                        </div>

                        {/* Bottom info overlaid on photo */}
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px 18px", zIndex: 3 }}>
                            {/* Location */}
                            <Row g={5} ai="center" sx={{ marginBottom: 6 }}>
                                <Svg d={IC.loc} s={12} c="rgba(255,255,255,0.7)" w={1.5} />
                                <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{current.college}</span>
                            </Row>
                            {/* Name */}
                            <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 26, color: "#fff", display: "block", marginBottom: 10, letterSpacing: -0.5, lineHeight: 1.1 }}>
                                {current.n} <span style={{ fontSize: 16, opacity: 0.6 }}>✦</span>
                            </span>
                            {/* Skill pills */}
                            <Row g={6} sx={{ flexWrap: "wrap" }}>
                                {current.skills.map(s => (
                                    <span key={s} style={{
                                        fontFamily: FB, fontSize: 11, fontWeight: 700, color: "#fff",
                                        background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                                        padding: "5px 12px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.12)",
                                    }}>🔹 {s}</span>
                                ))}
                                {current.skills.length > 2 && (
                                    <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", padding: "5px 8px" }}>+{current.skills.length - 2}</span>
                                )}
                            </Row>
                        </div>
                    </div>
                </div>
            )}

            {tab === "Requests" && (
                <Col sx={{ padding: "12px 22px 24px" }} g={10}>
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
                <Col sx={{ padding: "12px 22px 24px" }} g={12}>
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
                            <button key={r} style={{ flex: 1, height: 36, borderRadius: 100, background: i === 0 ? t.t1 : t.s1, border: `1.5px solid ${t.border}`, color: i === 0 ? t.bg : t.t2, fontFamily: FB, fontSize: 12, fontWeight: 800, cursor: "pointer" }}>{r}</button>
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
                                <button style={{ padding: "6px 14px", borderRadius: 100, background: t.t1, border: "none", color: t.bg, fontFamily: FB, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>Connect</button>
                            </Col>
                        </Row>
                    ))}
                </Col>
            )}

            {/* Bottom action buttons */}
            {tab === "Suggested" && (
                <Row g={16} jc="center" sx={{ padding: "10px 22px 8px" }}>
                    <button onClick={() => handleButton("left")} style={{
                        width: 56, height: 56, borderRadius: 28, background: "rgba(220,38,38,0.1)", border: "2px solid rgba(220,38,38,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    }}>
                        <Svg d={IC.x} s={22} c="#DC2626" w={2.5} />
                    </button>
                    <button onClick={() => handleButton("right")} style={{
                        width: 56, height: 56, borderRadius: 28, background: "rgba(22,163,74,0.1)", border: "2px solid rgba(22,163,74,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    }}>
                        <Svg d={IC.check} s={22} c="#16A34A" w={2.5} />
                    </button>
                </Row>
            )}
        </Col>
    );
};

export default SocialConnect;
