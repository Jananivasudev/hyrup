import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

/* ── SOCIAL FEED ── */
const SocialFeed = ({ mode, onToggle }) => {
    const t = T.s;
    const [filter, setFilter] = useState(0);

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
            {/* Greeting header */}
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

            {/* Friend circles */}
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

            {/* Create post */}
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

            {/* Posts */}
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

export default SocialFeed;
