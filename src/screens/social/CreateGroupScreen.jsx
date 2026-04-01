import React, { useState } from 'react';
import { Row, Col } from '../../helpers.jsx';
import { Svg, IC } from '../../icons.jsx';
import { FB, FD } from '../../tokens.js';

const CONNECTIONS = [
    { id: '1',  name: 'Sneha R.',   initial: 'S', color: '#7C6FF7' },
    { id: '2',  name: 'Dev M.',     initial: 'D', color: '#E8805A' },
    { id: '3',  name: 'Arjun K.',   initial: 'A', color: '#4CAF8A' },
    { id: '4',  name: 'Priya N.',   initial: 'P', color: '#E8441A' },
    { id: '5',  name: 'Rahul T.',   initial: 'R', color: '#5B9BD5' },
    { id: '6',  name: 'Meera S.',   initial: 'M', color: '#F0A500' },
    { id: '7',  name: 'Chris D.',   initial: 'C', color: '#9C5BB5' },
    { id: '8',  name: 'Nina L.',    initial: 'N', color: '#3DAB8E' },
    { id: '9',  name: 'Alex J.',    initial: 'A', color: '#E8441A' },
    { id: '10', name: 'Jordan B.',  initial: 'J', color: '#5B9BD5' },
    { id: '11', name: 'Sara K.',    initial: 'S', color: '#4CAF8A' },
    { id: '12', name: 'Leo M.',     initial: 'L', color: '#F0A500' },
];

