import React from 'react'
import {
  CheckCircle2,
  Leaf,
  Droplets,
  Recycle,
  TreePine,Sparkles, Users, Award, HeartHandshake
} from "lucide-react";
import { AboutMain } from './AboutMain';
import { gsap } from "gsap";
import { useLayoutEffect } from "react";

import { Link } from "react-router-dom";
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
    year: "2000",
    title: "Founded in Bhopal",
    text: "Started as a small collective of sanitation workers and environmentalists.",
    img: "/newimg/location.png",
  },
  {
    year: "2007",
    title: "First 100 Public Toilets",
    text: "Crossed our first major milestone in urban sanitation infrastructure.",
    img: "/newimg/s4.jpeg",
  },
  {
    year: "2014",
    title: "Swachh Bharat Partner",
    text: "Became an implementation partner for the national clean India mission.",
    img: "https://bsmedia.business-standard.com/_media/bs/img/article/2019-07/04/full/1562263337-6935.jpg",
  },
  {
    year: "2019",
    title: "1k Saplings",
    text: "Completed our largest plantation campaign across Madhya Pradesh.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6cl90R1rDc4USKqKaB9xTKjqiXezldS7N1BN52A-yA&s",
  },
  {
    year: "2026",
    title: "Pan-India Operations",
    text: "Active across 5 states with 800+ active facilities.",
    img: "https://www.raiseindiafoundation.org/files/page/whatsapp-image-2024-06-24-at-00-35-19-8962026a-1.webp",
  },
];

function AboutSection() {
  
  const itemsRef = useRef([]);
const visualRef = useRef(null);
const progressRef = useRef(null);


const [active, setActive] = useState(0);
const current = timeline[active];
useLayoutEffect(() => {
  if (!visualRef.current) return;

  gsap.fromTo(
    visualRef.current,
    { opacity: 0, scale: 0.96, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 0.8 }
  );

  if (progressRef.current) {
    gsap.to(progressRef.current, {
      height: `${((active + 1) / timeline.length) * 100}%`,
      duration: 0.8,
    });
  }
}, [active]);
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
      <Link
  to="#">
      <button
  onClick={() =>
    document
      .getElementById("our-story")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-lime-400 text-black font-semibold hover:scale-105 transition"
>
  Our Story →
</button>
</Link>

     <Link
  to="/contact-us"
  className="px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition inline-block"
>
  Get Involved
</Link>
    </div>
  </div>

  {/* SCROLL INDICATOR */}
  <div className="absolute bottom-6 text-white/60 animate-bounce">
    ↓
  </div>
</header>
<AboutMain id="our-story"/>
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
          padding:30px 10px;
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
padding:30px 20px;
        }

        .vsa-center {
          text-align:center;
          margin-bottom:10px;
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
    <section className="py-16 md:py-20 bg-white">
  <div className="container mx-auto px-4 sm:px-6">

    {/* Heading */}
    <div className="text-center mb-10 md:mb-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800">
        Our Journey
      </h2>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">

     
{/* LEFT IMAGE */}
<div className="lg:sticky lg:top-24 h-fit flex justify-center items-center">
  <div
    ref={visualRef}
    className="relative overflow-hidden rounded-3xl shadow-2xl 
               w-full max-w-[520px] aspect-[4/5]"
  >
    <img
      src={current.img}
      alt={current.title}
      className="w-full h-full object-cover transition duration-700"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

    {/* Year */}
    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold text-green-800 shadow">
      {current.year}
    </div>

    {/* Bottom Content */}
    <div className="absolute bottom-6 left-6 right-6 text-white">
      <h3 className="text-2xl md:text-3xl font-bold">
        {current.title}
      </h3>

      <p className="mt-2 text-sm md:text-base text-white/80 leading-relaxed">
        {current.text}
      </p>
    </div>

    {/* Progress Bar */}
    <div className="absolute right-4 top-0 h-full w-[3px] bg-white/20 rounded-full overflow-hidden">
      <div
        ref={progressRef}
        className="bg-white w-full"
        style={{ height: "0%" }}
      />
    </div>
  </div>
</div>
      {/* RIGHT TIMELINE */}
      <div className="space-y-6 md:space-y-10">
        {timeline.map((t, i) => (
          <Reveal key={i} delay={i * 100}>
            <div
              ref={(el) => (itemsRef.current[i] = el)}
              onMouseEnter={() => setActive(i)}
              className="pl-5 sm:pl-6 border-l relative cursor-pointer"
            >
              {/* DOT */}
              <div
                className={`absolute -left-[6px] top-2 w-3 h-3 rounded-full ${
                  i === active ? "bg-green-600" : "bg-gray-300"
                }`}
              ></div>

              {/* CARD */}
              <div
                className={`p-4 sm:p-5 rounded-xl border transition ${
                  i === active
                    ? "bg-green-50 border-green-400"
                    : "bg-white"
                }`}
              >
                <p className="text-xs sm:text-sm text-gray-500">
                  {t.year}
                </p>

                <h4 className="text-lg sm:text-xl font-semibold">
                  {t.title}
                </h4>

                <p className="text-sm sm:text-base text-gray-600">
                  {t.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

    </div>
  </div>
</section>
    </div>
  
  </>
  )
}

export default AboutSection