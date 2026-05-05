import { useEffect, useRef, useState } from "react";
import { getGalleryData } from "../api/public/galleryApi";
import { IMAGES } from "../utils/constants";
import { Link } from "react-router-dom";


// fallback images
import g1 from "../../../Vasundhara-Backend/public/newimg/gallery1.jpg";
import g2 from "../../../Vasundhara-Backend/public/newimg/gallery2.jpg";
import g3 from "../../../Vasundhara-Backend/public/newimg/gallery3.jpg";
import g4 from "../../../Vasundhara-Backend/public/newimg/gallery4.jpg";
import g5 from "../../../Vasundhara-Backend/public/newimg/gallery5.jpg";
import g6 from "../../../Vasundhara-Backend/public/newimg/gallery6.jpg";
import s1 from "../../Vasundhara-Backend/public/newimg/s1.png";
import { Toilet } from "lucide-react";
const toilet="../Vasundhara-Backend/public/newimg/s4.jpeg"
const g7 = "https://cdn.prod.website-files.com/66a10dc6b207d3968468500a/676d088c1566d42473e94869_Reforestation-%E2%80%93-Is-It-Actually-Important.webp";
const g8 = "../../Vasundhara-Backend/public/newimg/s5.jpeg";
const g9 = "https://images.timesnowhindi.com/thumb/msid-153166145,thumbsize-89998,width-400,height-225,resizemode-75/153166145.jpg";
const g10 = "https://s.observers.france24.com/media/display/1d31b76e-f734-11ea-bdb6-005056a9aa4d/w:1024/p:16x9/trash%20bag.JPG";
const g11 = "https://images.unsplash.com/photo-1593113598332-cd288d649433";
const g12 = "https://images.unsplash.com/photo-1606787366850-de6330128bfc";
const g13="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOSMnzx5pWu4pj16ijslb2QbmSpy0NYZndA&s"
export default function Gallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [reveal, setReveal] = useState(50);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);

  // ✅ DEFAULT STATIC (fallback)
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
    { date: "Mar 2025", loc: "Bhopal, IN", title: "Tree Plantation Drive", img: g1 },
    { date: "Jan 2025", loc: "Bhopal, IN", title: "Winter Food Drive", img: g3 },
    { date: "Nov 2024", loc: "Bhopal, IN", title: "Free Health Camp", img: g4 },
    { date: "Aug 2024", loc: "Bhopal, IN", title: "Public Toilet and Bathing Facility", img: s1 },
  ]);

  const [stats, setStats] = useState([
    { img: g11, n: "1000+", label: "Trees Planted" },
    { img: toilet, n: "10+", label: "Public Toilets Built" },
    { img: g12, n: "1 k+", label: "Meals Served" },
    { img: g13, n: "50", label: "Health Camps" },
  ]);

  // ✅ API INTEGRATION (WITHOUT BREAKING UI)
  useEffect(() => {
    const fetchData = async () => {
      const res = await getGalleryData();

      if (res.success) {
        const d = res.data;

        if (d.heroSlides?.length) setSlides(d.heroSlides);


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

      setLoading(false);
    };

    fetchData();
  }, []);

  // AUTO SLIDER
  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, 4500);
    return () => clearInterval(id);
  }, [slides]);

  // DRAG
  const onDrag = (e) => {
    const el = sliderRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.touches?.length ? e.touches[0].clientX : e.clientX;

    const pct = Math.max(
      0,
      Math.min(100, ((x - rect.left) / rect.width) * 100)
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
    <main className="bg-background text-foreground">

      {/* HERO (UNCHANGED UI) */}
      <section className="relative h-[68vh] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === active ? 1 : 0 }}
          >
                <img src={s} className="h-full w-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center text-white text-center">
          <div>
            <h1 className="text-5xl font-bold">Gallery</h1>
            <p className="mt-4">Moments that define our impact</p>
          </div>
        </div>
      </section>

   

  
     {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center"
        >
          <img src={lightbox} className="max-w-[90%] max-h-[90%]" />
        </div>
      )}
      {/* ===== 2. HIGHLIGHT SHOWCASE ===== */}
<section className="px-6 py-10 md:px-12">
  <div className="mx-auto max-w-7xl">
    
    <div className="mb-12 flex items-end justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-yellow-600">
          Featured
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold mt-2">
          Highlight Showcase
        </h2>
      </div>

      <div className="hidden md:block h-px flex-1 ml-12 bg-gray-300" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {featured.map((f, i) => (
        <button
          key={i}
          onClick={() => setLightbox(f.src)}
          className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]"
        >
          <img
            src={f.src}
            alt={f.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
            <p className="text-xs uppercase tracking-wider text-yellow-400">
              {f.tag}
            </p>
            <h3 className="text-xl mt-1 font-semibold">
              {f.title}
            </h3>
          </div>
        </button>
      ))}
    </div>

  </div>
</section>
<section className="px-6 py-10 md:px-12 bg-gray-900 text-white">
  <div className="mx-auto max-w-7xl">

    {/* Heading */}
  

{/* Supporters Section */}
<div className="text-center mb-12">
  <h2 className="text-3xl font-bold text-white">
    Our Kind Hearts💚
  </h2>
  <p className="text-gray-300 mt-3 text-sm max-w-2xl mx-auto">
    We are deeply grateful to these kind-hearted individuals who have supported our mission with their generosity, time, and compassion. Their continuous efforts inspire us to do more and reach those who truly need help.
  </p>
</div>

<div className="grid md:grid-cols-2 gap-10">
  {[
    {
      name: "Rohit Sharma",
      msg: "Rohit has been consistently supporting our NGO by contributing donations and actively participating in our social initiatives. His dedication towards helping the underprivileged has made a real difference in many lives. He believes that even small efforts can bring big change, and his actions truly reflect that. We are thankful for his kindness and ongoing support.",
      img: "../../Vasundhara-Backend/public/newimg/sp2.jpeg",
    },
    {
      name: "Priya Verma",
      msg: "Priya has always shown great compassion towards people in need. Through her generous donations and involvement in our activities, she has helped us extend our reach to more communities. Her positive attitude and willingness to support every cause inspire others as well. We truly appreciate her valuable contribution and heartfelt support.",
      img: "../../Vasundhara-Backend/public/newimg/sp1.jpeg",
    },
  ].map((person, i) => (
    <div
      key={i}
      className="group rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm hover:-translate-y-2 transition-all duration-500"
    >
      {/* Image */}
      <div className="w-32 h-32 mx-auto mb-5 overflow-hidden rounded-full border-2 border-green-400">
        <img
          src={person.img}
          alt={person.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <h3 className="text-xl text-center font-semibold text-white">
        {person.name}
      </h3>

      <p className="text-gray-300 text-sm mt-4 text-center leading-relaxed">
        {person.msg}
      </p>
    </div>
  ))}
</div>



  </div>
</section>
<section className="px-6 py-10 md:px-12 bg-gray-100">
  <div className="mx-auto max-w-5xl">

    {/* Heading */}
    <div className="mb-16 text-center">
      <p className="fade-up text-xs uppercase tracking-[0.3em] text-yellow-600">
        Chronicle
      </p>

      <h2 className="fade-up fade-delay-1 text-4xl md:text-5xl font-semibold mt-2">
        Events Timeline
      </h2>
    </div>

    {/* Timeline */}
    <div className="relative">

      {/* Center Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-yellow-300/50" />

      {timeline.map((t, i) => (
        <div
          key={i}
          className={`fade-up relative mb-14 flex flex-col md:flex-row items-start gap-6 ${
            i % 2 ? "md:flex-row-reverse" : ""
          }`}
          style={{ animationDelay: `${i * 0.2}s` }} // stagger 🔥
        >

          {/* Dot */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-yellow-500 ring-4 ring-white" />

          {/* Image */}
          <div className="md:w-1/2 pl-12 md:pl-0 md:px-8">
            <img
              src={t.img}
              alt={t.title}
              className="rounded-xl w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2 pl-12 md:pl-0 md:px-8">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              {t.date} · {t.loc}
            </p>

            <h3 className="text-2xl font-semibold mt-2">
              {t.title}
            </h3>

            <p className="text-gray-600 mt-3">
              A milestone moment for our community — captured, cherished and remembered.
            </p>
          </div>

        </div>
      ))}

    </div>
  </div>
