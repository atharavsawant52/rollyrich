import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/products/productSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#faf9f5] pt-28 pb-20 px-5 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-2 font-light">
            Rollyrich Curated
          </p>
          <h1 className="font-['EB_Garamond'] text-4xl md:text-5xl font-medium text-[#1a1a1a] tracking-tight">
            Archive Collection
          </h1>
          <div className="mt-4 w-20 h-px bg-[#e0d7c5] mx-auto"></div>
        </motion.div>

        {status === "loading" && (
          <div className="text-center py-20">
            <p className="text-[#a8a8a8] font-light tracking-wide">
              Curating timeless pieces...
            </p>
          </div>
        )}

        {status === "succeeded" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {archiveDrops.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Link to={`/product/${product.id}`}>
                  <div 
                    className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#f0f0f0] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                    onClick={() => handleMobileClick(product.id)}
                  >
                    <div className="relative overflow-hidden aspect-[3/4]">
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
                        className="w-full h-full object-contain transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#e8d0a0] text-[#1a1a1a] text-xs px-3 py-1.5 rounded-full tracking-wider font-medium">
                          SOLD OUT
                        </span>
                      </div>
                    </div>

                    <div className="p-5 pt-4">
                      <h3 className="font-['EB_Garamond'] text-lg text-[#1a1a1a] font-medium mb-1 tracking-tight line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-[#7a7a7a] text-sm font-light">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
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