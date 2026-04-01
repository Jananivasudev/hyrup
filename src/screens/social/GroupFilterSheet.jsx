import React, { useState, useEffect } from 'react';
import { Row, Col } from '../../helpers.jsx';
import { Svg, IC } from '../../icons.jsx';
import { FB } from '../../tokens.js';

const CATEGORIES = [
    { id: "tech", label: "Technology" },
    { id: "design", label: "Design" },
    { id: "education", label: "Education" },
    { id: "startup", label: "Startup" },
    { id: "research", label: "Research" },
    { id: "opensource", label: "Open Source" }
];

export default function GroupFilterSheet({ isOpen, onClose, currentFilters, onApply }) {
    const [isVisible, setIsVisible] = useState(false);
    
    const [groupType, setGroupType] = useState('all');
    const [memberCount, setMemberCount] = useState('all');
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setGroupType(currentFilters?.groupType || 'all');
            setMemberCount(currentFilters?.memberCount || 'all');
            setSelectedCategories(currentFilters?.categories || []);
        } else {
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen, currentFilters]);

    const handleClearAll = () => {
        setGroupType('all');
        setMemberCount('all');
        setSelectedCategories([]);
    };

    const handleApply = () => {
        onApply({ groupType, memberCount, categories: selectedCategories });
    };

    const toggleCategory = (id) => {
        setSelectedCategories(prev => 
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const selectAllCategories = () => {
        if (selectedCategories.length === CATEGORIES.length) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(CATEGORIES.map(c => c.id));
        }
    };

    if (!isVisible && !isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 1000, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            pointerEvents: isOpen ? 'auto' : 'none'
        }}>
            {/* Backdrop */}
            <div 
                onClick={onClose}
                style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    opacity: isOpen ? 1 : 0, transition: 'opacity 0.3s ease'
                }} 
            />

            {/* Sheet Content */}
            <div style={{
                backgroundColor: '#F5F0E8', borderTopLeftRadius: 16, borderTopRightRadius: 16,
                padding: '20px 16px',
                transform: `translateY(${isOpen ? '0%' : '100%'})`,
                transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '80vh'
            }}>
                {/* Drag Handle */}
                <div style={{
                    width: 40, height: 4, borderRadius: 2,
                    backgroundColor: '#D6CFC4', alignSelf: 'center', marginBottom: 16
                }} />

                {/* Header */}
                <Row ai="center" jc="space-between" sx={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', fontFamily: FB }}>
                        Filters
                    </span>
                    <button 
                        onClick={onClose}
                        style={{
                            width: 32, height: 32, borderRadius: 16,
                            backgroundColor: '#EBEBEB', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}
                    >
                        <Svg d={IC.x} s={16} c="#1A1A1A" w={2.5} />
                    </button>
                </Row>

                {/* Scrollable Filters Area */}
                <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
                    
                    {/* Group Type */}
                    <div style={{ marginBottom: 24 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#8A8070', fontFamily: FB, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 12 }}>
                            Group Type
                        </span>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {['all', 'public', 'private'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setGroupType(type)}
                                    style={{
                                        padding: '8px 16px', borderRadius: 20,
                                        backgroundColor: groupType === type ? '#E8754A' : '#FFFFFF',
                                        border: '1px solid', borderColor: groupType === type ? '#E8754A' : '#D6CFC4',
                                        color: groupType === type ? '#FFFFFF' : '#1A1A1A',
                                        fontSize: 14, fontWeight: 600, fontFamily: FB,
                                        cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Member Count */}
                    <div style={{ marginBottom: 24 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#8A8070', fontFamily: FB, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 12 }}>
                            Member Count
                        </span>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {[
                                { id: 'all', label: 'All' },
                                { id: 'small', label: '1–10' },
                                { id: 'medium', label: '11–50' },
                                { id: 'large', label: '50+' }
                            ].map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => setMemberCount(option.id)}
                                    style={{
                                        padding: '8px 16px', borderRadius: 20,
                                        backgroundColor: memberCount === option.id ? '#E8754A' : '#FFFFFF',
                                        border: '1px solid', borderColor: memberCount === option.id ? '#E8754A' : '#D6CFC4',
                                        color: memberCount === option.id ? '#FFFFFF' : '#1A1A1A',
                                        fontSize: 14, fontWeight: 600, fontFamily: FB,
                                        cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Multi-select */}
                    <div>
                        <Row ai="center" jc="space-between" sx={{ marginBottom: 12 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#8A8070', fontFamily: FB, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Category
                            </span>
                            <button
                                onClick={selectAllCategories}
                                style={{
                                    background: 'transparent', border: 'none',
                                    color: '#E8754A', fontSize: 13, fontWeight: 600, fontFamily: FB, cursor: 'pointer'
                                }}
                            >
                                {selectedCategories.length === CATEGORIES.length ? 'Deselect all' : 'Select all'}
                            </button>
                        </Row>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 8 }}>
                            {CATEGORIES.map((cat, idx) => {
                                const isSelected = selectedCategories.includes(cat.id);
                                return (
                                    <div key={cat.id}>
                                        <button
                                            onClick={() => toggleCategory(cat.id)}
                                            style={{
                                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                padding: '12px 8px', background: 'transparent', border: 'none', cursor: 'pointer'
                                            }}
                                        >
                                            <span style={{ 
                                                fontSize: 15, fontFamily: FB, color: '#1A1A1A', 
                                                fontWeight: isSelected ? 700 : 500 
                                            }}>
                                                {cat.label}
                                            </span>
                                            {isSelected && <Svg d={IC.check} s={18} c="#E8754A" w={2.5} />}
                                        </button>
                                        {idx < CATEGORIES.length - 1 && (
                                            <div style={{ height: 1, backgroundColor: '#F0F0F0', margin: '0 8px' }} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <Row sx={{ gap: 12, paddingTop: 16 }}>
                    <button
                        onClick={handleClearAll}
                        style={{
                            flex: 1, padding: '14px 0', borderRadius: 12,
                            backgroundColor: 'transparent',
                            border: '1.5px solid #1A1A1A', color: '#1A1A1A',
                            fontSize: 16, fontWeight: 700, fontFamily: FB, cursor: 'pointer'
                        }}
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleApply}
                        style={{
                            flex: 1, padding: '14px 0', borderRadius: 12,
                            backgroundColor: '#E8754A', border: 'none', color: '#FFFFFF',
                            fontSize: 16, fontWeight: 700, fontFamily: FB, cursor: 'pointer'
                        }}
                    >
                        Apply
                    </button>
                </Row>
            </div>
        </div>
    );
}