</section>
<section className="px-6 py-2 md:px-12">
  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <div className="mb-10 text-center">
      

      <h2 className="fade-up fade-delay-1 text-4xl md:text-5xl font-semibold mt-2">
        Impact in Frames
      </h2>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((s, i) => (
        <div
          key={i}
          className="fade-up relative aspect-square overflow-hidden rounded-2xl group"
          style={{ animationDelay: `${i * 0.2}s` }} // stagger animation 🔥
        >

          {/* Image */}
          <img
            src={s.img}
            alt={s.label}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <p className="text-3xl md:text-4xl font-bold text-yellow-400">
              {s.n}
            </p>

            <p className="text-xs uppercase tracking-wider mt-1 text-white/80">
              {s.label}
            </p>
          </div>

        </div>
      ))}
    </div>

  </div>
</section>
<section className="relative px-6 py-10 mt-10 md:px-12 overflow-hidden">

  {/* Background Image */}
  <img
    src={g5}
    alt="cta"
    className="absolute inset-0 h-full w-full object-cover scale-105 animate-zoomSlow"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />

  {/* Content */}
  <div className="relative max-w-3xl mx-auto text-center text-white">

    <p className="fade-up text-xs uppercase tracking-[0.4em] text-yellow-400">
      Together
    </p>

    <h2 className="fade-up fade-delay-1 text-4xl md:text-6xl mt-4 leading-tight font-bold">
      Be part of <span className="text-yellow-400">our journey</span>.
    </h2>

    <p className="fade-up fade-delay-2 mt-6 text-white/80 text-lg">
      Every helping hand writes the next chapter. Join us, donate, or volunteer — your story belongs here.
    </p>

    <div className="fade-up fade-delay-3 mt-10 flex flex-wrap gap-4 justify-center">
      
  <Link
    to="/contact-us"
    className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:scale-105 transition-transform duration-300 inline-block"
  >
    Donate Now
  </Link>

  <Link
    to="/contact-us"
    className="px-8 py-4 rounded-full border border-white/60 text-white font-semibold hover:bg-white hover:text-black transition-colors duration-300 inline-block"
  >
    Join as Volunteer
  </Link>
    </div>

  </div>
</section>



    </main>
  );
}