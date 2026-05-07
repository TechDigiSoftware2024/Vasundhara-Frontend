import React, { useEffect, useState } from "react";
import { getVisionMissionPageData } from "../api/public/visionMissionApi";
import { Link } from "react-router-dom";

const T = {
  ink: "#0B1F17",
  ink2: "#1F3A2E",
  paper: "#F6F1E7",
  accent: "#E84E1B",
  rose: "#D63384",
  plum: "#5B2A86",
  leaf: "#1F6F4A",
  sky:"#4D150A"
};
const container= {
  width: "100%",
  maxWidth: 1240,
  marginInline: "auto",
  paddingInline: "clamp(16px, 4vw, 40px)",
};


const Vision = () => {
  const [apiData, setApiData] = useState(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getVisionMissionPageData();

      if (res?.success) {
        setApiData(res.data);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  fetchData();
}, []);
  const tx = (mouse.x - 0.5) * 20;
  const ty = (mouse.y - 0.5) * 20;



 

 
const words = apiData?.words || ["Hope", "Care", "Future"];
  const items = [
    {
      t: "Education",
      d: "Quality learning and second-chance pathways for every child, especially those furthest behind.",
      c: T.leaf,
    },
    {
      t: "Health",
      d: "Preventive care, nutrition and mental wellbeing — built around families, not facilities.",
      c: T.accent,
    },
    {
      t: "Protection",
      d: "Safe environments at home, online and in public — backed by trained responders.",
      c: T.plum,
    },
    {
      t: "Livelihoods",
      d: "Economic dignity for caregivers and youth-led enterprise that compounds over time.",
      c: T.sky,
    },
  ];

  const [open, setOpen] = useState(0);
  return (
    <>
      {/* ===== HERO ===== */}
     <section
  style={{
    minHeight: "100vh",
    background: T.paper,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    position: "relative",
    overflow: "hidden",
  }}
>


  <div
    style={{
      maxWidth: 1000,
      width: "100%",
      textAlign: "left",
    }}
  >
    <p
      style={{
        color: T.accent,
        letterSpacing: "3px",
        fontSize: 12,
      }}
    >
      ● A MISSION WITH A VISION
    </p>

 <h1
  style={{
    fontSize: "clamp(32px, 3vw, 90px)",
    fontWeight: 700,
    lineHeight: 1.1,
    transform: `translate(${tx}px, ${ty}px)`,
  }}
>
  {apiData?.line1 || "We build"}
  
  <span style={{ color: T.leaf, fontStyle: "italic" }}>
    {apiData?.highlight || "tomorrow,"}
  </span>

  <br />

  {apiData?.line2 || "one promise"}{" "}
  
  <span
    style={{
      background: `linear-gradient(90deg, ${T.accent}, ${T.rose})`,
      WebkitBackgroundClip: "text",
      color: "transparent",
    }}
  >
    {apiData?.gradient || "at a time."}
  </span>
</h1>

    <p
      style={{
        marginTop: 20,
        maxWidth: 600,
        color: T.ink2,
        fontSize: 15,
        lineHeight: 1.6,
      }}
    >
     {apiData?.description}
    </p>

    {/* Buttons */}
    <div
      style={{
        marginTop: 30,
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
     <button
  onClick={() => {
    const el = document.getElementById("vision");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }}
  style={{
    padding: "12px 20px",
    background: T.ink,
    color: "#fff",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
  }}
>
  Explore our vision →
</button>
<Link to="/contact-us">
      <button
      
        style={{
          padding: "12px 20px",
          border: `1px solid ${T.ink}`,
          background: "transparent",
          borderRadius: 999,
          cursor: "pointer",
        }}
      >
        Read the mission
      </button>
      </Link>
    </div>

    {/* Stats */}
    <div
      style={{
        marginTop: 60,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 20,
      }}
    >
      {(apiData?.stats || [
  { n: "10k+", l: "Lives touched" },
  { n: "10+", l: "Communities" },
  { n: "26 yrs", l: "On ground" },
  { n: "98%", l: "Funds to programs" },
]).map((s, i) => (
        <div
          key={i}
          style={{
            background: "linear-gradient(115deg, #ffb200, #ffcc80)",
            padding: 16,
            borderRadius: 14,
            border: "1px solid #00000010",
            color: "#1a1a1a",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: 22,
            }}
          >
            {s.n}
          </h2>

          <p style={{ margin: 0, fontSize: 13 }}>
            {s.l}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ===== FLOATING MARQUEE SECTION (ADDED) ===== */}
      <section
        style={{
          background: "#0B1F17",
          padding: "25px 0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* LEFT FLOATING CIRCLE */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#E84E1B",
            animation: "floatY 3s ease-in-out infinite",
          }}
        />

        {/* RIGHT FLOATING CIRCLE */}
        <div
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#F4B400",
            animation: "floatY 3s ease-in-out infinite",
          }}
        />

        {/* SCROLL TEXT */}
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            gap: 80,
           animation: "scrollX 30s linear infinite",
transform: "translateX(100%)",
 width: "max-content",
          }}
        >
          {[...words, ...words].map((w, i) => (
            <span
              key={i}
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: "#F6F1E7",
              }}
            >
              ✦ {w}
            </span>
          ))}
        </div>

        {/* ANIMATION */}
        <style>
          {`
           @keyframes scrollX {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

            @keyframes floatY {
              0%, 100% { transform: translateY(-50%) translateY(0px); }
              50% { transform: translateY(-50%) translateY(-10px); }
            }
          `}
        </style>
      </section>

   <section
      id="vision"
      className="w-full py-20 px-4 md:px-8 lg:px-16"
      style={{ background: "#F4F1E8" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div>
       <h2
  className="leading-[0.95] font-black tracking-tight text-[#071A12]"
  style={{
    fontFamily: `"Fraunces", serif`,
    fontSize: "clamp(36px,4vw,76px)",
  }}
>
  {apiData?.vision?.line1 || "A world where"}
  <br />

  {apiData?.vision?.line2 || "every child"}
  <br />

  <span className="italic text-[#1F7A4F]">
    {apiData?.vision?.highlight || "belongs"}
  </span>

  <span>{apiData?.vision?.line3 || "— to a"}</span>
  <br />

  {apiData?.vision?.line4 || "family, a future, a"}
  <br />

  {apiData?.vision?.line5 || "dream."}
</h2>

          <p className="mt-5 max-w-xl text-[#163228] leading-8 text-lg">
            We imagine communities where survival is a given,
            protection is a right, development is unrestricted,
            and participation is celebrated.
            <br />
            Not as charity — as the natural state of being human.
          </p>

          <div className="mt-2 space-y-6">
            {[
              "Safe homes and inclusive classrooms",
              "Health systems that reach the last mile",
              "Voices that shape the policies that shape them",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1F7A4F] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  {i + 1}
                </div>

                <p className="text-[#071A12] text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT GREEN BOX */}
        <div>
          <div className="relative overflow-hidden rounded-[34px] min-h-[620px]">

            {/* IMAGE */}
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80"
              alt="children future"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* green overlay */}
            <div
              className="absolute inset-0"
              style={{
       background:
  "linear-gradient(135deg, rgba(15,125,82,0.30) 0%, rgba(45,148,79,0.22) 45%, rgba(110,155,97,0.18) 100%)",
              }}
            />

            {/* lines */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,.3) 0px, rgba(255,255,255,.3) 2px, transparent 2px, transparent 16px)",
              }}
            />

            {/* circle */}
            <div className="absolute top-6 right-6 w-20 h-20 rounded-full border border-dashed border-white/70 flex items-center justify-center rotate-90">
              <span className="text-white text-[10px] tracking-[0.35em]">
                VISION
              </span>
            </div>

            {/* quote */}
            <div className="absolute bottom-10 left-8 right-8 z-10">
              <p
                className="text-white italic leading-tight"
                style={{
                  fontFamily: `"Fraunces", serif`,
                  fontSize: "clamp(26px,2.5vw,46px)",
                }}
              >
                “The future is not somewhere we go.
                It is something we build —
                together.”
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  
      {/* ================= SECTION 04 — OUR MISSION ================= */}
