import { useState } from "react";
import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row } from '../../helpers.jsx';

/* ── FILTER PANEL — modal overlay ── */
const FilterPanel = ({ filters, setFilters, onClose }) => {
    const t = T.c;
    const [local, setLocal] = useState({ ...filters });
    const activeCount = [local.jobType, local.location, local.salaryMin, local.status !== "all" ? local.status : null].filter(Boolean).length;

    const Chip = ({ label, active, onClick }) => (
        <button onClick={onClick} style={{
            padding: "7px 14px", borderRadius: 100,
            background: active ? t.orange : t.s2, border: `1px solid ${active ? t.orange : t.border}`,
            color: active ? "#fff" : t.t2, fontFamily: FB, fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>{label}</button>
    );

    return (
        <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column" }}>
            {/* Backdrop */}
            <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
            {/* Panel */}
            <div style={{ position: "relative", marginTop: "auto", background: t.s1, borderRadius: "24px 24px 0 0", padding: "20px 22px 28px", zIndex: 1 }}>
                <Row ai="center" jc="space-between" sx={{ marginBottom: 20 }}>
                    <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: t.t1 }}>Filters {activeCount > 0 && <span style={{ fontFamily: FB, fontSize: 12, color: t.orange }}>({activeCount})</span>}</span>
                    <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 12, background: t.s2, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <Svg d={IC.x} s={14} c={t.t2} />
                    </button>
                </Row>

                {/* Status */}
                <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 12, color: t.t2, letterSpacing: 1, display: "block", marginBottom: 8 }}>STATUS</span>
                <Row g={8} sx={{ marginBottom: 18, flexWrap: "wrap" }}>
                    {[["All", "all"], ["Active", "active"], ["Accepted", "accepted"], ["Rejected", "rejected"]].map(([label, val]) => (
                        <Chip key={val} label={label} active={local.status === val}
                            onClick={() => setLocal(s => ({ ...s, status: val }))} />
                    ))}
                </Row>

                {/* Job Type */}
                <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 12, color: t.t2, letterSpacing: 1, display: "block", marginBottom: 8 }}>JOB TYPE</span>
                <Row g={8} sx={{ marginBottom: 18 }}>
                    <Chip label="All" active={!local.jobType} onClick={() => setLocal(s => ({ ...s, jobType: null }))} />
                    <Chip label="Internship" active={local.jobType === "Internship"} onClick={() => setLocal(s => ({ ...s, jobType: s.jobType === "Internship" ? null : "Internship" }))} />
                    <Chip label="Job" active={local.jobType === "Job"} onClick={() => setLocal(s => ({ ...s, jobType: s.jobType === "Job" ? null : "Job" }))} />
                </Row>

                {/* Location */}
                <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 12, color: t.t2, letterSpacing: 1, display: "block", marginBottom: 8 }}>LOCATION</span>
                <Row g={8} sx={{ marginBottom: 18, flexWrap: "wrap" }}>
                    {["All", "Remote", "Hybrid", "On-site"].map(loc => (
                        <Chip key={loc} label={loc} active={loc === "All" ? !local.location : local.location === loc}
                            onClick={() => setLocal(s => ({ ...s, location: loc === "All" || s.location === loc ? null : loc }))} />
                    ))}
                </Row>

                {/* Salary */}
                <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 12, color: t.t2, letterSpacing: 1, display: "block", marginBottom: 8 }}>MIN STIPEND</span>
                <Row g={8} sx={{ marginBottom: 22, flexWrap: "wrap" }}>
                    {[["Any", null], ["₹15K+", 15], ["₹20K+", 20], ["₹30K+", 30]].map(([label, val]) => (
                        <Chip key={label} label={label} active={local.salaryMin === val}
                            onClick={() => setLocal(s => ({ ...s, salaryMin: s.salaryMin === val ? null : val }))} />
                    ))}
                </Row>

                {/* Actions */}
                <Row g={10}>
                    <button onClick={() => { setLocal({ jobType: null, location: null, salaryMin: null, status: "all" }); }} style={{
                        flex: 1, height: 46, borderRadius: 14, background: t.s2, border: `1px solid ${t.border}`,
                        color: t.t2, fontFamily: FB, fontSize: 14, fontWeight: 700, cursor: "pointer",
                    }}>Reset</button>
                    <button onClick={() => { setFilters(local); onClose(); }} style={{
                        flex: 1, height: 46, borderRadius: 14, background: t.orange, border: "none",
                        color: "#fff", fontFamily: FB, fontSize: 14, fontWeight: 800, cursor: "pointer",
                        boxShadow: `0 4px 16px rgba(255,122,26,0.3)`,
                    }}>Apply Filters</button>
                </Row>
            </div>
        </div>
    );
};

export default FilterPanel;
