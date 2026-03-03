import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

/* ── SOCIAL HOME — DASHBOARD ── */
const SocialHome = ({ mode, onToggle, onNav }) => {
    const t = T.s;
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayIdx = today.getDay();

    /* mock streak data — which days this week were active */
    const weekActive = [true, true, false, true, true, true, false];

    const quickCards = [
        { emoji: "📬", title: "New Connections", desc: "3 suggestions", col: "#2563EB", bg: "#EFF6FF", nav: "connect" },
        { emoji: "🔥", title: "Active Groups", desc: "2 groups active", col: "#16A34A", bg: "#E8F8EF", nav: "chat" },
        { emoji: "🏆", title: "Trending Win", desc: "HackIndia winner!", col: "#9333EA", bg: "#FAF5FF", nav: "feed" },
        { emoji: "📚", title: "Study Group", desc: "DSA Prep · 4 online", col: t.orange, bg: t.orangeLo, nav: "chat" },
    ];

    const previewPosts = [
        { user: "Priya K.", college: "NIT Trichy", content: "Won HackIndia 2025! 🏆", type: "🏆 Win", col: "#16A34A", bg: "#E8F8EF", likes: 142 },
        { user: "Dev M.", college: "VIT Vellore", content: "Shipped my first full-stack project 🚀", type: "🚀 Project", col: "#2563EB", bg: "#EFF6FF", likes: 89 },
    ];

    return (
        <Col>
            {/* Greeting */}
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

            {/* Daily Challenge Hero Card */}
            <div style={{ margin: "0 22px 18px", borderRadius: 22, padding: "22px 20px", background: `linear-gradient(140deg, #FF5722, #FF8A50)`, position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(255,87,34,0.3)" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
                <div style={{ position: "absolute", bottom: -30, left: -15, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                <Row ai="center" jc="space-between" sx={{ marginBottom: 10 }}>
                    <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: 1.5, textTransform: "uppercase" }}>Daily Challenge</span>
                    <Row g={4} ai="center">
                        <Svg d={IC.fire} s={16} c="#fff" fill="#FCD34D" w={1.5} />
                        <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 15, color: "#FCD34D" }}>5</span>
                    </Row>
                </Row>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: "#fff", display: "block", marginBottom: 6, lineHeight: 1.2 }}>Share what you built today ✨</span>
                <span style={{ fontFamily: FB, fontSize: 13, color: "rgba(255,255,255,0.8)", display: "block", marginBottom: 16 }}>Post a project update and keep your streak alive!</span>
                <button style={{ padding: "10px 24px", borderRadius: 100, background: "#fff", border: "none", fontFamily: FB, fontSize: 13, fontWeight: 800, color: "#FF5722", cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}>
                    + Create Post
                </button>
            </div>

            {/* Week Activity Row */}
            <div style={{ margin: "0 22px 18px" }}>
                <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 700, color: t.t2, marginBottom: 10, display: "block" }}>This Week</span>
                <Row g={0} jc="space-between">
                    {dayNames.map((d, i) => {
                        const isToday = i === todayIdx;
                        const active = weekActive[i];
                        return (
                            <Col key={d} g={6} ai="center">
                                <span style={{ fontFamily: FB, fontSize: 10, color: isToday ? t.orange : t.t3, fontWeight: isToday ? 800 : 500 }}>{d}</span>
                                <div style={{
                                    width: 32, height: 32, borderRadius: 10,
                                    background: active ? (isToday ? t.orange : `${t.orange}20`) : t.s2,
                                    border: isToday ? `2px solid ${t.orange}` : `1.5px solid ${active ? `${t.orange}30` : t.border}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: isToday ? `0 2px 10px ${t.orangeMid}` : "none",
                                }}>
                                    {active && <Svg d={IC.check} s={14} c={isToday ? "#fff" : t.orange} w={2.5} />}
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>

            {/* Quick Cards 2×2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "0 22px 20px" }}>
                {quickCards.map((c) => (
                    <button key={c.title} onClick={() => onNav && onNav(c.nav)} style={{
                        background: t.s1, borderRadius: 18, padding: "16px 14px", border: `1px solid ${t.border}`,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.05)", cursor: "pointer", textAlign: "left",
                    }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                            <span style={{ fontSize: 20 }}>{c.emoji}</span>
                        </div>
                        <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: t.t1, display: "block", marginBottom: 2 }}>{c.title}</span>
                        <span style={{ fontFamily: FB, fontSize: 11, color: t.t2 }}>{c.desc}</span>
                    </button>
                ))}
            </div>

            {/* Feed Preview */}
            <div style={{ padding: "0 22px 24px" }}>
                <Row ai="center" jc="space-between" sx={{ marginBottom: 12 }}>
                    <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: t.t1 }}>Trending Now 🔥</span>
                    <button onClick={() => onNav && onNav("feed")} style={{ background: "none", border: "none", fontFamily: FB, fontSize: 12, fontWeight: 700, color: t.orange, cursor: "pointer" }}>See All →</button>
                </Row>
                {previewPosts.map((p, i) => (
                    <div key={i} style={{ background: t.s1, borderRadius: t.r, padding: 14, marginBottom: 10, border: `1px solid ${t.border}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                        <Row g={10} ai="center">
                            <div style={{ width: 38, height: 38, borderRadius: 19, background: `${t.orange}15`, border: `2px solid ${t.orange}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 15, color: t.orange }}>{p.user[0]}</span>
                            </div>
                            <Col g={1} sx={{ flex: 1, minWidth: 0 }}>
                                <Row ai="center" jc="space-between">
                                    <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: t.t1 }}>{p.user}</span>
                                    <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: p.col, background: p.bg, padding: "3px 8px", borderRadius: 100 }}>{p.type}</span>
                                </Row>
                                <span style={{ fontFamily: FB, fontSize: 12, color: t.t2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.content}</span>
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>
            <div style={{ height: 16 }} />
        </Col>
    );
};

export default SocialHome;
