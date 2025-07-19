import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://ik.imagekit.io/v88ozoebq/rollyrich/rollyrich_heroSection_intro.mp4?updatedAt=1752914397208" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40 z-10" />

      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-7xl font-bold uppercase tracking-widest leading-tight"
        >
          Limited Drops.
          <br /> Never Restocked.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl"
        >
          Every design is released once. Once sold out, it's gone forever.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10 w-full flex justify-center z-20"
      >
        <div className="text-white text-sm tracking-widest animate-bounce">
          SCROLL ↓
        </div>
      </motion.div>
    </section>
  );
}
