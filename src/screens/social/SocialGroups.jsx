import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

/* ── SOCIAL GROUPS ── */
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
                {/* 2-col grid */}
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

                {/* Create CTA */}
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

export default SocialGroups;
