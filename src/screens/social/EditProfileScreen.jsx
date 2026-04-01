import { useState } from 'react';
import { T, FB, FD } from '../../tokens.js';
import { Row, Col } from '../../helpers.jsx';

const EditProfileScreen = ({ onBack }) => {
    const theme = {
        primary: "#FF5733",
        primary_light: "#FFF5F2",
        background: "#FFFFFF",
        input_bg: "#FFF5F2",
        input_border_idle: "#E8E8E8",
        input_border_active: "#FF5733",
        text_primary: "#111111",
        text_secondary: "#888888",
        chip_border: "#FF5733",
        chip_text: "#FF5733",
        chip_bg: "#FFF5F2",
        button_bg: "#FF5733",
        button_text: "#FFFFFF"
    };

    const [name, setName] = useState('Rahul Sharma');
    const [nameFocus, setNameFocus] = useState(false);

    const [about, setAbout] = useState('Full Stack Developer passionate about building real-world apps.');
    const [aboutFocus, setAboutFocus] = useState(false);

    const [skills, setSkills] = useState(['React', 'Node.js', 'Figma', 'Python']);

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const handleSave = () => {
        if (onBack) onBack(); 
    };

    return (
        <Col sx={{ background: theme.background, minHeight: "100vh" }}>
            {/* Top Bar */}
            <Row ai="center" jc="space-between" sx={{ 
                padding: "16px 16px 12px", 
                background: theme.background,
                borderBottom: "1px solid #F5F5F5"
            }}>
                <button onClick={onBack} style={{ 
                    display: "flex", alignItems: "center", justifyContent: "center", 
                    background: "transparent", border: "none", cursor: "pointer", padding: 0,
                    color: theme.primary
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <div style={{ fontFamily: FD, fontSize: 17, fontWeight: 600, color: theme.text_primary }}>
                    Edit Profile
                </div>
                <button onClick={handleSave} style={{ 
                    background: "transparent", border: "none", cursor: "pointer", padding: 0,
                    fontFamily: FB, fontSize: 15, fontWeight: 600, color: theme.primary
                }}>
                    Save
                </button>
            </Row>
            
            <div style={{ flex: 1, overflowY: "auto" }}>
                {/* Avatar Section */}
                <Col ai="center" sx={{ marginTop: 28, marginBottom: 28 }}>
                    <div style={{ position: "relative", width: 96, height: 96 }}>
                        <div style={{ 
                            width: "100%", height: "100%", borderRadius: "50%", 
                            background: T.s?.s1 || "#F0F0F0", border: `3px solid ${theme.primary}`, 
                            display: "flex", alignItems: "center", justifyContent: "center", 
                            boxShadow: "0 2px 12px rgba(255,87,51,0.15)" 
                        }}>
                            <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 36, color: theme.primary }}>R</span>
                        </div>
                        {/* Camera Overlay */}
                        <div style={{
                            position: "absolute", bottom: -2, right: -2,
                            width: 30, height: 30, borderRadius: "50%",
                            background: theme.primary,
                            display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                <circle cx="12" cy="13" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                    <div style={{ fontFamily: FB, fontSize: 14, fontWeight: 600, color: theme.primary, marginTop: 10 }}>
                        Edit
                    </div>
                </Col>

                {/* Divider */}
                <div style={{ height: 1, background: "#F5F5F5" }} />

                {/* Form Sections */}
                <Col sx={{ padding: "20px 16px 0", gap: 20 }}>
                    {/* Section 1: Name */}
                    <Col>
                        <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 500, color: theme.text_secondary, marginBottom: 6 }}>
                            Name
                        </span>
                        <div style={{ position: "relative" }}>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                                placeholder="Enter your name"
                                style={{
                                    width: "100%", boxSizing: "border-box",
                                    background: theme.input_bg, borderRadius: 12,
                                    padding: "14px 16px", paddingRight: 40,
                                    fontFamily: FB, fontSize: 15, color: theme.text_primary,
                                    border: nameFocus ? `1.5px solid ${theme.input_border_active}` : `1.5px solid ${theme.input_border_idle}`,
                                    outline: "none"
                                }}
                            />
                            <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)" }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6"/>
                                </svg>
                            </div>
                        </div>
                    </Col>

                    {/* Section 2: About */}
                    <Col>
                        <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 500, color: theme.text_secondary, marginBottom: 6 }}>
                            About
                        </span>
                        <div style={{ position: "relative" }}>
                            <textarea 
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                onFocus={() => setAboutFocus(true)}
                                onBlur={() => setAboutFocus(false)}
                                placeholder="Share a thought..."
                                rows={4}
                                style={{
                                    width: "100%", boxSizing: "border-box",
                                    background: theme.input_bg, borderRadius: 12,
                                    padding: "14px 16px", paddingRight: 40,
                                    fontFamily: FB, fontSize: 15, color: theme.text_primary,
                                    border: aboutFocus ? `1.5px solid ${theme.input_border_active}` : `1.5px solid ${theme.input_border_idle}`,
                                    outline: "none", minHeight: 100, resize: "none"
                                }}
                            />
                            <div style={{ position: "absolute", right: 16, top: 16 }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6"/>
                                </svg>
                            </div>
                        </div>
                    </Col>

                    {/* Section 3: Skills */}
                    <Col>
                        <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 500, color: theme.text_secondary, marginBottom: 8 }}>
                            Skills
                        </span>
                        <Row sx={{ 
                            flexWrap: "wrap", gap: 8, background: theme.chip_bg, 
                            borderRadius: 12, padding: 12, border: `1.5px solid ${theme.input_border_idle}` 
                        }}>
                            {skills.map((skill) => (
                                <Row key={skill} ai="center" sx={{
                                    borderRadius: 20, padding: "6px 12px", background: theme.chip_bg,
                                    border: `1.5px solid ${theme.chip_border}`
                                }}>
                                    <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 500, color: theme.chip_text, marginRight: 6 }}>
                                        {skill}
                                    </span>
                                    <div onClick={() => handleRemoveSkill(skill)} style={{
                                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                                    }}>
                                        <span style={{ fontSize: 16, lineHeight: 1, color: theme.chip_border, marginBottom: 2 }}>×</span>
                                    </div>
                                </Row>
                            ))}
                            {/* Add Skill Button */}
                            <button onClick={() => {
                                const newSkill = prompt("Add a skill:");
                                if (newSkill && newSkill.trim()) {
                                    setSkills([...skills, newSkill.trim()]);
                                }
                            }} style={{
                                border: `1.5px dashed ${theme.primary}`, borderRadius: 20,
                                padding: "6px 12px", color: theme.primary, background: "transparent",
                                fontFamily: FB, fontSize: 13, cursor: "pointer"
                            }}>
                                + Add Skill
                            </button>
                        </Row>
                    </Col>
                </Col>

                {/* Save Button */}
                <div style={{ padding: "32px 16px 40px 16px" }}>
                    <button onClick={handleSave} style={{
                        width: "100%", height: 50, borderRadius: 14,
                        background: theme.button_bg, color: theme.button_text,
                        fontFamily: FB, fontSize: 16, fontWeight: 600, border: "none",
                        boxShadow: "0 4px 14px rgba(255,87,51,0.35)", cursor: "pointer"
                    }}>
                        Save Changes
                    </button>
                </div>
            </div>
        </Col>
    );
};

export default EditProfileScreen;
