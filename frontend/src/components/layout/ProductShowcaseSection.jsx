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

export default function PremiumProductShowcase() {
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
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        ease: "power3.out",
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );
    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <section className="py-28 px-4 bg-[#faf9f5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center">
            {"Latest Drops".split("").map((char, i) => (
              <span key={i} className="inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </div>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto mt-4"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-1 md:order-none"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {status === "succeeded" && (
              <Swiper
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet bg-gray-300",
                  bulletActiveClass:
                    "swiper-pagination-bullet-active !bg-black",
                }}
                autoplay={{
                  delay: 3500,
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
                    <motion.div
                      className="aspect-[3/4] bg-white rounded-xl overflow-hidden border border-gray-100 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <img
                        src={product.media?.[1] || product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {activeProduct && (
              <motion.div
                key={activeProduct.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-left order-2 md:order-none"
              >
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-xs tracking-wide font-medium uppercase">
                    {activeProduct.tag || "Limited Drop"}
                  </span>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tight leading-tight">
                    {activeProduct.title}
                  </h3>

                  <div className="text-gray-900 font-serif italic text-xl">
                    ₹{activeProduct.price}
                  </div>

                  <div className="text-gray-600 font-light leading-relaxed space-y-3">
                    {activeProduct.description
                      ?.split("\n")
                      .slice(0, 2)
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>

                  <div className="text-sm text-gray-500 pt-2 border-t border-gray-100">
                    <p className="mb-1.5">
                      <span className="font-medium">Sizes:</span>{" "}
                      {activeProduct.sizes?.join(", ")}
                    </p>
                    {activeProduct.details && (
                      <p>
                        <span className="font-medium">Fabric:</span>{" "}
                        {activeProduct.details.composition}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <Link
                      to={`/product/${activeProduct.id}`}
                      className="group inline-flex items-center justify-center mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      View Product
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
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
      </div>
    </section>
  );
}
