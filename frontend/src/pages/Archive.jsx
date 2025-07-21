import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/features/products/productSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Add Link

export default function Archive() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const archiveDrops = items.filter((item) => item.status === "soldout");

  const handleMobileClick = (id) => {
    if (!isMobile) return;
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 1000);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-[#fefcf8] text-black pt-32 pb-16 px-4 md:px-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold uppercase text-center mb-10 tracking-wide text-[#1e1e1e]"
      >
        <span className="block text-sm mb-1 tracking-widest font-medium text-gray-500">
          ROLLYRICH
        </span>
        Past Drops Archive
      </motion.h2>

      {status === "loading" && (
        <p className="text-center text-gray-400">Loading archive...</p>
      )}

      {status === "succeeded" && (
        <div className="grid gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {archiveDrops.map((product, index) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-xl overflow-hidden shadow-md border border-[#eaeaea] transition-all duration-300 cursor-pointer max-w-[250px] w-full hover:shadow-xl"
            >
              <Link to={`/product/${product.id}`}>
                <div
                  onClick={() => handleMobileClick(product.id)}
                  className="overflow-hidden"
                >
                  <img
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
                    className="w-full aspect-[4/5.5] object-contain transition-all duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-[#1a1a1a] truncate">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 text-sm">₹{product.price}</p>
                </div>

                {/* Overlay for SOLD OUT */}
                {isMobile ? (
                  activeCard === product.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-500"
                    >
                      <span className="text-[1.1rem] font-bold text-[#f5d7a3] tracking-wide drop-shadow uppercase">
                        SOLD OUT
                      </span>
                    </motion.div>
                  )
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/60 flex items-center justify-center"
                  >
                    <span className="text-[1.1rem] font-bold text-[#f5d7a3] tracking-wide drop-shadow uppercase">
                      SOLD OUT
                    </span>
                  </motion.div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
