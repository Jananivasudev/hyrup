import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

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

export default SocialChat;
