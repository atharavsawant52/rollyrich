import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const headingWords = ["LIMITED DROPS.", "NEVER RESTOCKED."];
const heading = "LIMITED DROPS.\nNEVER RESTOCKED.";

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

  const wordVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
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

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine pointer-events-none z-20" />

      <motion.div
        className="relative z-30 flex flex-col items-center justify-center h-full text-center text-white px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="flex flex-col items-center justify-center md:hidden text-center space-y-2 relative w-full">
          {headingWords.map((word, index) => (
            <motion.h1
              key={index}
              variants={wordVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.4 }}
              className="text-[1.8rem] font-extrabold uppercase tracking-widest leading-snug text-white relative z-30"
            >
              {word}
            </motion.h1>
          ))}
        </div>

        <div className="hidden md:flex flex-wrap justify-center gap-x-2 text-center text-white text-6xl font-extrabold uppercase tracking-[0.2em] leading-tight relative max-w-6xl z-30">
          {[...heading].map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.035 }}
              className={`inline-block ${char === "\n" ? "w-full h-3" : ""}`}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl z-30"
        >
          Every design is released once. Once sold out, it's gone forever.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10 w-full flex justify-center z-30"
      >
        <div className="text-white text-sm tracking-widest animate-pulse drop-shadow-lg glow-text">
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
        .glow-text {
          text-shadow: 0 0 8px rgba(255,255,255,0.7), 0 0 20px #fff;
        }
      `}</style>
    </section>
  );
}