<section
  id="mission"
  className="relative w-full bg-[#021c16] text-[#f6f1e7] py-10 px-4 md:px-8 overflow-hidden"
>
  <div className="max-w-[1280px] mx-auto">
    {/* Top Label */}
   
    {/* Heading */}
    <h2
      className="font-black leading-[0.95] tracking-[-0.03em]
      text-[22px] sm:text-[20px] md:text-[30px] lg:text-[46px]
      max-w-[1180px]"
      style={{
        fontFamily:
          '"Fraunces","Cormorant Garamond",Georgia,"Times New Roman",serif',
      }}
    >
      To inspire breakthroughs in how
      <br />
      the world cares for its young — and
      <br />
      to turn those breakthroughs into
      <span className="italic text-[#f4b400]"> everyday reality.</span>
    </h2>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-14">
      {[
        {
          no: "01 / 03",
          title: "Listen first.",
          desc: "Programs co-designed with the people they serve. No assumption goes unchallenged.",
          rotate: "-rotate-1",
        },
        {
          no: "02 / 03",
          title: "Act with rigor.",
          desc: "Evidence informs decisions. Data and dignity move together.",
          rotate: "rotate-0",
        },
        {
          no: "03 / 03",
          title: "Stay until done.",
          desc: "We measure success in lasting change, not in announcements.",
          rotate: "rotate-1",
        },
      ].map((item, i) => (
        <div
          key={i}
          className={`bg-[#f4efe4] text-[#0a2017] rounded-[28px] p-8 md:p-10 min-h-[200px] shadow-2xl transition-all duration-500 hover:-translate-y-2 ${item.rotate}`}
        >
          {/* Number */}
          <p className="text-[12px] tracking-[0.22em] font-mono text-[#f05a28] uppercase mb-12">
            {item.no}
          </p>

          {/* Title */}
          <h3
            className="text-[18px] md:text-[18px] leading-none font-black mb-5"
            style={{
              fontFamily:
                '"Fraunces","Cormorant Garamond",Georgia,"Times New Roman",serif',
            }}
          >
            {item.title}
          </h3>

          {/* Desc */}
          <p className="text-[16px] leading-[1.6] text-[#20382f] max-w-[320px]">
            {item.desc}
          </p>

          {/* Bottom line */}
          <div className="w-14 h-1 bg-[#f05a28] rounded-full mt-10"></div>
        </div>
      ))}
    </div>
  </div>
