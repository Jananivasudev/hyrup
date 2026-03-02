import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

/* ── SOCIAL CONNECT ── */
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

export default SocialConnect;
