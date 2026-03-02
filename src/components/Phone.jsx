import { T, FB } from '../tokens.js';

/* ── PHONE SHELL ── */
const Phone = ({ children, mode }) => {
    const isC = mode === "career";
    const t = isC ? T.c : T.s;
    return (
        <div style={{
            width: 393, height: 852, background: t.bg, borderRadius: 52,
            border: `1.5px solid ${isC ? "#1E1E1E" : "#D8D4CC"}`,
            overflow: "hidden", display: "flex", flexDirection: "column", position: "relative",
            boxShadow: isC
                ? "0 0 0 1px #0A0A0A, 0 60px 120px rgba(0,0,0,0.95), 0 0 80px rgba(255,122,26,0.04)"
                : "0 0 0 1px #C8C2B8, 0 60px 120px rgba(0,0,0,0.14)",
            transition: "box-shadow 0.5s ease, border-color 0.5s ease",
        }}>
            {/* Status bar */}
            <div style={{ height: 46, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", flexShrink: 0 }}>
                <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: t.t1 }}>9:41</span>
                <div style={{ width: 108, height: 27, background: isC ? "#060606" : "#E0DDD7", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: isC ? "#222" : "#C8C4BC" }} />
                </div>
                <div style={{ width: 14, height: 7, borderRadius: 2, border: `1.5px solid ${t.t2}`, overflow: "hidden" }}>
                    <div style={{ width: "75%", height: "100%", background: T.c.green }} />
                </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
                {children}
            </div>
        </div>
    );
};

export default Phone;
