import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

/* ── SOCIAL CHAT — UNIFIED INBOX ── */
const SocialChat = ({ mode, onToggle }) => {
    const t = T.s;
    const [filter, setFilter] = useState("All");

    const convos = [
        { n: "React Builders 🔥", msg: "Kiran: shipped the landing page! 🚀", time: "9:12", u: 5, group: true, ch: "R", col: "#2563EB", bg: "#EFF6FF", type: "⚡ Hack" },
        { n: "Sneha R.", msg: "Congrats on the hackathon!! 🎉", time: "10:20", u: 1, group: false, ch: "S", col: "#9333EA", bg: "#FAF5FF" },
        { n: "GATE 2026 Prep 📚", msg: "Today: DP on trees — solve by 10pm", time: "Yesterday", u: 0, group: true, ch: "G", col: "#16A34A", bg: "#E8F8EF", type: "📚 Study" },
        { n: "Dev M.", msg: "Can we collab on the OSS project?", time: "Mon", u: 0, group: false, ch: "D", col: t.orange, bg: t.orangeLo },
        { n: "Founders Circle 🎮", msg: "Pitch deck review tonight at 9pm", time: "Tue", u: 3, group: true, ch: "F", col: t.orange, bg: t.orangeLo, type: "🎮 Fun" },
        { n: "ML Paper Club 📚", msg: "New paper: Attention Is All You Need revisited", time: "Wed", u: 0, group: true, ch: "M", col: "#9333EA", bg: "#FAF5FF", type: "📚 Study" },
    ];

    const filtered = filter === "All" ? convos : filter === "DMs" ? convos.filter(c => !c.group) : convos.filter(c => c.group);

    return (
        <Col>
            <div style={{ padding: "10px 22px 14px" }}>
                <Row ai="center" jc="space-between" sx={{ marginBottom: 14 }}>
                    <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 24, color: t.t1 }}>Messages 💬</span>
                    <Row g={8} ai="center">
                        <ModeToggle mode={mode} onToggle={onToggle} />
                        <button style={{ width: 38, height: 38, borderRadius: 14, background: t.orange, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 4px 14px ${t.orangeMid}` }}>
                            <Svg d={IC.plus} s={18} c="#fff" w={2.5} />
                        </button>
                    </Row>
                </Row>
                {/* Search */}
                <div style={{ display: "flex", gap: 8, alignItems: "center", background: t.s1, border: `1px solid ${t.border}`, borderRadius: 14, padding: "11px 15px", marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <Svg d={IC.search} s={15} c={t.t2} />
                    <span style={{ fontFamily: FB, fontSize: 13, color: t.t3 }}>Search messages...</span>
                </div>
                {/* Filter tabs */}
                <Row g={8}>
                    {["All", "DMs", "Groups"].map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            flex: 1, height: 34, borderRadius: 100,
                            background: filter === f ? t.t1 : t.s1, border: `1.5px solid ${filter === f ? t.t1 : t.border}`,
                            color: filter === f ? t.bg : t.t2, fontFamily: FB, fontSize: 12, fontWeight: 700, cursor: "pointer",
                            boxShadow: filter === f ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                        }}>{f}</button>
                    ))}
                </Row>
            </div>

            {/* Conversation list */}
            {filtered.map((c, i) => (
                <Row key={i} g={12} ai="center" sx={{ padding: "13px 22px", borderBottom: `1px solid ${t.border}`, cursor: "pointer" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                        <div style={{ width: 52, height: 52, borderRadius: c.group ? 18 : 26, background: c.bg, border: `2px solid ${c.col}28`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 20, color: c.col }}>{c.ch}</span>
                        </div>
                        {c.group && c.type && (
                            <div style={{ position: "absolute", bottom: -3, right: -3, padding: "1px 5px", borderRadius: 6, background: t.s1, border: `1px solid ${t.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                                <span style={{ fontSize: 10 }}>{c.type.split(" ")[0]}</span>
                            </div>
                        )}
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

export default SocialChat;
