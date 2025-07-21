import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  const textMaskRef = useRef();
  const shimmerRef = useRef();
  const logoRef = useRef();
  const glitchRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    tl.to(textMaskRef.current, {
      y: 0,
      duration: 1,
      ease: "power4.out",
      delay: 1.2,
      onComplete: () => {
        gsap.to(logoRef.current, {
          scale: 1.05,
          x: "1px",
          y: "1px",
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: "sine.inOut",
        });
        gsap.to(glitchRef.current, {
          opacity: 0.2,
          duration: 0.05,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      },
    });

    gsap.to(shimmerRef.current, {
      x: "120%",
      duration: 2.5,
      delay: 1.5,
      repeat: -1,
      ease: "power2.inOut",
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHide(true);
            document.body.style.overflow = "auto";
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.15,
            y: "-100vh",
            rotate: 6,
            transition: { duration: 1.2, ease: "easeInOut" },
          }}
        >
          <div className="absolute w-72 h-72 rounded-full blur-3xl bg-white/10 animate-pulse z-10" />
          <div className="absolute w-60 h-60 rounded-full border border-white/20 animate-ping z-10 opacity-40" />
          <div className="absolute w-52 h-52 rounded-full border border-white/30 opacity-25 z-10" />
          <div className="absolute w-80 h-80 rounded-full animate-spin-slow bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 opacity-20 blur-2xl z-0" />

          <div className="relative z-30 overflow-hidden h-[70px] md:h-[100px]">
            <h1
              ref={logoRef}
              className="text-white uppercase text-4xl md:text-6xl font-bold tracking-[0.25em] relative"
            >
              <span className="block relative overflow-hidden">
                <span
                  ref={textMaskRef}
                  className="block translate-y-full relative"
                  style={{
                    WebkitTextStroke: "1px white",
                    textShadow: "0 0 20px rgba(255,255,255,0.5)",
                  }}
                >
                  ROLLYRICH
                  <span
                    ref={shimmerRef}
                    className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80 blur-[5px] mix-blend-screen"
                  />
                  <span
                    ref={glitchRef}
                    className="absolute inset-0 bg-white opacity-0 mix-blend-screen blur-[3px]"
                  />
                </span>
              </span>
            </h1>
          </div>

          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 2.2,
              duration: 0.7,
              type: "spring",
              bounce: 0.6,
            }}
            className="absolute bottom-16 text-[1.7rem] md:text-[2.3rem] font-light italic tracking-wider text-white z-30"
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
