import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

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

export default CareerChat;
