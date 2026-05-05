import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BusStand() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Mission",
      content:
        "Modern bus stands are the gateway of every city. Our mission is to design clean, accessible and dignified transit hubs that serve every commuter — from daily wage workers to senior citizens and specially abled travellers.",
    },
    {
      label: "Approach",
      content:
        "We combine modular FRP construction, solar-assisted lighting and smart digital signage to upgrade legacy bus stands into community landmarks — completed in weeks, not years.",
    },
    {
      label: "Impact",
      content:
        "Across 42 partnered municipalities, our redesigned bus stands have improved daily comfort, reduced complaints by 64% and become safer public spaces — especially for women travelling at night.",
    },
  ];

  const stats = [
    { num: "5+", label: "CITIES" },
    { num: "500+", label: "COMMUTERS / DAY", active: true },
    { num: "98%", label: "ACCESSIBLE" },
    { num: "24/7", label: "SAFE LIGHTING" },
  ];

  const steps = [
    {
      t: "Site Survey",
      d: "Mapping commuter flow & accessibility gaps.",
    },
    {
      t: "Modular Build",
      d: "Pre-fab FRP & steel modules assembled fast.",
    },
    {
      t: "Smart Layer",
      d: "Digital boards, CCTV, solar lighting added.",
    },
    {
      t: "Handover",
      d: "Trained municipal staff take daily ops.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#f5f9f5] to-white py-20 px-6 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.25em] text-green-700 mb-4">
              <span className="w-8 h-[2px] bg-yellow-400 inline-block" />
              Bus Stand Initiative
            </div>

            <h2 className="text-[clamp(2.2rem,2vw,4rem)] font-bold leading-[1.02] text-green-900">
              A small structure with a{" "}
              <span className="bg-gradient-to-r from-green-700 to-yellow-400 bg-clip-text text-transparent">
                big civic role.
              </span>
            </h2>
          </div>

          <p className="text-slate-600 leading-8 text-[15px] max-w-[420px]">
            Inclusive, sustainable and beautifully built bus stands —
            transforming everyday waiting into a calm, safe and connected
            experience for every commuter.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left visual */}
          <div className="relative min-h-[450px] overflow-hidden rounded-[28px] shadow-[0_30px_70px_-30px_rgba(20,83,45,0.45)] group">
            <img
              src="https://www.hindustantimes.com/ht-img/img/2024/08/30/550x309/The-rampant-sale-of-unhygienic-eatables-and-their-_1725044458255.jpg"
              alt="Bus stand"
              className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(5,46,22,0.92)]" />

           

            <div className="absolute left-7 right-7 bottom-7 text-white">
              <h3 className="text-[2rem] font-extrabold mb-2">
                Designed for everyone.
              </h3>
              <p className="text-[14px] leading-7 text-white/90 max-w-[520px]">
                Step-free access, tactile paving, ample seating and clear
                signage — built into every shelter we deliver.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Tabs */}
            <div className="bg-white border border-slate-200 rounded-[28px] p-7 shadow-[0_15px_35px_-25px_rgba(0,0,0,0.18)]">
              <div className="flex flex-wrap gap-3 mb-6">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeTab === i
                        ? "bg-green-900 text-white border border-green-900"
                        : "bg-white text-slate-500 border border-slate-200 hover:border-green-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div
                key={activeTab}
                className="text-[15px] text-slate-700 leading-8 animate-[fade_.35s_ease]"
              >
                {tabs[activeTab].content}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 ${
                    s.active
                      ? "bg-green-900 text-white border-green-900 shadow-[0_15px_35px_-20px_rgba(20,83,45,0.5)]"
                      : "bg-white text-green-900 border-green-100 hover:shadow-md"
                  }`}
                >
                  <div className="text-[1.35rem] font-bold leading-none">
                    {s.num}
                  </div>
                  <div
                    className={`text-[11px] tracking-[0.18em] mt-2 ${
                      s.active ? "text-white/80" : "text-green-700/80"
                    }`}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-14 bg-white border border-slate-200 rounded-[28px] px-8 py-9">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative pt-8">
                <div className="absolute top-0 left-0 w-9 h-9 rounded-full border-2 border-green-900 bg-yellow-400 text-green-900 font-extrabold text-sm flex items-center justify-center">
                  {i + 1}
                </div>

                <h4 className="text-green-900 font-bold text-[18px] mb-2">
                  {s.t}
                </h4>

                <p className="text-slate-500 text-[13px] leading-6">{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-4 items-center justify-between rounded-[24px] px-7 py-6 text-white bg-gradient-to-r from-green-900 via-green-800 to-green-700">
          <p className="font-semibold text-[15px]">
            Partner with us on your next transit project.
          </p>

          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 bg-yellow-400 text-green-950 font-bold text-sm px-5 py-3 rounded-full transition duration-300 hover:-translate-y-0.5 hover:scale-105"
          >
            Enquire Now →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}