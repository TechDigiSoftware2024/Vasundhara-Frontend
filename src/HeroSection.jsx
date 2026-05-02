import { useState, useEffect } from "react";
import { getHeroSlides } from "./api/public/heroApi";

export default function HeroSection() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // fallback
  const fallbackSlides = [
    {
      computedImageUrl: "https://picsum.photos/id/1015/1600/900",
      title: "Welcome to Our NGO",
      subtitle: "Volunteer. Lead. Inspire",
      durationMs: 3000,
    },
  ];

  // fetch API
  useEffect(() => {
    const fetchData = async () => {
      const result = await getHeroSlides();
      setSlides(
        result.success && result.data?.length
          ? result.data
          : fallbackSlides
      );
    };
    fetchData();
  }, []);

  // preload images
  useEffect(() => {
    if (!slides.length) return;

    let count = 0;
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.computedImageUrl;
      img.onload = img.onerror = () => {
        count++;
        if (count === slides.length) setLoaded(true);
      };
    });
  }, [slides]);

  // autoplay (FIXED: durationMs used)
  useEffect(() => {
    if (!loaded || slides.length <= 1) return;

    const duration = slides[currentIndex]?.durationMs || 3000;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearInterval(interval);
  }, [currentIndex, slides, loaded]);

  if (!slides.length) {
    return (
      <section className="h-screen flex items-center justify-center bg-black">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-screen w-full overflow-hidden">

      {/* SLIDES */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.computedImageUrl}
            alt=""
            className={`absolute inset-0 w-full h-full 
              object-contain md:object-cover 
              object-center 
              transition-all duration-1000 ease-in-out
              ${i === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"}
            `}
          />
        ))}
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/10" />

     

      {/* DOTS */}
      <div className="absolute bottom-4 sm:bottom-6 w-full flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 bg-white"
                : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}