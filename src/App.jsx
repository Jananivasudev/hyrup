import { useState } from "react";
import { FONT_IMPORT, FD, FB, T } from './tokens.js';
import { IC } from './icons.jsx';
import { ALL_JOBS } from './data.js';
import Phone from './components/Phone.jsx';
import BottomNav from './components/BottomNav.jsx';

/* ── Career Screens ── */
import CareerHome from './screens/career/CareerHome.jsx';
import CareerJobs from './screens/career/CareerJobs.jsx';
import CareerChat from './screens/career/CareerChat.jsx';
import CareerNews from './screens/career/CareerNews.jsx';
import CareerProfile from './screens/career/CareerProfile.jsx';

/* ── Social Screens ── */
import SocialHome from './screens/social/SocialHome.jsx';
import SocialFeed from './screens/social/SocialFeed.jsx';
import SocialConnect from './screens/social/SocialConnect.jsx';
import SocialChat from './screens/social/SocialChat.jsx';
import SocialProfile from './screens/social/SocialProfile.jsx';

/* ── Hackathon sample data ── */
const HACKATHONS = [
    { id: "h1", title: "HackIndia 2025", org: "MLH × Google", date: "Mar 15–17", loc: "Bengaluru", prize: "₹5L", tags: ["AI/ML", "Web3", "Open"], ch: "H", grad: "linear-gradient(145deg, #0D1A00, #1A2D00)", col: "#22C55E" },
    { id: "h2", title: "Smart India Hackathon", org: "MoE India", date: "Apr 1–3", loc: "National (Online)", prize: "₹1L", tags: ["Gov Tech", "Healthcare", "Ed Tech"], ch: "S", grad: "linear-gradient(145deg, #00101A, #001C2E)", col: "#3B82F6" },
    { id: "h3", title: "ETH India 2025", org: "Devfolio", date: "May 10–12", loc: "Hyderabad", prize: "$10K", tags: ["Web3", "DeFi", "ZK"], ch: "E", grad: "linear-gradient(145deg, #120018, #1E0028)", col: "#A855F7" },
    { id: "h4", title: "Build with AI", org: "Google DevRel", date: "Jun 5–7", loc: "Remote", prize: "₹3L", tags: ["Gemini API", "Flutter", "Firebase"], ch: "G", grad: "linear-gradient(145deg, #1A1000, #2D1E00)", col: "#F59E0B" },
];

