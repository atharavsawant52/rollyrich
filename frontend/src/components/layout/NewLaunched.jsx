import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NewLaunched = () => {
  return (
    <section className="relative w-full h-[60vh] sm:h-[75vh] md:h-screen overflow-hidden">
      <img
        src="https://rollyrich.s3.ap-south-1.amazonaws.com/home/new_launched.webp"
        alt="New Launched"
        className="absolute inset-0 w-full h-full object-contain sm:object-cover object-top"
      />

      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          type: "spring",
          stiffness: 80,
        }}
        className="relative z-10 flex justify-center items-start sm:items-end h-full pt-75 sm:pt-0 pb-0 sm:pb-20 px-4 text-center"
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(255,255,255,0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/product/bloody-polo"
            className="bg-white text-black font-bold px-6 py-3 rounded-lg text-base transition-transform duration-300 shadow-md"
          >
            Shop Now
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NewLaunched;
