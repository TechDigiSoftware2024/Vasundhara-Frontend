import React from 'react'
import {
  CheckCircle2,
  Leaf,
  Droplets,
  Recycle,
  TreePine,Sparkles, Users, Award, HeartHandshake
} from "lucide-react";
import { AboutMain } from './AboutMain';
import { useEffect, useRef, useState } from "react";
const values = [
    {
      icon: HeartHandshake,
      title: "Dignity First",
      desc: "Every public service we build starts with respect for the human using it.",
    },
    {
      icon: Leaf,
      title: "Earth Conscious",
      desc: "We measure success by trees, water saved and emissions reduced.",
    },
    {
      icon: Users,
      title: "Community Led",
      desc: "Local voices shape every program — top-down doesn't last.",
    },
    {
      icon: Award,
      title: "Transparent",
      desc: "12A & 80G certified with public reporting on every rupee spent.",
    },
  ];
  function useReveal() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, show };
}

function Reveal({ children, delay = 0 }) {
  const { ref, show } = useReveal();

  return (
    <div
      ref={ref}
      className={`vsa-reveal ${show ? "vsa-in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

  const timeline = [
    {
      year: "1999",
      title: "Founded in Bhopal",
      text: "Started as a small collective of sanitation workers and environmentalists.",
    },
    {
      year: "2007",
      title: "First 100 Public Toilets",
      text: "Crossed our first major milestone in urban sanitation infrastructure.",
    },
    {
      year: "2014",
      title: "Swachh Bharat Partner",
      text: "Became an implementation partner for the national clean India mission.",
    },
    {
      year: "2019",
      title: "1 Million Saplings",
      text: "Completed our largest plantation campaign across Madhya Pradesh.",
    },
    {
      year: "2024",
      title: "Pan-India Operations",
      text: "Active across 12 states with 800+ active facilities.",
    },
  ];

function AboutSection() {
  return (
  <>
  {/* ===== 1. HERO SECTION ===== */}
<header
  className="relative min-h-[100vh] flex items-center justify-center text-center overflow-hidden"
  style={{
    background:
      "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.25), transparent 40%)," +
      "radial-gradient(circle at 80% 80%, rgba(250,204,21,0.15), transparent 40%)," +
      "linear-gradient(180deg,#052e2b,#0b3b34)",
  }}
>
  {/* GRID BACKGROUND */}
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)," +
        "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }}
  />

  {/* FLOATING ICONS */}
  <div className="absolute inset-0 pointer-events-none">
    <Leaf className="absolute top-20 left-16 text-green-300 opacity-30 w-10 h-10" />
    <TreePine className="absolute bottom-28 right-20 text-yellow-200 opacity-30 w-12 h-12" />
    <Sparkles className="absolute top-40 right-24 text-green-200 opacity-30 w-8 h-8" />
  </div>

  {/* CONTENT */}
  <div className="relative z-10 max-w-5xl px-6">

    {/* BADGE */}
    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-green-200 text-sm font-semibold backdrop-blur-md mb-6">
      <Leaf size={16} />
      ABOUT VASUNDHARA
    </div>

    {/* MAIN HEADING */}
    <h1 className="text-white font-black leading-[0.95]"
      style={{
        fontSize: "clamp(42px,6vw,90px)",
        letterSpacing: "-0.03em",
      }}
    >
      Conserving the Earth.
      <br />
      <span
        style={{
          background: "linear-gradient(90deg,#a7f3d0,#facc15)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Empowering Communities.
      </span>
    </h1>

    {/* SUBTEXT */}
    <p className="mt-6 text-white/80 max-w-2xl mx-auto text-[16px] md:text-[18px] leading-7">
      A grassroots movement turning sanitation, plantation and waste management
      into pathways of dignity for millions across India.
    </p>

    {/* BUTTONS */}
    <div className="mt-10 flex flex-wrap gap-4 justify-center">
      <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-lime-400 text-black font-semibold hover:scale-105 transition">
        Our Story →
      </button>

      <button className="px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition">
        Get Involved
      </button>
    </div>
  </div>

  {/* SCROLL INDICATOR */}
  <div className="absolute bottom-6 text-white/60 animate-bounce">
    ↓
  </div>
</header>
<AboutMain/>
 <div className="vsa-root">
      {/* ===== CSS ===== */}
      <style>{`
        .vsa-root {
          --g1:#0f766e;
          --g2:#10b981;
          --g3:#65a30d;
          --ink:#0b1f1c;
          --ink2:#385451;
          --paper:#f5fbf7;
          --line:#dcebe2;
          font-family:'Plus Jakarta Sans', system-ui, sans-serif;
          background:var(--paper);
          color:var(--ink);
        }

        .vsa-container {
          max-width:1180px;
          margin:auto;
          padding:60px 20px;
        }

        .vsa-eyebrow {
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:6px 14px;
          border-radius:999px;
          background:rgba(16,185,129,.12);
          color:#0f766e;
          font-size:13px;
          font-weight:700;
          text-transform:uppercase;
        }

        .vsa-h2 {
          font-size:40px;
          font-weight:800;
          margin:14px 0 30px;
        }

        .vsa-h2 em {
          background:linear-gradient(120deg,var(--g2),var(--g3));
          -webkit-background-clip:text;
          color:transparent;
          font-style:normal;
        }

        .vsa-values {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
          gap:20px;
        }

        .vsa-value {
          background:#fff;
          border-radius:20px;
          padding:26px;
          border:1px solid var(--line);
          transition:0.3s;
          position:relative;
          overflow:hidden;
        }

        .vsa-value:hover {
          transform:translateY(-6px);
          box-shadow:0 20px 40px -20px rgba(15,118,110,.4);
        }

        .vsa-value-icon {
          width:50px;
          height:50px;
          border-radius:14px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:linear-gradient(120deg,var(--g1),var(--g2));
          color:#fff;
          margin-bottom:16px;
        }

        .vsa-value h4 {
          margin:0 0 8px;
          font-size:18px;
          font-weight:800;
        }

        .vsa-value p {
          margin:0;
          color:var(--ink2);
          font-size:14px;
          line-height:1.6;
        }
      `}</style>

      {/* ===== SECTION ===== */}
      <section>
        <div className="vsa-container">
          
          <div style={{ textAlign: "center" }}>
            <span className="vsa-eyebrow">
              <Sparkles size={14} /> What drives us
            </span>

            <h2 className="vsa-h2">
              Values that <em>guide every action</em>
            </h2>
          </div>

          <div className="vsa-values">
            {values.map((item, i) => {
              const Icon = item.icon;
              return (
                <div className="vsa-value" key={i}>
                  <div className="vsa-value-icon">
                    <Icon size={22} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
    <div className="vsa-root">
      {/* ===== CSS ===== */}
      <style>{`
        .vsa-root {
          --g1:#0f766e;
          --g2:#10b981;
          --ink:#0b1f1c;
          --ink2:#385451;
          --line:#dcebe2;
          background:#f5fbf7;
          font-family: system-ui;
        }

        .vsa-container {
          max-width:1100px;
          margin:auto;
          padding:80px 20px;
        }

        .vsa-center {
          text-align:center;
          margin-bottom:40px;
        }

        .vsa-eyebrow {
          padding:6px 14px;
          border-radius:999px;
          background:rgba(16,185,129,.12);
          color:#0f766e;
          font-size:13px;
          font-weight:700;
        }

        .vsa-h2 {
          font-size:40px;
          font-weight:900;
          margin-top:10px;
        }

        .vsa-h2 em {
          background:linear-gradient(120deg,#10b981,#65a30d);
          -webkit-background-clip:text;
          color:transparent;
          font-style:normal;
        }

        /* ===== Timeline ===== */
        .vsa-timeline {
          position:relative;
          padding:20px 0;
        }

        .vsa-timeline::before {
          content:"";
          position:absolute;
          left:50%;
          transform:translateX(-50%);
          top:0;
          bottom:0;
          width:2px;
          background:linear-gradient(180deg,var(--g2),transparent);
        }

        .vsa-item {
          width:50%;
          padding:20px 40px;
          position:relative;
        }

        .vsa-item:nth-child(odd) {
          text-align:right;
        }

        .vsa-item:nth-child(even) {
          margin-left:50%;
        }

        .vsa-dot {
          position:absolute;
          top:28px;
          width:18px;
          height:18px;
          border-radius:50%;
          background:#fff;
          border:3px solid var(--g2);
          box-shadow:0 0 0 6px rgba(16,185,129,.2);
        }

        .vsa-item:nth-child(odd) .vsa-dot {
          right:-9px;
        }

        .vsa-item:nth-child(even) .vsa-dot {
          left:-9px;
        }

        .vsa-card {
          background:#fff;
          border:1px solid var(--line);
          border-radius:18px;
          padding:20px;
          transition:0.3s;
        }

        .vsa-card:hover {
          transform:scale(1.03);
          box-shadow:0 20px 40px -20px rgba(0,0,0,.25);
        }

        .vsa-year {
          font-weight:900;
          color:var(--g1);
          font-size:13px;
        }

        .vsa-card h4 {
          margin:6px 0;
          font-size:18px;
        }

        .vsa-card p {
          color:var(--ink2);
          font-size:14px;
        }

        /* ===== Animation ===== */
        .vsa-reveal {
          opacity:0;
          transform:translateY(30px);
          transition:all .8s ease;
        }

        .vsa-reveal.vsa-in {
          opacity:1;
          transform:none;
        }

        /* ===== Mobile ===== */
        @media (max-width:768px) {
          .vsa-timeline::before {
            left:20px;
          }

          .vsa-item {
            width:100%;
            margin-left:0 !important;
            padding-left:50px;
            text-align:left !important;
          }

          .vsa-dot {
            left:12px !important;
            right:auto;
          }
        }
      `}</style>

      {/* ===== SECTION ===== */}
      <section>
        <div className="vsa-container">

          <div className="vsa-center">
            <span className="vsa-eyebrow">Our Journey</span>
            <h2 className="vsa-h2">
              25 years of <em>quiet, steady impact</em>
            </h2>
          </div>

          <div className="vsa-timeline">
            {timeline.map((t, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="vsa-item">
                  <div className="vsa-dot"></div>

                  <div className="vsa-card">
                    <span className="vsa-year">{t.year}</span>
                    <h4>{t.title}</h4>
                    <p>{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </div>
  
  </>
  )
}

export default AboutSection