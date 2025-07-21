import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const NewLaunched = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.05, rotate: 2, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.to(imgRef.current, {
        y: -8,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-gradient-to-br from-[#fffdf9] to-[#f2f2f2] text-[#1a1a1a] py-12 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">
      
        <div
          className="flex flex-col items-center justify-center text-center space-y-6"
          ref={textRef}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#d19c42] to-[#9d5038] bg-clip-text text-transparent drop-shadow-sm">
            Step into Luxury.
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-lg leading-relaxed">
            Discover true elegance with our premium cotton polo T-shirt. Crafted with a textured pique knit, this 240 GSM fabric ensures all-day comfort, durability, and timeless sophistication.
          </p>
          <Link
            to="/product/bloody-polo"
            className="inline-block bg-gradient-to-r from-[#d19c42] via-[#e46a4a] to-[#d19c42] text-white font-semibold px-6 py-3 rounded-full text-sm md:text-base hover:scale-105 transition-all duration-300 shadow-md"
          >
            Shop Now
          </Link>
        </div>

        <div ref={imgRef} className="relative w-full h-full">
          <img
            src="https://rollyrich.s3.ap-south-1.amazonaws.com/home/new_launched.webp"
            alt="New Launched T-Shirt"
            className="w-full max-w-[350px] mx-auto rounded-xl shadow-xl"
          />
          <div className="flex space-x-4 mt-4 justify-center">
            <img
              src="https://rollyrich.s3.ap-south-1.amazonaws.com/app/basics-t-shirt-red-28R27R-2.webp"
              alt="Side View"
              className="w-1/3 rounded-lg shadow-sm border"
            />
            <img
              src="https://rollyrich.s3.ap-south-1.amazonaws.com/app/basics-t-shirt-red-28R27R-3.webp"
              alt="Back View"
              className="w-1/3 rounded-lg shadow-sm border"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLaunched;
