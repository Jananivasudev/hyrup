import { IC, Svg } from '../icons.jsx';
import { FB } from '../tokens.js';

/* ── MODE TOGGLE — lives in header ── */
const ModeToggle = ({ mode, onToggle }) => {
    const isC = mode === "career";
    return (
        <div onClick={onToggle} style={{
            width: 178, height: 34, borderRadius: 100,
            background: isC ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            border: `1px solid ${isC ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)"}`,
            display: "flex", alignItems: "center", padding: 3, cursor: "pointer", position: "relative",
        }}>
            <div style={{
                position: "absolute", width: "calc(50% - 3px)", height: 28, borderRadius: 100,
                background: isC ? "linear-gradient(105deg, #FF7A1A 0%, #FF9A45 100%)" : "linear-gradient(105deg, #FF5722 0%, #FF7A4A 100%)",
                left: isC ? 3 : "50%",
                transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
                boxShadow: "0 2px 10px rgba(255,87,34,0.35)",
            }} />
            {[["career", IC.brief, "Career"], ["social", IC.users, "Social"]].map(([id, ic, label]) => {
                const sel = mode === id;
                return (
                    <div key={id} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, position: "relative", zIndex: 1 }}>
                        <Svg d={ic} s={12} c={sel ? "#fff" : isC ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)"} w={sel ? 2.2 : 1.7} />
                        <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 12, color: sel ? "#fff" : isC ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)" }}>{label}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default ModeToggle;
