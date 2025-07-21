import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HorizontalScrollMarquee() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const totalWidth = marquee.scrollWidth;

    gsap.fromTo(
      marquee,
      { x: 0 },
      {
        x: -totalWidth / 2,
        duration: 60,
        ease: "linear",
        repeat: -1,
      }
    );
  }, []);

  return (
    <section className="w-full h-[140px] bg-gradient-to-r from-[#fefcea] to-[#f1daae] overflow-hidden flex items-center">
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap text-2xl md:text-4xl font-semibold tracking-tight gap-20 px-10 will-change-transform"
      >
        {Array(2)
          .fill(0)
          .flatMap((_, j) =>
            Array(10)
              .fill(0)
              .map((_, i) => (
                <span key={`${j}-${i}`} className="shrink-0">
                  <span className="text-yellow-700 mr-2">Royal Garb:</span>
                  <span className="text-black">Dress Like You Rule.</span>
                </span>
              ))
          )}
      </div>
    </section>
  );
}
