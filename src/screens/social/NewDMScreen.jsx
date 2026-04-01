import React, { useState } from 'react';
import { Row, Col } from '../../helpers.jsx';
import { Svg, IC } from '../../icons.jsx';
import { FB, FD } from '../../tokens.js';

const CONNECTIONS = [
    { id: '1', name: 'Sneha R.', initial: 'S', color: '#7C6FF7' },
    { id: '2', name: 'Dev M.', initial: 'D', color: '#E8805A' },
    { id: '3', name: 'Arjun K.', initial: 'A', color: '#4CAF8A' },
    { id: '4', name: 'Priya N.', initial: 'P', color: '#E8441A' },
    { id: '5', name: 'Rahul T.', initial: 'R', color: '#5B9BD5' },
    { id: '6', name: 'Meera S.', initial: 'M', color: '#F0A500' },
    { id: '7', name: 'Chris D.', initial: 'C', color: '#9C5BB5' },
    { id: '8', name: 'Nina L.', initial: 'N', color: '#3DAB8E' },
];

export default function NewDMScreen({ onBack }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = CONNECTIONS.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Col sx={{ width: "100%", height: "100%", background: "#F7F7F2", overflow: "hidden" }}>
            
            {/* Header */}
            <Row ai="center" jc="space-between" sx={{ padding: "12px 16px", background: "#F7F7F2" }}>
                <button
                    onClick={onBack}
                    style={{
                        width: 36, height: 36, borderRadius: 18,
                        backgroundColor: "#EFEFEF",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "none", cursor: "pointer"
                    }}
                >
                    <Svg d="M15 18l-6-6 6-6" s={24} c="#1A1A1A" w={2} />
                </button>
                <div style={{ flex: 1, textAlign: "center", fontSize: 17, fontWeight: 700, color: "#1A1A1A", fontFamily: FB }}>
                    New Message
                </div>
                <div style={{ width: 36 }} />
            </Row>

            {/* Search Bar */}
            <Col sx={{ padding: "8px 16px 4px 16px" }}>
                <Row ai="center" sx={{ 
                    backgroundColor: "#EBEBEB", 
                    borderRadius: 12, 
                    padding: "10px 12px",
                    gap: 8
                }}>
                    <Svg d={IC.search} s={18} c="#AEAEB2" />
                    <input
                        autoFocus
                        placeholder="Search connections"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            flex: 1, fontSize: 15, color: "#1A1A1A",
                            background: "transparent", border: "none", outline: "none",
                            fontFamily: FB
                        }}
                    />
                    {searchQuery.length > 0 && (
                        <button
                            onClick={() => setSearchQuery('')}
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "center",
                                background: "transparent", border: "none", cursor: "pointer", padding: 0
                            }}
                        >
                            <Svg d={IC.x} s={16} c="#AEAEB2" w={2.5} />
                        </button>
                    )}
                </Row>
            </Col>

            {/* Scrollable Content Area */}
            <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
                
                {/* Section Label: CONNECTIONS */}
                <div style={{
                    fontSize: 12, fontWeight: 600, color: "#AEAEB2",
                    textTransform: "uppercase", letterSpacing: 0.6,
                    margin: "20px 16px 12px", fontFamily: FB
                }}>
                    Connections
                </div>

                {/* Horizontal Profile Avatars */}
                <div style={{
                    display: "flex", flexDirection: "row", alignItems: "center",
                    gap: 20, padding: "0 16px", overflowX: "auto",
                    scrollbarWidth: "none", msOverflowStyle: "none"
                }}>
                    <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {filtered.map(person => (
                        <button
                            key={person.id}
                            style={{
                                display: "flex", flexDirection: "column", alignItems: "center",
                                gap: 6, width: 60, background: "transparent", border: "none",
                                cursor: "pointer", padding: 0, flexShrink: 0
                            }}
                        >
                            <div style={{
                                width: 54, height: 54, borderRadius: 27,
                                backgroundColor: person.color,
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <span style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF", fontFamily: FB }}>
                                    {person.initial}
                                </span>
                            </div>
                            <span style={{ 
                                fontSize: 12, fontWeight: 500, color: "#1A1A1A", textAlign: "center",
                                width: 60, whiteSpace: "nowrap", overflow: "hidden",
                                textOverflow: "ellipsis", fontFamily: FB 
                            }}>
                                {person.name.split(' ')[0]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div style={{ height: 1, backgroundColor: "#E8E8E8", margin: "20px 16px 0 16px" }} />

                {/* Vertical Full List */}
                <div style={{
                    fontSize: 12, fontWeight: 600, color: "#AEAEB2",
                    textTransform: "uppercase", letterSpacing: 0.6,
                    margin: "20px 16px 12px", fontFamily: FB
                }}>
                    All Connections
                </div>

                <div style={{ padding: "0 16px 32px 16px", display: "flex", flexDirection: "column" }}>
                    {filtered.map((item, index) => (
                        <div key={item.id}>
                            <button
                                style={{
                                    display: "flex", flexDirection: "row", alignItems: "center",
                                    padding: "12px 0", gap: 12, width: "100%",
                                    background: "transparent", border: "none", cursor: "pointer", textAlign: "left"
                                }}
                            >
                                <div style={{
                                    width: 44, height: 44, borderRadius: 22,
                                    backgroundColor: item.color,
                                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                                }}>
                                    <span style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", fontFamily: FB }}>
                                        {item.initial}
                                    </span>
                                </div>
                                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                                    <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", fontFamily: FB }}>
                                        {item.name}
                                    </span>
                                    <span style={{ fontSize: 13, color: "#8E8E93", fontFamily: FB }}>
                                        Tap to start a conversation
                                    </span>
                                </div>
                                <Svg d="M9 18l6-6-6-6" s={16} c="#C7C7CC" />
                            </button>
                            {index < filtered.length - 1 && (
                                <div style={{ height: 1, backgroundColor: "#F2F2F7", marginLeft: 56 }} />
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </Col>
    );
}
