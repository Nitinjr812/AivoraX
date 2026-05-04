import { useState, useEffect } from "react";

// ─── Icons (inline SVG) ──────────────────────────────────────────
const Icon = ({ path, size = 15, strokeWidth = 1.9 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
  >
    <path d={path} />
  </svg>
);

const ICONS = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  create: "M12 5v14 M5 12h14",
  editor: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z",
  ai: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
  template: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  social: "M18 5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M8.59 13.51l6.83 3.98 M15.41 6.51l-6.82 3.98",
  projects: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
  favorites: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  explore: "M11 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35",
  profile: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  menu: "M3 6h18 M3 12h18 M3 18h18",
  close: "M18 6L6 18 M6 6l12 12",
  login: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4 M10 17l5-5-5-5 M15 12H3",
  check: "M20 6L9 17l-5-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
  plus: "M12 5v14 M5 12h14",
  chevdown: "M19 12l-7 7-7-7",
};

// ─── Nav data ────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Home", icon: "home" },
    { label: "AI Generate", icon: "ai", badge: "New", badgeType: "new" },
  { label: "Templates", icon: "template" },
   { label: "Projects", icon: "projects" },
  { label: "Favorites", icon: "favorites" }, 
  { label: "Profile", icon: "profile" },
  { label: "Settings", icon: "settings" },
];

const SIDEBAR_SECTIONS = [
  { label: "Main", items: NAV_ITEMS.slice(0, 4) },
  { label: "Tools", items: NAV_ITEMS.slice(4, 7) },
  { label: "Library", items: NAV_ITEMS.slice(7, 10) },
  { label: "Account", items: NAV_ITEMS.slice(10) },
];

