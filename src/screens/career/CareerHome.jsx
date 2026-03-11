import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';
import SwipeScreen from './SwipeScreen.jsx';

/* ── CAREER HOME — V2.1 (Placement Readiness + Next Actions) ── */
const CareerHome = ({ mode, onToggle, appliedCount = 0, addXP }) => {
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
                {/* Header */}
                <div style={{ padding: "10px 22px 16px" }}>
                    <Row ai="flex-start" jc="space-between">
                        <Col g={2}>
                            <span style={{ fontFamily: FB, fontSize: 12, color: t.t2, fontWeight: 500 }}>Good morning</span>
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

                {/* ── Placement Readiness Hero (V2.1) ── */}
                <div style={{ margin: "0 22px 20px", borderRadius: 24, background: t.s1, position: "relative", overflow: "hidden", padding: "22px 20px", boxShadow: t.shadow }}>
                    <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: t.orangeLo, filter: "blur(60px)" }} />
                    <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, borderRadius: "50%", background: t.orangeLo, filter: "blur(40px)" }} />
                    <img src="/assets/images/career_hero.png" alt="Placement Readiness" style={{ position: 'absolute', right: -20, bottom: -10, width: 140, objectFit: 'contain', mixBlendMode: 'multiply', opacity: 0.8 }} />
                    <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: t.orange, letterSpacing: 2, position: "relative", zIndex: 1, display: "block", marginBottom: 8, textTransform: "uppercase" }}>PLACEMENT READY</span>
                    <span style={{ fontFamily: FD, fontSize: 52, fontWeight: 900, color: t.t1, position: "relative", zIndex: 1, display: "block", lineHeight: 1, marginBottom: 8 }}>47<span style={{ fontSize: 28, fontWeight: 500, color: t.t2 }}>%</span></span>
                    <div style={{ position: "relative", zIndex: 1, height: 6, background: t.s2, borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
                        <div style={{ width: "47%", height: "100%", background: `linear-gradient(90deg, ${t.orange}, #FFB36B)`, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontFamily: FB, fontSize: 12, color: t.t2, position: "relative", zIndex: 1, display: "block", marginBottom: 14 }}>3 actions to move forward this week</span>
                    <button style={{ height: 38, borderRadius: 100, padding: "0 20px", background: t.orange, border: "none", color: "#fff", fontFamily: FB, fontSize: 13, fontWeight: 700, cursor: "pointer", position: "relative", zIndex: 1, boxShadow: `0 4px 16px ${t.orange}40` }}>
                        View Roadmap →
                    </button>
                </div>

                {/* ── Next 3 Actions Row (V2.1) ── */}
                <div style={{ padding: "0 22px 20px", overflowX: "auto" }}>
                    <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 700, color: t.t2, letterSpacing: 1, display: "block", marginBottom: 10 }}>NEXT ACTIONS</span>
                    <Row g={10}>
                        {[
                            { icon: IC.check, label: "Verify React", xp: 40 },
                            { icon: IC.brief, label: "Apply to 3 jobs", xp: 75 },
                            { icon: IC.img, label: "Add 1 project", xp: 30 },
                        ].map((a, i) => (
                            <div key={i} style={{ flex: 1, background: t.s1, borderRadius: 16, padding: "14px 12px", border: "none", boxShadow: t.shadow, minWidth: 100 }}>
                                <div style={{ width: 32, height: 32, borderRadius: 10, background: t.orangeLo, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                                    <Svg d={a.icon} s={16} c={t.orange} w={1.8} />
                                </div>
                                <span style={{ fontFamily: FB, fontWeight: 600, fontSize: 12, color: t.t1, display: "block", marginBottom: 4 }}>{a.label}</span>
                                <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: t.orange }}>+{a.xp} XP</span>
                            </div>
                        ))}
                    </Row>
                </div>

                {/* ── 4-stat row (V2.1 — added Recruiter Views) ── */}
                <Row g={8} sx={{ padding: "0 22px 20px" }}>
                    {[[String(appliedCount), "Applied", t.orange], ["3", "Shortlisted", T.c.green], ["48", "Views", T.c.blue], ["3", "Recruiter\nViews", "#9333EA"]].map(([n, l, col]) => (
                        <div key={l} style={{ flex: 1, background: t.s1, borderRadius: 16, padding: "14px 8px", border: "none", boxShadow: t.shadow, textAlign: "center" }}>
                            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: col, display: "block", lineHeight: 1 }}>{n}</span>
                            <span style={{ fontFamily: FB, fontSize: 9, color: t.t2, marginTop: 3, display: "block", whiteSpace: "pre-line" }}>{l}</span>
                        </div>
                    ))}
                </Row>

                {/* Section label */}
                <Row ai="center" jc="space-between" sx={{ padding: "0 22px 12px" }}>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 17, color: t.t1 }}>Matched for you</span>
                    <span style={{ fontFamily: FB, fontSize: 12, color: t.orange, fontWeight: 600 }}>See all →</span>
                </Row>

                {/* Quick Apply CTA */}
                <div onClick={() => setShowSwipe(true)} style={{
                    margin: "0 22px 20px", borderRadius: 24,
                    background: t.s1,
                    border: "none",
                    padding: "18px 20px", cursor: "pointer", position: "relative", overflow: "hidden",
                    boxShadow: t.shadow,
                }}>
                    <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: t.orangeLo, filter: "blur(50px)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: t.orangeLo, filter: "blur(40px)", pointerEvents: "none" }} />

                    <Row ai="center" jc="space-between" sx={{ position: "relative", zIndex: 1 }}>
                        <Col g={6}>
                            <Row g={8} ai="center" sx={{ marginBottom: 4 }}>
                                <div style={{ display: "flex", gap: 3 }}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{ width: i === 1 ? 24 : 16, height: 5, borderRadius: 3, background: i === 0 ? "rgba(239,68,68,0.7)" : i === 1 ? t.orange : "rgba(34,197,94,0.7)" }} />
                                    ))}
                                </div>
                                <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: t.orange, letterSpacing: 1.2 }}>QUICK APPLY</span>
                            </Row>
                            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: t.t1, lineHeight: 1.2 }}>
                                5 jobs waiting<br />for your decision
                            </span>
                            <span style={{ fontFamily: FB, fontSize: 12, color: t.t2, marginTop: 2 }}>
                                Swipe right to apply · left to skip
                            </span>
                        </Col>
                        <div style={{ position: "relative", width: 64, height: 80, flexShrink: 0 }}>
                            {[2, 1, 0].map(i => (
                                <div key={i} style={{
                                    position: "absolute", width: 52, height: 70,
                                    background: t.s2,
                                    border: `1px solid ${t.border}`,
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

                {/* Horizontal job cards */}
                <div style={{ display: "flex", gap: 12, padding: "0 22px 20px", overflowX: "auto" }}>
                    {jobs.map((j, i) => (
                        <div key={i} style={{ background: t.s1, borderRadius: 24, padding: 16, minWidth: 188, border: "none", boxShadow: t.shadow, flexShrink: 0 }}>
                            <Row g={10} ai="center" sx={{ marginBottom: 12 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 14, background: t.s2, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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

                {/* News strip */}
                <Row ai="center" jc="space-between" sx={{ padding: "0 22px 10px" }}>
                    <Row g={6} ai="center"><Svg d={IC.zap} s={16} c={t.orange} fill={t.orange} w={0} /><span style={{ fontFamily: FD, fontWeight: 700, fontSize: 17, color: t.t1 }}>Tech Pulse</span></Row>
                    <span style={{ fontFamily: FB, fontSize: 12, color: t.orange, fontWeight: 600 }}>More →</span>
                </Row>
                {[
                    { h: "Anthropic raises $2B — AI talent demand surges across India", src: "TechCrunch", time: "2h" },
                    { h: "Top 10 skills hiring managers want in 2025 interns", src: "Forbes", time: "5h" },
                ].map((n, i) => (
                    <div key={i} style={{ margin: "0 22px 10px", display: "flex", gap: 12, padding: "14px", background: t.s1, borderRadius: 20, border: "none", boxShadow: t.shadow, alignItems: "center" }}>
                        <div style={{ width: 46, height: 46, borderRadius: 13, background: t.s2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Svg d={IC.zap} s={20} c={t.orange} />
                        </div>
                        <Col g={4} sx={{ flex: 1 }}>
                            <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: t.t1, lineHeight: 1.4 }}>{n.h}</span>
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

export default CareerHome;
