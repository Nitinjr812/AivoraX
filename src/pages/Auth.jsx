import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Keyframe styles injected once ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

  @keyframes floatY {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50%      { transform: translateY(-18px) rotate(3deg); }
  }
  @keyframes floatY2 {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-24px) rotate(-4deg); }
  }
  @keyframes heroGlow {
    0%,100% { opacity: .35; }
    50%      { opacity: .7; }
  }
  @keyframes rotateGrad {
    0%   { transform: rotate(0deg) scale(1.5); }
    100% { transform: rotate(360deg) scale(1.5); }
  }
  @keyframes scanline {
    0%   { top: -6px; }
    100% { top: 100%; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { left: -100%; }
    100% { left: 200%; }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInBottom {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .av-font-syne   { font-family: 'Syne', sans-serif; }
  .av-font-dm     { font-family: 'DM Sans', sans-serif; }

  .av-logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 900;
    font-size: 22px;
    background: linear-gradient(125deg, #fff, #C4BEFF, #9D93F5, #E85D8A);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .av-form-title {
    font-family: 'Syne', sans-serif;
    font-weight: 900;
    font-size: 26px;
    background: linear-gradient(140deg, #fff 0%, #C9C2FF 40%, #9D93F5 70%, #E85D8A 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 4px;
  }

  /* Card top border gradient */
  .av-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #7C6FEF, #BDB6FF, #E85D8A, transparent);
  }

  /* Scan line */
  .av-scan::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(124,111,239,.35), rgba(157,147,245,.5), rgba(124,111,239,.35), transparent);
    animation: scanline 5s linear infinite;
  }

  /* Primary button shimmer */
  .av-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,.12) 0%, transparent 50%);
    border-radius: 12px;
  }
  .av-btn-primary .shimmer-bar {
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent);
  }
  .av-btn-primary:hover .shimmer-bar {
    animation: shimmer .6s ease;
  }

  /* Rotate disc */
  .av-rotate-disc-inner {
    position: absolute;
    inset: -20%;
    background: conic-gradient(from 0deg, #7C6FEF, #E85D8A, #3DD9C5, #7C6FEF);
    animation: rotateGrad 20s linear infinite;
  }

  /* Tab slider */
  .av-tab-slider {
    position: absolute;
    bottom: 0; left: 20px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, #7C6FEF, #E85D8A);
    transition: transform .3s cubic-bezier(.4,0,.2,1), width .3s;
    width: calc(50% - 22px);
  }

  /* Fade-up animation */
  .av-fade-up-1 { animation: fadeUp .6s ease both; }
  .av-fade-up-2 { animation: fadeUp .7s .08s ease both; }
  .av-fade-up-3 { animation: fadeUp .8s .3s ease both; }

  /* Form transition */
  .av-form-enter { animation: slideInBottom .35s ease both; }

  /* Input focus glow */
  .av-input:focus {
    border-color: rgba(124,111,239,.5) !important;
    background: rgba(124,111,239,.06) !important;
    box-shadow: 0 0 0 3px rgba(124,111,239,.1) !important;
    outline: none;
  }

  /* Floating badge */
  .av-fbadge {
    position: fixed;
    z-index: 30;
    padding: 7px 14px;
    border-radius: 100px;
    background: rgba(15,13,30,.92);
    border: 1px solid rgba(124,111,239,.28);
    backdrop-filter: blur(16px);
    font-size: 11.5px;
    font-weight: 600;
    color: #EEEAFF;
    white-space: nowrap;
    box-shadow: 0 8px 28px rgba(0,0,0,.4);
    display: flex;
    align-items: center;
    gap: 7px;
  }

  @media (max-width: 520px) {
    .av-fbadge { display: none !important; }
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(124,111,239,.3); border-radius: 4px; }

  /* Checkbox accent */
  input[type=checkbox] { accent-color: #7C6FEF; }
`;

/* ─── SVG Icons ─── */
const IconEmail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconLock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconUser = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconStar = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ─── Field Component ─── */
function Field({ label, type = "text", id, placeholder, icon, onChange }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#7A7A9A", marginBottom: 7, letterSpacing: ".5px", textTransform: "uppercase" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#7A7A9A", pointerEvents: "none" }}>
          {icon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className="av-input av-font-dm"
          style={{
            width: "100%",
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 12,
            padding: "12px 14px 12px 42px",
            color: "#EEEAFF",
            fontSize: 14,
            transition: "border-color .2s, background .2s, box-shadow .2s",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function AivoraxAuth() {
  const [tab, setTab] = useState("login");
  const [alert, setAlert] = useState(null); // { msg, type }
  const [formKey, setFormKey] = useState(0); // re-trigger animation on tab switch
  const [strength, setStrength] = useState(0);
  const styleRef = useRef(false);

  // Inject global styles once
  useEffect(() => {
    if (styleRef.current) return;
    styleRef.current = true;
    const el = document.createElement("style");
    el.textContent = globalStyles;
    document.head.appendChild(el);
  }, []);

  const switchTab = (t) => {
    setTab(t);
    setAlert(null);
    setStrength(0);
    setFormKey((k) => k + 1);
  };

  const showAlert = (msg, type) => setAlert({ msg, type }); 

  const checkStrength = (val) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    setStrength(score);
  };

  const strengthColors = ["#E85D8A", "#FF9E73", "#F0C948", "#3DD9C5"];

  const doLogin = () => {
    const email = document.getElementById("l-email")?.value.trim();
    const pass = document.getElementById("l-password")?.value;
    if (!email || !pass) { showAlert("Please fill in all fields.", "error"); return; }
    let userdata = JSON.parse(localStorage.getItem("userdata") || "[]");
    if (!Array.isArray(userdata)) userdata = userdata ? [userdata] : [];
    const found = userdata.find((u) => u.email === email && u.password === pass);
    if (!found) { showAlert("Invalid email or password.", "error"); return; }
    showAlert(`Welcome back, ${found.name || "creator"}! 🎨`, "success");
    navigate("/")
  };
  const navigate = useNavigate()

  const doSignup = () => {
    const name = document.getElementById("s-name")?.value.trim();
    const email = document.getElementById("s-email")?.value.trim();
    const pass = document.getElementById("s-password")?.value;
    const terms = document.getElementById("terms")?.checked;
    if (!name || !email || !pass) { showAlert("All fields are required.", "error"); return; }
    if (pass.length < 8) { showAlert("Password must be at least 8 characters.", "error"); return; }
    if (!terms) { showAlert("Please accept the Terms of Service.", "error"); return; }
    let userdata = JSON.parse(localStorage.getItem("userdata") || "[]");
    if (!Array.isArray(userdata)) userdata = userdata ? [userdata] : [];
    if (userdata.find((u) => u.email === email)) { showAlert("An account with this email already exists.", "error"); return; }
    userdata.push({ name, email, password: pass });
    localStorage.setItem("userdata", JSON.stringify(userdata));
    showAlert(`Account created! Welcome to Aivorax, ${name} `, "success");
    navigate("/")

  };

  const isLogin = tab === "login";

  return (
    <div className="av-font-dm" style={{ background: "#07070F", color: "#EEEAFF", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

      {/* ── Mesh Background ── */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {/* Orbs */}
        <div style={{ position: "absolute", width: 700, height: 700, top: "-15%", left: "-12%", borderRadius: "50%", filter: "blur(80px)", background: "rgba(124,111,239,.12)", animation: "heroGlow 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 500, height: 500, top: "20%", right: "-10%", borderRadius: "50%", filter: "blur(80px)", background: "rgba(232,93,138,.09)", animation: "heroGlow 10s ease-in-out infinite", animationDelay: "2s" }} />
        <div style={{ position: "absolute", width: 400, height: 400, bottom: "5%", left: "30%", borderRadius: "50%", filter: "blur(80px)", background: "rgba(61,217,197,.07)", animation: "heroGlow 12s ease-in-out infinite", animationDelay: "4s" }} />
        {/* Rotate disc */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 900, height: 900, borderRadius: "50%", transform: "translate(-50%,-50%)", overflow: "hidden", opacity: .05 }}>
          <div className="av-rotate-disc-inner" />
        </div>
        {/* Grid */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .025 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
        </svg>
        {/* Noise */}
        <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`, backgroundSize: "180px", opacity: .5, pointerEvents: "none" }} />
      </div>

      {/* ── Floating Badges ── */}
      <div className="av-fbadge" style={{ top: "18%", left: "4%", animation: "floatY 5s ease-in-out infinite" }}>
        <span style={{ fontSize: 15 }}>🔐</span> End-to-end encrypted
      </div>
      <div className="av-fbadge" style={{ top: "26%", right: "5%", animation: "floatY2 6s ease-in-out infinite" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3DD9C5", boxShadow: "0 0 8px #3DD9C5", display: "inline-block" }} />
        200K+ creators
      </div>
      <div className="av-fbadge" style={{ bottom: "22%", left: "3%", animation: "floatY 7s ease-in-out infinite 1s" }}>
        ⭐ 4.9 / 5 rating
      </div>

      {/* ── Page Center ── */}
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", zIndex: 10 }}>
        <div style={{ width: "100%", maxWidth: 460 }}>

          {/* Logo */}
          <div className="av-fade-up-1" style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 32 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(145deg,#9D93FF,#7C6FEF,#E85D8A)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(124,111,239,.45)" }}>
              <IconStar />
            </div>
            <span className="av-logo-text">Aivorax</span>
          </div>

          {/* Card */}
          <div className="av-card av-fade-up-2" style={{ position: "relative", borderRadius: 24, background: "rgba(20,20,34,0.85)", border: "1px solid rgba(124,111,239,.18)", backdropFilter: "blur(28px)", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04), 0 0 80px rgba(124,111,239,.08)" }}>
            {/* Scan line */}
            <div className="av-scan" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 24 }} />

            {/* Tabs */}
            <div style={{ display: "flex", padding: "20px 20px 0", gap: 4, position: "relative" }}>
              {["login", "signup"].map((t) => (
                <button
                  key={t}
                  onClick={() => switchTab(t)}
                  className="av-font-dm"
                  style={{ flex: 1, padding: "11px 0", border: "none", background: "transparent", color: tab === t ? "#EEEAFF" : "#7A7A9A", fontSize: 14, fontWeight: 600, cursor: "pointer", borderRadius: 10, transition: "color .25s", position: "relative", zIndex: 1 }}
                >
                  {t === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
              <div
                className="av-tab-slider"
                style={{ transform: isLogin ? "none" : "translateX(calc(100% + 4px))" }}
              />
            </div>

            {/* Body */}
            <div style={{ padding: "28px 30px 32px" }}>

              {/* Alert */}
              {alert && (
                <div style={{
                  borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 14,
                  display: "flex", alignItems: "center", gap: 8,
                  background: alert.type === "error" ? "rgba(232,93,138,.1)" : "rgba(61,217,197,.1)",
                  border: `1px solid ${alert.type === "error" ? "rgba(232,93,138,.25)" : "rgba(61,217,197,.25)"}`,
                  color: alert.type === "error" ? "#F2A0BB" : "#6EE8D6",
                  animation: "fadeUp .3s ease both",
                }}>
                  <IconInfo /> {alert.msg}
                </div>
              )}

              {/* Eyebrow + title */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#9D93F5", marginBottom: 8 }}>
                <span style={{ width: 18, height: 2, borderRadius: 2, background: "linear-gradient(90deg,#7C6FEF,#E85D8A)", display: "inline-block" }} />
                {isLogin ? "Welcome Back" : "Get Started"}
              </div>
              <div className="av-form-title">{isLogin ? "Sign in to studio" : "Create your account"}</div>
              <div style={{ fontSize: 13, color: "#7A7A9A", marginBottom: 26 }}>
                {isLogin ? "Continue your creative journey where you left off." : "Join 200,000+ creators and start generating today."}
              </div>

              {/* Google */}
              <button
                onClick={() => showAlert("Social login coming soon!", "error")}
                className="av-font-dm"
                style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#EEEAFF", fontSize: 13.5, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .2s", marginBottom: 10 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.18)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.transform = "none"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0", fontSize: 12, color: "#7A7A9A" }}>
                <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
                or
                <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
              </div>

              {/* ── Forms ── */}
              <div key={formKey} className="av-form-enter">
                {isLogin ? (
                  /* LOGIN */
                  <div>
                    <Field label="Email address" type="email" id="l-email" placeholder="you@example.com" icon={<IconEmail />} />
                    <Field label="Password" type="password" id="l-password" placeholder="Enter your password" icon={<IconLock />} />
                    <div style={{ textAlign: "right", marginTop: -10, marginBottom: 16 }}>
                      <span
                        onClick={() => showAlert("Password reset coming soon!", "error")}
                        style={{ fontSize: 12, color: "#7A7A9A", cursor: "pointer", transition: "color .18s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#9D93F5"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#7A7A9A"}
                      >
                        Forgot password?
                      </span>
                    </div>
                    <PrimaryButton   onClick={doLogin}>Sign In →</PrimaryButton>
                  </div>
                ) : (
                  /* SIGNUP */
                  <div>
                    <Field label="Full Name" type="text" id="s-name" placeholder="Jane Doe" icon={<IconUser />} />
                    <Field label="Email address" type="email" id="s-email" placeholder="you@example.com" icon={<IconEmail />} />
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#7A7A9A", marginBottom: 7, letterSpacing: ".5px", textTransform: "uppercase" }}>Password</label>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#7A7A9A", pointerEvents: "none" }}><IconLock /></span>
                        <input
                          id="s-password"
                          type="password"
                          placeholder="Min. 8 characters"
                          onChange={(e) => checkStrength(e.target.value)}
                          className="av-input av-font-dm"
                          style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "12px 14px 12px 42px", color: "#EEEAFF", fontSize: 14, transition: "border-color .2s, background .2s, box-shadow .2s" }}
                        />
                      </div>
                      {/* Strength bar */}
                      <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < strength ? strengthColors[strength - 1] : "rgba(255,255,255,.08)", transition: "background .3s" }} />
                        ))}
                      </div>
                    </div>
                    {/* Terms */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, fontSize: 12.5, color: "#7A7A9A" }}>
                      <input type="checkbox" id="terms" style={{ width: 14, height: 14, cursor: "pointer" }} />
                      <label htmlFor="terms">
                        I agree to the{" "}
                        <span style={{ color: "#9D93F5", cursor: "pointer" }}>Terms of Service</span>
                        {" "}and{" "}
                        <span style={{ color: "#9D93F5", cursor: "pointer" }}>Privacy Policy</span>
                      </label>
                    </div>
                    <PrimaryButton onClick={doSignup}>Create Account →</PrimaryButton>
                  </div>
                )}
              </div>

              {/* Footer note */}
              <div style={{ textAlign: "center", marginTop: 20, fontSize: 12.5, color: "#7A7A9A" }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                {" "}
                <span
                  onClick={() => switchTab(isLogin ? "signup" : "login")}
                  style={{ color: "#9D93F5", cursor: "pointer", fontWeight: 600, transition: "color .18s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#BDB6FF"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#9D93F5"}
                >
                  {isLogin ? "Sign up free" : "Sign in"}
                </span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="av-fade-up-3" style={{ textAlign: "center", marginTop: 22, fontSize: 12, color: "rgba(122,122,154,.5)" }}>
            🔒 Secured · No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Primary Button ── */
function PrimaryButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="av-btn-primary av-font-dm"
      style={{
        width: "100%", padding: 14, borderRadius: 12, border: "none",
        background: "linear-gradient(135deg,#9D93F5 0%,#7C6FEF 50%,#E85D8A 100%)",
        color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
        position: "relative", overflow: "hidden",
        boxShadow: "0 2px 0 rgba(0,0,0,.3), 0 8px 28px rgba(124,111,239,.4), inset 0 1px 0 rgba(255,255,255,.18)",
        transition: "transform .2s, box-shadow .2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 2px 0 rgba(0,0,0,.3), 0 16px 48px rgba(124,111,239,.55), inset 0 1px 0 rgba(255,255,255,.18)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 0 rgba(0,0,0,.3), 0 8px 28px rgba(124,111,239,.4), inset 0 1px 0 rgba(255,255,255,.18)"; }}
      onMouseDown={(e) => e.currentTarget.style.transform = "scale(.97)"}
      onMouseUp={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
    >
      <span className="shimmer-bar" />
      {children}
    </button>
  );
}