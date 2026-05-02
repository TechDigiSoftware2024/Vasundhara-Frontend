import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const els = el.querySelectorAll(".reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
            target.classList.add("in-view");
            io.unobserve(target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return ref;
}

export function useCountUp(target, duration = 1800) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;

            const start = performance.now();

            const animate = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              const value = Math.round(eased * target);

              el.textContent = value.toLocaleString("en-IN");

              if (p < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [target, duration]);

  return ref;
}