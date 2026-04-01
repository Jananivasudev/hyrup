import React, { useState } from 'react';
import { Row, Col } from '../../helpers.jsx';
import { Svg, IC } from '../../icons.jsx';
import { FB, FD } from '../../tokens.js';
import GroupFilterSheet from './GroupFilterSheet.jsx';

const GROUPS = [
    {
        id: '1', name: 'React Builders', type: 'Public',
        members: [{ initial: 'A', color: '#7C6FF7' }, { initial: 'J', color: '#4CAF8A' }, { initial: 'S', color: '#5B9BD5' }],
        extraCount: 9, memberPreview: 'Alex, Jordan, Sam...',
    },
    {
        id: '2', name: 'GATE 2026 Prep', type: 'Private',
        members: [{ initial: 'P', color: '#E8441A' }, { initial: 'R', color: '#5B9BD5' }, { initial: 'D', color: '#4CAF8A' }],
        extraCount: 3, memberPreview: 'Priya, Rahul, Dev...',
    },
    {
        id: '3', name: 'UI/UX Designers', type: 'Public',
        members: [{ initial: 'M', color: '#F0A500' }, { initial: 'L', color: '#9C5BB5' }, { initial: 'S', color: '#3DAB8E' }],
        extraCount: 5, memberPreview: 'Mia, Leo, Sara...',
    },
    {
        id: '4', name: 'Startup Founders', type: 'Private',
        members: [{ initial: 'A', color: '#E8441A' }, { initial: 'N', color: '#7C6FF7' }, { initial: 'C', color: '#5B9BD5' }],
        extraCount: 2, memberPreview: 'Arjun, Nina, Chris...',
    },
    {
        id: '5', name: 'Open Source Club', type: 'Public',
        members: [{ initial: 'K', color: '#4CAF8A' }, { initial: 'T', color: '#F0A500' }, { initial: 'R', color: '#E8441A' }],
        extraCount: 14, memberPreview: 'Karan, Tanya, Raj...',
    },
    {
        id: '6', name: 'ML Research', type: 'Private',
        members: [{ initial: 'S', color: '#9C5BB5' }, { initial: 'D', color: '#3DAB8E' }, { initial: 'A', color: '#7C6FF7' }],
        extraCount: 7, memberPreview: 'Sneha, Dev, Arjun...',
    },
];

