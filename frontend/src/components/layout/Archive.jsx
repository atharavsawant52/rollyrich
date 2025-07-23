import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/products/productSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Archive() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const archiveDrops = items.filter((item) => item.status === "soldout");

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-[#f8f6f1] pt-28 pb-20 px-5 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-2 font-light">
            Rollyrich Curated
          </p>
          <h1 className="font-['EB_Garamond'] text-4xl md:text-5xl font-medium text-[#1a1a1a] tracking-tight">
            Archive Collection
          </h1>
          <motion.div
            className="mt-4 w-20 h-px bg-[#e0d7c5] mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          ></motion.div>
        </motion.div>

        {status === "loading" && (
          <div className="text-center py-20">
            <p className="text-[#a8a8a8] font-light tracking-wide">
              Curating timeless pieces...
            </p>
          </div>
        )}

        {status === "succeeded" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-12">
            <AnimatePresence>
              {archiveDrops.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="relative"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-[#f0f0f0] group transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] hover:border-[#e8e1d3]">
                      <div className="relative overflow-hidden aspect-[3/4]">
                        <motion.img
                          src={
                            product.media?.find(
                              (m) =>
                                m.endsWith(".jpg") ||
                                m.endsWith(".jpeg") ||
                                m.endsWith(".png")
                            ) || "/fallback.jpg"
                          }
                          alt={product.title}
                          onError={(e) => {
                            e.target.src = "/fallback.jpg";
                          }}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="lazy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />

                        <motion.div
                          className="absolute top-4 right-4"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="flex items-center bg-[#f5f1e9] text-[#8a7c5e] text-[10px] px-3 py-1.5 rounded-full tracking-[0.15em] font-medium border border-[#e8e1d3] shadow-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 mr-1.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                            SOLD OUT
                          </span>
                        </motion.div>
                      </div>

                      <div className="p-6 pt-5">
                        <h3 className="font-['EB_Garamond'] text-lg text-[#1a1a1a] font-medium mb-1 tracking-tight leading-snug min-h-[3rem] line-clamp-2">
                          {product.title}
                        </h3>

                        <p className="text-[#7a7a7a] text-sm font-light mb-1.5">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {product.isLimited && (
                            <span className="text-xs text-[#8a7c5e] font-light tracking-wider border border-[#e8e1d3] px-2 py-1">
                              Limited Drop
                            </span>
                          )}
                          {product.neverRestock && (
                            <span className="text-xs text-[#8a7c5e] font-light tracking-wider border border-[#e8e1d3] px-2 py-1">
                              Never Restocking
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          boxShadow: "inset 0 0 0 1px rgba(232, 225, 211, 0.8)",
                          background:
                            "radial-gradient(ellipse at center, rgba(248, 246, 241, 0.4) 0%, rgba(248, 246, 241, 0) 70%)",
                        }}
                      ></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {status === "succeeded" && archiveDrops.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#a8a8a8] font-light tracking-wide">
              No archived items available
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