</section>
  <section
      id="pillars"
      style={{
        paddingBlock: "50px",
        background: "#ddd6c3",
      }}
    >
      <div style={container}>
  
        <h2
          style={{
            fontFamily: T.font,
            fontSize: "clamp(22px,3vw,50px)",
            lineHeight: "0.95",
            fontWeight: 600,
            color: T.ink,
            marginTop: "2px",
            marginBottom: "40px",
            maxWidth: "1000px",
          }}
        >
          Four pillars, one promise.{" "}
          <span
            style={{
              color: T.plum,
              fontStyle: "italic",
            }}
          >
            Click
            <br />
            to explore.
          </span>
        </h2>

        {/* accordion */}
        <div style={{ display: "grid", gap: "18px" }}>
          {items.map((item, i) => {
            const active = open === i;

            return (
              <div
                key={i}
                onClick={() => setOpen(i)}
                style={{
                  cursor: "pointer",
                  borderRadius: "26px",
                  padding: active ? "34px 30px" : "28px 30px",
                  background: active ? "#001f17" : "#f7f4ed",
                  color: active ? "#fff" : T.ink,
                  transition: "0.35s ease",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 56px",
                    gap: "14px",
                    alignItems: "center",
                  }}
                >
                  {/* number */}
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: "22px",
                      color: active ? "#f4b400" : T.ink2,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* content */}
                  <div>
                    <h3
                      style={{
                        fontFamily: T.font,
                        fontWeight: 700,
                        fontSize: "clamp(20px,1vw,42px)",
                        margin: 0,
                        lineHeight: 1,
                      }}
                    >
                      {item.t}
                    </h3>

                    <div
                      style={{
                        maxHeight: active ? "180px" : "0px",
                        opacity: active ? 1 : 0,
                        overflow: "hidden",
                        transition: "all .35s ease",
                        marginTop: active ? "16px" : "0px",
                        color: "#f3f3f3",
                        fontSize: "16px",
                        lineHeight: 1.5,
                        maxWidth: "900px",
                      }}
                    >
                      {item.d}
                    </div>
                  </div>

                  {/* plus button */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: item.c,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "30px",
                      fontWeight: 700,
                      transition: "0.3s ease",
                      transform: active ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <section
      id="cta"
      style={{
        padding: "50px 10px 70px",
        background:
          "linear-gradient(135deg, #f04a2f 0%, #e93c88 45%, #6f2dbd 100%)",
        color: "#fffaf0",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Dot texture background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        

        {/* Main Heading */}
        <h2
          style={{
            fontFamily: `"Fraunces", Georgia, serif`,
            fontSize: "clamp(32px, 2vw, 100px)",
            fontWeight: 900,
            lineHeight: "0.95",
            margin: "0 auto 28px",
            maxWidth: "1150px",
            letterSpacing: "-0.03em",
          }}
        >
          A vision is only as real as the <br />
          <em style={{ fontStyle: "italic", display: "inline-block" }}>
            hands
          </em>{" "}
          that hold it.
        </h2>

        {/* Paragraph */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            lineHeight: 1.7,
            maxWidth: "760px",
            margin: "0 auto 45px",
            color: "rgba(255,255,255,0.92)",
          }}
        >
          Volunteer. Partner. Donate. Or simply share our story. There is no
          small way to begin.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/contact-us"
            style={{
              padding: "16px 34px",
              background: "#fff7eb",
              color: "#111",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "18px",
              minWidth: "190px",
            }}
          >
            Get involved →
          </a>

       <button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  style={{
    padding: "16px 34px",
    border: "1px solid rgba(255,255,255,0.35)",
    color: "#fff",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "18px",
    minWidth: "190px",
    backdropFilter: "blur(3px)",
    background: "transparent",
    cursor: "pointer",
  }}
>
  Back to top ↑
</button>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "90px",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            fontSize: "13px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          <span>© 2026 OUR ORGANIZATION</span>
          <span>VISION • MISSION • ACTION</span>
        </div>
      </div>
    </section>
    
    </>
  );
};

export default Vision;