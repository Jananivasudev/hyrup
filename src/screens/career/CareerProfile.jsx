import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

/* ═══════════════════════════════════════════════════════════════════════
   CAREER PROFILE — V2.1 (Open To pills, career goal, XP badge)
═══════════════════════════════════════════════════════════════════════ */
const CareerProfile = ({ mode, onToggle, xp = 280, streak = 5 }) => {
    const t = T.c;
    const [activeTab, setActiveTab] = useState(0);

    /* ── Open To pills (V2.1) ── */
    const openToItems = [
        { label: "Internship", active: true },
        { label: "Freelance", active: true },
        { label: "Full-time", active: false },
        { label: "Collab", active: true },
    ];

    /* ── Career Goal (V2.1) ── */
    const careerGoal = "Frontend Dev → Product Startup → July 2026";

    return (
        <Col>
            {/* Cover */}
            <div style={{ height: 160, background: `linear-gradient(160deg, #FFF1EB 0%, #FFE4D6 50%, #F5F0E8 100%)`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 65% 40%, ${t.orangeMid}, transparent 60%)`, opacity: 0.6 }} />
                <div style={{ position: "absolute", top: 14, right: 18 }}>
                    <ModeToggle mode={mode} onToggle={onToggle} />
                </div>
                {/* Edit profile button */}
                <button style={{
                    position: "absolute", top: 14, left: 18,
                    height: 32, padding: "0 12px", borderRadius: 100,
                    background: "rgba(0,0,0,0.5)", border: "none", backdropFilter: "blur(8px)",
                    color: "#fff", fontFamily: FB, fontSize: 11, fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                }}>
                    <Svg d={IC.pencil} s={12} c="#fff" w={1.5} /> Edit
                </button>
                {/* Avatar */}
                <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)" }}>
                    <div style={{ width: 72, height: 72, borderRadius: 24, background: t.s2, border: `3px solid ${t.bg}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 28, color: t.orange }}>R</span>
                        {/* XP Badge (V2.1) */}
                        <div style={{
                            position: "absolute", bottom: -6, right: -10,
                            background: `linear-gradient(135deg, ${t.orange}, ${T.c.gold})`,
                            borderRadius: 100, padding: "2px 8px",
                            border: `2px solid ${t.bg}`, boxShadow: `0 2px 8px ${t.orange}40`,
                        }}>
                            <span style={{ fontFamily: FB, fontSize: 9, fontWeight: 800, color: "#fff" }}>Lv {Math.floor(xp / 100) + 1}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ paddingTop: 38, textAlign: "center", padding: "38px 22px 0" }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: t.t1, display: "block", marginBottom: 2 }}>Rahul Sharma</span>
                <span style={{ fontFamily: FB, fontSize: 12, color: t.t2, display: "block", marginBottom: 8 }}>B.Tech CSE · RGPV Bhopal · 2026</span>

                {/* Career Goal (V2.1) */}
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: t.orangeLo, borderRadius: 100, padding: "5px 14px",
                    border: `1px solid ${t.orange}20`, marginBottom: 16,
                }}>
                    <Svg d={IC.target} s={12} c={t.orange} w={1.5} />
                    <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: t.orange }}>{careerGoal}</span>
                </div>

                {/* XP & Streak bar (V2.1) */}
                <Row g={10} sx={{ marginBottom: 16 }}>
                    <div style={{ flex: 1, background: t.s1, borderRadius: 16, padding: "12px 14px", border: "none", boxShadow: t.shadow }}>
                        <Row g={6} ai="center">
                            <Svg d={IC.zap} s={14} c={t.orange} fill={t.orange} w={0} />
                            <Col g={1}>
                                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: t.orange }}>{xp} XP</span>
                                <span style={{ fontFamily: FB, fontSize: 10, color: t.t3 }}>Level {Math.floor(xp / 100) + 1}</span>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ flex: 1, background: t.s1, borderRadius: 16, padding: "12px 14px", border: "none", boxShadow: t.shadow }}>
                        <Row g={6} ai="center">
                            <Svg d={IC.flame} s={14} c={T.c.gold} fill={T.c.gold} w={0} />
                            <Col g={1}>
                                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.c.gold }}>{streak} day</span>
                                <span style={{ fontFamily: FB, fontSize: 10, color: t.t3 }}>Streak</span>
                            </Col>
                        </Row>
                    </div>
                </Row>

                {/* Stats row */}
                <Row ai="center" jc="center" g={0} sx={{ marginBottom: 18, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: "14px 0" }}>
                    {[["47", "Connections"], ["7", "Skills"], ["2", "Wins"], ["12", "Applied"]].map(([n, l], i, arr) => (
                        <div key={l} style={{ flex: 1, textAlign: "center", borderRight: i < arr.length - 1 ? `1px solid ${t.border}` : "none" }}>
                            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: t.t1, display: "block" }}>{n}</span>
                            <span style={{ fontFamily: FB, fontSize: 10, color: t.t2 }}>{l}</span>
                        </div>
                    ))}
                </Row>

                {/* Open To pills (V2.1) */}
                <div style={{ textAlign: "left", marginBottom: 18 }}>
                    <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 700, color: t.t2, letterSpacing: 0.5, display: "block", marginBottom: 8 }}>OPEN TO</span>
                    <Row g={8} sx={{ flexWrap: "wrap" }}>
                        {openToItems.map(item => (
                            <span key={item.label} style={{
                                fontFamily: FB, fontSize: 12, fontWeight: 600,
                                color: item.active ? t.orange : t.t3,
                                background: item.active ? t.orangeLo : t.s2,
                                padding: "6px 14px", borderRadius: 100,
                                border: `1px solid ${item.active ? t.orange + "30" : t.border}`,
                            }}>
                                {item.active ? <><Svg d={IC.check} s={10} c={t.orange} w={2} /> </> : null}
                                {item.label}
                            </span>
                        ))}
                    </Row>
                </div>

                {/* Skill badges */}
                <Row g={6} jc="center" sx={{ flexWrap: "wrap", marginBottom: 18 }}>
                    {[["React", t.orange], ["Node.js", T.c.green], ["Figma", "#A78BFA"], ["MongoDB", "#22C55E"]].map(([s, col]) => (
                        <span key={s} style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: col, background: `${col}15`, padding: "5px 12px", borderRadius: 100, display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <Svg d={IC.check} s={10} c={col} w={2} /> {s}
                        </span>
                    ))}
                </Row>

                {/* AI Resume button */}
                <button style={{ width: "100%", height: 46, borderRadius: 14, background: t.orange, border: "none", color: "#fff", fontFamily: FB, fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <Svg d={IC.spark} s={15} c="#fff" /> AI Resume Builder
                </button>

                {/* Tab view */}
                <Row g={0} sx={{ borderBottom: `1px solid ${t.border}`, marginBottom: 16 }}>
                    {[["grid", IC.grid], ["spark", IC.spark], ["bmark", IC.bmark]].map(([id, ic], idx) => (
                        <div key={id} onClick={() => setActiveTab(idx)} style={{ flex: 1, display: "flex", justifyContent: "center", padding: "10px 0", borderBottom: activeTab === idx ? `2px solid ${t.orange}` : "none", cursor: "pointer" }}>
                            <Svg d={ic} s={18} c={activeTab === idx ? t.orange : t.t3} />
                        </div>
                    ))}
                </Row>

                {/* Project grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
                    {["Todo App", "Weather UI", "Chat Bot", "Portfolio", "E-Comm", "Resume AI"].map((p, i) => {
                        const bgs = ["#FFF1EB", "#EFF6FF", "#FAF5FF", "#FEF3C7", "#E8F8EF", "#FFF1EB"];
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

export default CareerProfile;
