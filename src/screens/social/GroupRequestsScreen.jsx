import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';

/* ── GROUP REQUESTS SCREEN ── */
const GroupRequestsScreen = ({ onBack }) => {
    const t = T.s;
    const [requests, setRequests] = useState([
        {
            id: 'greq_1',
            name: "Ananya",
            group: "React Builders",
            time: "2m ago",
            avatar: { ch: "A", col: "#0D9488", bg: "#F0FDFA" }
        },
        {
            id: 'greq_2',
            name: "Rahul",
            group: "UI/UX Crew",
            time: "1h ago",
            avatar: { ch: "R", col: "#9333EA", bg: "#FAF5FF" }
        },
        {
            id: 'greq_3',
            name: "Meera",
            group: "Open Source Squad",
            time: "3h ago",
            avatar: { ch: "M", col: "#EA580C", bg: "#FFF7ED" }
        }
    ]);

    const handleAction = (id, action) => {
        console.log(`Request ${action}: ${id}`);
        setRequests(prev => prev.filter(r => r.id !== id));
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
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 22, color: "#111111" }}>Group Requests</span>
                </Row>
            </Row>

            {/* List */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
                {requests.length > 0 ? (
                    <Col>
                        {requests.map((r) => (
                            <Row key={r.id} g={12} ai="center" sx={{ 
                                padding: "12px 0", 
                                borderBottom: "0.5px solid rgba(0,0,0,0.07)",
                                minHeight: 72
                            }}>
                                {/* Avatar */}
                                <div style={{ width: 38, height: 38, borderRadius: "50%", background: r.avatar.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: r.avatar.col }}>{r.avatar.ch}</span>
                                </div>

                                {/* Text Content */}
                                <Col g={2} sx={{ flex: 1, minWidth: 0 }}>
                                    <span style={{ 
                                        fontFamily: FB, fontWeight: 500, fontSize: 13, color: "#1A1A1A", lineHeight: 1.4
                                    }}>
                                        <span style={{ fontWeight: 700 }}>{r.name}</span> wants to join <span style={{ fontWeight: 700 }}>{r.group}</span>
                                    </span>
                                    <span style={{ fontFamily: FB, fontSize: 11, color: "#888888" }}>{r.time}</span>
                                </Col>

                                {/* Action Buttons */}
                                <Row g={8} sx={{ flexShrink: 0 }}>
                                    <button 
                                        onClick={() => handleAction(r.id, "Accept")}
                                        style={{ 
                                            width: 32, height: 32, borderRadius: 16, 
                                            background: "#E8F5E9", border: "none", 
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Svg d={IC.check || "M5 13l4 4L19 7"} s={16} c="#2E7D32" w={3} />
                                    </button>
                                    <button 
                                        onClick={() => handleAction(r.id, "Decline")}
                                        style={{ 
                                            width: 32, height: 32, borderRadius: 16, 
                                            background: "#FFEBEE", border: "none", 
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Svg d={IC.x || "M6 18L18 6M6 6l12 12"} s={16} c="#C62828" w={3} />
                                    </button>
                                </Row>
                            </Row>
                        ))}
                    </Col>
                ) : (
                    <Col jc="center" ai="center" sx={{ flex: 1, marginTop: 100 }}>
                        <span style={{ fontFamily: FB, fontSize: 14, color: "#AAAAAA" }}>No pending group requests</span>
                    </Col>
                )}
            </div>
        </Col>
    );
};

export default GroupRequestsScreen;
