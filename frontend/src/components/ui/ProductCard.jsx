import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white text-black rounded-lg shadow-xl overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        <div className="p-4 space-y-2">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-sm text-gray-600">₹{product.price}</p>
          {product.status === "soldout" && (
            <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded">
              SOLD OUT
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
