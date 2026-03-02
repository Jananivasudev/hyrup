import { T, FB } from '../tokens.js';
import { Svg } from '../icons.jsx';

/* ── BOTTOM NAV — indicator dot above icon ── */
const BottomNav = ({ mode, active, onSelect, items }) => {
    const t = mode === "career" ? T.c : T.s;
    const isC = mode === "career";

    return (
        <div style={{
            height: 72, background: t.s1,
            borderTop: `1px solid ${t.border}`,
            display: "flex", alignItems: "center", padding: "0 4px 8px", flexShrink: 0,
            boxShadow: isC ? "none" : "0 -8px 32px rgba(0,0,0,0.06)",
        }}>
            {items.map(([id, ic, label]) => {
                const sel = active === id;
                return (
                    <button key={id} onClick={() => onSelect(id)} style={{
                        flex: 1, background: "none", border: "none", cursor: "pointer",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0", position: "relative",
                    }}>
                        {sel && <div style={{ position: "absolute", top: 2, width: 4, height: 4, borderRadius: 2, background: t.orange }} />}
                        <div style={{ width: 40, height: 26, borderRadius: 13, background: sel ? t.orangeLo : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .18s" }}>
                            <Svg d={ic} s={19} c={sel ? t.orange : t.t2} w={sel ? 2.2 : 1.7} />
                        </div>
                        <span style={{ fontFamily: FB, fontSize: 10, fontWeight: sel ? 700 : 500, color: sel ? t.orange : t.t2 }}>{label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;
