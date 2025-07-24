import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);
  const shimmerRef = useRef();
  const lettersRef = useRef([]);
  const particlesInit = async (main) => await loadFull(main);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    gsap.to(shimmerRef.current, {
      rotate: 360,
      repeat: -1,
      duration: 3,
      ease: "linear",
    });

    gsap.fromTo(
      lettersRef.current,
      { y: "100%", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power4.out",
        delay: 2.3,
      }
    );

    const totalDuration = 2000;
    const stepTime = 20;
    const steps = totalDuration / stepTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setHide(true);
          document.body.style.overflow = "auto";
        }, 1000);
      }
    }, stepTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const logoText = "ROLLYRICH";

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            y: "-100vh",
            transition: { duration: 1.2, ease: "easeInOut" },
          }}
        >
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              background: { color: "#ffffff" },
              particles: {
                number: { value: 40 },
                color: { value: "#E1C16E" },
                shape: { type: "circle" },
                opacity: { value: 0.3 },
                size: { value: { min: 1, max: 4 } },
                move: {
                  enable: true,
                  speed: 0.8,
                  direction: "none",
                  random: true,
                  outModes: "out",
                },
              },
            }}
            className="absolute w-full h-full z-0"
          />

          <div className="absolute w-72 h-72 rounded-full bg-[#fdf6e3] blur-3xl animate-pulse z-10" />

      
          <div
            ref={shimmerRef}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-[#fcd34d] via-white to-transparent opacity-30 blur-2xl z-0"
          />

     
          <div className="relative z-30 flex flex-col items-center justify-center">
            <svg width="200" height="200" className="relative z-20">
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#eee"
                strokeWidth="10"
              />
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.02s linear" }}
              />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="24"
                fill="#222"
                fontWeight="600"
              >
                {progress}%
              </text>
            </svg>

            
            <h1 className="flex mt-6 space-x-1 md:space-x-2 text-3xl md:text-5xl font-bold tracking-[0.2em] text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
              {logoText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  ref={(el) => (lettersRef.current[index] = el)}
                  className="inline-block opacity-0"
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 1 }}
              className="text-sm md:text-lg font-light text-gray-500 tracking-widest mt-2"
            >
              LIMITED · LUXURY · LEGENDARY
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
