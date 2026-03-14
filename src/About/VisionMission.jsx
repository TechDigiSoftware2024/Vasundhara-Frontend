// src/About/VisionMission.jsx
import React, { useState, useEffect } from "react";
import { Binoculars, Mountain, Star, Target, Heart, Loader2 } from "lucide-react";
import { getVisionMissionPageData } from "../api/public/visionMissionApi";

// Fallback data
const FALLBACK_HERO = {
  title: "A MISSION WITH A VISION",
  description: "Driving impact through dedicated service and unwavering commitment to our cause.",
  computedImageUrl: "https://i0.wp.com/base.ac.in/wp-content/uploads/2018/10/vision-mission-banner-e1539427773777.png?ssl=1",
};

const FALLBACK_ITEMS = {
  vision: [{
    _id: "fallback-vision",
    type: "vision",
    title: "Our Vision",
    description: "Build a world in which every child has the right to survival, protection, development, and participation.",
    computedImageUrl: "https://media.istockphoto.com/id/500504909/photo/business-vision.jpg?s=612x612&w=0&k=20&c=sfAyloZ4GkAkZQ7KIm_Jeg33a4Z-HuR7lTijWbRN95g=",
  }],
  mission: [{
    _id: "fallback-mission",
    type: "mission",
    title: "Our Mission",
    description: "To inspire breakthroughs in the way the world treats children, and to achieve immediate, and lasting change in their lives.",
    computedImageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }],
  goals: [{
    _id: "fallback-goals",
    type: "goals",
    title: "Our Goals",
    description: "To create sustainable impact and empower communities for a brighter future.",
    computedImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }],
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80";

// Icon mapping based on type
const getIconForType = (type) => {
  switch (type?.toLowerCase()) {
    case 'vision':
      return <Binoculars className="w-6 h-6 text-white" />;
    case 'mission':
      return <Mountain className="w-6 h-6 text-white" />;
    case 'goals':
    case 'goal':
      return <Target className="w-6 h-6 text-white" />;
    case 'values':
      return <Heart className="w-6 h-6 text-white" />;
    default:
      return <Star className="w-6 h-6 text-white" />;
  }
};

// Color mapping based on type
const getColorForType = (type) => {
  switch (type?.toLowerCase()) {
    case 'vision':
      return { bg: 'bg-purple-100', overlay: 'bg-purple-200/60', card: 'bg-purple-600', text: 'text-purple-700', border: 'border-purple-300' };
    case 'mission':
      return { bg: 'bg-pink-100', overlay: 'bg-red-200/60', card: 'bg-red-600', text: 'text-red-700', border: 'border-red-300' };
    case 'goals':
    case 'goal':
      return { bg: 'bg-blue-100', overlay: 'bg-blue-200/60', card: 'bg-blue-600', text: 'text-blue-700', border: 'border-blue-300' };
    case 'values':
      return { bg: 'bg-green-100', overlay: 'bg-green-200/60', card: 'bg-green-600', text: 'text-green-700', border: 'border-green-300' };
    default:
      return { bg: 'bg-gray-100', overlay: 'bg-gray-200/60', card: 'bg-green-600', text: 'text-green-700', border: 'border-green-300' };
  }
};

export default function VisionMission() {
  const [pageData, setPageData] = useState({
    hero: null,
    vision: [],
    mission: [],
    goals: [],
    values: [],
    allItems: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all page data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getVisionMissionPageData();

      if (result.success && result.data) {
        // Normalize 'goal' type to 'goals'
        const normalizeItems = (items) => items.map(item => ({
          ...item,
          type: item.type === 'goal' ? 'goals' : item.type
        }));

        const allItems = normalizeItems(result.data.allItems || []);
        const goalsItems = allItems.filter(item => item.type === 'goals');

        setPageData({
          hero: result.data.hero || FALLBACK_HERO,
          vision: result.data.vision?.length > 0 ? result.data.vision : FALLBACK_ITEMS.vision,
          mission: result.data.mission?.length > 0 ? result.data.mission : FALLBACK_ITEMS.mission,
          goals: goalsItems.length > 0 ? goalsItems : (result.data.goals?.length > 0 ? result.data.goals : FALLBACK_ITEMS.goals),
          values: result.data.values || [],
          allItems: allItems,
        });
        setError(null);
      } else {
        setPageData({
          hero: FALLBACK_HERO,
          vision: FALLBACK_ITEMS.vision,
          mission: FALLBACK_ITEMS.mission,
          goals: FALLBACK_ITEMS.goals,
          values: [],
          allItems: [],
        });
        setError(result.error);
        console.error("Using fallback data:", result.error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Get first item of each type for the grid section
  const visionItem = pageData.vision[0];
  const missionItem = pageData.mission[0];

  // Cards for the bottom section (all unique types)
  const cardItems = [];
  if (pageData.vision[0]) cardItems.push({ ...pageData.vision[0], displayTitle: 'Our Vision' });
  if (pageData.mission[0]) cardItems.push({ ...pageData.mission[0], displayTitle: 'Our Mission' });
  if (pageData.goals[0]) cardItems.push({ ...pageData.goals[0], displayTitle: 'Our Goals' });
  if (pageData.values[0]) cardItems.push({ ...pageData.values[0], displayTitle: 'Our Values' });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white mt-16">
      {/* Hero Section */}
      <section className="relative w-full min-h-[200px] md:min-h-[350px]">
        {/* Background Image */}
        <img
          src={pageData.hero?.computedImageUrl || FALLBACK_HERO.computedImageUrl}
          alt={pageData.hero?.title || "Vision Mission"}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = FALLBACK_HERO.computedImageUrl;
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* Main Description Section */}
      <section className="container py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 mb-6">
          {pageData.hero?.title || "OUR VISION AND MISSION"}
        </h2>
        <p className="text-gray-800 leading-relaxed text-base md:text-lg max-w-4xl">
          {pageData.hero?.description ||
            "We are committed to creating positive change in communities through our dedicated work. Our vision guides us toward a better future, while our mission drives our daily actions. Together with our partners and supporters, we strive to make a lasting impact on the lives of those we serve."}
        </p>
      </section>

      {/* Vision & Mission Grid Blocks */}
      {(visionItem || missionItem) && (
        <section className="grid md:grid-cols-2 auto-rows-fr">
          {/* Vision Block */}
          {visionItem && (
            <>
              <div className={`flex items-center justify-center ${getColorForType('vision').bg} p-6 text-center min-h-[280px]`}>
                <div className="max-w-sm">
                  <h2 className="text-xl md:text-2xl font-bold mb-3">
                    {visionItem.title || "Our Vision"}
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed">
                    {visionItem.description}
                  </p>
                </div>
              </div>

              <div className="relative h-[280px]">
                <img
                  src={visionItem.computedImageUrl || FALLBACK_IMAGE}
                  alt={visionItem.title || "Vision"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div className={`absolute inset-0 ${getColorForType('vision').overlay}`}></div>
              </div>
            </>
          )}

          {/* Mission Block */}
          {missionItem && (
            <>
              <div className="relative h-[280px]">
                <img
                  src={missionItem.computedImageUrl || FALLBACK_IMAGE}
                  alt={missionItem.title || "Mission"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div className={`absolute inset-0 ${getColorForType('mission').overlay}`}></div>
              </div>

              <div className={`flex items-center justify-center ${getColorForType('mission').bg} p-6 text-center min-h-[280px]`}>
                <div className="max-w-sm">
                  <h2 className="text-xl md:text-2xl font-bold mb-3">
                    {missionItem.title || "Our Mission"}
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed">
                    {missionItem.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {/* Individual Sections for Each Type - UPDATED WITH IMAGES */}
      {pageData.vision.map((item, index) => {
        const colors = getColorForType('vision');
        const isEven = index % 2 === 0;
        return (
          <section key={item._id || `vision-${index}`} className={`py-12 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="container">
              <div className={`grid md:grid-cols-2 gap-8 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                {/* Text Content */}
                <div className={`${!isEven ? 'md:order-2' : ''}`}>
                  <div className={`inline-flex items-center gap-2 ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-semibold mb-4`}>
                    {getIconForType('vision')}
                    <span>Vision</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 mb-4">
                    {item.title?.toUpperCase() || "OUR VISION"}
                  </h2>
                  <p className="text-gray-800 leading-relaxed text-base md:text-lg">
                    {item.description}
                  </p>
                </div>
                {/* Image */}
                <div className={`${!isEven ? 'md:order-1' : ''}`}>
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg border-4 ${colors.border}`}>
                    <img
                      src={item.computedImageUrl || FALLBACK_IMAGE}
                      alt={item.title || "Vision"}
                      className="w-full h-64 md:h-80 object-cover"
                      onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                    />
                    <div className={`absolute inset-0 ${colors.overlay} opacity-30`}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {pageData.mission.map((item, index) => {
        const colors = getColorForType('mission');
        const isEven = index % 2 === 0;
        return (
          <section key={item._id || `mission-${index}`} className={`py-12 ${isEven ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="container">
              <div className={`grid md:grid-cols-2 gap-8 items-center`}>
                {/* Image */}
                <div className={`${isEven ? '' : 'md:order-2'}`}>
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg border-4 ${colors.border}`}>
                    <img
                      src={item.computedImageUrl || FALLBACK_IMAGE}
                      alt={item.title || "Mission"}
                      className="w-full h-64 md:h-80 object-cover"
                      onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                    />
                    <div className={`absolute inset-0 ${colors.overlay} opacity-30`}></div>
                  </div>
                </div>
                {/* Text Content */}
                <div className={`${isEven ? '' : 'md:order-1'}`}>
                  <div className={`inline-flex items-center gap-2 ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-semibold mb-4`}>
                    {getIconForType('mission')}
                    <span>Mission</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 mb-4">
                    {item.title?.toUpperCase() || "OUR MISSION"}
                  </h2>
                  <p className="text-gray-800 leading-relaxed text-base md:text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {pageData.goals.map((item, index) => {
        const colors = getColorForType('goals');
        const isEven = index % 2 === 0;
        return (
          <section key={item._id || `goals-${index}`} className={`py-12 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="container">
              <div className={`grid md:grid-cols-2 gap-8 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                {/* Text Content */}
                <div className={`${!isEven ? 'md:order-2' : ''}`}>
                  <div className={`inline-flex items-center gap-2 ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-semibold mb-4`}>
                    {getIconForType('goals')}
                    <span>Goals</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 mb-4">
                    {item.title?.toUpperCase() || "OUR GOALS"}
                  </h2>
                  <p className="text-gray-800 leading-relaxed text-base md:text-lg">
                    {item.description}
                  </p>
                </div>
                {/* Image */}
                <div className={`${!isEven ? 'md:order-1' : ''}`}>
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg border-4 ${colors.border}`}>
                    <img
                      src={item.computedImageUrl || FALLBACK_IMAGE}
                      alt={item.title || "Goals"}
                      className="w-full h-64 md:h-80 object-cover"
                      onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                    />
                    <div className={`absolute inset-0 ${colors.overlay} opacity-30`}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {pageData.values.map((item, index) => {
        const colors = getColorForType('values');
        const isEven = index % 2 === 0;
        return (
          <section key={item._id || `values-${index}`} className={`py-12 ${isEven ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="container">
              <div className={`grid md:grid-cols-2 gap-8 items-center`}>
                {/* Image */}
                <div className={`${isEven ? '' : 'md:order-2'}`}>
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg border-4 ${colors.border}`}>
                    <img
                      src={item.computedImageUrl || FALLBACK_IMAGE}
                      alt={item.title || "Values"}
                      className="w-full h-64 md:h-80 object-cover"
                      onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                    />
                    <div className={`absolute inset-0 ${colors.overlay} opacity-30`}></div>
                  </div>
                </div>
                {/* Text Content */}
                <div className={`${isEven ? '' : 'md:order-1'}`}>
                  <div className={`inline-flex items-center gap-2 ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-semibold mb-4`}>
                    {getIconForType('values')}
                    <span>Values</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 mb-4">
                    {item.title?.toUpperCase() || "OUR VALUES"}
                  </h2>
                  <p className="text-gray-800 leading-relaxed text-base md:text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Cards Section */}
     
    </div>
  );
}