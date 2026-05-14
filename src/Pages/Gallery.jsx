import { useEffect, useRef, useState } from "react";
import { getGalleryData } from "../api/public/galleryApi";
import { Link } from "react-router-dom";

// ✅ PUBLIC folder images — direct path use
const g1 = "/newimg/gallery1.jpg";
const g2 = "/newimg/gallery2.jpg";
const g3 = "/newimg/gallery3.jpg";
const g4 = "/newimg/gallery4.jpg";
const g5 = "/newimg/gallery5.jpg";

const s1 = "/newimg/s1.png";
const toilet = "/newimg/s4.jpeg";

const g7 =
  "https://cdn.prod.website-files.com/66a10dc6b207d3968468500a/676d088c1566d42473e94869_Reforestation-%E2%80%93-Is-It-Actually-Important.webp";

const g8 = "/newimg/s5.jpeg";

const g9 =
  "https://images.timesnowhindi.com/thumb/msid-153166145,thumbsize-89998,width-400,height-225,resizemode-75/153166145.jpg";

const g10 =
  "https://s.observers.france24.com/media/display/1d31b76e-f734-11ea-bdb6-005056a9aa4d/w:1024/p:16x9/trash%20bag.JPG";

const g11 =
  "https://images.unsplash.com/photo-1593113598332-cd288d649433";

const g12 =
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc";

const g13 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOSMnzx5pWu4pj16ijslb2QbmSpy0NYZndA&s";

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  // ✅ fixed state
  const [, setReveal] = useState(50);

  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);

  // fallback hero images
  const [slides, setSlides] = useState([g1, g2, g3, g4, g5]);

  const [featured, setFeatured] = useState([
    {
      src: g7,
      title: "Green Mission 2025",
      tag: "Reforestation",
    },
    {
      src: g8,
      title: "Public Toilet & Bathing Facility",
      tag: "Sanitation",
    },
    {
      src: g9,
      title: "Support to Nagar Nigam Bhopal",
      tag: "Urban Support",
    },
    {
      src: g10,
      title: "Street Cleaning Drive",
      tag: "Cleanliness Drive",
    },
  ]);

  const [timeline, setTimeline] = useState([
    {
      date: "Mar 2025",
      loc: "Bhopal, IN",
      title: "Tree Plantation Drive",
      img: g1,
    },
    {
      date: "Jan 2025",
      loc: "Bhopal, IN",
      title: "Winter Food Drive",
      img: g3,
    },
    {
      date: "Nov 2024",
      loc: "Bhopal, IN",
      title: "Free Health Camp",
      img: g4,
    },
    {
      date: "Aug 2024",
      loc: "Bhopal, IN",
      title: "Public Toilet and Bathing Facility",
      img: s1,
    },
  ]);

  const [stats, setStats] = useState([
    {
      img: g11,
      n: "1000+",
      label: "Trees Planted",
    },
    {
      img: toilet,
      n: "1000+",
      label: "Public Toilets Built",
    },
    {
      img: g12,
      n: "1K+",
      label: "Meals Served",
    },
    {
      img: g13,
      n: "50",
      label: "Health Camps",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getGalleryData();

        if (res?.success) {
          const d = res.data;

          if (d.heroSlides?.length)
            setSlides(d.heroSlides);

          if (d.featured?.length) {
            setFeatured(
              d.featured.map((f) => ({
                src: f.computedImageUrl,
                title: f.title,
                tag: f.tag,
              }))
            );
          }

          if (d.timeline?.length) {
            setTimeline(
              d.timeline.map((t) => ({
                img: t.computedImageUrl,
                title: t.title,
                date: t.date,
                loc: t.loc,
              }))
            );
          }

          if (d.stats?.length) {
            setStats(
              d.stats.map((s) => ({
                img: s.computedImageUrl,
                n: s.value,
                label: s.label,
              }))
            );
          }
        }
      } catch (e) {
        console.log("Gallery API error:", e);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, 4500);

    return () => clearInterval(id);
  }, [slides]);

  const onDrag = (e) => {
    const el = sliderRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = e.touches?.length
      ? e.touches[0].clientX
      : e.clientX;

    const pct = Math.max(
      0,
      Math.min(
        100,
        ((x - rect.left) / rect.width) * 100
      )
    );

    setReveal(pct);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading Gallery...
      </div>
    );
  }

  return (
    <main>

      <section className="relative h-[70vh] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: i === active ? 1 : 0,
            }}
          >
            <img
              src={s}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-5xl font-bold">
              Gallery
            </h1>
            <p>
              Moments that define our impact
            </p>
          </div>
        </div>
      </section>

      {/* Supporters fix */}
      {[
        {
          name: "Virendra Kumar Singh",
          img: "/newimg/sp2.jpeg",
        },
        {
          name: "Aditya Raj",
          img: "/newimg/sp1.jpeg",
        },
      ].map((person, i) => (
        <img
          key={i}
          src={person.img}
          alt={person.name}
          className="w-32 h-32 rounded-full"
        />
      ))}

      {lightbox && (
        <div
          onClick={() =>
            setLightbox(null)
          }
          className="fixed inset-0 bg-black/90 flex justify-center items-center"
        >
          <img
            src={lightbox}
            className="max-w-[90%] max-h-[90%]"
          />
        </div>
      )}
    </main>
  );
}