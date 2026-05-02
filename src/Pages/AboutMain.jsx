import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import aboutImg from "../../Vasundhara-Backend/public/latestimg/image.png";
import React from "react";


const tabs = [
  {
    id: "who",
    label: "Who We Are",
    title: "A grassroots NGO rooted in service",
    body:
      "Vasundhara Sanrakshan Samajik Sansthan is a registered non-profit headquartered in Bhopal, Madhya Pradesh. Since inception we have partnered with municipal bodies, panchayats and government agencies to bring dignity, hygiene and a cleaner environment to millions.",
    points: [
      "Registered under Society Registration Act",
      "12A & 80G certified",
      "ISO compliant operations",
    ],
  },
  {
    id: "what",
    label: "What We Do",
    title: "Building public infrastructure that lasts",
    body:
      "We design, build and operate Pay & Use sanitation complexes, lead massive plantation drives, run waste management programs and execute development tenders for the government.",
    points: [
      "Pay-and-use toilet networks",
      "Tree plantation & green belts",
      "Solid waste management",
    ],
  },
  {
    id: "why",
    label: "Why It Matters",
    title: "Sanitation is dignity. Environment is life.",
    body:
      "Every clean toilet protects dignity. Every tree fights climate change. Every action builds a better future for communities.",
    points: [
      "Improved public health",
      "Climate resilience",
      "Livelihood support",
    ],
  },
];

export const AboutMain = () => {
  const [active, setActive] = useState("who");

  const current = tabs.find((t) => t.id === active);

  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-br from-indigo-50 via-white to-emerald-50"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-semibold tracking-wide">
            About Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Conserving the Earth.{" "}
            <span className="text-emerald-500">Empowering Communities.</span>
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE SIDE */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border">
              <img
                src={aboutImg}
                alt="About"
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div className="absolute bottom-4 right-4 bg-white shadow-lg rounded-2xl p-4">
              <p className="text-sm font-semibold text-emerald-600">
                25+ Years Service
              </p>
            </div>
          </div>

          {/* CONTENT SIDE */}
          <div>

            {/* TABS */}
            <div className="flex flex-wrap gap-3 border-b pb-3">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    active === t.id
                      ? "bg-emerald-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* CONTENT CHANGE ON CLICK */}
            <div className="mt-6 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800">
                {current.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                {current.body}
              </p>

              <ul className="mt-5 space-y-3">
                {current.points.map((p) => (
                  <li key={p} className="flex gap-2 items-start">
                    <CheckCircle2 className="text-emerald-500 mt-1" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

            
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};