export default function DiscoverGroupsScreen({ onBack }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [joinedIds, setJoinedIds] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ groupType: 'all', memberCount: 'all', categories: [] });

    const isFilterActive = filters.groupType !== 'all' || filters.memberCount !== 'all' || filters.categories.length > 0;

    const filtered = GROUPS.filter(g => {
        if (!g.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filters.groupType !== 'all' && g.type.toLowerCase() !== filters.groupType) return false;
        if (filters.memberCount !== 'all') {
            const totalMembers = g.members.length + g.extraCount;
            if (filters.memberCount === 'small' && totalMembers > 10) return false;
            if (filters.memberCount === 'medium' && (totalMembers <= 10 || totalMembers >= 50)) return false;
            if (filters.memberCount === 'large' && totalMembers < 50) return false;
        }
        return true;
    });

    const handleJoin = (id) => {
        setJoinedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <Col sx={{ width: "100%", height: "100%", background: "#F7F7F2", overflow: "hidden" }}>
            
            {/* Header */}
            <Row ai="center" jc="space-between" sx={{ padding: "12px 16px", background: "#F7F7F2", flexShrink: 0 }}>
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
                    Discover Groups
                </div>
                <div style={{ width: 36 }} />
            </Row>

            {/* Search Bar */}
            <Col sx={{ padding: "4px 16px", flexShrink: 0 }}>
                <Row ai="center" sx={{ 
                    backgroundColor: "#EBEBEB", borderRadius: 12, padding: "11px 12px", gap: 8
                }}>
                    <Svg d={IC.search} s={18} c="#AEAEB2" />
                    <input
                        placeholder="Search groups"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            flex: 1, fontSize: 15, color: "#1A1A1A",
                            background: "transparent", border: "none", outline: "none",
                            fontFamily: FB, paddingRight: 8
                        }}
                    />
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                        
                        <div style={{ width: 1, height: 16, backgroundColor: '#D1D1D6' }} />
                        
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "center",
                                background: "transparent", border: "none", cursor: "pointer", padding: 0,
                                position: 'relative'
                            }}
                        >
                            <Svg d="M3 6h18M6 12h12M10 18h4" s={20} c={isFilterActive ? "#E8754A" : "#1A1A1A"} w={2} />
                            {isFilterActive && (
                                <div style={{
                                    position: 'absolute', top: -2, right: -2,
                                    width: 8, height: 8, borderRadius: 4,
                                    backgroundColor: '#E8754A', border: '1.5px solid #EBEBEB'
                                }} />
                            )}
                        </button>
                    </div>
                </Row>
            </Col>

            {/* Section label */}
            <div style={{
                fontSize: 12, fontWeight: 600, color: "#AEAEB2",
                textTransform: "uppercase", letterSpacing: 0.6,
                margin: "20px 16px 12px", fontFamily: FB, flexShrink: 0
            }}>
                {filtered.length} Groups Available
            </div>

            {/* Groups Grid */}
            <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "0 12px 32px 12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                    {filtered.map((item) => {
                        const isPrivate = item.type === 'Private';
                        const isJoined = joinedIds.includes(item.id);

                        return (
                            <div key={item.id} style={{
                                backgroundColor: "#FFFFFF", borderRadius: 16, padding: 14,
                                boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.06)",
                                display: "flex", flexDirection: "column", justifyContent: "space-between",
                                minHeight: 140
                            }}>
                                <div>
                                    {/* Badge */}
                                    <div style={{
                                        display: "flex", alignItems: "center", alignSelf: "flex-end",
                                        padding: "3px 8px", borderRadius: 20, gap: 4, marginBottom: 8,
                                        backgroundColor: isPrivate ? "#FFF0EB" : "#F2F2F7",
                                        width: "fit-content", marginLeft: "auto"
                                    }}>
                                        <Svg d={isPrivate ? "M19 11H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z M7 11V7A5 5 0 0 1 17 7v4" : IC.users} s={10} c={isPrivate ? "#FF5A1F" : "#6B7280"} w={isPrivate ? 2 : 1.85} />
                                        <span style={{ fontSize: 10, fontWeight: 600, color: isPrivate ? "#FF5A1F" : "#6B7280", fontFamily: FB }}>
                                            {item.type}
                                        </span>
                                    </div>

                                    {/* Group name */}
                                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A", marginBottom: 4, fontFamily: FB, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                        {item.name}
                                    </div>

                                    {/* Member preview */}
                                    <div style={{ fontSize: 11, color: "#8E8E93", marginBottom: 12, fontFamily: FB, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                        {item.memberPreview}
                                    </div>
                                </div>

                                {/* Bottom row */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                                    
                                    {/* Avatar chips */}
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        {item.members.map((m, index) => (
                                            <div key={index} style={{
                                                width: 24, height: 24, borderRadius: 12,
                                                backgroundColor: m.color,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                border: "1.5px solid #FFFFFF",
                                                marginLeft: index > 0 ? -6 : 0, position: "relative",
                                                zIndex: item.members.length - index
                                            }}>
                                                <span style={{ fontSize: 9, fontWeight: 700, color: "#FFFFFF", fontFamily: FB }}>{m.initial}</span>
                                            </div>
                                        ))}
                                        {item.extraCount > 0 && (
                                            <div style={{
                                                width: 24, height: 24, borderRadius: 12,
                                                backgroundColor: "#E8E8E8",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                border: "1.5px solid #FFFFFF", marginLeft: -6,
                                                position: "relative", zIndex: 0
                                            }}>
                                                <span style={{ fontSize: 8, fontWeight: 700, color: "#6B7280", fontFamily: FB }}>+{item.extraCount}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Join button */}
                                    <button
                                        onClick={() => handleJoin(item.id)}
                                        style={{
                                            backgroundColor: isJoined ? "#F2F2F7" : "#FF5A1F",
                                            padding: "5px 6px", borderRadius: 20, border: "none",
                                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                                        }}
                                    >
                                        <span style={{ fontSize: 10, fontWeight: 700, color: isJoined ? "#8E8E93" : "#FFFFFF", fontFamily: FB, whiteSpace: "nowrap" }}>
                                            {isJoined ? 'Joined' : 'Join'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Filter Bottom Sheet */}
            <GroupFilterSheet 
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                currentFilters={filters}
                onApply={(newFilters) => {
                    setFilters(newFilters);
                    setIsFilterOpen(false);
                }}
            />
        </Col>
    );
}
