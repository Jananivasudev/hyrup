import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';

/* ── SOCIAL PROFILE ── */
const SocialProfile = ({ onEditProfile }) => {
    const t = T.s;
    const [activeTab, setActiveTab] = useState("posts");

    // Mock user data
    const user = {
        name: "Rahul Sharma",
        handle: "@rahul_dev",
        initial: "R",
        bio: "Full Stack Developer passionate about building real-world apps. React | Node.js | Figma enthusiast.",
        followers: 1240,
        following: 890,
        posts: 42,
        streak: 7,
        skills: ["React", "Node.js", "Figma", "Python", "TypeScript"]
    };

    const profileTabs = [
        { id: "posts", label: "Posts" },
        { id: "featured", label: "Featured" },
        { id: "saved", label: "Saved" }
    ];

    const mockPosts = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        color: [`#EFF6FF`, `#FAF5FF`, `#FFF7ED`, `#ECFDF5`, `#FEF2F2`, `#F5F3FF`][i % 6]
    }));

    return (
        <Col sx={{ width: "100%", height: "100%", background: t.bg }}>
            <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
                {/* Header */}
                <Row ai="center" jc="space-between" sx={{ padding: "12px 16px 0" }}>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 26, color: "#111111" }}>Profile</span>
                    <Row g={8} ai="center">
                        <button 
                            onClick={onEditProfile}
                            style={{
                                padding: "8px 16px",
                                borderRadius: 20,
                                backgroundColor: "#F5F5F5",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: FB,
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#1A1A1A",
                                display: "flex",
                                alignItems: "center",
                                gap: 6
                            }}
                        >
                            <Svg d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" s={14} c="#1A1A1A" w={1.8} />
                            Edit
                        </button>
                        <button
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: "#F5F5F5",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Svg d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" s={18} c="#1A1A1A" />
                        </button>
                    </Row>
                </Row>

                {/* Profile Card */}
                <div style={{
                    margin: "20px 16px",
                    padding: "24px 20px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 20,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
                }}>
                    <Row g={16} ai="center">
                        {/* Avatar with Streak Badge */}
                        <div style={{ position: "relative" }}>
                            <div style={{
                                width: 72,
                                height: 72,
                                borderRadius: 36,
                                background: `linear-gradient(135deg, ${t.orange || '#FF5733'} 0%, #FF8A65 100%)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 16px rgba(255,87,51,0.25)"
                            }}>
                                <span style={{
                                    fontFamily: FD,
                                    fontWeight: 900,
                                    fontSize: 28,
                                    color: "#FFFFFF"
                                }}>{user.initial}</span>
                            </div>
                            {/* Fire Streak Badge */}
                            <div style={{
                                position: "absolute",
                                bottom: -4,
                                right: -4,
                                width: 28,
                                height: 28,
                                borderRadius: 14,
                                backgroundColor: "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                            }}>
                                <span style={{ fontSize: 14 }}>🔥</span>
                            </div>
                        </div>

                        {/* Name & Handle */}
                        <Col g={4} sx={{ flex: 1 }}>
                            <span style={{
                                fontFamily: FD,
                                fontWeight: 700,
                                fontSize: 20,
                                color: "#111111"
                            }}>{user.name}</span>
                            <span style={{
                                fontFamily: FB,
                                fontSize: 14,
                                color: "#888888",
                                fontWeight: 500
                            }}>{user.handle}</span>
                            <Row g={4} ai="center" sx={{ marginTop: 2 }}>
                                <span style={{ fontSize: 12 }}>🔥</span>
                                <span style={{
                                    fontFamily: FB,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: t.orange || "#FF5733"
                                }}>{user.streak} day streak</span>
                            </Row>
                        </Col>
                    </Row>

                    {/* Bio */}
                    <p style={{
                        fontFamily: FB,
                        fontSize: 14,
                        color: "#555555",
                        lineHeight: "20px",
                        marginTop: 16,
                        marginBottom: 0
                    }}>{user.bio}</p>

                    {/* Stats Row */}
                    <Row jc="space-around" sx={{
                        marginTop: 20,
                        padding: "16px 0",
                        borderTop: "1px solid #F2F2F2",
                        borderBottom: "1px solid #F2F2F2"
                    }}>
                        {[
                            { label: "Posts", value: user.posts },
                            { label: "Followers", value: user.followers.toLocaleString() },
                            { label: "Following", value: user.following.toLocaleString() }
                        ].map((stat, i) => (
                            <Col key={i} ai="center" g={2}>
                                <span style={{
                                    fontFamily: FD,
                                    fontWeight: 700,
                                    fontSize: 18,
                                    color: "#111111"
                                }}>{stat.value}</span>
                                <span style={{
                                    fontFamily: FB,
                                    fontSize: 12,
                                    color: "#888888",
                                    fontWeight: 500
                                }}>{stat.label}</span>
                            </Col>
                        ))}
                    </Row>

                    {/* Skills */}
                    <div style={{ marginTop: 16 }}>
                        <span style={{
                            fontFamily: FB,
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#AEAEB2",
                            textTransform: "uppercase",
                            letterSpacing: 0.6,
                            marginBottom: 10,
                            display: "block"
                        }}>Skills</span>
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 8
                        }}>
                            {user.skills.map((skill, i) => (
                                <div key={i} style={{
                                    padding: "6px 14px",
                                    borderRadius: 20,
                                    backgroundColor: "#FFF0EB",
                                    border: `1px solid ${t.orange || '#FF5733'}30`
                                }}>
                                    <span style={{
                                        fontFamily: FB,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: t.orange || "#FF5733"
                                    }}>{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                <div style={{ padding: "0 16px", marginBottom: 12 }}>
                    <div style={{
                        display: "flex",
                        gap: 0,
                        backgroundColor: "#F5F5F5",
                        borderRadius: 12,
                        padding: 3
                    }}>
                        {profileTabs.map(tab => {
                            const active = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        flex: 1,
                                        height: 36,
                                        background: active ? "#FFFFFF" : "transparent",
                                        color: active ? "#111111" : "#888888",
                                        borderRadius: 10,
                                        fontFamily: FB,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none"
                                    }}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Post Grid */}
                <div style={{
                    padding: "0 16px 100px 16px",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 3
                }}>
                    {mockPosts.map(post => (
                        <div key={post.id} style={{
                            backgroundColor: post.color,
                            borderRadius: 12,
                            aspectRatio: "1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "transform 0.2s"
                        }}>
                            <Svg d={IC.img} s={24} c="#CCCCCC" />
                        </div>
                    ))}
                </div>
            </div>
        </Col>
    );
};

export default SocialProfile;
