import { T, FD, FB } from '../../tokens.js';
import { IC, Svg } from '../../icons.jsx';
import { Row, Col } from '../../helpers.jsx';
import ModeToggle from '../../components/ModeToggle.jsx';

/* ── CAREER PROFILE ── */
const CareerProfile = ({ mode, onToggle }) => {
    const t = T.c;
    return (
        <Col>
            {/* Cover */}
            <div style={{ height: 160, background: `linear-gradient(160deg, #1A0C00 0%, #2D1600 50%, #0F0F0F 100%)`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 65% 40%, ${t.orangeMid}, transparent 60%)` }} />
                <div style={{ position: "absolute", top: 14, right: 18 }}>
                    <ModeToggle mode={mode} onToggle={onToggle} />
                </div>
                <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)" }}>
                    <div style={{ width: 72, height: 72, borderRadius: 24, background: t.s2, border: `3px solid ${t.bg}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 28, color: t.orange }}>R</span>
                    </div>
                </div>
            </div>

            <div style={{ paddingTop: 38, textAlign: "center", padding: "38px 22px 0" }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: t.t1, display: "block", marginBottom: 2 }}>Rahul Sharma</span>
                <span style={{ fontFamily: FB, fontSize: 12, color: t.t2, display: "block", marginBottom: 16 }}>B.Tech CSE · RGPV Bhopal · 2026</span>

                {/* Stats row */}
                <Row ai="center" jc="center" g={0} sx={{ marginBottom: 18, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: "14px 0" }}>
                    {[["47", "Connections"], ["7", "Skills"], ["2", "Wins"], ["12", "Applied"]].map(([n, l], i, arr) => (
                        <div key={l} style={{ flex: 1, textAlign: "center", borderRight: i < arr.length - 1 ? `1px solid ${t.border}` : "none" }}>
                            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: t.t1, display: "block" }}>{n}</span>
                            <span style={{ fontFamily: FB, fontSize: 10, color: t.t2 }}>{l}</span>
                        </div>
                    ))}
                </Row>

                {/* Skill badges */}
                <Row g={6} jc="center" sx={{ flexWrap: "wrap", marginBottom: 18 }}>
                    {["React ✓", "Node.js ✓", "Figma ✓", "MongoDB ✓"].map((s, i) => {
                        const cols = [t.orange, T.c.green, "#A78BFA", "#22C55E"];
                        return <span key={s} style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: cols[i], background: `${cols[i]}15`, padding: "5px 12px", borderRadius: 100 }}>{s}</span>;
                    })}
                </Row>

                {/* AI Resume button */}
                <button style={{ width: "100%", height: 46, borderRadius: 14, background: t.orange, border: "none", color: "#fff", fontFamily: FB, fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <Svg d={IC.spark} s={15} c="#fff" />
                    AI Resume Builder
                </button>

                {/* Tab view */}
                <Row g={0} sx={{ borderBottom: `1px solid ${t.border}`, marginBottom: 16 }}>
                    {[["grid", IC.grid], ["spark", IC.spark], ["bmark", IC.bmark]].map(([id, ic], idx) => (
                        <div key={id} style={{ flex: 1, display: "flex", justifyContent: "center", padding: "10px 0", borderBottom: idx === 0 ? `2px solid ${t.orange}` : "none" }}>
                            <Svg d={ic} s={18} c={idx === 0 ? t.orange : t.t3} />
                        </div>
                    ))}
                </Row>

                {/* Project grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
                    {["Todo App", "Weather UI", "Chat Bot", "Portfolio", "E-Comm", "Resume AI"].map((p, i) => {
                        const bgs = ["#1C0D00", "#001C0D", "#0D001C", "#1C1000", "#001C1C", "#180016"];
                        const cols = [t.orange, T.c.green, "#A78BFA", "#F59E0B", T.c.blue, "#EC4899"];
                        return (
                            <div key={p} style={{ aspectRatio: "1", background: bgs[i], display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, position: "relative" }}>
                                <Svg d={IC.grid} s={22} c={`${cols[i]}50`} />
                                <span style={{ fontFamily: FB, fontSize: 9, color: `${cols[i]}99`, fontWeight: 600 }}>{p}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div style={{ height: 28 }} />
        </Col>
    );
};

export default CareerProfile;
