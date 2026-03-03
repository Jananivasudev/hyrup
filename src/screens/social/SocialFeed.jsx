import { useState, useRef } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

/* ── SWIPEABLE SOCIAL FEED — STACKED FULL-IMAGE CARDS ── */
const SocialFeed = ({ mode, onToggle }) => {
    const t = T.s;
    const [filter, setFilter] = useState(0);
    const [cardIdx, setCardIdx] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [swipeAction, setSwipeAction] = useState(null);
    const startX = useRef(0);
    const [showCreate, setShowCreate] = useState(false);

    const posts = [
        { user: "Priya K.", college: "NIT Trichy", avatar: "/images/profile_sneha.png", content: "Won 1st place at HackIndia 2025! 🏆 Built an AI resume analyzer in 24hrs.", type: "🏆 Win", likes: 142, comments: 28, time: "2h", postImg: "/images/post_graphic.png" },
        { user: "Dev M.", college: "VIT Vellore", avatar: "/images/profile_kiran.png", content: "Shipped my first full-stack project 🚀 Real-time collaborative editor with WebSockets.", type: "🚀 Project", likes: 89, comments: 15, time: "5h", postImg: "/images/profile_kiran.png" },
        { user: "Ananya T.", college: "SRM Chennai", avatar: "/images/profile_ananya.png", content: "Just cleared my AWS Solutions Architect cert! 🎯 3 months of prep, totally worth it.", type: "💡 Thought", likes: 203, comments: 42, time: "8h", postImg: "/images/profile_ananya.png" },
        { user: "Kiran B.", college: "LPU Punjab", avatar: "/images/profile_kiran.png", content: "Our startup just got accepted into Y Combinator's startup school! 🚀", type: "🏆 Win", likes: 318, comments: 67, time: "1d", postImg: "/images/post_graphic.png" },
    ];

    const current = posts[cardIdx % posts.length];

    const onPointerDown = (e) => {
        startX.current = e.clientX;
        setDragging(true);
        setSwipeAction(null);
    };
    const onPointerMove = (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX.current;
        setDragX(dx);
        if (dx < -40) setSwipeAction("left");
        else if (dx > 40) setSwipeAction("right");
        else setSwipeAction(null);
    };
    const onPointerUp = () => {
        setDragging(false);
        if (Math.abs(dragX) > 80) {
            if (dragX < 0) {
                setCardIdx(i => i + 1);
            } else {
                setSwipeAction("bookmarked");
                setTimeout(() => setSwipeAction(null), 600);
            }
        }
        setDragX(0);
    };

    return (
        <Col sx={{ height: "100%", position: "relative" }}>
            {/* Header */}
            <div style={{ padding: "10px 22px 14px" }}>
                <Row ai="center" jc="space-between" sx={{ marginBottom: 14 }}>
                    <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 24, color: t.t1 }}>Feed ✦</span>
                    <ModeToggle mode={mode} onToggle={onToggle} />
                </Row>
                {/* Filter chips */}
                <Row g={8} sx={{ overflowX: "auto" }}>
                    {["For You", "My College", "My Domain", "National"].map((f, i) => (
                        <button key={f} onClick={() => setFilter(i)} style={{
                            flexShrink: 0, padding: "8px 16px", borderRadius: 100, fontFamily: FB, fontSize: 12, fontWeight: 700,
                            background: filter === i ? t.t1 : t.s2, color: filter === i ? t.bg : t.t2,
                            border: `1.5px solid ${filter === i ? t.t1 : t.border}`, cursor: "pointer",
                            boxShadow: filter === i ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
                        }}>{f}</button>
                    ))}
                </Row>
            </div>

            {/* Stacked Card Area */}
            <div style={{ flex: 1, position: "relative", margin: "0 22px", overflow: "hidden" }}>
                {/* Stack shadow cards behind */}
                <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "#ddd", transform: "scale(0.9) translateY(16px)", opacity: 0.25 }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "#ccc", transform: "scale(0.95) translateY(8px)", opacity: 0.4 }} />

                {/* Current card — full-image event style */}
                <div
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={() => { if (dragging) onPointerUp(); }}
                    style={{
                        position: "absolute", inset: 0,
                        borderRadius: 24, overflow: "hidden",
                        boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
                        transform: `translateX(${dragX}px) rotate(${dragX * 0.03}deg)`,
                        transition: dragging ? "none" : "transform 0.3s ease",
                        cursor: "grab", userSelect: "none", touchAction: "none",
                    }}
                >
                    {/* Full background image */}
                    <img src={current.postImg || current.avatar} alt="" style={{
                        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                    }} />

                    {/* Dark gradient — top for user info */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "40%",
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
                    }} />

                    {/* Dark gradient — bottom for content */}
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
                        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                    }} />

                    {/* Swipe indicators */}
                    {swipeAction === "right" && (
                        <div style={{ position: "absolute", top: 60, left: 20, zIndex: 5, padding: "8px 20px", borderRadius: 14, background: "rgba(22,163,74,0.85)", backdropFilter: "blur(8px)" }}>
                            <span style={{ fontFamily: FB, fontWeight: 800, fontSize: 15, color: "#fff" }}>🔖 Saved</span>
                        </div>
                    )}
                    {swipeAction === "left" && (
                        <div style={{ position: "absolute", top: 60, right: 20, zIndex: 5, padding: "8px 20px", borderRadius: 14, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                            <span style={{ fontFamily: FB, fontWeight: 800, fontSize: 15, color: "#fff" }}>Next →</span>
                        </div>
                    )}

                    {/* Top — user info overlaid */}
                    <div style={{ position: "absolute", top: 14, left: 16, right: 16, zIndex: 3 }}>
                        <Row g={10} ai="center" jc="space-between">
                            <Row g={8} ai="center">
                                <img src={current.avatar} alt="" style={{ width: 36, height: 36, borderRadius: 18, objectFit: "cover", border: "2px solid rgba(255,255,255,0.4)" }} />
                                <Col g={1}>
                                    <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: "#fff" }}>{current.user}</span>
                                    <span style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.65)" }}>{current.college}</span>
                                </Col>
                            </Row>
                            <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", padding: "5px 12px", borderRadius: 100 }}>{current.type}</span>
                        </Row>
                    </div>

                    {/* Bottom — content + engagement */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px 16px", zIndex: 3 }}>
                        <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.35, margin: "0 0 14px", letterSpacing: -0.3 }}>
                            {current.content}
                        </p>

                        {/* Engagement row */}
                        <Row g={0} ai="center">
                            <Row g={4} ai="center" sx={{ marginRight: 18 }}>
                                <Svg d={IC.heart} s={18} c="#fff" />
                                <span style={{ fontFamily: FB, fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{current.likes}</span>
                            </Row>
                            <Row g={4} ai="center" sx={{ marginRight: 18 }}>
                                <Svg d={IC.chat} s={18} c="#fff" />
                                <span style={{ fontFamily: FB, fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{current.comments}</span>
                            </Row>
                            <button style={{ background: "none", border: "none", cursor: "pointer", marginRight: 12 }}>
                                <Svg d={IC.share} s={18} c="#fff" />
                            </button>
                            <button style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "auto" }}>
                                <Svg d={IC.bmark} s={18} c="#fff" />
                            </button>
                        </Row>
                    </div>
                </div>

                {/* Bookmark toast */}
                {swipeAction === "bookmarked" && (
                    <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 10, padding: "10px 22px", borderRadius: 100, background: t.t1, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                        <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: t.bg }}>🔖 Post Saved!</span>
                    </div>
                )}
            </div>

            {/* Swipe hint */}
            <div style={{ textAlign: "center", padding: "10px 0 6px" }}>
                <span style={{ fontFamily: FB, fontSize: 11, color: t.t3 }}>← swipe left for next · swipe right to save →</span>
            </div>

            {/* Floating Create Button */}
            <button onClick={() => setShowCreate(!showCreate)} style={{
                position: "absolute", bottom: 14, right: 22,
                width: 50, height: 50, borderRadius: 25,
                background: t.orange, border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", boxShadow: `0 8px 24px ${t.orangeMid}`, zIndex: 20,
            }}>
                <Svg d={IC.plus} s={22} c="#fff" w={2.5} />
            </button>
        </Col>
    );
};

export default SocialFeed;
