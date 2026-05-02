import { useState } from "react";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { useReveal } from "./components/useReveal";
import sanitation from "../Vasundhara-Backend/public/latestimg/project-sanitation.png";
import trees from "../Vasundhara-Backend/public/latestimg/project-trees.png";
import waste from "../Vasundhara-Backend/public/latestimg/project-waste.png";
import hygiene from "../Vasundhara-Backend/public/latestimg/project-hygiene.png";

const projects = [
  { img: sanitation, title: "Bhopal Junction Sanitation Hub", category: "Sanitation", location: "Bhopal, MP", year: "2024", desc: "A flagship Pay-and-Use complex serving 8,000+ commuters daily at one of central India's busiest junctions." },
  { img: trees, title: "1 Lakh Trees Mission", category: "Plantation", location: "Madhya Pradesh", year: "2023", desc: "A multi-district plantation drive engaging schools, panchayats and corporates to restore green cover." },
  { img: waste, title: "Smart Waste Segregation", category: "Waste", location: "Indore, MP", year: "2024", desc: "Door-to-door waste collection and segregation program covering 40,000 households." },
  { img: hygiene, title: "Schools Hygiene Program", category: "Welfare", location: "Vidisha, MP", year: "2023", desc: "Handwashing stations, sanitary infrastructure and hygiene workshops in 120+ government schools." },
];

const categories = ["All", "Sanitation", "Plantation", "Waste", "Welfare"];

export const Projects = () => {
  const ref = useReveal(); // ✅ fixed
  const [filter, setFilter] = useState("All");

const visible = projects.filter(                                                              
  (p) =>
    filter === "All" ||
    p.category.toLowerCase().trim() === filter.toLowerCase().trim()
);

  return (
    <section ref={ref} id="projects" className="section bg-gradient-soft">
     <div className="container-page text-center">
  <div className="flex flex-col items-center gap-6">
    <div>
      <span className="reveal eyebrow text-primary tracking-widest uppercase">
        Projects
      </span>

      <h2 className="reveal section-title mt-4 text-3xl md:text-4xl font-bold">
        Recent work, real results
      </h2>

      <p className="reveal section-lead mt-3 max-w-2xl mx-auto text-muted-foreground">
        Explore a selection of projects executed across India.
      </p>
    </div>



          <div className="reveal flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c.trim())}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  filter === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 md:gap-8">
          {visible.map((p) => (
            <article
              key={p.title}
              className="reveal group relative overflow-hidden rounded-3xl bg-card shadow-card border border-border/60 hover:-translate-y-1 transition-base"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                  {p.category}
                </span>
              </div>

              <div className="p-6 md:p-7">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {p.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {p.year}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Read case study <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};