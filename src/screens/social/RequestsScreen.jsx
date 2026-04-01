import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';

/* ── MESSAGE REQUESTS SCREEN ── */
const RequestsScreen = ({ onBack, onOpenChat }) => {
    const t = T.s;
    const [requests, setRequests] = useState([
        {
            id: 'req_1',
            name: "Alex T.",
            preview: "Hey! Saw your project 👀",
            time: "2m ago",
            unread: true,
            avatar: { ch: "A", col: "#2563EB", bg: "#EFF6FF" }
        },
        {
            id: 'req_2',
            name: "Priya K.",
            preview: "Can we connect on this?",
            time: "1h ago",
            unread: false,
            avatar: { ch: "P", col: "#059669", bg: "#ECFDF5" }
        },
        {
            id: 'req_3',
            name: "Jordan M.",
            preview: "Loved your submission!",
            time: "3h ago",
            unread: false,
            avatar: { ch: "J", col: "#D97706", bg: "#FFFBEB" }
        }
    ]);

    const [contextMenu, setContextMenu] = useState(null);

    const handleAction = (id, action) => {
        console.log(`${action} request: ${id}`);
        setRequests(prev => prev.filter(r => r.id !== id));
        setContextMenu(null);
    };

    return (
        <Col sx={{ width: "100%", height: "100%", background: t.bg }}>
            {/* Header */}
            <Row ai="center" jc="space-between" sx={{ padding: "10px 16px", marginBottom: 12 }}>
                <Row ai="center" g={12}>
                    <button 
                        onClick={onBack}
                        style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}
                    >
                        <Svg d="M15 18l-6-6 6-6" s={20} c="#111111" />
                    </button>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 22, color: "#111111" }}>Message Requests</span>
                </Row>
            </Row>

            {/* List */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
                {requests.length > 0 ? (
                    <Col>
                        {requests.map((r) => (
                            <div
                                key={r.id}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    setContextMenu({ id: r.id, x: e.clientX, y: e.clientY });
                                }}
                                style={{ position: "relative" }}
                            >
                                <Row g={12} ai="center" sx={{ height: 72, borderBottom: "0.5px solid #F0F0F0", cursor: "pointer" }}>
                                    {/* Avatar */}
                                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: r.avatar.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 18, color: r.avatar.col }}>{r.avatar.ch}</span>
                                    </div>

                                    {/* Text Content */}
                                    <Col g={2} sx={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ fontFamily: FB, fontWeight: 600, fontSize: 15, color: "#111111" }}>{r.name}</span>
                                        <span style={{ fontFamily: FB, fontSize: 13, color: r.unread ? "#111111" : "#888888", fontWeight: r.unread ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {r.preview}
                                        </span>
                                    </Col>

                                    {/* Time */}
                                    <Col ai="flex-end" sx={{ flexShrink: 0 }}>
                                        <span style={{ fontFamily: FB, fontSize: 12, color: "#AAAAAA" }}>{r.time}</span>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </Col>
                ) : (
                    <Col jc="center" ai="center" sx={{ flex: 1, marginTop: 100 }}>
                        <Svg d={IC.chat} s={48} c="#DDDDDD" />
                        <span style={{ fontFamily: FB, fontSize: 16, color: "#AAAAAA", marginTop: 16 }}>No message requests</span>
                    </Col>
                )}
            </div>

            {/* Context Menu (for Accept/Decline) */}
            {contextMenu && (
                <div 
                    style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}
                    onClick={() => setContextMenu(null)}
                >
                    <div style={{
                        position: "absolute",
                        top: contextMenu.y,
                        left: Math.min(contextMenu.x, window.innerWidth - 140),
                        background: "#FFF",
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        padding: "8px 0",
                        width: 120,
                        zIndex: 1001
                    }}>
                        <button 
                            onClick={() => handleAction(contextMenu.id, "Accept")}
                            style={{ width: "100%", padding: "10px 16px", border: "none", background: "transparent", textAlign: "left", color: "#16A34A", fontWeight: 600, cursor: "pointer", fontFamily: FB }}
                        >
                            Accept
                        </button>
                        <button 
                            onClick={() => handleAction(contextMenu.id, "Decline")}
                            style={{ width: "100%", padding: "10px 16px", border: "none", background: "transparent", textAlign: "left", color: "#DC2626", fontWeight: 600, cursor: "pointer", fontFamily: FB }}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            )}
        </Col>
    );
};

export default RequestsScreen;
