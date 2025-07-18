import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NewLaunched = () => {
  return (
    <section className="relative w-full h-[90vh] sm:h-screen overflow-hidden">
      {/* Actual Image */}
      <img
        src="https://rollyrich.s3.ap-south-1.amazonaws.com/home/new_launched.webp"
        alt="New Launched"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Optional dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 flex justify-center items-end h-full pb-20 px-4 text-center"
      >
        <Link
          to="/product/bloody-polo"
          className="bg-white text-black font-bold px-6 py-3 rounded-lg text-base hover:scale-105 transition-transform duration-300 shadow-md"
        >
          Shop Now
        </Link>
      </motion.div>
    </section>
  );
};

export default NewLaunched;