export default function CreateGroupScreen({ onBack, onNext }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);

    const filtered = CONNECTIONS.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedMembers = CONNECTIONS.filter(c =>
        selectedIds.includes(c.id)
    );

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const removeSelected = (id) => {
        setSelectedIds(prev => prev.filter(i => i !== id));
    };

    return (
        <Col sx={{ width: "100%", height: "100%", background: "#F7F7F2", overflow: "hidden" }}>
            
            {/* Header */}
            <Row ai="center" jc="space-between" sx={{ padding: "14px 16px", background: "#F7F7F2", flexShrink: 0 }}>
                <button
                    onClick={onBack}
                    style={{
                        minWidth: 60, background: "transparent", border: "none",
                        cursor: "pointer", textAlign: "left", padding: 0
                    }}
                >
                    <span style={{ fontSize: 16, fontWeight: 500, color: "#1A1A1A", fontFamily: FB }}>Cancel</span>
                </button>

                <Col ai="center" sx={{ gap: 2 }}>
                    <span style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A", fontFamily: FB }}>Add Members</span>
                    <span style={{ fontSize: 12, fontWeight: 400, color: "#8E8E93", fontFamily: FB }}>{selectedIds.length} selected</span>
                </Col>

                <button
                    onClick={() => { if (selectedIds.length > 0) onNext?.(selectedMembers); }}
                    disabled={selectedIds.length === 0}
                    style={{
                        minWidth: 60, background: "transparent", border: "none",
                        cursor: selectedIds.length > 0 ? "pointer" : "default",
                        textAlign: "right", padding: 0,
                        opacity: selectedIds.length === 0 ? 0.4 : 1
                    }}
                >
                    <span style={{ fontSize: 16, fontWeight: 700, color: selectedIds.length === 0 ? "#AEAEB2" : "#FF5A1F", fontFamily: FB }}>Next</span>
                </button>
            </Row>

            {/* Search Bar */}
            <Col sx={{ padding: "4px 16px", flexShrink: 0 }}>
                <Row ai="center" sx={{ 
                    backgroundColor: "#EBEBEB", borderRadius: 12, padding: "11px 12px", gap: 8
                }}>
                    <Svg d={IC.search} s={18} c="#AEAEB2" />
                    <input
                        placeholder="Search connections"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            flex: 1, fontSize: 15, color: "#1A1A1A",
                            background: "transparent", border: "none", outline: "none", fontFamily: FB
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

            {/* Selected Members Horizontal Row */}
            {selectedMembers.length > 0 && (
                <div style={{ marginTop: 12, marginBottom: 4, flexShrink: 0 }}>
                    <div style={{
                        display: "flex", flexDirection: "row", alignItems: "flex-start",
                        gap: 16, padding: "0 16px", overflowX: "auto", scrollbarWidth: "none"
                    }}>
                        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {selectedMembers.map(person => (
                            <div key={person.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 56, gap: 4, flexShrink: 0 }}>
                                <div style={{ position: "relative" }}>
                                    <div style={{
                                        width: 52, height: 52, borderRadius: 26,
                                        backgroundColor: person.color,
                                        display: "flex", alignItems: "center", justifyContent: "center"
                                    }}>
                                        <span style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", fontFamily: FB }}>{person.initial}</span>
                                    </div>
                                    <button
                                        onClick={() => removeSelected(person.id)}
                                        style={{
                                            position: "absolute", top: 0, right: -2,
                                            width: 18, height: 18, borderRadius: 9,
                                            backgroundColor: "#1A1A1A",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            border: "1.5px solid #F7F7F2", cursor: "pointer", padding: 0
                                        }}
                                    >
                                        <Svg d={IC.x} s={10} c="#FFFFFF" w={2.5} />
                                    </button>
                                </div>
                                <span style={{
                                    fontSize: 11, fontWeight: 500, color: "#1A1A1A", textAlign: "center",
                                    width: 56, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: FB
                                }}>
                                    {person.name.split(' ')[0]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Divider */}
            {selectedMembers.length > 0 && (
                <div style={{ height: 1, backgroundColor: "#E8E8E8", margin: "16px 16px 4px 16px", flexShrink: 0 }} />
            )}

            {/* Scrollable List container */}
            <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
                
                {/* Section Label */}
                <div style={{
                    fontSize: 12, fontWeight: 600, color: "#AEAEB2",
                    textTransform: "uppercase", letterSpacing: 0.6,
                    margin: "16px 16px 8px", fontFamily: FB
                }}>
                    Connections
                </div>

                {/* Connections List */}
                <div style={{ padding: "0 16px 32px 16px", display: "flex", flexDirection: "column" }}>
                    {filtered.map((item, index) => {
                        const isSelected = selectedIds.includes(item.id);
                        return (
                            <div key={item.id}>
                                <button
                                    onClick={() => toggleSelect(item.id)}
                                    style={{
                                        display: "flex", flexDirection: "row", alignItems: "center",
                                        padding: "12px 0", gap: 12, width: "100%",
                                        background: "transparent", border: "none", cursor: "pointer", textAlign: "left"
                                    }}
                                >
                                    <div style={{
                                        width: 46, height: 46, borderRadius: 23,
                                        backgroundColor: item.color,
                                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                                    }}>
                                        <span style={{ fontSize: 17, fontWeight: 700, color: "#FFFFFF", fontFamily: FB }}>
                                            {item.initial}
                                        </span>
                                    </div>
                                    
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                                        <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", fontFamily: FB }}>
                                            {item.name}
                                        </span>
                                        <span style={{ fontSize: 13, color: "#8E8E93", fontFamily: FB }}>
                                            Connected
                                        </span>
                                    </div>

                                    {/* Checkbox */}
                                    <div style={{
                                        width: 24, height: 24, borderRadius: 12,
                                        border: isSelected ? "1.5px solid #FF5A1F" : "1.5px solid #D1D1D6",
                                        backgroundColor: isSelected ? "#FF5A1F" : "#FFFFFF",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "all 0.2s"
                                    }}>
                                        {isSelected && <Svg d={IC.check} s={14} c="#FFFFFF" w={3} />}
                                    </div>
                                </button>
                                {index < filtered.length - 1 && (
                                    <div style={{ height: 1, backgroundColor: "#F2F2F7", marginLeft: 58 }} />
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </Col>
    );
}
