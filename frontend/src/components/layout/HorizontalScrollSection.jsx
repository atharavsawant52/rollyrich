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
    <section className="w-full h-[160px] bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] overflow-hidden flex items-center">
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap text-white text-2xl md:text-4xl font-extrabold tracking-tight gap-20 px-10 will-change-transform"
      >
        {Array(2)
          .fill(0)
          .flatMap((_, j) =>
            Array(10)
              .fill(0)
              .map((_, i) => (
                <span key={`${j}-${i}`} className="shrink-0">
                  <span className="text-white mr-4">
                    This Is More Than Fashion.
                  </span>
                  <span className="text-red-500">This Is ROLLYRICH.</span>
                </span>
              ))
          )}
      </div>
    </section>
  );
}
