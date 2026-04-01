import { useState, useRef } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';

/* ── SOCIAL CHAT — MESSAGES ── */
const SocialChat = ({ onNewDM, onNewGroup, onDiscoverGroups, onOpenChat, onOpenGroupChat, onOpenRequests, onOpenGroupRequests }) => {
    const t = T.s;
    const [activeTab, setActiveTab] = useState("dms");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [fabMenuVisible, setFabMenuVisible] = useState(false);

    const [dmsData, setDmsData] = useState([
        {
            id: 'dm_1',
            name: "Sneha R.",
            preview: "Congrats on the hackathon!! 🎉",
            time: "10:20",
            unread: 1,
            avatar: { ch: "S", col: "#9333EA", bg: "#FAF5FF" },
            isPinned: false,
            isMuted: false
        },
        {
            id: 'dm_2',
            name: "Dev M.",
            preview: "Can we collab on the OSS project?",
            time: "Mon",
            unread: 0,
            avatar: { ch: "D", col: t.orange, bg: t.orangeLo },
            isPinned: false,
            isMuted: false
        }
    ]);

    const [contextMenu, setContextMenu] = useState(null); // { type: 'dms' | 'groups', item, rect }
    const timerRef = useRef(null);

    const handlePointerDown = (e, item, type) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        timerRef.current = setTimeout(() => {
            setContextMenu({ type, item, rect });
        }, 400);
    };

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const [groupsData, setGroupsData] = useState([
        {
            id: 1,
            name: "React Builders",
            privacy: "public",
            totalMembers: 12,
            overflowLabel: "+9",
            memberPreview: "Alex, Jordan, Sam...",
            isPinned: false,
            isMuted: false,
            hasUnread: false
        },
        {
            id: 2,
            name: "GATE 2026 Prep",
            privacy: "private",
            totalMembers: 6,
            overflowLabel: "+3",
            memberPreview: "Priya, Rahul, Dev...",
            isPinned: false,
            isMuted: false,
            hasUnread: false
        },
        {
            id: 3,
            name: "UI/UX Designers",
            privacy: "public",
            totalMembers: 8,
            overflowLabel: "+5",
            memberPreview: "Mia, Leo, Sara...",
            isPinned: false,
            isMuted: false,
            hasUnread: false
        },
        {
            id: 4,
            name: "Startup Founders",
            privacy: "private",
            totalMembers: 5,
            overflowLabel: "+2",
            memberPreview: "Arjun, Nina, Chris...",
            isPinned: false,
            isMuted: false,
            hasUnread: false
        }
    ]);

    const filteredDMs = dmsData
        .filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.preview.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return 0;
        });
    const filteredGroups = groupsData
        .filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            if (a.isPinned && b.isPinned) {
                return (b.pinTime || 0) - (a.pinTime || 0);
            }
            return 0;
        });

    const tabs = [
        { id: "dms", label: "DMs" },
        { id: "groups", label: "Groups" }
    ];

    return (
        <Col sx={{ width: "100%", height: "100%", position: "relative", background: t.bg }}>
            <div style={{ padding: "0" }}>
                {/* 1_top_bar */}
                <Row ai="center" jc="space-between" sx={{ padding: "10px 16px 0", marginBottom: 12 }}>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 26, color: "#111111" }}>Messages</span>
                </Row>

                {/* 2_tab_bar */}
                <div style={{ padding: "0 16px", marginTop: 12, marginBottom: 0 }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        width: "100%"
                    }}>
                        {tabs.map(tab => {
                            const active = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        width: "calc(50% - 4px)",
                                        height: 42,
                                        background: active ? "#111111" : "#F0F0F0",
                                        color: active ? "#FFFFFF" : "#888888",
                                        borderRadius: 12,
                                        fontFamily: FB,
                                        fontSize: 15,
                                        fontWeight: 600,
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "background 0.2s, color 0.2s"
                                    }}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 3_search_bar */}
                <div style={{ padding: "0 16px", marginTop: 10, marginBottom: 12 }}>
                    <div style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        background: "#F5F5F5",
                        borderRadius: 12,
                        padding: "10px 16px",
                        border: isSearchFocused ? "1.5px solid #FF5733" : "1.5px solid transparent",
                        transition: "border 0.2s",
                    }}>
                        <Svg d={IC.search} s={16} c="#AAAAAA" />
                        <input
                            type="text"
                            placeholder={activeTab === "dms" ? "Search messages..." : "Search groups..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                fontFamily: FB,
                                fontSize: 14,
                                color: "#111111",
                            }}
                        />
                    </div>
                </div>
            </div>
            
            {/* 4_requests_bar */}
            {activeTab === "dms" && (
                <div 
                    onClick={onOpenRequests}
                    style={{
                        padding: "0 16px",
                        cursor: "pointer",
                    }}
                >
                    <Row g={12} ai="center" sx={{ height: 64, borderBottom: "0.5px solid #F0F0F0", position: "relative" }}>
                        <div style={{ width: 42, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Svg d={IC.mail || "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"} s={22} c="#1A1A1A" />
                        </div>
                        <Col g={1} sx={{ flex: 1, minWidth: 0 }}>
                            <span style={{ fontFamily: FB, fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Message Requests</span>
                            <span style={{ fontFamily: FB, fontSize: 12, color: "#888888" }}>3 requests</span>
                        </Col>
                        <Col ai="flex-end" sx={{ flexShrink: 0 }}>
                            <Svg d="M9 18l6-6-6-6" s={14} c="#AAAAAA" />
                        </Col>
                    </Row>
                </div>
            )}

            {/* 5_group_requests_bar */}
            {activeTab === "groups" && (
                <div 
                    onClick={onOpenGroupRequests}
                    style={{
                        padding: "0 16px",
                        cursor: "pointer",
                    }}
                >
                    <Row g={12} ai="center" sx={{ height: 64, borderBottom: "0.5px solid #F0F0F0", position: "relative" }}>
                        <div style={{ width: 42, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Svg d={IC.users || "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 110-8 4 4 0 010 8zm14 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"} s={22} c="#1A1A1A" />
                        </div>
                        <Col g={1} sx={{ flex: 1, minWidth: 0 }}>
                            <span style={{ fontFamily: FB, fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Group Requests</span>
                            <span style={{ fontFamily: FB, fontSize: 12, color: "#888888" }}>3 requests</span>
                        </Col>
                        <Col ai="flex-end" sx={{ flexShrink: 0 }}>
                            <Svg d="M9 18l6-6-6-6" s={14} c="#AAAAAA" />
                        </Col>
                    </Row>
                </div>
            )}

            {/* List Container */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 16px", paddingBottom: 100 }}>
                {activeTab === "dms" && (
                    <Col>
                        {filteredDMs.map((c, i) => (
                            <div
                                key={c.id || i}
                                onClick={() => onOpenChat && onOpenChat(c)}
                                onPointerDown={(e) => handlePointerDown(e, c, 'dms')}
                                onPointerUp={clearTimer}
                                onPointerMove={clearTimer}
                                onPointerCancel={clearTimer}
                                onPointerLeave={clearTimer}
                                onContextMenu={(e) => e.preventDefault()}
                                style={{
                                    userSelect: 'none',
                                    WebkitUserSelect: 'none',
                                    WebkitTouchCallout: 'none'
                                }}
                            >
                                <Row g={12} ai="center" sx={{ height: 64, borderBottom: "0.5px solid #F0F0F0", cursor: "pointer", position: "relative" }}>
                                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: c.avatar.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: c.avatar.col }}>{c.avatar.ch}</span>
                                    </div>
                                    <Col g={2} sx={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ fontFamily: FB, fontWeight: 600, fontSize: 15, color: "#111111" }}>{c.name}</span>
                                        <span style={{ fontFamily: FB, fontSize: 13, color: "#888888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{c.preview}</span>
                                    </Col>
                                    <Col ai="flex-end" g={4} sx={{ flexShrink: 0 }}>
                                        <Row g={4} ai="center">
                                            {c.isPinned && <Svg d={IC.pin} s={14} c="#94a3b8" w={2.5} />}
                                            <span style={{ fontFamily: FB, fontSize: 12, color: "#AAAAAA" }}>{c.time}</span>
                                        </Row>
                                        {c.unread > 0 && (
                                            <div style={{ minWidth: 18, height: 18, borderRadius: 9, background: "#FF5733", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>
                                                <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: "#fff" }}>{c.unread}</span>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </Col>
                )}

                {activeTab === "groups" && (
                    <>
                        {filteredGroups.length > 0 ? (
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 12,
                                padding: "0 4px"
                            }}>
                                {filteredGroups.map(g => (
                                    <div
                                        key={g.id}
                                        onClick={() => onOpenGroupChat && onOpenGroupChat(g)}
                                        onPointerDown={(e) => handlePointerDown(e, g, 'groups')}
                                        onPointerUp={clearTimer}
                                        onPointerMove={clearTimer}
                                        onPointerCancel={clearTimer}
                                        onPointerLeave={clearTimer}
                                        onContextMenu={(e) => e.preventDefault()}
                                        style={{
                                            background: g.isPinned ? "#FFF4EE" : "#FFFFFF",
                                            borderRadius: 16,
                                            padding: 12,
                                            boxShadow: g.isPinned ? "0 2px 8px 2px rgba(232, 117, 74, 0.15)" : "0 2px 6px 1px rgba(0, 0, 0, 0.06)",
                                            border: g.isPinned ? "0.8px solid #E8754A" : "none",
                                            display: "flex",
                                            flexDirection: "column",
                                            cursor: "pointer",
                                            gridRow: "span 1",
                                            transition: "all 250ms ease",
                                            userSelect: 'none',
                                            WebkitUserSelect: 'none',
                                            WebkitTouchCallout: 'none',
                                            position: "relative"
                                        }}
                                    >
                                        {/* Top Row: Privacy Badge & Pin */}
                                        <Row jc="space-between" ai="flex-start" sx={{ marginBottom: 10 }}>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                borderRadius: 20,
                                                padding: "4px 8px",
                                                background: g.privacy === "private" ? "#FFF0ED" : "#F2F2F2"
                                            }}>
                                                <Svg d={g.privacy === "private" ? IC.lock || "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" : IC.users} s={12} c={g.privacy === "private" ? "#FF5733" : "#555555"} w={2.5} />
                                                <span style={{
                                                    fontFamily: FB,
                                                    fontSize: 10,
                                                    fontWeight: 600,
                                                    color: g.privacy === "private" ? "#FF5733" : "#555555"
                                                }}>
                                                    {g.privacy === "private" ? "Private" : "Public"}
                                                </span>
                                            </div>
                                            {g.isPinned && (
                                                <div style={{ position: "absolute", top: 12, right: 12 }}>
                                                    <Svg d={IC.pinFilled} s={14} c="#E8754A" w={2} />
                                                </div>
                                            )}
                                        </Row>

                                        {/* Group Name & Preview */}
                                        <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 14, color: "#111111", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                            {g.name}
                                        </span>
                                        <span style={{ fontFamily: FB, fontSize: 11, color: "#AAAAAA", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {g.memberPreview}
                                        </span>

                                        <div style={{ flex: 1 }} />

                                        {/* Avatar Stack */}
                                        <Row ai="center" sx={{ marginTop: 10, position: "relative" }}>
                                            {[1, 2, 3].map((_, i) => (
                                                <div key={i} style={{
                                                    width: 28,
                                                    height: 28,
                                                    borderRadius: 14,
                                                    background: ["#EFF6FF", "#FAF5FF", "#E8F8EF"][i],
                                                    border: "2px solid #FFFFFF",
                                                    marginLeft: i > 0 ? -10 : 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    zIndex: 3 - i
                                                }}>
                                                    <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 700, color: ["#2563EB", "#9333EA", "#16A34A"][i] }}>
                                                        {g.memberPreview.split(", ")[i]?.[0] || "?"}
                                                    </span>
                                                </div>
                                            ))}
                                            <div style={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: 14,
                                                background: "#F0F0F0",
                                                border: "2px solid #FFFFFF",
                                                marginLeft: -10,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                zIndex: 0
                                            }}>
                                                <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: "#666666" }}>
                                                    {g.overflowLabel}
                                                </span>
                                            </div>
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Col jc="center" ai="center" sx={{ flex: 1, marginTop: 60 }}>
                                <div style={{ marginBottom: 16 }}>
                                    <Svg d={IC.users} s={52} c="#DDDDDD" />
                                </div>
                                <span style={{ fontFamily: FB, fontSize: 14, color: "#AAAAAA", textAlign: "center", marginBottom: 4 }}>No groups yet</span>
                                <span style={{ fontFamily: FB, fontSize: 14, color: "#AAAAAA", textAlign: "center" }}>Tap + to create a new group</span>
                            </Col>
                        )}
                    </>
                )}
            </div>

            {/* Fixed FAB */}
            <button
                onClick={() => setFabMenuVisible(true)}
                style={{
                    position: "absolute",
                    bottom: 24,
                    right: 20,
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: "#FF5A1F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0px 4px 10px rgba(255, 90, 31, 0.40)",
                    zIndex: 999
                }}
            >
                <Svg d={IC.plus} s={28} c="#FFFFFF" w={1.5} />
            </button>

            {/* Bottom Sheet Modal */}
            {fabMenuVisible && (
                <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 1000,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end"
                }}>
                    <div
                        onClick={() => setFabMenuVisible(false)}
                        style={{
                            position: "absolute",
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.25)",
                            zIndex: 1001
                        }}
                    />
                    <div style={{
                        position: "relative",
                        zIndex: 1002,
                        backgroundColor: "#FFFFFF",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: "12px 20px 36px 20px",
                        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.06)",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div style={{
                            width: 36,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: "#E0E0E0",
                            alignSelf: "center",
                            marginBottom: 20
                        }} />

                        {activeTab === 'dms' && (
                            <>
                                <span style={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: "#AEAEB2",
                                    textTransform: "uppercase",
                                    letterSpacing: 0.6,
                                    marginBottom: 8,
                                    fontFamily: FB
                                }}>Messages</span>
                                <button
                                    onClick={() => {
                                        setFabMenuVisible(false);
                                        if (onNewDM) onNewDM();
                                        else console.log('Navigate: NewDM');
                                    }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: "14px 0",
                                        gap: 14,
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "left"
                                    }}
                                >
                                    <div style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 22,
                                        backgroundColor: "#FFF0EB",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        <Svg d={IC.chat} s={20} c="#FF5A1F" />
                                    </div>
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                                        <span style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A", fontFamily: FB }}>New Message</span>
                                        <span style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", fontFamily: FB }}>Start a direct conversation</span>
                                    </div>
                                    <Svg d="M9 18l6-6-6-6" s={16} c="#C7C7CC" />
                                </button>
                            </>
                        )}

                        {activeTab === 'groups' && (
                            <>
                                <span style={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: "#AEAEB2",
                                    textTransform: "uppercase",
                                    letterSpacing: 0.6,
                                    marginBottom: 8,
                                    fontFamily: FB
                                }}>Groups</span>

                                <button
                                    onClick={() => {
                                        setFabMenuVisible(false);
                                        if (onNewGroup) onNewGroup();
                                        else console.log('Navigate: CreateGroup');
                                    }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: "14px 0",
                                        gap: 14,
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "left"
                                    }}
                                >
                                    <div style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 22,
                                        backgroundColor: "#FFF0EB",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        <Svg d={IC.users} s={20} c="#FF5A1F" />
                                    </div>
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                                        <span style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A", fontFamily: FB }}>Create New Group</span>
                                        <span style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", fontFamily: FB }}>Start a group with your connections</span>
                                    </div>
                                    <Svg d="M9 18l6-6-6-6" s={16} c="#C7C7CC" />
                                </button>

                                <div style={{ height: 1, backgroundColor: "#F2F2F7", marginLeft: 58, flexShrink: 0 }} />

                                <button
                                    onClick={() => {
                                        setFabMenuVisible(false);
                                        if (onDiscoverGroups) onDiscoverGroups();
                                        else console.log('Navigate: DiscoverGroups');
                                    }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: "14px 0",
                                        gap: 14,
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "left"
                                    }}
                                >
                                    <div style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 22,
                                        backgroundColor: "#FFF0EB",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        <Svg d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" s={20} c="#FF5A1F" />
                                    </div>
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                                        <span style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A", fontFamily: FB }}>Discover Groups</span>
                                        <span style={{ fontSize: 13, fontWeight: 400, color: "#8E8E93", fontFamily: FB }}>Find and join public groups</span>
                                    </div>
                                    <Svg d="M9 18l6-6-6-6" s={16} c="#C7C7CC" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Long Press Context Menu Overlay */}
            {contextMenu && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 2000,
                    backgroundColor: contextMenu.type === 'groups' ? "rgba(245, 242, 238, 0.6)" : "rgba(250, 245, 240, 0.4)",
                    backdropFilter: contextMenu.type === 'groups' ? "blur(8px)" : "blur(4px)",
                    WebkitBackdropFilter: contextMenu.type === 'groups' ? "blur(8px)" : "blur(4px)",
                    animation: "fadeInBlur 150ms ease",
                }} onClick={() => setContextMenu(null)} onContextMenu={(e) => e.preventDefault()}>
                    <style>{`
                        @keyframes fadeInBlur {
                            from { opacity: 0; backdrop-filter: blur(0px); }
                            to { opacity: 1; backdrop-filter: ${contextMenu.type === 'groups' ? 'blur(8px)' : 'blur(4px)'}; }
                        }
                        @keyframes slideUpFade {
                            from { opacity: 0; transform: translateY(10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>

                    {/* Highlighted Row (DMs) */}
                    {contextMenu.type === 'dms' && (
                        <div style={{
                            position: "absolute",
                            top: contextMenu.rect.top,
                            left: contextMenu.rect.left,
                            width: contextMenu.rect.width,
                            height: contextMenu.rect.height,
                            backgroundColor: "#FFFFFF",
                            zIndex: 2001,
                            borderRadius: 8,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                        }} onClick={(e) => e.stopPropagation()}>
                            <Row g={12} ai="center" sx={{ height: "100%", position: "relative" }}>
                                <div style={{ width: 42, height: 42, borderRadius: "50%", background: contextMenu.item.avatar.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: contextMenu.item.avatar.col }}>{contextMenu.item.avatar.ch}</span>
                                </div>
                                <Col g={2} sx={{ flex: 1, minWidth: 0 }}>
                                    <span style={{ fontFamily: FB, fontWeight: 600, fontSize: 15, color: "#111111" }}>{contextMenu.item.name}</span>
                                    <span style={{ fontFamily: FB, fontSize: 13, color: "#888888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{contextMenu.item.preview}</span>
                                </Col>
                                <Col ai="flex-end" g={4} sx={{ flexShrink: 0 }}>
                                    <Row g={4} ai="center">
                                        {contextMenu.item.isPinned && <Svg d={IC.pin} s={14} c="#94a3b8" w={2.5} />}
                                        <span style={{ fontFamily: FB, fontSize: 12, color: "#AAAAAA" }}>{contextMenu.item.time}</span>
                                    </Row>
                                    {contextMenu.item.unread > 0 && (
                                        <div style={{ minWidth: 18, height: 18, borderRadius: 9, background: "#FF5733", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>
                                            <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: "#fff" }}>{contextMenu.item.unread}</span>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    )}

                    {/* Highlighted Card (Groups) */}
                    {contextMenu.type === 'groups' && (
                        <div style={{
                            position: "absolute",
                            top: contextMenu.rect.top,
                            left: contextMenu.rect.left,
                            width: contextMenu.rect.width,
                            height: contextMenu.rect.height,
                            backgroundColor: "#FFFFFF",
                            borderRadius: 16,
                            padding: 12,
                            boxShadow: "0 2px 10px rgba(0,0,0,0.08), 0 0 0 2px rgba(249, 115, 22, 0.4)",
                            display: "flex",
                            flexDirection: "column",
                            zIndex: 2001
                        }} onClick={(e) => e.stopPropagation()}>
                            <Row jc="space-between" ai="flex-start" sx={{ marginBottom: 10 }}>
                                <div style={{
                                    display: "flex", alignItems: "center", gap: 4, borderRadius: 20, padding: "4px 8px",
                                    background: contextMenu.item.privacy === "private" ? "#FFF0ED" : "#F2F2F2"
                                }}>
                                    <Svg d={contextMenu.item.privacy === "private" ? IC.lock || "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" : IC.users} s={12} c={contextMenu.item.privacy === "private" ? "#FF5733" : "#555555"} w={2.5} />
                                    <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 600, color: contextMenu.item.privacy === "private" ? "#FF5733" : "#555555" }}>
                                        {contextMenu.item.privacy === "private" ? "Private" : "Public"}
                                    </span>
                                </div>
                            </Row>
                            <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 14, color: "#111111", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{contextMenu.item.name}</span>
                            <span style={{ fontFamily: FB, fontSize: 11, color: "#AAAAAA", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{contextMenu.item.memberPreview}</span>
                            <div style={{ flex: 1 }} />
                            <Row ai="center" sx={{ marginTop: 10, position: "relative" }}>
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} style={{ width: 28, height: 28, borderRadius: 14, background: ["#EFF6FF", "#FAF5FF", "#E8F8EF"][i], border: "2px solid #FFFFFF", marginLeft: i > 0 ? -10 : 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 - i }}>
                                        <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 700, color: ["#2563EB", "#9333EA", "#16A34A"][i] }}>{contextMenu.item.memberPreview.split(", ")[i]?.[0] || "?"}</span>
                                    </div>
                                ))}
                                <div style={{ width: 28, height: 28, borderRadius: 14, background: "#F0F0F0", border: "2px solid #FFFFFF", marginLeft: -10, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 0 }}>
                                    <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: "#666666" }}>{contextMenu.item.overflowLabel}</span>
                                </div>
                            </Row>
                        </div>
                    )}

                    {/* Context Menu Modal */}
                    <div style={{
                        position: "absolute",
                        top: Math.min(contextMenu.rect.bottom + 10, window.innerHeight - 260),
                        left: Math.max(16, Math.min(contextMenu.rect.left + (contextMenu.rect.width / 2) - 100, window.innerWidth - 216)),
                        width: 200,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 16,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        zIndex: 2002,
                        padding: "8px 0",
                        animation: "slideUpFade 200ms ease",
                        display: "flex",
                        flexDirection: "column"
                    }} onClick={(e) => e.stopPropagation()}>
                        {contextMenu.type === 'dms' ? (
                            [
                                {
                                    label: contextMenu.item.isPinned ? "Unpin" : "Pin", icon: IC.pin, action: () => {
                                        setDmsData(prev => prev.map(d => d.id === contextMenu.item.id ? { ...d, isPinned: !d.isPinned } : d));
                                        setContextMenu(null);
                                    }
                                },
                                {
                                    label: contextMenu.item.isMuted ? "Unmute" : "Mute", icon: IC.bellOff, action: () => {
                                        setDmsData(prev => prev.map(d => d.id === contextMenu.item.id ? { ...d, isMuted: !d.isMuted } : d));
                                        setContextMenu(null);
                                    }
                                },
                                {
                                    label: "Archive", icon: IC.archive, action: () => {
                                        setDmsData(prev => prev.filter(d => d.id !== contextMenu.item.id));
                                        setContextMenu(null);
                                    }
                                },
                                {
                                    label: contextMenu.item.unread ? "Mark Read" : "Mark Unread", icon: IC.mail, action: () => {
                                        setDmsData(prev => prev.map(d => d.id === contextMenu.item.id ? { ...d, unread: d.unread ? 0 : 1 } : d));
                                        setContextMenu(null);
                                    }
                                },
                                {
                                    label: "Delete", icon: IC.trash, style: "destructive", action: () => {
                                        setDmsData(prev => prev.filter(d => d.id !== contextMenu.item.id));
                                        setContextMenu(null);
                                    }
                                }
                            ].map((opt, idx) => (
                                <button key={idx} onClick={opt.action} style={{
                                    width: "100%", display: "flex", alignItems: "center", gap: 12,
                                    padding: "12px 16px", backgroundColor: "transparent", border: "none", cursor: "pointer",
                                    textAlign: "left", fontFamily: FB, fontSize: 14, fontWeight: 500,
                                    color: opt.style === "destructive" ? "#ef4444" : "#111111"
                                }}>
                                    <Svg d={opt.icon} s={18} c={opt.style === "destructive" ? "#ef4444" : "#111111"} />
                                    <span>{opt.label}</span>
                                </button>
                            ))
                        ) : (
                            [
                                {
                                    label: contextMenu.item.isPinned ? "Unpin" : "Pin", icon: IC.pin, action: () => {
                                        setGroupsData(prev => prev.map(g => 
                                            g.id === contextMenu.item.id 
                                                ? { ...g, isPinned: !g.isPinned, pinTime: !g.isPinned ? Date.now() : null } 
                                                : g
                                        ));
                                        setContextMenu(null);
                                    }
                                },
                                {
                                    label: contextMenu.item.isMuted ? "Unmute" : "Mute", icon: IC.bellOff, action: () => {
                                        setGroupsData(prev => prev.map(g => g.id === contextMenu.item.id ? { ...g, isMuted: !g.isMuted } : g));
                                        setContextMenu(null);
                                    }
                                },
                                {
                                    label: "Leave Group", icon: IC.trash, style: "destructive", action: () => {
                                        setGroupsData(prev => prev.filter(g => g.id !== contextMenu.item.id));
                                        setContextMenu(null);
                                    }
                                }
                            ].map((opt, idx) => (
                                <button key={idx} onClick={opt.action} style={{
                                    width: "100%", display: "flex", alignItems: "center", gap: 12,
                                    padding: "12px 16px", backgroundColor: "transparent", border: "none", cursor: "pointer",
                                    textAlign: "left", fontFamily: FB, fontSize: 14, fontWeight: 500,
                                    color: opt.style === "destructive" ? "#ef4444" : "#111111"
                                }}>
                                    <Svg d={opt.icon} s={18} c={opt.style === "destructive" ? "#ef4444" : "#111111"} />
                                    <span>{opt.label}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </Col>
    );
};

export default SocialChat;