// ─── Global CSS (injected once) ──────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

  :root {
    --av-bg:           #07070F;
    --av-surf:         rgba(13,13,22,0.82);
    --av-card:         rgba(20,20,34,0.75);
    --av-border:       rgba(255,255,255,0.07);
    --av-border-acc:   rgba(124,111,239,0.22);
    --av-accent:       #7C6FEF;
    --av-accent2:      #9D93F5;
    --av-pink:         #E85D8A;
    --av-teal:         #3DD9C5;
    --av-text:         #EEEAFF;
    --av-muted:        #7A7A9A;
    --av-muted2:       #5A5A7A;
  }

  /* ── Keyframes ── */
  @keyframes av-navDrop {
    0%   { opacity:0; transform:translateY(-18px) scale(0.98); }
    60%  { opacity:1; transform:translateY(3px)   scale(1.002);}
    100% { opacity:1; transform:translateY(0)      scale(1);   }
  }
  @keyframes av-glowPulse {
    0%,100% { opacity:0.3; transform:scaleX(0.7); }
    50%     { opacity:1;   transform:scaleX(1);   }
  }
  @keyframes av-underlineSlide {
    from { width:0;   opacity:0; left:50%; }
    to   { width:55%; opacity:1; left:22.5%; }
  }
  /* Logo icon — diagonal glass shine sweep */
  @keyframes av-logoShine {
    0%   { transform:translateX(-150%) skewX(-22deg); opacity:0;   }
    10%  { opacity:0.7; }
    50%  { opacity:1;   }
    90%  { opacity:0.7; }
    100% { transform:translateX(250%)  skewX(-22deg); opacity:0;   }
  }
  /* Logo text — soft glow pulse */
  @keyframes av-logoGlow {
    0%,100% { filter: drop-shadow(0 0 0px rgba(124,111,239,0)); }
    50%     { filter: drop-shadow(0 0 10px rgba(157,147,245,0.55)) drop-shadow(0 0 22px rgba(232,93,138,0.2)); }
  }
  @keyframes av-fadeUp {
    from { opacity:0; transform:translateY(10px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes av-sidebarRowIn {
    from { opacity:0; transform:translateX(-14px); }
    to   { opacity:1; transform:translateX(0);     }
  }
  @keyframes av-overlayIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes av-cardIn {
    from { opacity:0; transform:translateY(18px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }

  /* ── Navbar ── */
  .av-navbar {
    width:100%; position:sticky; top:0; z-index:200;
    background:var(--av-surf);
    backdrop-filter:blur(28px) saturate(200%) brightness(1.05);
    -webkit-backdrop-filter:blur(28px) saturate(200%) brightness(1.05);
    border-bottom:1px solid var(--av-border);
    display:flex; align-items:center;
    padding:0 22px; height:60px; gap:0;
    animation:av-navDrop 0.5s cubic-bezier(0.22,1,0.36,1) both;
    box-shadow:
      0 1px 0 0 rgba(255,255,255,0.04),
      0 8px 40px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.05);
    box-sizing:border-box; overflow:hidden;
  }
  .av-navbar::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(180deg,rgba(255,255,255,0.025) 0%,transparent 60%);
    pointer-events:none; z-index:0;
  }

  /* ── Glow line ── */
  .av-glow-line {
    position:absolute; top:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent 0%,var(--av-accent) 30%,#BDB6FF 50%,var(--av-pink) 70%,transparent 100%);
    animation:av-glowPulse 4s ease-in-out infinite;
    transform-origin:center; pointer-events:none; z-index:2;
  }

  /* ── Logo ── */
  .av-logo {
    display:flex; align-items:center; gap:10px;
    flex-shrink:0; cursor:pointer; text-decoration:none;
    position:relative; z-index:1;
  }
  .av-logo-icon {
    width:34px; height:34px; border-radius:10px; flex-shrink:0;
    background:linear-gradient(145deg,#9D93FF 0%,#7C6FEF 45%,#E85D8A 100%);
    display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden;
    box-shadow:0 0 0 1px rgba(124,111,239,0.4), 0 4px 20px rgba(124,111,239,0.35);
    transition:box-shadow 0.3s, transform 0.25s;
  }
  /* top inner highlight */
  .av-logo-icon::before {
    content:''; position:absolute; top:0; left:0; right:0; height:52%;
    background:linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 100%);
    border-radius:10px 10px 50% 50%;
    pointer-events:none; z-index:1;
  }
  /* diagonal shine sweep */
  .av-logo-icon::after {
    content:''; position:absolute;
    top:0; left:-60%; width:40%; height:100%;
    background:linear-gradient(
      105deg,
      transparent       20%,
      rgba(255,255,255,0.6) 50%,
      transparent       80%
    );
    animation:av-logoShine 3.5s ease-in-out infinite;
    animation-delay:1.2s;
    z-index:2;
  }
  .av-logo:hover .av-logo-icon {
    transform:scale(1.07) rotate(-3deg);
    box-shadow:0 0 0 1.5px rgba(157,147,245,0.7), 0 6px 28px rgba(124,111,239,0.55);
  }
  .av-logo-icon svg { position:relative; z-index:3; }

  .av-logo-name {
    font-family:'Syne',sans-serif;
    font-weight:900; font-size:18px; letter-spacing:0.2px; line-height:1.1;
    background:linear-gradient(125deg,#FFFFFF 0%,#C4BEFF 30%,#9D93F5 55%,#E85D8A 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    animation:av-logoGlow 4s ease-in-out infinite;
    display:block;
  }
  .av-logo-sub {
    font-size:9px; color:var(--av-muted); letter-spacing:1.8px;
    text-transform:uppercase; font-weight:500; line-height:1; display:block;
  }

  /* ── Divider ── */
  .av-divider {
    width:1px; height:20px; flex-shrink:0; margin:0 16px; z-index:1;
    background:linear-gradient(180deg,transparent,var(--av-border-acc),transparent);
  }

  /* ── Nav links ── */
  .av-nav-links {
    display:flex; align-items:center; gap:1px;
    flex:1; min-width:0; overflow:hidden; position:relative; z-index:1;
  }
  .av-nav-btn {
    display:inline-flex; align-items:center; gap:5px;
    padding:6px 10px; border-radius:8px;
    cursor:pointer; border:1px solid transparent; outline:none;
    background:transparent; color:var(--av-muted);
    font-size:12.5px; font-weight:500; font-family:'DM Sans',sans-serif;
    white-space:nowrap; flex-shrink:0; position:relative;
    transition:background 0.18s, color 0.18s, transform 0.15s, border-color 0.18s;
  }
  .av-nav-btn:hover {
    background:rgba(255,255,255,0.04);
    color:var(--av-text);
    transform:translateY(-1px);
    border-color:rgba(255,255,255,0.05);
  }
  .av-nav-btn:active { transform:scale(0.95) translateY(0); }
  .av-nav-btn.active {
    background:rgba(124,111,239,0.13);
    color:var(--av-text);
    border-color:rgba(124,111,239,0.2);
  }
  .av-nav-btn.active .av-nb-icon { color:var(--av-accent2); }
  .av-nb-icon {
    width:15px; height:15px; display:flex; align-items:center;
    justify-content:center; color:var(--av-muted); flex-shrink:0;
    transition:color 0.18s;
  }
  .av-nav-btn:hover .av-nb-icon { color:var(--av-text); }
  .av-active-bar {
    position:absolute; bottom:-1px; height:2px; border-radius:2px;
    background:linear-gradient(90deg,var(--av-accent),#BDB6FF,var(--av-pink));
    animation:av-underlineSlide 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards;
    box-shadow:0 0 8px rgba(124,111,239,0.6);
  }

  /* ── Badges ── */
  .av-badge {
    font-size:9px; font-weight:700; padding:2px 6px;
    border-radius:20px; letter-spacing:0.4px; flex-shrink:0;
  }
  .av-badge-hot { background:rgba(232,93,138,0.14); color:#F07099; border:1px solid rgba(232,93,138,0.28); }
  .av-badge-new { background:rgba(61,217,197,0.12);  color:#3DD9C5; border:1px solid rgba(61,217,197,0.28); }
  .av-badge-pro { background:rgba(124,111,239,0.14); color:var(--av-accent2); border:1px solid rgba(124,111,239,0.25); }

  /* ── Right side ── */
  .av-nav-right {
    display:flex; align-items:center; gap:8px;
    margin-left:12px; flex-shrink:0; position:relative; z-index:1;
  }

  /* Login button */
  .av-login-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 14px; border-radius:8px; cursor:pointer;
    background:transparent;
    border:1px solid rgba(124,111,239,0.35);
    color:var(--av-accent2); font-size:12.5px; font-weight:600;
    font-family:'DM Sans',sans-serif; white-space:nowrap;
    position:relative; overflow:hidden;
    transition:all 0.2s;
  }
  .av-login-btn::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(124,111,239,0.08),rgba(232,93,138,0.04));
    opacity:0; transition:opacity 0.2s;
  }
  .av-login-btn:hover {
    border-color:rgba(157,147,245,0.6);
    color:#fff;
    transform:translateY(-1px);
    box-shadow:0 4px 18px rgba(124,111,239,0.2);
  }
  .av-login-btn:hover::before { opacity:1; }
  .av-login-btn:active { transform:scale(0.96); }
  .av-login-btn.logged {
    border-color:rgba(61,217,197,0.5);
    color:var(--av-teal);
  }

  /* CTA button */
  .av-cta-btn {
    display:inline-flex; align-items:center; gap:5px;
    padding:7px 15px; border-radius:8px; cursor:pointer;
    position:relative; overflow:hidden;
    background:linear-gradient(135deg,#9D93F5 0%,#7C6FEF 50%,#E85D8A 100%);
    border:none; color:#fff; font-size:12.5px; font-weight:600;
    font-family:'DM Sans',sans-serif; white-space:nowrap;
    box-shadow:0 2px 0 rgba(0,0,0,0.3), 0 4px 20px rgba(124,111,239,0.3), inset 0 1px 0 rgba(255,255,255,0.18);
    transition:opacity 0.15s, transform 0.15s, box-shadow 0.2s;
  }
  .av-cta-btn::after {
    content:''; position:absolute;
    top:0; left:0; right:0; height:50%;
    background:linear-gradient(180deg,rgba(255,255,255,0.14) 0%,transparent 100%);
    pointer-events:none; border-radius:8px 8px 0 0;
  }
  .av-cta-btn:hover {
    opacity:0.9; transform:translateY(-1px);
    box-shadow:0 2px 0 rgba(0,0,0,0.3), 0 8px 28px rgba(124,111,239,0.45), inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .av-cta-btn:active { transform:scale(0.96); }

  /* Avatar */
  .av-avatar {
    border-radius:50%; flex-shrink:0;
    position:relative; overflow:hidden;
    background:linear-gradient(145deg,#9D93FF,#7C6FEF,#E85D8A);
    display:flex; align-items:center; justify-content:center;
    font-weight:700; color:#fff; cursor:pointer; letter-spacing:0.3px;
    border:1.5px solid rgba(157,147,245,0.3);
    box-shadow:0 0 0 0px rgba(124,111,239,0.35);
    transition:transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  }
  .av-avatar::before {
    content:''; position:absolute;
    top:0; left:0; right:0; height:55%;
    background:linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 100%);
    border-radius:50% 50% 0 0; pointer-events:none;
  }
  .av-avatar::after {
    content:''; position:absolute; inset:0; border-radius:50%;
    background:linear-gradient(135deg,transparent 40%,rgba(255,255,255,0.08) 60%,transparent 80%);
  }
  .av-avatar:hover {
    transform:scale(1.08);
    box-shadow:0 0 0 3px rgba(124,111,239,0.3);
    border-color:rgba(157,147,245,0.6);
  }

  /* ── Mobile top bar ── */
  .av-mob-bar {
    width:100%; position:sticky; top:0; z-index:200;
    background:var(--av-surf);
    backdrop-filter:blur(28px) saturate(200%) brightness(1.05);
    -webkit-backdrop-filter:blur(28px) saturate(200%) brightness(1.05);
    border-bottom:1px solid var(--av-border);
    display:flex; align-items:center;
    padding:0 14px; height:54px; gap:12px;
    animation:av-navDrop 0.5s cubic-bezier(0.22,1,0.36,1) both;
    box-shadow:0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
    box-sizing:border-box;
  }
  .av-mob-bar::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(180deg,rgba(255,255,255,0.02) 0%,transparent 60%);
    pointer-events:none;
  }
  .av-menu-btn {
    width:34px; height:34px; border-radius:9px; flex-shrink:0;
    background:rgba(255,255,255,0.04);
    border:1px solid var(--av-border);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:background 0.18s, transform 0.15s;
  }
  .av-menu-btn:hover  { background:rgba(255,255,255,0.08); }
  .av-menu-btn:active { transform:scale(0.9); }

  /* ── Sidebar overlay ── */
  .av-overlay {
    position:fixed; inset:0;
    background:rgba(3,3,8,0.75);
    z-index:998;
    backdrop-filter:blur(5px);
    -webkit-backdrop-filter:blur(5px);
    animation:av-overlayIn 0.2s ease both;
  }

  /* ── Sidebar ── */
  .av-sidebar {
    position:fixed; top:0; left:0; bottom:0;
    width:272px; z-index:999;
    background:rgba(11,11,20,0.96);
    backdrop-filter:blur(36px) saturate(220%);
    -webkit-backdrop-filter:blur(36px) saturate(220%);
    border-right:1px solid var(--av-border);
    display:flex; flex-direction:column;
    transform:translateX(-100%);
    transition:transform 0.32s cubic-bezier(.4,0,.2,1);
    box-shadow:4px 0 50px rgba(0,0,0,0.6), 8px 0 80px rgba(0,0,0,0.3),
               inset -1px 0 0 rgba(255,255,255,0.03);
  }
  .av-sidebar::before {
    content:''; position:absolute; top:0; left:0; right:0; height:180px;
    background:linear-gradient(180deg,rgba(124,111,239,0.05) 0%,transparent 100%);
    pointer-events:none;
  }
  .av-sidebar.open { transform:translateX(0); }

  .av-sb-head {
    display:flex; align-items:center; justify-content:space-between;
    padding:16px 14px 14px;
    border-bottom:1px solid var(--av-border);
    position:relative;
  }
  .av-close-btn {
    width:28px; height:28px; border-radius:8px;
    background:rgba(255,255,255,0.04);
    border:1px solid var(--av-border);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; color:var(--av-muted);
    font-size:13px; font-family:'DM Sans',sans-serif;
    transition:background 0.15s, color 0.15s, transform 0.15s;
  }
  .av-close-btn:hover  { background:rgba(255,255,255,0.08); color:var(--av-text); }
  .av-close-btn:active { transform:scale(0.88); }

  .av-sb-scroll {
    flex:1; overflow-y:auto; padding:10px 8px 6px;
    scrollbar-width:thin; scrollbar-color:rgba(124,111,239,0.25) transparent;
  }
  .av-sb-scroll::-webkit-scrollbar { width:3px; }
  .av-sb-scroll::-webkit-scrollbar-track  { background:transparent; }
  .av-sb-scroll::-webkit-scrollbar-thumb  { background:rgba(124,111,239,0.25); border-radius:3px; }

  .av-sb-lbl {
    font-size:10px; letter-spacing:2.2px; text-transform:uppercase;
    color:var(--av-muted2); padding:0 10px; margin-bottom:5px; font-weight:600;
  }
  .av-sb-sep { height:1px; background:var(--av-border); margin:8px 4px 10px; }

  .av-sb-item {
    display:flex; align-items:center; gap:10px;
    width:100%; padding:8px 10px 8px 14px; border-radius:10px;
    cursor:pointer; margin-bottom:2px;
    border:1px solid transparent;
    background:transparent; color:var(--av-muted);
    font-size:13.5px; font-weight:500; font-family:'DM Sans',sans-serif;
    text-align:left; position:relative;
    transition:all 0.16s; outline:none;
  }
  .av-sb-item:hover { background:rgba(255,255,255,0.04); color:var(--av-text); }
  .av-sb-item.active {
    background:rgba(124,111,239,0.1);
    color:var(--av-text);
    border-color:rgba(124,111,239,0.2);
  }
  .av-sb-item.active .av-sb-ic { color:var(--av-accent2); }
  .av-sb-bar {
    position:absolute; left:0; top:50%; transform:translateY(-50%);
    width:3px; height:18px; border-radius:0 3px 3px 0;
    background:linear-gradient(180deg,var(--av-accent),var(--av-pink));
    box-shadow:0 0 8px rgba(124,111,239,0.5);
  }
  .av-sb-ic {
    width:15px; height:15px; display:flex; align-items:center;
    justify-content:center; color:var(--av-muted); flex-shrink:0;
    transition:color 0.15s;
  }
  .av-sb-item:hover .av-sb-ic { color:var(--av-text); }

  /* Sidebar footer */
  .av-sb-foot {
    padding:12px;
    border-top:1px solid var(--av-border);
    background:linear-gradient(0deg,rgba(124,111,239,0.04) 0%,transparent 100%);
  }
  .av-upgrade-pill {
    border-radius:12px; padding:12px; margin-bottom:11px; cursor:pointer;
    background:linear-gradient(135deg,rgba(124,111,239,0.12),rgba(232,93,138,0.08));
    border:1px solid rgba(124,111,239,0.22);
    position:relative; overflow:hidden;
    transition:transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  }
  .av-upgrade-pill::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(157,147,245,0.4),rgba(232,93,138,0.3),transparent);
  }
  .av-upgrade-pill:hover {
    transform:translateY(-1.5px);
    border-color:rgba(157,147,245,0.4);
    box-shadow:0 8px 28px rgba(124,111,239,0.15);
  }
  .av-up-row   { display:flex; align-items:center; gap:8px; margin-bottom:5px; }
  .av-up-ic {
    width:22px; height:22px; border-radius:6px; flex-shrink:0;
    background:linear-gradient(135deg,var(--av-accent),var(--av-pink));
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 2px 8px rgba(124,111,239,0.3);
  }
  .av-up-title { font-size:13px; font-weight:700; font-family:'Syne',sans-serif; color:var(--av-text); }
  .av-up-sub   { font-size:11px; color:var(--av-muted); line-height:1.4; }
  .av-user-row { display:flex; align-items:center; gap:9px; }
  .av-user-n   { font-size:13px; font-weight:500; color:var(--av-text); }
  .av-user-p   { font-size:11px; color:var(--av-muted); }
  .av-more-dot {
    width:26px; height:26px; border-radius:7px;
    background:rgba(255,255,255,0.04); border:1px solid var(--av-border);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; color:var(--av-muted); font-size:14px;
    transition:background 0.15s, color 0.15s;
  }
  .av-more-dot:hover { background:rgba(255,255,255,0.08); color:var(--av-text); }

  /* ── Sidebar section animation ── */
  .av-sb-sec { animation:av-sidebarRowIn 0.3s ease both; }

  /* ── Responsive ── */
  @media (max-width: 767px) {
    .av-navbar  { display:none  !important; }
    .av-mob-bar { display:flex  !important; }
  }
  @media (min-width: 768px) {
    .av-mob-bar { display:none  !important; }
    .av-sidebar { display:none  !important; }
    .av-overlay { display:none  !important; }
  }
`;

// ─── Sub-components ──────────────────────────────────────────────

function GlowLine() {
  return <div className="av-glow-line" />;
}

function Badge({ type, label }) {
  return <span className={`av-badge av-badge-${type}`}>{label}</span>;
}

function Logo({ size = "md" }) {
  const big = size === "md";
  return (
    <a className="av-logo" href="#" onClick={e => e.preventDefault()}>
      <div
        className="av-logo-icon"
        style={{ width: big ? 34 : 30, height: big ? 34 : 30, borderRadius: big ? 10 : 9 }}
      >
        {/* Star / sparkle icon */}
        <svg
          width={big ? 17 : 15} height={big ? 17 : 15}
          viewBox="0 0 24 24" fill="none"
          stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "relative", zIndex: 3 }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
      <div>
        <span className="av-logo-name" style={{ fontSize: big ? 18 : 16 }}>Aivorax</span>
        {big && <span className="av-logo-sub">Image Studio</span>}
      </div>
    </a>
  );
}

function Avatar({ size = 33 }) {
  return (
    <div
      className="av-avatar"
      style={{ width: size, height: size, fontSize: size * 0.33 }}
      title="AX"
    >
      AX
    </div>
  );
}

// ─── Desktop Navbar ──────────────────────────────────────────────
function DesktopNavbar({ active, setActive }) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <nav className="av-navbar" style={{ position: "relative" }}>
      <GlowLine />
      <Logo size="sm" />
      <div className="av-divider" />

      <div className="av-nav-links">
        {NAV_ITEMS.map(item => {
          const on = active === item.label;
          return (
            <button
              key={item.label}
              className={`av-nav-btn${on ? " active" : ""}`}
              onClick={() => setActive(item.label)}
            >
              <span className="av-nb-icon">
                <Icon path={ICONS[item.icon]} size={15} />
              </span>
              {item.label}
              {item.badge && <Badge type={item.badgeType} label={item.badge} />}
              {on && <div className="av-active-bar" />}
            </button>
          );
        })}
      </div>

      <div className="av-nav-right">
        <button
          className={`av-login-btn${loggedIn ? " logged" : ""}`}
          onClick={() => setLoggedIn(v => !v)}
        >
          <Icon path={loggedIn ? ICONS.check : ICONS.login} size={13} strokeWidth={2} />
          {loggedIn ? "Logged in" : "Log in"}
        </button>

        <button className="av-cta-btn">
          <Icon path={ICONS.plus} size={12} strokeWidth={2.5} />
          New Image
        </button>

        <Avatar size={33} />
      </div>
    </nav>
  );
}

// ─── Mobile Top Bar ──────────────────────────────────────────────
function MobileTopBar({ onMenu }) {
  return (
    <div className="av-mob-bar" style={{ position: "relative" }}>
      <GlowLine />
      <button className="av-menu-btn" onClick={onMenu}>
        <Icon path={ICONS.menu} size={16} strokeWidth={2} />
      </button>
      <div style={{ flex: 1 }}>
        <Logo size="sm" />
      </div>
      <Avatar size={30} />
    </div>
  );
}

// ─── Mobile Sidebar ──────────────────────────────────────────────
function MobileSidebar({ active, setActive, open, onClose }) {
  return (
    <>
      {open && <div className="av-overlay" onClick={onClose} />}

      <aside className={`av-sidebar${open ? " open" : ""}`}>
        <GlowLine />

        <div className="av-sb-head">
          <Logo size="md" />
          <button className="av-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="av-sb-scroll">
          {SIDEBAR_SECTIONS.map((sec, si) => (
            <div
              key={sec.label}
              className="av-sb-sec"
              style={{ animationDelay: `${si * 0.06}s` }}
            >
              {si > 0 && <div className="av-sb-sep" />}
              <div className="av-sb-lbl">{sec.label}</div>

              {sec.items.map(item => {
                const on = active === item.label;
                return (
                  <button
                    key={item.label}
                    className={`av-sb-item${on ? " active" : ""}`}
                    onClick={() => { setActive(item.label); onClose(); }}
                  >
                    {on && <div className="av-sb-bar" />}
                    <span className="av-sb-ic">
                      <Icon path={ICONS[item.icon]} size={15} />
                    </span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && <Badge type={item.badgeType} label={item.badge} />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="av-sb-foot">
          <div className="av-upgrade-pill">
            <div className="av-up-row">
              <div className="av-up-ic">
                <Icon path={ICONS.star} size={11} strokeWidth={0} style={{ fill: "#fff" }} />
              </div>
              <span className="av-up-title">Upgrade to Pro</span>
            </div>
            <div className="av-up-sub">Unlock AI tools &amp; unlimited exports</div>
          </div>

          <div className="av-user-row">
            <Avatar size={30} />
            <div style={{ flex: 1 }}>
              <div className="av-user-n">Aivorax User</div>
              <div className="av-user-p">Free Plan</div>
            </div>
            <div className="av-more-dot">···</div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Root Export ─────────────────────────────────────────────────
export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Inject global CSS once
  useEffect(() => {
    const id = "aivorax-navbar-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = GLOBAL_CSS;
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <div style={{ background: "var(--av-bg)", fontFamily: "'DM Sans', sans-serif" }}>
      {isMobile ? (
        <>
          <MobileTopBar onMenu={() => setSidebarOpen(true)} />
          <MobileSidebar
            active={active}
            setActive={setActive}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </>
      ) : (
        <DesktopNavbar active={active} setActive={setActive} />
      )}
    </div>
  );
}