import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/products/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcaseSlider() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.products);
  const headingRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const filtered = items.filter((p) => p.status !== "soldout").slice(0, 7);
  const activeProduct = filtered[activeIndex];

  useEffect(() => {
    const letters = headingRef.current.querySelectorAll("span");
    gsap.fromTo(
      letters,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <h2
        ref={headingRef}
        className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider mb-12 text-center flex flex-wrap justify-center"
      >
        {"Latest Drops".split("").map((char, i) => (
          <span key={i} className="inline-block whitespace-pre">
            {char}
          </span>
        ))}
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4">
        {status === "succeeded" && (
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full md:max-w-md"
          >
            {filtered.map((product, i) => (
              <SwiperSlide key={i} className="w-[280px]">
                <div className="aspect-[3/4] bg-white rounded-xl shadow-xl overflow-hidden">
                  <img
                    src={product.media?.[1] || product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <AnimatePresence mode="wait">
          {activeProduct && (
            <motion.div
              key={activeProduct.title}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6 }}
              className="text-left space-y-4"
            >
              <h3 className="text-3xl font-bold tracking-wide">
                {activeProduct.title}
              </h3>
              <p className="text-gray-700 text-sm">
                {activeProduct.description?.split("\n")[0]}
              </p>
              <div className="text-black font-medium text-lg">
                ₹{activeProduct.price}
              </div>

              <div className="text-sm text-gray-600">
                <strong>Sizes:</strong> {activeProduct.sizes?.join(", ")}
              </div>

              {activeProduct.details && (
                <div className="text-sm text-gray-500">
                  <p>
                    <strong>Fabric:</strong> {activeProduct.details.composition}
                  </p>
                  <p>
                    <strong>Fit:</strong> {activeProduct.details.fit}
                  </p>
                </div>
              )}

              <Link
                to={`/product/${activeProduct.id}`}
                className="inline-block mt-4 px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                View Product →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {status === "loading" && (
        <div className="text-gray-500 text-center mt-8">Loading...</div>
      )}
      {status === "failed" && (
        <div className="text-red-500 text-center mt-8">
          Failed to load products.
        </div>
      )}
    </section>
  );
}
