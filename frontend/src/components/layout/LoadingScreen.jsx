import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHide(true);
            document.body.style.overflow = "auto";
          }, 700);
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
          className="fixed inset-0 z-[9999] bg-[#f5f3ef] flex flex-col items-center justify-center overflow-hidden"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          {/* Brand Title */}
          <motion.h1
            initial={{ scale: 0.8, opacity: 0, filter: "blur(6px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2 }}
            className="text-black uppercase text-4xl md:text-6xl font-bold tracking-[0.2em] mb-10 z-10"
          >
            ROLLYRICH
          </motion.h1>

          {/* Loading % */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[2rem] md:text-[3rem] font-light italic tracking-widest text-black relative z-10"
            style={{ textShadow: "1px 1px 0 #999" }}
          >
            {progress}%
            <span className="absolute left-0 top-1/2 w-full h-0.5 bg-white opacity-10 blur-sm rotate-[4deg]" />
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
