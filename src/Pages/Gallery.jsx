import { useEffect, useState } from "react";
import { getGalleryData } from "../api/public/galleryApi";
import { Link } from "react-router-dom";

// Public folder — use /newimg/... (Vite copies public/ to site root)
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

const SUPPORTERS = [
  {
    name: "Virendra Kumar Singh",
    msg: "Virendra Kumar Singh has been consistently supporting our NGO by contributing donations and actively participating in our social initiatives. His dedication towards helping the underprivileged has made a real difference in many lives. He believes that even small efforts can bring big change, and his actions truly reflect that. We are thankful for his kindness and ongoing support.",
    img: "/newimg/sp2.jpeg",
  },
  {
    name: "Aditya Raj",
    msg: "Aditya Raj has always shown great compassion towards people in need. Through her generous donations and involvement in our activities, she has helped us extend our reach to more communities. Her positive attitude and willingness to support every cause inspire others as well. We truly appreciate her valuable contribution and heartfelt support.",
    img: "/newimg/sp1.jpeg",
  },
];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const [loading, setLoading] = useState(true);

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
      } catch (e) {
        console.log("Gallery API error:", e);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const n = slides.length || 1;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % n);
    }, 4500);

    return () => clearInterval(id);
  }, [slides]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading Gallery...
      </div>
    );
  }

  return (
    <main className="bg-background text-foreground">
      <section className="relative h-[70vh] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <img src={s} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl font-bold">Gallery</h1>
            <p className="mt-4">Moments that define our impact</p>
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        >
          <img src={lightbox} alt="" className="max-h-[90%] max-w-[90%]" />
        </div>
      )}

      <section className="px-6 py-10 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-600">
                Featured
              </p>
              <h2 className="mt-2 text-4xl font-semibold md:text-5xl">
                Highlight Showcase
              </h2>
            </div>
            <div className="ml-12 hidden h-px flex-1 bg-gray-300 md:block" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((f, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(f.src)}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100"
              >
                <img
                  src={f.src}
                  alt={f.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-3 transform p-5 text-left text-white transition-all duration-500 group-hover:translate-y-0">
                  <p className="text-xs uppercase tracking-wider text-yellow-400">
                    {f.tag}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{f.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 px-6 py-10 text-white md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white">Our Kind Hearts💚</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-300">
              We are deeply grateful to these kind-hearted individuals who have
              supported our mission with their generosity, time, and compassion.
              Their continuous efforts inspire us to do more and reach those who
              truly need help.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {SUPPORTERS.map((person, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2"
              >
                <div className="mx-auto mb-5 h-32 w-32 overflow-hidden rounded-full border-2 border-green-400">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-center text-xl font-semibold text-white">
                  {person.name}
                </h3>
                <p className="mt-4 text-center text-sm leading-relaxed text-gray-300">
                  {person.msg}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 px-6 py-10 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-600">
              Chronicle
            </p>
            <h2 className="mt-2 text-4xl font-semibold md:text-5xl">
              Events Timeline
            </h2>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-4 top-0 w-[2px] bg-yellow-300/50 md:left-1/2" />

            {timeline.map((t, i) => (
              <div
                key={i}
                className={`relative mb-14 flex flex-col items-start gap-6 md:flex-row ${
                  i % 2 ? "md:flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="absolute left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-yellow-500 ring-4 ring-white md:left-1/2" />

                <div className="w-full pl-12 md:w-1/2 md:px-8 md:pl-0">
                  <img
                    src={t.img}
                    alt={t.title}
                    className="aspect-[4/3] w-full rounded-xl object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="w-full pl-12 md:w-1/2 md:px-8 md:pl-0">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    {t.date} · {t.loc}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{t.title}</h3>
                  <p className="mt-3 text-gray-600">
                    A milestone moment for our community — captured, cherished
                    and remembered.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-2 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Impact in Frames
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-2xl"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <img
                  src={s.img}
                  alt={s.label}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <p className="text-3xl font-bold text-yellow-400 md:text-4xl">
                    {s.n}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/80">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mt-10 overflow-hidden px-6 py-10 md:px-12">
        <img
          src={g5}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />

        <div className="relative mx-auto max-w-3xl text-center text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-yellow-400">
            Together
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Be part of <span className="text-yellow-400">our journey</span>.
          </h2>
          <p className="mt-6 text-lg text-white/80">
            Every helping hand writes the next chapter. Join us, donate, or
            volunteer — your story belongs here.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact-us"
              className="inline-block rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-8 py-4 font-semibold text-black transition-transform duration-300 hover:scale-105"
            >
              Donate Now
            </Link>
            <Link
              to="/contact-us"
              className="inline-block rounded-full border border-white/60 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