/* ═══════════════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════════════ */
export default function HYRUPApp() {
    const [mode, setMode] = useState("career");
    const [cTab, setCTab] = useState("home");
    const [sTab, setSTab] = useState("home");
    const [fading, setFading] = useState(false);

    /* ══════════════════════════════════════════════════════════════════
       EXPLICIT JOB STATE — three arrays, one job per bucket, no overlap
    ══════════════════════════════════════════════════════════════════ */
    const [activeJobs, setActiveJobs] = useState([...ALL_JOBS]);
    const [acceptedJobs, setAcceptedJobs] = useState([]);
    const [rejectedJobs, setRejectedJobs] = useState([]);
    const [bookmarkedIds, setBookmarkedIds] = useState([]);
    const [hackathons] = useState([...HACKATHONS]);

    /* ── moveJob(jobId, destination) ── */
    const moveJob = (jobId, destination) => {
        const job = ALL_JOBS.find(j => j.id === jobId);
        if (!job) return;

        setActiveJobs(prev => prev.filter(j => j.id !== jobId));

        if (destination === "accepted") {
            setAcceptedJobs(prev =>
                prev.some(j => j.id === jobId) ? prev : [...prev, job]
            );
            setRejectedJobs(prev => prev.filter(j => j.id !== jobId));
        } else if (destination === "rejected") {
            setRejectedJobs(prev =>
                prev.some(j => j.id === jobId) ? prev : [...prev, job]
            );
            setAcceptedJobs(prev => prev.filter(j => j.id !== jobId));
        }
    };

    /* ── Bookmark — independent of accept/reject ── */
    const toggleBookmark = (id) => {
        setBookmarkedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleMode = () => {
        setFading(true);
        setTimeout(() => { setMode(m => m === "career" ? "social" : "career"); setFading(false); }, 160);
    };

    const isC = mode === "career";
    const p = { mode, onToggle: toggleMode };
    const t = isC ? T.c : T.s;

    /* ── Nav items ── */
    const careerNavItems = [["home", IC.home, "Home"], ["jobs", IC.brief, "Jobs"], ["chat", IC.chat, "Chat"], ["news", IC.news, "News"], ["profile", IC.user, "Me"]];
    const socialNavItems = [["home", IC.home, "Home"], ["feed", IC.news, "Feed"], ["connect", IC.users, "Connect"], ["chat", IC.chat, "Chat"], ["profile", IC.user, "Me"]];

    const renderScreen = () => {
        if (isC) {
            if (cTab === "home") return <CareerHome {...p} appliedCount={acceptedJobs.length} />;
            if (cTab === "jobs") return <CareerJobs {...p}
                activeJobs={activeJobs} acceptedJobs={acceptedJobs} rejectedJobs={rejectedJobs}
                bookmarkedIds={bookmarkedIds} hackathons={hackathons}
                moveJob={moveJob} toggleBookmark={toggleBookmark}
            />;
            if (cTab === "chat") return <CareerChat {...p} />;
            if (cTab === "news") return <CareerNews {...p} />;
            if (cTab === "profile") return <CareerProfile {...p} />;
        } else {
            if (sTab === "home") return <SocialHome {...p} onNav={setSTab} />;
            if (sTab === "feed") return <SocialFeed {...p} />;
            if (sTab === "connect") return <SocialConnect {...p} />;
            if (sTab === "chat") return <SocialChat {...p} />;
            if (sTab === "profile") return <SocialProfile {...p} />;
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#030303", display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 0 48px" }}>
            <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        button { font-family: 'DM Sans', sans-serif; outline: none; -webkit-tap-highlight-color: transparent; }
      `}</style>

            {/* Wordmark */}
            <div style={{ textAlign: "center", marginBottom: 18 }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 32, letterSpacing: -1, color: "#fff" }}>
                    HY<span style={{ color: "#FF7A1A" }}>R</span>UP
                </span>
                <div style={{ fontFamily: FB, fontSize: 11, color: "#2A2A2A", marginTop: 3 }}>MVP Phase 2 · Career & Social · Mobile UI System</div>
            </div>

            {/* Mode label */}
            <div style={{ marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: t.orange, boxShadow: `0 0 8px ${t.orange}` }} />
                <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: t.orange }}>
                    {isC ? "Career Mode — #0F0F0F dark, orange accent" : "Social Mode — #F8F7F5 warm light, vivid orange"}
                </span>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: t.orange, boxShadow: `0 0 8px ${t.orange}` }} />
            </div>

            <Phone mode={mode}>
                <div style={{ display: "flex", flexDirection: "column", height: "100%", opacity: fading ? 0 : 1, transition: "opacity 0.16s ease" }}>
                    <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
                        {renderScreen()}
                    </div>
                    <BottomNav mode={mode} active={isC ? cTab : sTab} onSelect={isC ? setCTab : setSTab} items={isC ? careerNavItems : socialNavItems} />
                </div>
            </Phone>

            {/* Design system legend */}
            <div style={{ marginTop: 24, maxWidth: 393, padding: "0 20px", textAlign: "center" }}>
                <p style={{ fontFamily: FB, fontSize: 10, color: "#222", lineHeight: 1.9 }}>
                    <span style={{ color: "#444" }}>TYPOGRAPHY</span> — Bricolage Grotesque (display) + DM Sans (body)<br />
                    <span style={{ color: "#444" }}>CAREER</span> — <span style={{ color: "#FF7A1A" }}>#FF7A1A</span> · <span style={{ color: "#555" }}>#0F0F0F bg · #161616 card · r20</span><br />
                    <span style={{ color: "#444" }}>SOCIAL</span> — <span style={{ color: "#FF5722" }}>#FF5722</span> · <span style={{ color: "#888" }}>#F8F7F5 bg · #FFFFFF card · r22</span><br />
                    <span style={{ color: "#444" }}>NAV</span> — dot indicator above icon · toggle in header · crossfade on switch
                </p>
            </div>
        </div>
    );
}
