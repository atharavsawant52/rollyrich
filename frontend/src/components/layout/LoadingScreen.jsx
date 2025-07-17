import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    // Lock scroll when loading starts
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setSlideOut(true);
            // Unlock scroll when loading ends
            document.body.style.overflow = "auto";
          }, 600); // Delay matches exit animation
          return 100;
        }
        return prev + 1;
      });
    }, 30); // ~3s full load

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-[#f5f3ef] flex flex-col items-center justify-center overflow-hidden"
      initial={{ y: 0 }}
      animate={{ y: slideOut ? "-100%" : "0%" }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    >
      {/* Gradient Shine Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent opacity-10 pointer-events-none"
      />

      {/* Logo */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0, filter: "blur(6px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2 }}
        className="text-black uppercase text-4xl md:text-6xl font-bold tracking-[0.2em] mb-10 z-10"
      >
        ROLLYRICH
      </motion.h1>

      {/* Percentage Loader */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-[2rem] md:text-[3rem] font-light italic tracking-widest text-black relative z-10"
        style={{ textShadow: "1px 1px 0 #999" }}
      >
        {progress}%
        {/* Reflection line */}
        <span className="absolute left-0 top-1/2 w-full h-0.5 bg-white opacity-10 blur-sm rotate-[4deg]" />
      </motion.span>
    </motion.div>
  );
}
