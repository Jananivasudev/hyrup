/* ═══════════════════════════════════════════════════════════════════════
   HYRUP — JOBS DATA & UTILITIES
═══════════════════════════════════════════════════════════════════════ */

export const ALL_JOBS = [
  {
    id: "j1", role: "Frontend Dev Intern", co: "Zepto", loc: "Remote", locType: "Remote", pay: "₹15K/mo", payNum: 15, tags: ["React", "TypeScript"], m: 94, ch: "Z",
    type: "Internship", grad: "linear-gradient(145deg, #1C0D00, #2D1600)", accentGrad: "linear-gradient(90deg,#FF7A1A,#FF9A45)",
    desc: "Build and ship features used by 10M+ users. Fast-paced, high-ownership culture. Strong mentorship from senior engineers."
  },
  {
    id: "j2", role: "Backend Developer", co: "Razorpay", loc: "Bengaluru · Hybrid", locType: "Hybrid", pay: "₹18K/mo", payNum: 18, tags: ["Node.js", "MongoDB"], m: 88, ch: "R",
    type: "Internship", grad: "linear-gradient(145deg, #00101A, #001C2E)", accentGrad: "linear-gradient(90deg,#3B82F6,#60A5FA)",
    desc: "Work on payment infrastructure serving 8M+ businesses. Real ownership, real impact. Pre-placement offer possible."
  },
  {
    id: "j3", role: "UI/UX Designer", co: "Groww", loc: "Remote", locType: "Remote", pay: "₹20K/mo", payNum: 20, tags: ["Figma", "Prototyping"], m: 85, ch: "G",
    type: "Internship", grad: "linear-gradient(145deg, #001A0D, #002E1A)", accentGrad: "linear-gradient(90deg,#22C55E,#4ADE80)",
    desc: "Own end-to-end design for new investor features. Work directly with PMs. Portfolio-building opportunity."
  },
  {
    id: "j4", role: "Data Analyst", co: "Meesho", loc: "Noida · On-site", locType: "On-site", pay: "₹12K/mo", payNum: 12, tags: ["Python", "SQL"], m: 79, ch: "M",
    type: "Internship", grad: "linear-gradient(145deg, #120018, #1E0028)", accentGrad: "linear-gradient(90deg,#A855F7,#C084FC)",
    desc: "Analyze seller and buyer behavior data. Build dashboards used by leadership. Strong data team culture."
  },
  {
    id: "j5", role: "React Native Dev", co: "CRED", loc: "Bengaluru · Hybrid", locType: "Hybrid", pay: "₹30K/mo", payNum: 30, tags: ["React Native", "TypeScript"], m: 91, ch: "C",
    type: "Job", grad: "linear-gradient(145deg, #1A1000, #2D1E00)", accentGrad: "linear-gradient(90deg,#F59E0B,#FBBF24)",
    desc: "Build consumer mobile experiences for millions of premium users. High design bar and engineering excellence culture."
  },
  {
    id: "j6", role: "DevOps Engineer", co: "Swiggy", loc: "Remote", locType: "Remote", pay: "₹35K/mo", payNum: 35, tags: ["AWS", "Docker", "CI/CD"], m: 82, ch: "S",
    type: "Job", grad: "linear-gradient(145deg, #0D1A00, #1E2D00)", accentGrad: "linear-gradient(90deg,#84CC16,#A3E635)",
    desc: "Manage infrastructure at scale for India's largest food delivery platform. On-call rotation with generous comp."
  },
];

/* ── Utility functions ── */
export const applyFilters = (jobs, filters) => {
  return jobs.filter(j => {
    if (filters.jobType && j.type !== filters.jobType) return false;
    if (filters.location && j.locType !== filters.location) return false;
    if (filters.salaryMin != null && j.payNum < filters.salaryMin) return false;
    return true;
  });
};
