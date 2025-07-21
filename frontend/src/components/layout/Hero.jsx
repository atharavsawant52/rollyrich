import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const headingWords = ["LIMITED EDITION,", "LIMITLESS STYLE."];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxStyle = {
    transform: `translate(${(mousePos.x - window.innerWidth / 2) * 0.01}px, ${
      (mousePos.y - window.innerHeight / 2) * 0.01
    }px) scale(1.05)`,
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black font-sans">
      <motion.img
        src="https://ik.imagekit.io/v88ozoebq/rollyrich/hero_main.png?updatedAt=1752985745417"
        alt="RollyRich Hero"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={parallaxStyle}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine pointer-events-none z-20" />

      <motion.div
        className="relative z-30 flex flex-col items-center justify-center h-full text-center text-white px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="md:hidden flex flex-col gap-2 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="text-3xl font-extrabold uppercase tracking-wide leading-snug text-white font-heading"
          >
            <span className="text-white text-glow">LIMITED EDITION,</span>
            <br />
            <span className="text-red-500 text-glow">LIMITLESS STYLE.</span>
          </motion.h1>
        </div>

        <div className="hidden md:flex flex-col gap-y-3 justify-center text-center text-[3rem] xl:text-[4rem] font-extrabold uppercase tracking-wide leading-tight font-heading max-w-6xl">
          {headingWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.4 }}
              className={`inline-block ${
                index === 0 ? "text-white text-glow" : "text-red-500 text-glow"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-6 text-base md:text-lg lg:text-xl bg-black/40 px-4 py-2 rounded text-gray-100 max-w-xl z-30 tracking-wide"
        >
          Your Style. Your Legacy. Never Duplicated.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10 w-full flex justify-center z-30"
      >
        <div className="text-white font-semibold text-sm tracking-widest animate-pulse text-glow">
          SCROLL ↓
        </div>
      </motion.div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 2.5s infinite linear;
        }
        .text-glow {
          text-shadow: 0 0 6px rgba(0, 0, 0, 0.8), 0 0 14px rgba(255,255,255,0.5);
        }
      `}</style>
    </section>
  );
}
