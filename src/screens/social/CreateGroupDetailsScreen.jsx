import React, { useState, useRef, useEffect } from 'react';
import { Row, Col } from '../../helpers.jsx';
import { Svg, IC } from '../../icons.jsx';
import { FB, FD } from '../../tokens.js';

export default function CreateGroupDetailsScreen({ onBack, onCancel, onCreate, members = [] }) {
    const [groupName, setGroupName] = useState('');
    const [groupAbout, setGroupAbout] = useState('');
    const [disappearing, setDisappearing] = useState(false);
    
    const maxVisibleMembers = 5;
    const visibleMembers = members.slice(0, maxVisibleMembers);
    const overflowCount = members.length > maxVisibleMembers ? members.length - maxVisibleMembers : 0;

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleCreate = () => {
        const finalName = groupName.trim() === '' ? 'Group' : groupName.trim();
        onCreate?.({
            name: finalName,
            about: groupAbout.trim(),
            members,
            settings: { disappearing }
        });
    };

    return (
        <Col sx={{ width: "100%", height: "100%", background: "#F5F0E8", overflow: "hidden" }}>
            
            {/* Header */}
            <Row ai="center" jc="space-between" sx={{ padding: "14px 16px", background: "#F5F0E8", flexShrink: 0 }}>
                <button
                    onClick={onCancel || onBack}
                    style={{
                        minWidth: 60, background: "transparent", border: "none",
                        cursor: "pointer", textAlign: "left", padding: 0
                    }}
                >
                    <span style={{ fontSize: 16, fontWeight: 500, color: "#1A1A1A", fontFamily: FB }}>Cancel</span>
                </button>

                <Col ai="center" sx={{ gap: 2 }}>
                    <span style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A", fontFamily: FB }}>New Group</span>
                </Col>

                <button
                    onClick={handleCreate}
                    style={{
                        minWidth: 60, background: "transparent", border: "none",
                        cursor: "pointer", textAlign: "right", padding: 0
                    }}
                >
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#E8754A", fontFamily: FB }}>Create</span>
                </button>
            </Row>

            {/* Scrollable Content */}
            <div 
                style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        document.activeElement?.blur();
                    }
                }}
            >
                
                {/* Avatar Picker Section */}
                <Col ai="center" sx={{ padding: "32px 16px 24px 16px" }}>
                    <div style={{ position: "relative" }}>
                        <button
                            style={{
                                width: 90, height: 90, borderRadius: 45,
                                backgroundColor: "#D6CFC4", border: "none",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", padding: 0
                            }}
                        >
                            <Svg d={IC.camera || IC.user} s={32} c="#FFFFFF" />
                        </button>
                        <div style={{
                            position: "absolute", bottom: 0, right: 0,
                            width: 28, height: 28, borderRadius: 14,
                            backgroundColor: "#E8754A",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            border: "2px solid #F5F0E8"
                        }}>
                            <Svg d={IC.plus} s={14} c="#FFFFFF" w={2.5} />
                        </div>
                    </div>
                </Col>

                {/* Inputs Section */}
                <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>
                    
                    {/* Group Name Input */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{
                            backgroundColor: "#FFFFFF", borderRadius: 12,
                            padding: "12px 16px", display: "flex", flexDirection: "row", alignItems: "center"
                        }}>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Enter group name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value.slice(0, 50))}
                                maxLength={50}
                                style={{
                                    flex: 1, fontSize: 16, color: "#1A1A1A", fontFamily: FB,
                                    background: "transparent", border: "none", outline: "none"
                                }}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 4 }}>
                            <span style={{ fontSize: 11, color: "#8E8E93", fontFamily: FB }}>
                                {groupName.length}/50
                            </span>
                        </div>
                    </div>

                    {/* About Textarea Input */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{
                            backgroundColor: "#FFFFFF", borderRadius: 12,
                            padding: "12px 16px", display: "flex", flexDirection: "row"
                        }}>
                            <textarea
                                placeholder="What's this group about? (optional)"
                                value={groupAbout}
                                onChange={(e) => setGroupAbout(e.target.value.slice(0, 200))}
                                maxLength={200}
                                style={{
                                    flex: 1, fontSize: 16, color: "#1A1A1A", fontFamily: FB,
                                    background: "transparent", border: "none", outline: "none",
                                    resize: "none", minHeight: 80
                                }}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 4 }}>
                            <span style={{ fontSize: 11, color: "#8E8E93", fontFamily: FB }}>
                                {groupAbout.length}/200
                            </span>
                        </div>
                    </div>

                </div>

                {/* Members Preview Section */}
                <div style={{ marginTop: 24, padding: "0 16px" }}>
                    <div style={{
                        fontSize: 12, fontWeight: 600, color: "#8E8E93",
                        textTransform: "uppercase", letterSpacing: 0.6,
                        marginBottom: 12, fontFamily: FB, paddingLeft: 4
                    }}>
                        Members
                    </div>
                    
                    <div style={{ 
                        backgroundColor: "#FFFFFF", borderRadius: 12, padding: "16px",
                        display: "flex", flexDirection: "row", alignItems: "center"
                    }}>
                        {members.length === 0 ? (
                            <span style={{ fontSize: 15, color: "#AEAEB2", fontFamily: FB }}>No members selected</span>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
                                <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                                    {visibleMembers.map((member, i) => (
                                        <div key={member.id} style={{
                                            width: 36, height: 36, borderRadius: 18,
                                            backgroundColor: member.color || "#D1D1D6",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            border: "2px solid #FFFFFF",
                                            marginLeft: i > 0 ? -12 : 0, zIndex: 10 - i
                                        }}>
                                            <span style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF", fontFamily: FB }}>
                                                {member.initial}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", flexShrink: 0, gap: 12 }}>
                                    {overflowCount > 0 && (
                                        <span style={{ fontSize: 14, color: "#8E8E93", fontFamily: FB }}>
                                            +{overflowCount} more
                                        </span>
                                    )}
                                    <button
                                        onClick={onBack}
                                        style={{
                                            background: "rgba(232, 117, 74, 0.1)", borderRadius: 16,
                                            padding: "6px 12px", border: "none", cursor: "pointer"
                                        }}
                                    >
                                        <span style={{ fontSize: 13, fontWeight: 600, color: "#E8754A", fontFamily: FB }}>
                                            Edit
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Settings Section */}
                <div style={{ marginTop: 24, padding: "0 16px", marginBottom: 40 }}>
                    <div style={{
                        backgroundColor: "#FFFFFF", borderRadius: 12, overflow: "hidden"
                    }}>
                        
                        {/* Disappearing Messages Toggle */}
                        <div style={{
                            display: "flex", flexDirection: "row", alignItems: "center",
                            justifyContent: "space-between", padding: "16px",
                            borderBottom: "1px solid #F2F2F7", cursor: "pointer"
                        }} onClick={() => setDisappearing(!disappearing)}>
                            <span style={{ fontSize: 16, color: "#1A1A1A", fontFamily: FB }}>
                                Disappearing messages
                            </span>
                            
                            {/* Custom Toggle Switch */}
                            <div style={{
                                width: 50, height: 30, borderRadius: 15,
                                backgroundColor: disappearing ? "#E8754A" : "#E5E5EA",
                                position: "relative", transition: "background-color 0.2s"
                            }}>
                                <div style={{
                                    width: 26, height: 26, borderRadius: 13,
                                    backgroundColor: "#FFFFFF",
                                    position: "absolute", top: 2,
                                    left: disappearing ? 22 : 2,
                                    transition: "left 0.2s",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                }} />
                            </div>
                        </div>

                        {/* Group Permissions Nav Row */}
                        <div style={{
                            display: "flex", flexDirection: "row", alignItems: "center",
                            justifyContent: "space-between", padding: "16px", cursor: "pointer"
                        }}>
                            <span style={{ fontSize: 16, color: "#1A1A1A", fontFamily: FB }}>
                                Group permissions
                            </span>
                            <Svg d="M9 18l6-6-6-6" s={20} c="#AEAEB2" />
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
}
