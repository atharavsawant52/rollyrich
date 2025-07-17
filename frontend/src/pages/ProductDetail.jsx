import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const product = useSelector(state =>
    state.products.items.find(item => item.id === id)
  );

  if (!product) {
    return <div className="p-10 text-center text-gray-400">Product not found.</div>;
  }

  return (
    <motion.section
      className="min-h-screen flex flex-col md:flex-row gap-10 p-6 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 max-w-md rounded-lg shadow-lg"
        loading="lazy"
      />
      <div className="max-w-xl space-y-4">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-gray-400">₹{product.price}</p>
        {product.status === 'soldout' ? (
          <span className="px-4 py-2 bg-red-600 text-white text-sm rounded">SOLD OUT</span>
        ) : (
          <button className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
            Add to Cart
          </button>
        )}
      </div>
    </motion.section>
  );
}
