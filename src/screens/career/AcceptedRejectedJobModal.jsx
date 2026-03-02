import { useState, useEffect } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';

/* ═══════════════════════════════════════════════════════════════════
   ACCEPTED / REJECTED JOB MODAL

   A premium layered modal for viewing job details from the
   Accepted or Rejected sections. Read-only — does NOT mutate state.

   Props:
     job      — full job object
     status   — "accepted" | "rejected"
     onClose  — callback to dismiss
═══════════════════════════════════════════════════════════════════ */
const AcceptedRejectedJobModal = ({ job, status, onClose }) => {
    const t = T.c;
    const [visible, setVisible] = useState(false);
    const isAccepted = status === "accepted";
    const accent = isAccepted ? T.c.green : T.c.red;
    const statusLabel = isAccepted ? "Applied" : "Not Selected";
    const statusIcon = isAccepted ? "✓" : "✗";

    // Fade-in + pop animation on mount
    useEffect(() => {
        requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 220);
    };

    return (
        <div
            onClick={handleClose}
            style={{
                position: "absolute", inset: 0, zIndex: 60,
                display: "flex", alignItems: "flex-end", justifyContent: "center",
                background: visible ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
                backdropFilter: visible ? "blur(6px)" : "blur(0px)",
                transition: "background 0.28s ease, backdrop-filter 0.28s ease",
            }}
        >
            {/* Modal card — stops propagation so clicking inside won't close */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: "100%", maxHeight: "82%",
                    background: t.s1, borderRadius: "24px 24px 0 0",
                    display: "flex", flexDirection: "column",
                    overflow: "hidden",
                    transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
                    opacity: visible ? 1 : 0,
                    transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.28s ease",
                    boxShadow: "0 -8px 40px rgba(0,0,0,0.35)",
                }}
            >
                {/* ── HEADER ── */}
                <div style={{ padding: "20px 22px 0", flexShrink: 0 }}>
                    {/* Close + Status row */}
                    <Row ai="center" jc="space-between" sx={{ marginBottom: 16 }}>
                        <div style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "5px 12px", borderRadius: 100,
                            background: `${accent}15`, border: `1px solid ${accent}30`,
                        }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
                            <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 800, color: accent, letterSpacing: 0.5 }}>
                                {statusLabel.toUpperCase()}
                            </span>
                        </div>
                        <button
                            onClick={handleClose}
                            style={{
                                width: 34, height: 34, borderRadius: 12,
                                background: t.s2, border: `1px solid ${t.border}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer",
                            }}
                        >
                            <Svg d={IC.x} s={14} c={t.t2} />
                        </button>
                    </Row>

                    {/* Company logo + Title */}
                    <Row g={14} ai="flex-start" sx={{ marginBottom: 16 }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: 18,
                            background: job.grad || t.s3,
                            border: `1.5px solid ${accent}30`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, boxShadow: `0 4px 16px ${accent}18`,
                        }}>
                            <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 24, color: accent }}>{job.ch}</span>
                        </div>
                        <Col g={4} sx={{ flex: 1 }}>
                            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 19, color: t.t1, letterSpacing: -0.3 }}>{job.role}</span>
                            <span style={{ fontFamily: FB, fontSize: 13, color: t.t2 }}>{job.co}</span>
                        </Col>
                    </Row>

                    {/* Divider */}
                    <div style={{ height: 1, background: t.border, margin: "0 -22px", marginBottom: 0 }} />
                </div>

                {/* ── SCROLLABLE BODY ── */}
                <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px 0" }}>

                    {/* Info pills */}
                    <Row g={8} sx={{ marginBottom: 16, flexWrap: "wrap" }}>
                        <InfoPill icon={IC.loc} label={job.loc} t={t} />
                        <InfoPill icon={IC.brief} label={job.type} t={t} />
                        <InfoPill icon={IC.zap} label={job.pay} t={t} accent={T.c.green} />
                        <InfoPill icon={IC.star} label={`${job.m}% Match`} t={t} accent={t.orange} />
                    </Row>

                    {/* Description */}
                    <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 12, color: t.t2, letterSpacing: 1, display: "block", marginBottom: 8 }}>ABOUT THE ROLE</span>
                    <p style={{
                        fontFamily: FB, fontSize: 13.5, color: t.t1, lineHeight: 1.7,
                        margin: 0, marginBottom: 18, opacity: 0.85,
                    }}>
                        {job.desc || "No description available for this role."}
                    </p>

                    {/* Skills */}
                    <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 12, color: t.t2, letterSpacing: 1, display: "block", marginBottom: 8 }}>SKILLS</span>
                    <Row g={6} sx={{ flexWrap: "wrap", marginBottom: 20 }}>
                        {job.tags.map(tag => (
                            <span key={tag} style={{
                                fontFamily: FB, fontSize: 12, fontWeight: 600,
                                color: t.orange, background: t.orangeLo,
                                padding: "5px 12px", borderRadius: 100,
                            }}>{tag}</span>
                        ))}
                    </Row>
                </div>

                {/* ── FOOTER ── */}
                <div style={{
                    padding: "14px 22px 22px", flexShrink: 0,
                    borderTop: `1px solid ${t.border}`,
                    background: t.s1,
                }}>
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        width: "100%", height: 48, borderRadius: 16,
                        background: `${accent}12`,
                        border: `1.5px solid ${accent}25`,
                    }}>
                        <span style={{
                            fontFamily: FD, fontWeight: 900, fontSize: 15,
                            color: accent, letterSpacing: 0.5,
                        }}>
                            {statusIcon} {statusLabel}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Helper: info pill ── */
const InfoPill = ({ icon, label, t, accent }) => (
    <div style={{
        display: "flex", alignItems: "center", gap: 5,
        padding: "6px 12px", borderRadius: 100,
        background: t.s2, border: `1px solid ${t.border}`,
    }}>
        {icon && <Svg d={icon} s={12} c={accent || t.t2} />}
        <span style={{ fontFamily: FB, fontSize: 11.5, fontWeight: 600, color: accent || t.t1 }}>{label}</span>
    </div>
);

export default AcceptedRejectedJobModal;
