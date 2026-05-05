import { useEffect, useRef  } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  Train,
  Bus,
  Leaf,
  Users,
  HeartHandshake,
  GraduationCap,
  Droplets,
  Recycle,
  Sparkles,
  ArrowRight,
  MapPin,
} from "lucide-react";
import BusStand from "./BusStand";
import Railway from "./Railway";
import MunicipalCorporation from "./MunicipalCorporation";
import SectionThree from "./SectionThree";

gsap.registerPlugin(ScrollTrigger);

const C = {
  bg: "#f4faf5",
  ink: "#0b2a16",
  ink2: "#1f4d2f",
  green: "#16a34a",
  greenDark: "#065f46",
  greenSoft: "#dcfce7",
  accent: "#facc15",
  white: "#ffffff",
  shadow: "0 20px 40px -20px rgba(6,95,70,.35)",
};
const images = [
  "https://images.tribuneindia.com/cms/gall_content/2019/10/2019_10$largeimg04_Friday_2019_072845315.jpg",
  "https://images.livemint.com/img/2019/11/24/1600x900/railwayspti1_1574609298972.jfif",
  "https://sc0.blr1.digitaloceanspaces.com/inline/914733-cvcofdmtru-1551284510.jpg",
  "https://images.indianexpress.com/2025/07/waste_management_1200.jpg?w=414",

  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBm2sYhft6QYhi6WNeSP-kQROyhhxFJUh3mQ&s",
  "https://www.hindustantimes.com/ht-img/img/2023/04/20/550x309/Gurugram--India-April-20--2023--Sanitation-worker-_1682016483370.jpg",

  "https://th-i.thgim.com/public/incoming/rv6jj3/article65718449.ece/alternates/FREE_1200/ksrtc.jpg",
];
const SECTIONS = [
  {
    id: "municipal",
    tag: "Civic",
    title: "Municipal Corporation",
    color: "#16a34a",
    icon: Building2,
    img: "../../Vasundhara-Backend/public/newimg/s3.jpeg",
    required: true,
    desc: "Urban greening, ward-level plantation drives and community maintenance.",
    stats: [
      { k: "120+", v: "wards" },
      { k: "48K", v: "trees" },
      { k: "18", v: "cities" },
    ],
  },
  {
    id: "railway",
    tag: "Transit",
    title: "Railway Stations",
    color: "#0ea5e9",
    icon: Train,
    img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900&q=80",
    required: true,
    desc: "Greener station precincts and passenger-facing public sustainability zones.",
    stats: [
      { k: "42", v: "stations" },
      { k: "21K", v: "saplings" },
      { k: "9", v: "districts" },
    ],
  },
  {
    id: "bus-stand",
    tag: "Mobility",
    title: "Bus Stands",
    icon: Bus,
    color: "#f59e0b",
    img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&q=80",
    required: true,
    desc: "Cleaner mobility hubs with shade cover and water-positive landscaping.",
    stats: [
      { k: "65", v: "depots" },
      { k: "13K", v: "plants" },
      { k: "11", v: "towns" },
    ],
  },
];
const OurWork= () => {
  const root = useRef(null);
  const heroTitle = useRef(null);

 



    useEffect(() => {
    gsap.utils.toArray(".idx-row").forEach((row, i) => {
      gsap.from(row, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.05,
        ease: "power4.out",
        clearProps: "all"
      });
    });
     gsap.to(".card", {
    y: "+=25",
    x: "+=10",
    rotation: "+=3",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: {
      each: 0.3,
      from: "random",
    },
  });
  
  }, []);
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
   <div
   
      ref={root}
      style={{
        background: C.bg,
        color: C.ink,
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        
      }}
    >
    <header
  style={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
      justifyContent: "center",
    gap: "60px",   
    padding: "120px 60px",
    background:
      "linear-gradient(120deg,#f4faf5 60%, #e6f4ea 100%)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* LEFT CONTENT */}
  <div style={{ maxWidth: "600px" }}>
    <h1
      ref={heroTitle}
      style={{
        fontSize: "clamp(3rem,3vw,5.5rem)",
        fontWeight: 600,
        lineHeight: 1.1,
        color: "#0b2a16",
        fontFamily: "Georgia, serif",
      }}
    >
      <div data-word>we plant.</div>
      <div data-word style={{ color: "#16a34a" }}>
        we build.
      </div>
      <div data-word>we belong.</div>
    </h1>

    <p
      className="hero-sub"
      style={{
        marginTop: 24,
        fontSize: "1.1rem",
        color: "#1f4d2f",
        lineHeight: 1.6,
      }}
    >
      A decade of work across <i>municipal corporations</i>, railway
      stations and bus stands — the everyday corners where India breathes.
    </p>

    <div
      className="hero-cta"
      style={{ marginTop: 30, display: "flex", gap: 20 }}
    >
      <button
        style={{
          background: "#065f46",
          color: "#fff",
          padding: "14px 26px",
          borderRadius: 999,
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        ● See the work →
      </button>

      <button
        style={{
          background: "transparent",
          border: "none",
          borderBottom: "2px solid #065f46",
          color: "#065f46",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Or join 500+ volunteers →
      </button>
    </div>

   
  </div>

  {/* RIGHT IMAGE STACK */}
  <div
    style={{
      position: "relative",
      width: "450px",
      height: "500px",
    }}
  >
    {/* CARD 1 */}
    <div
      className="card"
      style={{
        position: "absolute",
        top: "0",
        left: "80px",
        transform: "rotate(-5deg)",
        background: "#fff",
        padding: 10,
        borderRadius: 12,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500"
        style={{ width: 220, height: 280, objectFit: "cover", borderRadius: 8 }}
      />
    </div>

    {/* CARD 2 */}
    <div
      className="card"
      style={{
        position: "absolute",
        top: "120px",
        left: "0",
        transform: "rotate(6deg)",
        background: "#fff",
        padding: 10,
        borderRadius: 12,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500"
        style={{ width: 220, height: 280, objectFit: "cover", borderRadius: 8 }}
      />
    </div>

    {/* CARD 3 */}
    <div
      className="card"
      style={{
        position: "absolute",
        top: "80px",
        right: "0",
        transform: "rotate(4deg)",
        background: "#fff",
        padding: 10,
        borderRadius: 12,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500"
        style={{ width: 220, height: 280, objectFit: "cover", borderRadius: 8 }}
      />
    </div>

    {/* FLOATING BADGE */}
    <div
     onClick={() => scrollTo("programs")}
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        background: "#facc15",
        borderRadius: "50%",
        width: 90,
        height: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        transform: "rotate(-15deg)",
        cursor: "pointer",
      }}
    >
      SCROLL ↓
    </div>
  </div>
</header>


{/* ============================================================
    SECTION 2 — EXACT DARK BENTO STYLE
============================================================ */}
<section
 id="programs"
  style={{
    padding: "20px 4px 10px",
    background:
      "radial-gradient(circle at 20% 20%, rgba(14,80,42,.45), transparent 35%), radial-gradient(circle at 80% 70%, rgba(8,55,35,.35), transparent 35%), #032d18",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* dotted pattern */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.16,
      backgroundImage:
        "radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px)",
      backgroundSize: "26px 26px",
      pointerEvents: "none",
    }}
  />

  <div
    style={{
      maxWidth: 1100,
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    }}
  >
    {/* heading */}
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          color: "#facc15",
          fontSize: 22,
          letterSpacing: 4,
          fontWeight: 400,
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
       "Our Work with Bhopal Nagar Nigam"
      </div>

      
    </div>

 <div

  style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 14,
  }}
>
  {images.map((img, i) => {
    const layout = [
      "span 3",
      "span 3",
      "span 2",
      "span 2",
      "span 2",
      "span 4",
      "span 2",
      "span 3",
    ];

    const col = layout[i] || "span 2";

    return (
      <div
        key={i}
        style={{
          gridColumn: col,
          height: col === "span 4" ? 300 : 200,
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
        }}
      >
        {/* IMAGE */}
        <img
          src={img}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "0.4s ease",
          }}
          className="bento-img"
        />

        {/* DARK OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
          }}
        />
      </div>
    );
  })}
</div>
  </div>

  {/* responsive */}
  <style>{`
    @media (max-width: 900px) {
      .bento-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      .bento-cell {
        grid-column: span 2 !important;
      }
    }

    @media (max-width: 640px) {
      .bento-grid {
        grid-template-columns: 1fr !important;
      }
      .bento-cell {
        grid-column: span 1 !important;
      }
    }
  `}</style>
  </section>
  <BusStand/>
  <Railway/>
  <SectionThree/>

      {/* CTA */}
      <section id="cta" style={{ padding: "40px 4px 5px" }}>
        <div className="cta-card" style={{
          maxWidth: 1100, margin: "0 auto",
          background: `linear-gradient(135deg, ${C.greenDark}, ${C.green})`,
          borderRadius: 32, padding: "60px 40px",
          color: "#fff", textAlign: "center",
          position: "relative", overflow: "hidden",
          boxShadow: C.shadow,
        }}>
          <div style={{
            position: "absolute", top: -80, right: -80,
            width: 280, height: 280, borderRadius: "50%",
            background: C.accent, opacity: .15,
          }} />
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", margin: 0, fontWeight: 900 }}>
            Be part of the next chapter.
          </h2>
          <p style={{ marginTop: 16, opacity: .9, maxWidth: 560, marginInline: "auto", lineHeight: 1.6 }}>
            Volunteer, donate or partner with us. Every action plants a seed for tomorrow.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/contact-us">
  <button
    style={{
      padding: "14px 28px",
      borderRadius: 999,
      border: "none",
      background: C.accent,
      color: C.ink,
      fontWeight: 800,
      cursor: "pointer",
      boxShadow: "0 10px 30px -10px rgba(0,0,0,.3)",
    }}
  >
    Donate Now
  </button>
</Link>
          <Link to="/contact-us">
  <button
    style={{
      padding: "14px 28px",
      borderRadius: 999,
      background: "transparent",
      color: "#fff",
      fontWeight: 700,
      border: "2px solid rgba(255,255,255,.5)",
      cursor: "pointer",
    }}
  >
    Become a Volunteer
  </button>
</Link>
          </div>
        </div>
      </section>

     

      <style>{`
        @media (max-width: 760px) {
          .sec-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </div>
  );
};

export default OurWork;