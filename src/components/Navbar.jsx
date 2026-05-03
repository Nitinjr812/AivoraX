import { useState, useEffect } from "react";
import {
  Layers, Plus, Image, Sparkles, LayoutTemplate,
  Scissors, Globe, FolderOpen, Heart, Search,
  User, Settings, MoreVertical, Star, Menu, X,
} from "lucide-react";

const T = {
  bg:      "#0A0A0F",
  surface: "#12121A",
  card:    "#1A1A26",
  border:  "#2A2A3E",
  accent:  "#7C6FEF",
  pink:    "#E85D8A",
  teal:    "#3DD9C5",
  text:    "#F0EEFF",
  muted:   "#8A8AA8",
};

const BADGE_STYLE = {
  new: { background: "rgba(61,217,197,0.15)",  color: "#3DD9C5", border: "1px solid rgba(61,217,197,0.3)"   },
  hot: { background: "rgba(232,93,138,0.15)",  color: "#E85D8A", border: "1px solid rgba(232,93,138,0.3)"   },
  pro: { background: "rgba(124,111,239,0.15)", color: "#7C6FEF", border: "1px solid rgba(124,111,239,0.25)" },
};

const NAV_ITEMS = [
  { icon: Layers,         label: "Aivorax"                          },
  { icon: Plus,           label: "Create New",  badge: "Hot", badgeType: "hot" },
  { icon: Image,          label: "Image Editor"                     },
  { icon: Sparkles,       label: "AI Generate", badge: "New", badgeType: "new" },
  { icon: LayoutTemplate, label: "Templates"                        },
  { icon: Scissors,       label: "BG Remover",  badge: "Pro", badgeType: "pro" },
  { icon: Globe,          label: "Social Kit"                       },
  { icon: FolderOpen,     label: "Projects"                         },
  { icon: Heart,          label: "Favorites"                        },
  { icon: Search,         label: "Explore"                          },
  { icon: User,           label: "Profile"                          },
  { icon: Settings,       label: "Settings"                         },
];

const SIDEBAR_SECTIONS = [
  { label: "Main",    items: NAV_ITEMS.slice(0, 4)  },
  { label: "Tools",   items: NAV_ITEMS.slice(4, 7)  },
  { label: "Library", items: NAV_ITEMS.slice(7, 10) },
  { label: "Account", items: NAV_ITEMS.slice(10)    },
];

// ── Animation keyframes injected once ───────────────────────────
const GLOBAL_STYLES = `
  @keyframes navSlideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0);     }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1;   }
  }
  @keyframes activeUnderline {
    from { width: 0; opacity: 0; }
    to   { width: 60%; opacity: 1; }
  }
  @keyframes sidebarSlide {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
`;

function Badge({ type, label }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 600, padding: "2px 6px",
      borderRadius: 20, letterSpacing: 0.3,
      ...BADGE_STYLE[type],
    }}>{label}</span>
  );
}

function Logo({ size = "md" }) {
  const big = size === "md";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: big ? 10 : 8, flexShrink: 0 }}>
      <div style={{
        width: big ? 34 : 30, height: big ? 34 : 30,
        borderRadius: big ? 9 : 8, flexShrink: 0,
        background: `linear-gradient(135deg, ${T.accent}, ${T.pink})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 16px rgba(124,111,239,0.4)`,
        transition: "box-shadow 0.3s",
      }}>
        <Layers size={big ? 16 : 14} color="#fff" />
      </div>
      <div>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: big ? 18 : 16, letterSpacing: 0.3,
          background: `linear-gradient(135deg, ${T.accent}, ${T.pink})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Aivorax</div>
        {big && (
          <div style={{ fontSize: 9, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase" }}>
            Image Studio
          </div>
        )}
      </div>
    </div>
  );
}

function Avatar({ size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: `linear-gradient(135deg, ${T.accent}, ${T.pink})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.34, fontWeight: 700, color: "#fff",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: "0 0 0 0px rgba(124,111,239,0.4)",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "scale(1.08)";
      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,111,239,0.3)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 0 0 0px rgba(124,111,239,0.4)";
    }}
    >AX</div>
  );
}

