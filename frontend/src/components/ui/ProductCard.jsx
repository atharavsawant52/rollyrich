import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const isSoldOut = product.status === "soldout";
  const imageUrl = product.media?.[1] || product.image || "/default.jpg";
  const price = product.price ? `₹${product.price.toLocaleString()}` : "N/A";

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="group bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
      >
        <div className="overflow-hidden">
          <motion.img
            src={imageUrl}
            alt={product.title || product.name}
            className="w-full h-64 object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-4 space-y-1">
          <h2 className="text-base font-semibold tracking-wide line-clamp-2">
            {product.title || product.name}
          </h2>
          <p className="text-sm text-gray-600">{price}</p>

          {isSoldOut && (
            <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded mt-1">
              SOLD OUT
            </span>
          )}
        </div>

        <motion.div
          className="absolute inset-0 border border-transparent rounded-xl group-hover:border-black transition-all duration-300 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
    </Link>
  );
}
