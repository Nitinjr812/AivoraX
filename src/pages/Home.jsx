import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";

/* ── AOS via CDN (loaded once) ─────────────────────────────── */
const AOS_CSS = "https://unpkg.com/aos@2.3.4/dist/aos.css";
const AOS_JS = "https://unpkg.com/aos@2.3.4/dist/aos.js";

function useAOS() {
  useEffect(() => {
    if (!document.querySelector(`link[href="${AOS_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = AOS_CSS;
      document.head.appendChild(link);
    }
    if (!document.querySelector(`script[data-aos-script]`)) {
      const script = document.createElement("script");
      script.src = AOS_JS;
      script.setAttribute("data-aos-script", "true");
      script.onload = () =>
        window.AOS?.init({
          duration: 750,
          easing: "ease-out-cubic",
          once: false,
          offset: 60,
        });
      document.head.appendChild(script);
    } else if (window.AOS) {
      window.AOS.init({ duration: 750, easing: "ease-out-cubic", once: false, offset: 60 });
    }
  }, []);
}

/* ── Page-level CSS ────────────────────────────────────────── */
const PAGE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

:root {
  --av-bg:        #07070F;
  --av-surf:      rgba(13,13,22,0.82);
  --av-card:      rgba(20,20,34,0.75);
  --av-border:    rgba(255,255,255,0.07);
  --av-border2:   rgba(124,111,239,0.22);
  --av-accent:    #7C6FEF;
  --av-accent2:   #9D93F5;
  --av-pink:      #E85D8A;
  --av-teal:      #3DD9C5;
  --av-text:      #EEEAFF;
  --av-muted:     #7A7A9A;
  --av-muted2:    #5A5A7A;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body { background: var(--av-bg); color: var(--av-text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(124,111,239,0.3); border-radius: 4px; }

/* ── Keyframes ── */
@keyframes floatY {
  0%,100% { transform: translateY(0px) rotate(0deg); }
  50%     { transform: translateY(-18px) rotate(3deg); }
}
@keyframes floatY2 {
  0%,100% { transform: translateY(0px) rotate(0deg); }
  50%     { transform: translateY(-24px) rotate(-4deg); }
}
@keyframes pulse-ring {
  0%   { transform: scale(0.9); opacity: 0.6; }
  70%  { transform: scale(1.25); opacity: 0; }
  100% { transform: scale(0.9); opacity: 0; }
}
@keyframes hero-glow {
  0%,100% { opacity: 0.35; }
  50%     { opacity: 0.7; }
}
@keyframes ticker {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes scanline {
  0%   { top: -6px; }
  100% { top: 100%; }
}
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
@keyframes borderRun {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
@keyframes rotateGrad {
  0%   { transform: rotate(0deg) scale(1.4); }
  100% { transform: rotate(360deg) scale(1.4); }
}
@keyframes particleDrift {
  0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
  50%  { transform: translateY(-40px) translateX(20px) scale(1.2); opacity: 1; }
  100% { transform: translateY(-80px) translateX(-10px) scale(0.8); opacity: 0; }
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Noise overlay ── */
.av-page { position: relative; min-height: 100vh; }
.av-page::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  background-size: 180px;
  opacity: 0.5;
}

/* ── Mesh BG ── */
.av-mesh {
  position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0;
}
.av-mesh-orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px);
  animation: hero-glow 6s ease-in-out infinite;
}

/* ── HERO ── */
.av-hero {
  position: relative; overflow: hidden;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 120px 20px 80px;
}
.av-hero-inner {
  max-width: 860px; width: 100%; text-align: center; position: relative; z-index: 2;
}
.av-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: 100px;
  border: 1px solid rgba(124,111,239,0.3);
  background: rgba(124,111,239,0.08);
  font-size: 12px; font-weight: 600; color: var(--av-accent2);
  letter-spacing: 1.4px; text-transform: uppercase;
  margin-bottom: 26px;
  animation: fadeSlideUp 0.7s ease both;
}
.av-eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--av-teal);
  box-shadow: 0 0 8px var(--av-teal);
  position: relative;
}
.av-eyebrow-dot::after {
  content: ''; position: absolute; inset: -3px; border-radius: 50%;
  border: 1px solid var(--av-teal);
  animation: pulse-ring 2s ease-out infinite;
}
.av-hero-h1 {
  font-family: 'Syne', sans-serif;
  font-weight: 900; font-size: clamp(42px, 7vw, 88px);
  line-height: 1.03; letter-spacing: -1.5px;
  background: linear-gradient(140deg, #fff 0%, #C9C2FF 28%, #9D93F5 52%, #E85D8A 78%, #FF9E73 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 24px;
  animation: fadeSlideUp 0.7s 0.1s ease both;
}
.av-hero-sub {
  font-size: clamp(15px, 2vw, 19px); line-height: 1.65;
  color: var(--av-muted); max-width: 560px; margin: 0 auto 40px;
  animation: fadeSlideUp 0.7s 0.2s ease both;
}
.av-hero-sub span { color: var(--av-accent2); font-weight: 600; }

.av-hero-btns {
  display: flex; align-items: center; justify-content: center; gap: 14px;
  flex-wrap: wrap;
  animation: fadeSlideUp 0.7s 0.3s ease both;
}
.av-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 30px; border-radius: 12px; cursor: pointer;
  background: linear-gradient(135deg, #9D93F5 0%, #7C6FEF 50%, #E85D8A 100%);
  border: none; color: #fff; font-size: 15px; font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  box-shadow: 0 2px 0 rgba(0,0,0,0.3), 0 8px 32px rgba(124,111,239,0.4), inset 0 1px 0 rgba(255,255,255,0.18);
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.av-btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 50%);
  border-radius: 12px;
}
.av-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 2px 0 rgba(0,0,0,0.3), 0 16px 48px rgba(124,111,239,0.55), inset 0 1px 0 rgba(255,255,255,0.18); }
.av-btn-primary:active { transform: scale(0.97); }

.av-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 12px; cursor: pointer;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--av-text); font-size: 15px; font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.av-btn-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.22); transform: translateY(-2px); }
.av-btn-ghost:active { transform: scale(0.97); }

/* ── Hero canvas card ── */
.av-hero-canvas {
  position: relative; margin: 64px auto 0;
  max-width: 700px;
  border-radius: 20px; overflow: hidden;
  border: 1px solid rgba(124,111,239,0.2);
  background: rgba(15,13,30,0.8);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(124,111,239,0.1);
  animation: fadeSlideUp 0.8s 0.4s ease both;
}
.av-canvas-top {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
}
.av-dot { width: 10px; height: 10px; border-radius: 50%; }
.av-canvas-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
  padding: 20px;
}
.av-preview-card {
  border-radius: 12px; overflow: hidden; aspect-ratio: 1/1;
  position: relative;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  transition: transform 0.3s, border-color 0.3s;
  cursor: pointer;
}
.av-preview-card:hover { transform: scale(1.04); border-color: rgba(124,111,239,0.35); }
.av-preview-card .inner {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-size: 32px;
}
.av-preview-card::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--c1, rgba(124,111,239,0.15)), var(--c2, rgba(232,93,138,0.1)));
}

/* Scanline on canvas */
.av-canvas-scan {
  position: absolute; inset: 0; pointer-events: none; overflow: hidden;
  border-radius: 20px;
}
.av-canvas-scan::after {
  content: ''; position: absolute; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, rgba(124,111,239,0.4), rgba(157,147,245,0.6), rgba(124,111,239,0.4), transparent);
  animation: scanline 4s linear infinite;
}

/* ── Floating badges ── */
.av-float-badge {
  position: absolute; z-index: 3;
  padding: 8px 14px; border-radius: 100px;
  background: rgba(15,13,30,0.92);
  border: 1px solid rgba(124,111,239,0.28);
  backdrop-filter: blur(16px);
  font-size: 12px; font-weight: 600; color: var(--av-text);
  white-space: nowrap;
  box-shadow: 0 8px 28px rgba(0,0,0,0.4);
  display: flex; align-items: center; gap: 7px;
}

/* ── Ticker ── */
.av-ticker {
  overflow: hidden; border-top: 1px solid var(--av-border);
  border-bottom: 1px solid var(--av-border);
  padding: 12px 0;
  background: rgba(255,255,255,0.013);
}
.av-ticker-inner {
  display: flex; gap: 0;
  animation: ticker 22s linear infinite;
  width: max-content;
}
.av-ticker-item {
  display: flex; align-items: center; gap: 10px;
  padding: 0 32px;
  font-size: 12.5px; font-weight: 600; color: var(--av-muted);
  letter-spacing: 0.5px; white-space: nowrap;
  border-right: 1px solid rgba(255,255,255,0.05);
}
.av-ticker-item span { color: var(--av-accent2); }

/* ── Section shared ── */
.av-section {
  position: relative; padding: 100px 20px;
}
.av-container { max-width: 1120px; margin: 0 auto; }

.av-section-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  color: var(--av-accent2); margin-bottom: 14px;
}
.av-section-eyebrow::before {
  content: ''; width: 20px; height: 2px; border-radius: 2px;
  background: linear-gradient(90deg, var(--av-accent), var(--av-pink));
}
.av-section-title {
  font-family: 'Syne', sans-serif; font-weight: 900;
  font-size: clamp(28px, 4vw, 48px); line-height: 1.1;
  letter-spacing: -0.5px; margin-bottom: 16px;
}
.av-section-sub {
  font-size: 16px; color: var(--av-muted); line-height: 1.65;
  max-width: 520px;
}

/* ── Features grid ── */
.av-feat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px; margin-top: 60px;
}
.av-feat-card {
  border-radius: 18px; padding: 32px 28px;
  background: var(--av-card);
  border: 1px solid var(--av-border);
  position: relative; overflow: hidden;
  backdrop-filter: blur(20px);
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  cursor: default;
}
.av-feat-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(124,111,239,0.35), transparent);
}
.av-feat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(124,111,239,0.25);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,111,239,0.1);
}
.av-feat-icon {
  width: 48px; height: 48px; border-radius: 14px; margin-bottom: 20px;
  display: flex; align-items: center; justify-content: center; font-size: 22px;
  background: linear-gradient(135deg, rgba(124,111,239,0.15), rgba(232,93,138,0.08));
  border: 1px solid rgba(124,111,239,0.2);
}
.av-feat-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; margin-bottom: 10px; }
.av-feat-desc  { font-size: 14px; color: var(--av-muted); line-height: 1.65; }

/* ── Stats row ── */
.av-stats {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1px; margin-top: 60px;
  border: 1px solid var(--av-border); border-radius: 18px; overflow: hidden;
  background: var(--av-border);
}
.av-stat-cell {
  background: var(--av-card); backdrop-filter: blur(20px);
  padding: 36px 28px; text-align: center;
  transition: background 0.2s;
}
.av-stat-cell:hover { background: rgba(124,111,239,0.08); }
.av-stat-num {
  font-family: 'Syne', sans-serif; font-weight: 900;
  font-size: clamp(32px, 4vw, 52px);
  background: linear-gradient(135deg, #fff, var(--av-accent2), var(--av-pink));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  line-height: 1; margin-bottom: 8px;
}
.av-stat-lbl { font-size: 13px; color: var(--av-muted); font-weight: 500; }

/* ── How it works ── */
.av-steps {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0; margin-top: 60px; position: relative;
}
.av-steps::before {
  content: ''; position: absolute; top: 38px; left: 10%; right: 10%; height: 1px;
  background: linear-gradient(90deg, transparent, var(--av-accent), var(--av-pink), transparent);
  opacity: 0.3; pointer-events: none;
}
.av-step {
  padding: 24px 28px; text-align: center; position: relative;
}
.av-step-num {
  width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-weight: 900; font-size: 20px;
  background: rgba(15,13,30,0.9);
  border: 1px solid rgba(124,111,239,0.35);
  position: relative; z-index: 1;
  box-shadow: 0 0 0 6px rgba(124,111,239,0.07), 0 0 0 12px rgba(124,111,239,0.03);
  transition: box-shadow 0.3s, border-color 0.3s;
}
.av-step:hover .av-step-num { border-color: var(--av-accent); box-shadow: 0 0 0 6px rgba(124,111,239,0.15), 0 0 28px rgba(124,111,239,0.3); }
.av-step-num span { background: linear-gradient(135deg, var(--av-accent2), var(--av-pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.av-step-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; margin-bottom: 8px; }
.av-step-desc  { font-size: 13.5px; color: var(--av-muted); line-height: 1.6; }

/* ── Pricing ── */
.av-pricing-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px; margin-top: 60px;
}
.av-price-card {
  border-radius: 20px; padding: 36px 30px;
  background: var(--av-card); border: 1px solid var(--av-border);
  backdrop-filter: blur(20px); position: relative; overflow: hidden;
  transition: transform 0.25s, border-color 0.25s;
}
.av-price-card.featured {
  background: linear-gradient(160deg, rgba(124,111,239,0.12) 0%, rgba(232,93,138,0.06) 100%);
  border-color: rgba(124,111,239,0.35);
  box-shadow: 0 0 0 1px rgba(124,111,239,0.1), 0 30px 70px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
}
.av-price-card.featured::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--av-accent), #BDB6FF, var(--av-pink));
}
.av-price-card:not(.featured):hover { transform: translateY(-4px); border-color: rgba(124,111,239,0.2); }
.av-price-card.featured:hover { transform: translateY(-4px); }
.av-price-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 100px;
  background: linear-gradient(135deg, var(--av-accent), var(--av-pink));
  color: #fff; margin-bottom: 18px;
}
.av-price-plan  { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800; color: var(--av-muted); margin-bottom: 6px; letter-spacing: 1.5px; text-transform: uppercase; }
.av-price-num   { font-family: 'Syne', sans-serif; font-size: 52px; font-weight: 900; line-height: 1; margin-bottom: 4px; }
.av-price-num sup { font-size: 24px; vertical-align: top; margin-top: 10px; }
.av-price-period { font-size: 13px; color: var(--av-muted); margin-bottom: 28px; }
.av-price-divider { height: 1px; background: var(--av-border); margin: 24px 0; }
.av-price-feature {
  display: flex; align-items: center; gap: 10px;
  font-size: 13.5px; color: var(--av-text); margin-bottom: 12px;
}
.av-price-check {
  width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
  background: rgba(61,217,197,0.12); border: 1px solid rgba(61,217,197,0.3);
  display: flex; align-items: center; justify-content: center;
  color: var(--av-teal); font-size: 10px;
}
.av-price-btn {
  width: 100%; margin-top: 28px; padding: 13px; border-radius: 12px;
  font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif;
  cursor: pointer; border: none; transition: all 0.2s;
}
.av-price-btn.grad {
  background: linear-gradient(135deg, #9D93F5, #7C6FEF 50%, #E85D8A);
  color: #fff;
  box-shadow: 0 4px 20px rgba(124,111,239,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
}
.av-price-btn.grad:hover { opacity: 0.88; transform: translateY(-1px); }
.av-price-btn.outline {
  background: transparent; border: 1px solid rgba(255,255,255,0.12);
  color: var(--av-muted);
}
.av-price-btn.outline:hover { border-color: rgba(255,255,255,0.25); color: var(--av-text); background: rgba(255,255,255,0.04); }

/* ── Testimonials ── */
.av-testi-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px; margin-top: 60px;
}
.av-testi-card {
  border-radius: 18px; padding: 28px;
  background: var(--av-card); border: 1px solid var(--av-border);
  backdrop-filter: blur(20px); position: relative;
  transition: transform 0.25s, border-color 0.25s;
}
.av-testi-card:hover { transform: translateY(-4px); border-color: rgba(124,111,239,0.22); }
.av-testi-stars { color: #F0C948; font-size: 13px; margin-bottom: 14px; letter-spacing: 1px; }
.av-testi-body { font-size: 14.5px; line-height: 1.7; color: var(--av-text); margin-bottom: 22px; font-style: italic; }
.av-testi-body::before { content: '"'; font-size: 40px; line-height: 0; vertical-align: -14px; margin-right: 4px; color: var(--av-accent); font-style: normal; }
.av-testi-body::after  { content: '"'; font-size: 40px; line-height: 0; vertical-align: -14px; margin-left: 2px; color: var(--av-accent); font-style: normal; }
.av-testi-user { display: flex; align-items: center; gap: 12px; }
.av-testi-av {
  width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; color: #fff;
  position: relative;
}
.av-testi-av::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: linear-gradient(180deg, rgba(255,255,255,0.15), transparent); }
.av-testi-name { font-size: 13.5px; font-weight: 600; }
.av-testi-role { font-size: 12px; color: var(--av-muted); }

/* ── CTA banner ── */
.av-cta-banner {
  margin: 0 20px 100px;
  max-width: 1080px; margin-left: auto; margin-right: auto;
  border-radius: 24px; padding: 72px 40px;
  text-align: center; position: relative; overflow: hidden;
  background: linear-gradient(135deg, rgba(124,111,239,0.1) 0%, rgba(232,93,138,0.07) 100%);
  border: 1px solid rgba(124,111,239,0.22);
}
.av-cta-banner::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--av-accent), #BDB6FF, var(--av-pink), transparent);
}
.av-cta-banner-orb {
  position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none;
}
.av-cta-title {
  font-family: 'Syne', sans-serif; font-weight: 900;
  font-size: clamp(28px, 4vw, 52px); line-height: 1.1; margin-bottom: 16px;
  position: relative; z-index: 1;
}
.av-cta-sub {
  font-size: 16px; color: var(--av-muted); margin-bottom: 36px;
  position: relative; z-index: 1; max-width: 460px; margin-left: auto; margin-right: auto;
}
.av-cta-sub { margin-bottom: 36px; }

/* ── Footer ── */
.av-footer {
  border-top: 1px solid var(--av-border);
  padding: 48px 20px 32px;
}
.av-footer-inner {
  max-width: 1120px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  gap: 20px; flex-wrap: wrap;
}
.av-footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
.av-footer-link {
  font-size: 13px; color: var(--av-muted); cursor: pointer;
  transition: color 0.18s;
}
.av-footer-link:hover { color: var(--av-text); }
.av-footer-copy { font-size: 12px; color: var(--av-muted2); margin-top: 24px; text-align: center; max-width: 1120px; margin-left: auto; margin-right: auto; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .av-steps::before { display: none; }
  .av-hero-canvas .av-canvas-grid { grid-template-columns: repeat(2, 1fr); }
  .av-hero-canvas .av-canvas-grid { grid-template-columns: repeat(2, 1fr); }
  .av-cta-banner { padding: 48px 24px; }
  .av-float-badge { display: none !important; }
}
@media (max-width: 480px) {
  .av-hero-h1 { letter-spacing: -0.5px; }
  .av-hero-btns { flex-direction: column; align-items: stretch; }
  .av-btn-primary, .av-btn-ghost { justify-content: center; }
}
`;

/* ── Data ───────────────────────────────────────────────────── */
const FEATURES = [
  { emoji: "🎨", title: "AI-Powered Generation", desc: "Describe your vision in plain language and watch Aivorax bring it to life with stunning photorealism and artistic depth." },
  { emoji: "⚡", title: "Lightning Fast Rendering", desc: "Generate breathtaking images in under 3 seconds with our distributed GPU cluster. No more waiting, just creating." },
  { emoji: "🔮", title: "Smart Style Transfer", desc: "Apply any artistic style to your images with one click. From Van Gogh to Cyberpunk — the possibilities are infinite." },
  { emoji: "🛡️", title: "Commercial License", desc: "Every image you create is 100% yours. Use them in any commercial project with our ironclad full rights license." },
  { emoji: "📐", title: "Precision Controls", desc: "Fine-tune compositions, lighting, camera angles, depth of field, and mood with intuitive sliders and prompts." },
  { emoji: "🤝", title: "Team Collaboration", desc: "Share workspaces, leave annotations, and co-create in real-time. Creativity is better together." },
];

const STEPS = [
  { n: "01", title: "Describe Your Vision", desc: "Type a prompt or choose from curated templates to get started instantly." },
  { n: "02", title: "AI Generates", desc: "Our model processes your input and renders multiple high-fidelity variations." },
  { n: "03", title: "Refine & Enhance", desc: "Adjust, upscale, vary, or remix until it's exactly what you imagined." },
  { n: "04", title: "Export & Share", desc: "Download in any format, share to socials, or push to your creative pipeline." },
];

const PRICING = [
  {
    plan: "Starter", price: "0", period: "Forever free",
    features: ["25 images / month", "Standard resolution", "3 style presets", "Community gallery"],
    cta: "Get Started Free", ctaClass: "outline", featured: false,
  },
  {
    plan: "Pro", price: "19", period: "per month",
    features: ["Unlimited images", "4K resolution", "All 120+ styles", "Priority GPU queue", "Commercial license", "API access"],
    cta: "Start Pro Trial", ctaClass: "grad", featured: true, badge: "Most Popular",
  },
  {
    plan: "Studio", price: "79", period: "per month",
    features: ["Everything in Pro", "Team workspace (10 seats)", "Custom model fine-tuning", "Dedicated GPU", "SLA support"],
    cta: "Contact Sales", ctaClass: "outline", featured: false,
  },
];

const TESTIMONIALS = [
  { stars: 5, text: "Aivorax has completely replaced my stock photo subscriptions. The quality is indistinguishable from professional photography.", name: "Sarah K.", role: "Creative Director @ Waveform", init: "SK", grad: "linear-gradient(135deg,#7C6FEF,#E85D8A)" },
  { stars: 5, text: "I used to spend hours prompting other tools. With Aivorax the first result is almost always perfect. It's witchcraft.", name: "Marcus T.", role: "Indie Game Developer", init: "MT", grad: "linear-gradient(135deg,#3DD9C5,#7C6FEF)" },
  { stars: 5, text: "Our marketing team produces 10× more visual content now. The style consistency feature is absolutely game-changing.", name: "Priya M.", role: "Head of Growth @ Novu", init: "PM", grad: "linear-gradient(135deg,#E85D8A,#FF9E73)" },
];

const PREVIEW_CARDS = [
  { style: "--c1:rgba(124,111,239,0.22);--c2:rgba(61,217,197,0.1);", image: "https://cdn.leonardo.ai/users/090a8365-0332-4ae7-a87b-584a2c29b6b7/generations/1f14793c-0fff-6300-abfe-5f62f3dd74f7/lucid-origin_A_stunning_anime_girl_standing_under_cherry_blossom_trees_soft_pink_petals_falli-0.jpg" },
  { style: "--c1:rgba(232,93,138,0.2);--c2:rgba(124,111,239,0.12);", image: "https://cdn.leonardo.ai/users/090a8365-0332-4ae7-a87b-584a2c29b6b7/generations/1f147949-856b-6ff0-ab83-b01153c3ee5d/lucid-origin_A_cozy_scene_with_coffee_cup_warm_lighting_soft_shadows_aesthetic_table_setup_re-0.jpg" },
  { style: "--c1:rgba(61,217,197,0.18);--c2:rgba(232,93,138,0.08);", image: "https://cdn.leonardo.ai/users/090a8365-0332-4ae7-a87b-584a2c29b6b7/generations/1f14794a-d36f-6cf0-b197-549b6a575b07/lucid-origin_A_minimal_luxury_scene_with_elegant_objects_soft_shadows_neutral_color_palette_p-0.jpg" },
  { style: "--c1:rgba(157,147,245,0.2);--c2:rgba(255,158,115,0.1);", image: "https://cdn.leonardo.ai/users/090a8365-0332-4ae7-a87b-584a2c29b6b7/generations/1f14794b-fd18-6fb0-ab76-87a7323e2676/lucid-origin_A_person_standing_on_a_cliff_looking_at_a_vast_horizon_sunset_sky_feeling_of_fre-0.jpg" },
  { style: "--c1:rgba(255,158,115,0.18);--c2:rgba(61,217,197,0.1);", image: "https://cdn.leonardo.ai/users/090a8365-0332-4ae7-a87b-584a2c29b6b7/generations/1f14794e-2332-62d0-8715-a62df6629ae6/lucid-origin_A_beautiful_anime_city_skyline_during_sunset_warm_golden_light_soft_clouds_calm_-0.jpg" },
  { style: "--c1:rgba(61,217,197,0.15);--c2:rgba(124,111,239,0.15);", image: "https://cdn.leonardo.ai/users/090a8365-0332-4ae7-a87b-584a2c29b6b7/generations/1f14794f-5728-6110-824d-233882f6dfd0/lucid-origin_A_traditional_Japanese_street_in_anime_style_lanterns_glowing_evening_time_warm_-0.jpg" },
];
const TICKER_ITEMS = [
  ["Photorealism", ""],["Portrait Mode", ""],["Cinematic Lighting", ""],
  ["4K Export", ""],["Style Transfer", ""],["Batch Generate", ""],
  ["One-click Upscale", ""],["Smart Background", ""],["AI Inpainting", ""],
];

/* ─────────────────────────────────────────────────────────── */
export default function Home() {
  useAOS();

  /* Inject CSS once */
  useEffect(() => {
    const id = "aivorax-page-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id; tag.textContent = PAGE_CSS;
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <div className="av-page" style={{ background: "var(--av-bg)" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="av-hero">
        {/* Mesh BG */}
        <div className="av-mesh">
          <div className="av-mesh-orb" style={{ width: 700, height: 700, top: "-15%", left: "-12%", background: "rgba(124,111,239,0.12)", animationDuration: "8s" }} />
          <div className="av-mesh-orb" style={{ width: 500, height: 500, top: "20%", right: "-10%", background: "rgba(232,93,138,0.09)", animationDuration: "10s", animationDelay: "2s" }} />
          <div className="av-mesh-orb" style={{ width: 400, height: 400, bottom: "5%", left: "30%", background: "rgba(61,217,197,0.07)", animationDuration: "12s", animationDelay: "4s" }} />

          {/* Rotating gradient disc */}
          <div style={{ position: "absolute", top: "50%", left: "50%", width: "min(900px, 90vw)", height: "min(900px, 90vw)", borderRadius: "50%", transform: "translate(-50%,-50%)", overflow: "hidden", opacity: 0.06, pointerEvents: "none" }}>
            <div style={{ position: "absolute", inset: "-20%", background: "conic-gradient(from 0deg, #7C6FEF, #E85D8A, #3DD9C5, #7C6FEF)", animation: "rotateGrad 18s linear infinite" }} />
          </div>

          {/* Grid lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating badges */}
        <div className="av-float-badge" style={{ top: "22%", left: "5%", animation: "floatY 5s ease-in-out infinite" }}>
          <span style={{ fontSize: 16 }}>🚀</span> 2M+ images generated
        </div>
        <div className="av-float-badge" style={{ top: "30%", right: "6%", animation: "floatY2 6s ease-in-out infinite" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--av-teal)", boxShadow: "0 0 8px var(--av-teal)", display: "inline-block" }} />
          AI Online · 99.9% uptime
        </div>
        <div className="av-float-badge" style={{ bottom: "38%", left: "4%", animation: "floatY 7s ease-in-out infinite 1s" }}>
          ⭐ 4.9 / 5 rating
        </div>

        <div className="av-hero-inner">
          <div className="av-hero-eyebrow">
            <span className="av-eyebrow-dot" />
            Introducing Aivorax Studio 2.0
          </div>

          <h1 className="av-hero-h1">
            Turn Words Into<br />
            Visual Masterpieces
          </h1>

          <p className="av-hero-sub">
            The <span>next-generation AI image studio</span> built for creators who refuse to compromise.
            Generate, edit, and export stunning visuals in seconds.
          </p>

          <div className="av-hero-btns">
            <button className="av-btn-primary">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Start Creating Free
            </button>
            <button className="av-btn-ghost">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              Watch Demo
            </button>
          </div>

          {/* Canvas preview */}
          <div className="av-hero-canvas" data-aos="fade-up" data-aos-delay="200">
            <div className="av-canvas-top">
              <div className="av-dot" style={{ background: "#FF5F57" }} />
              <div className="av-dot" style={{ background: "#FFBD2E" }} />
              <div className="av-dot" style={{ background: "#28C840" }} />
              <span style={{ marginLeft: 8, fontSize: 12, color: "var(--av-muted)" }}>Aivorax Studio</span>
            </div>
            <div className="av-canvas-grid">
              {PREVIEW_CARDS.map((c, i) => (
                <div key={i} className="av-preview-card">
                  {c.image ? (
                    <img
                      src={c.image} alt=""
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: 12 }}
                    />
                  ) : (
                    <div className="inner">{c.emoji}</div>
                  )}
                  {/* subtle bottom fade so filename text stays readable */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(transparent, rgba(0,0,0,0.55))", borderRadius: "0 0 12px 12px", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>aivorax-gen-{1000 + i * 137}.png</div>
                </div>
              ))}
            </div>
            <div className="av-canvas-scan" />
          </div>
        </div>
      </section>

      {/* ── TICKER ─────────────────────────────────────────── */}
      <div className="av-ticker">
        <div className="av-ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map(([label, _], i) => (
            <div key={i} className="av-ticker-item">
              <span style={{ color: "var(--av-accent2)", fontFamily: "'Syne',sans-serif" }}>✦</span>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="av-section">
        <div className="av-container">
          <div data-aos="fade-up">
            <div className="av-section-eyebrow">Features</div>
            <h2 className="av-section-title">Everything you need to<br />create without limits</h2>
            <p className="av-section-sub">A complete creative suite engineered from the ground up for professional image generation.</p>
          </div>

          {/* Stats */}
          <div className="av-stats" data-aos="fade-up" data-aos-delay="100">
            {[["2M+","Images Generated"],["98%","Satisfaction Rate"],["<3s","Avg Render Time"],["120+","Art Styles"]].map(([n,l]) => (
              <div key={l} className="av-stat-cell">
                <div className="av-stat-num">{n}</div>
                <div className="av-stat-lbl">{l}</div>
              </div>
            ))}
          </div>

          <div className="av-feat-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="av-feat-card" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="av-feat-icon">{f.emoji}</div>
                <div className="av-feat-title">{f.title}</div>
                <div className="av-feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="av-section" style={{ background: "linear-gradient(180deg, transparent, rgba(124,111,239,0.04), transparent)" }}>
        <div className="av-container">
          <div data-aos="fade-up" style={{ textAlign: "center" }}>
            <div className="av-section-eyebrow" style={{ justifyContent: "center" }}>How It Works</div>
            <h2 className="av-section-title" style={{ textAlign: "center" }}>From idea to image<br />in four steps</h2>
          </div>
          <div className="av-steps">
            {STEPS.map((s, i) => (
              <div key={s.n} className="av-step" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="av-step-num"><span>{s.n}</span></div>
                <div className="av-step-title">{s.title}</div>
                <div className="av-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section className="av-section">
        <div className="av-container">
          <div data-aos="fade-up" style={{ textAlign: "center" }}>
            <div className="av-section-eyebrow" style={{ justifyContent: "center" }}>Pricing</div>
            <h2 className="av-section-title" style={{ textAlign: "center" }}>Simple, transparent pricing</h2>
            <p className="av-section-sub" style={{ margin: "0 auto", textAlign: "center" }}>Start free, scale as you grow. No hidden fees, no surprises.</p>
          </div>
          <div className="av-pricing-grid">
            {PRICING.map((p, i) => (
              <div key={p.plan} className={`av-price-card${p.featured ? " featured" : ""}`} data-aos="fade-up" data-aos-delay={i * 100}>
                {p.badge && <div className="av-price-badge">⭐ {p.badge}</div>}
                <div className="av-price-plan">{p.plan}</div>
                <div className="av-price-num">
                  {p.price === "0" ? (
                    <span style={{ background: "linear-gradient(135deg,#fff,var(--av-accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Free</span>
                  ) : (
                    <span style={{ background: "linear-gradient(135deg,#fff,var(--av-accent2),var(--av-pink))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      <sup>$</sup>{p.price}
                    </span>
                  )}
                </div>
                <div className="av-price-period">{p.period}</div>
                <div className="av-price-divider" />
                {p.features.map(f => (
                  <div key={f} className="av-price-feature">
                    <span className="av-price-check">✓</span>
                    {f}
                  </div>
                ))}
                <button className={`av-price-btn ${p.ctaClass}`}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="av-section" style={{ background: "linear-gradient(180deg, transparent, rgba(232,93,138,0.03), transparent)" }}>
        <div className="av-container">
          <div data-aos="fade-up" style={{ textAlign: "center" }}>
            <div className="av-section-eyebrow" style={{ justifyContent: "center" }}>Testimonials</div>
            <h2 className="av-section-title" style={{ textAlign: "center" }}>Loved by creators worldwide</h2>
          </div>
          <div className="av-testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="av-testi-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="av-testi-stars">{"★".repeat(t.stars)}</div>
                <div className="av-testi-body">{t.text}</div>
                <div className="av-testi-user">
                  <div className="av-testi-av" style={{ background: t.grad }}>{t.init}</div>
                  <div>
                    <div className="av-testi-name">{t.name}</div>
                    <div className="av-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────── */}
      <div style={{ padding: "0 20px 80px" }}>
        <div className="av-cta-banner" data-aos="zoom-in-up">
          <div className="av-cta-banner-orb" style={{ width: 400, height: 400, top: "-30%", left: "-10%", background: "rgba(124,111,239,0.15)" }} />
          <div className="av-cta-banner-orb" style={{ width: 300, height: 300, bottom: "-20%", right: "5%", background: "rgba(232,93,138,0.12)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 className="av-cta-title">
              Ready to create<br />something legendary?
            </h2>
            <p className="av-cta-sub">Join over 200,000 creators who trust Aivorax to bring their visions to life.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="av-btn-primary" style={{ fontSize: 15, padding: "14px 36px" }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                Start For Free
              </button>
              <button className="av-btn-ghost" style={{ fontSize: 15, padding: "13px 30px" }}>Talk to Sales</button>
            </div>
            <p style={{ marginTop: 20, fontSize: 12, color: "var(--av-muted2)" }}>No credit card required · Cancel anytime · 25 free images/mo</p>
          </div>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="av-footer">
        <div className="av-footer-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(145deg,#9D93FF,#7C6FEF,#E85D8A)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 16, background: "linear-gradient(125deg,#fff,#C4BEFF,#9D93F5,#E85D8A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Aivorax</span>
          </div>
          <div className="av-footer-links">
            {["Privacy", "Terms", "Blog", "Docs", "Status", "Twitter", "Discord"].map(l => (
              <span key={l} className="av-footer-link">{l}</span>
            ))}
          </div>
        </div>
        <div className="av-footer-copy">© 2025 Aivorax Studio. All rights reserved. Crafted with AI &amp; creativity.</div>
      </footer>
    </div>
  );
}