// ── Desktop Navbar ───────────────────────────────────────────────
function DesktopNavbar({ active, setActive }) {
  return (
    <nav style={{
      width: "100%",
      background: T.surface,
      borderBottom: `1px solid ${T.border}`,
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      height: 60,
      gap: 2,
      position: "relative",
      fontFamily: "'DM Sans', sans-serif",
      boxSizing: "border-box",
      overflow: "hidden",
      animation: "navSlideDown 0.35s cubic-bezier(0.22,1,0.36,1) both",
    }}>
      {/* Animated top glow line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${T.accent} 40%, ${T.pink} 60%, transparent 100%)`,
        animation: "glowPulse 3s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{ flexShrink: 0, marginRight: 18 }}>
        <Logo size="sm" />
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 22, background: T.border, marginRight: 16, flexShrink: 0 }} />

      {/* Nav links */}
      <div style={{
        display: "flex", alignItems: "center", gap: 1,
        flex: 1, minWidth: 0, overflow: "hidden",
      }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const on = active === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 11px", borderRadius: 8,
                cursor: "pointer", border: "none", outline: "none",
                background: on ? "rgba(124,111,239,0.13)" : "transparent",
                color: on ? T.text : T.muted,
                fontSize: 12.5, fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap", flexShrink: 0,
                position: "relative",
                transition: "background 0.2s, color 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => {
                if (!on) {
                  e.currentTarget.style.background = T.card;
                  e.currentTarget.style.color = T.text;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={e => {
                if (!on) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = T.muted;
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
              onMouseDown={e => { e.currentTarget.style.transform = "scale(0.95)"; }}
              onMouseUp={e => { e.currentTarget.style.transform = on ? "translateY(0)" : "translateY(-1px)"; }}
            >
              <Icon size={14} color={on ? T.accent : T.muted} strokeWidth={2} />
              {item.label}
              {item.badge && <Badge type={item.badgeType} label={item.badge} />}

              {/* Active underline bar */}
              {on && (
                <div style={{
                  position: "absolute", bottom: -1, left: "50%",
                  transform: "translateX(-50%)",
                  height: 2, borderRadius: 2,
                  background: `linear-gradient(90deg, ${T.accent}, ${T.pink})`,
                  animation: "activeUnderline 0.25s ease forwards",
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 12, flexShrink: 0 }}>
        <button
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 8, cursor: "pointer",
            background: `linear-gradient(135deg, ${T.accent}, ${T.pink})`,
            border: "none", color: "#fff", fontSize: 12.5, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 16px rgba(124,111,239,0.3)",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s, transform 0.15s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = "0.88";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 22px rgba(124,111,239,0.45)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,111,239,0.3)";
          }}
          onMouseDown={e => { e.currentTarget.style.transform = "scale(0.96)"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
        >
          <Plus size={13} color="#fff" />
          New Image
        </button>
        <Avatar size={32} />
      </div>
    </nav>
  );
}

// ── Mobile Sidebar ───────────────────────────────────────────────
function MobileSidebar({ active, setActive, open, onClose }) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.65)",
            zIndex: 998,
            animation: "navSlideDown 0.2s ease both",
          }}
        />
      )}

      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: 264, zIndex: 999,
        background: T.surface,
        borderRight: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.32s cubic-bezier(.4,0,.2,1)",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${T.accent}, ${T.pink}, transparent)`,
          animation: "glowPulse 3s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 16px 14px",
          borderBottom: `1px solid ${T.border}`,
        }}>
          <Logo size="md" />
          <button
            onClick={onClose}
            style={{
              width: 30, height: 30, borderRadius: 8, flexShrink: 0,
              background: T.card, border: `1px solid ${T.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#222230"; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.card; }}
            onMouseDown={e => { e.currentTarget.style.transform = "scale(0.9)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <X size={14} color={T.muted} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
          {SIDEBAR_SECTIONS.map((sec, si) => (
            <div key={si} style={{ animation: open ? `sidebarSlide 0.3s ${si * 0.05}s ease both` : "none" }}>
              {si > 0 && <div style={{ height: 1, background: T.border, margin: "8px 6px" }} />}
              <div style={{
                fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                color: T.muted, padding: "0 8px", marginBottom: 5, fontWeight: 500,
              }}>
                {sec.label}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const on = active === item.label;
                return (
                  <button
                    key={item.label}
                    onClick={() => { setActive(item.label); onClose(); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 11,
                      width: "100%", padding: "9px 12px", borderRadius: 10,
                      cursor: "pointer", marginBottom: 2,
                      border: `1px solid ${on ? "rgba(124,111,239,0.3)" : "transparent"}`,
                      background: on ? "rgba(124,111,239,0.11)" : "transparent",
                      color: on ? T.text : T.muted,
                      fontSize: 13.5, fontWeight: 500,
                      fontFamily: "'DM Sans', sans-serif",
                      textAlign: "left", position: "relative",
                      transition: "all 0.18s", outline: "none",
                    }}
                    onMouseEnter={e => {
                      if (!on) {
                        e.currentTarget.style.background = T.card;
                        e.currentTarget.style.color = T.text;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!on) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = T.muted;
                      }
                    }}
                  >
                    {on && (
                      <div style={{
                        position: "absolute", left: 0, top: "50%",
                        transform: "translateY(-50%)",
                        width: 3, height: 18, borderRadius: "0 3px 3px 0",
                        background: `linear-gradient(180deg, ${T.accent}, ${T.pink})`,
                      }} />
                    )}
                    <Icon size={15} color={on ? T.accent : T.muted} strokeWidth={2} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && <Badge type={item.badgeType} label={item.badge} />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ padding: "12px 14px", borderTop: `1px solid ${T.border}` }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(124,111,239,0.15), rgba(232,93,138,0.12))",
            border: "1px solid rgba(124,111,239,0.3)",
            borderRadius: 12, padding: 12, marginBottom: 12, cursor: "pointer",
            transition: "transform 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.borderColor = "rgba(124,111,239,0.5)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "rgba(124,111,239,0.3)";
          }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                background: `linear-gradient(135deg, ${T.accent}, ${T.pink})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Star size={12} color="#fff" />
              </div>
              <span style={{
                fontSize: 13, fontWeight: 600,
                fontFamily: "'Syne', sans-serif", color: T.text,
              }}>Upgrade to Pro</span>
            </div>
            <p style={{ fontSize: 11, color: T.muted, lineHeight: 1.4, margin: 0 }}>
              Unlock AI tools & unlimited exports
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Avatar size={30} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>Aivorax User</div>
              <div style={{ fontSize: 11, color: T.muted }}>Free Plan</div>
            </div>
            <div style={{
              width: 26, height: 26, borderRadius: 7,
              background: T.card, border: `1px solid ${T.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#222230"; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.card; }}
            >
              <MoreVertical size={13} color={T.muted} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ── Mobile Top Bar ───────────────────────────────────────────────
function MobileTopBar({ onMenuClick }) {
  return (
    <div style={{
      width: "100%",
      background: T.surface,
      borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center",
      padding: "0 16px", height: 54, gap: 12,
      position: "relative", boxSizing: "border-box",
      fontFamily: "'DM Sans', sans-serif",
      animation: "navSlideDown 0.35s cubic-bezier(0.22,1,0.36,1) both",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${T.accent}, ${T.pink}, transparent)`,
        animation: "glowPulse 3s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <button
        onClick={onMenuClick}
        style={{
          width: 34, height: 34, borderRadius: 9, flexShrink: 0,
          background: T.card, border: `1px solid ${T.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.2s, transform 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#222230"; }}
        onMouseLeave={e => { e.currentTarget.style.background = T.card; }}
        onMouseDown={e => { e.currentTarget.style.transform = "scale(0.92)"; }}
        onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Menu size={16} color={T.muted} />
      </button>
      <div style={{ flex: 1 }}>
        <Logo size="sm" />
      </div>
      <Avatar size={30} />
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────
const Navbar = () => {
  const [active, setActive] = useState("Aivorax");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* Inject keyframes once */}
      <style>{GLOBAL_STYLES}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {isMobile ? (
        <>
          <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />
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
    </>
  );
};

export default Navbar;