import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);

  const filtered = products.filter(
    (product) => product.category.toLowerCase() === name.toLowerCase()
  );

  return (
    <section className="py-20 px-6 md:px-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-gray-600 hover:text-black transition"
          >
            Go Back →
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-12 uppercase tracking-wide">
          {decodeURIComponent(name)} Collection
        </h2>

        {filtered.length === 0 ? (
          <p className="text-gray-500">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((product) => {
              const firstImage = Array.isArray(product.media)
                ? product.media.find(
                    (m) =>
                      m.endsWith(".webp") ||
                      m.endsWith(".jpg") ||
                      m.endsWith(".png")
                  )
                : null;

              return (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative w-full h-64 overflow-hidden">
                      <motion.img
                        src={firstImage || "/placeholder.jpg"}
                        alt={product.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                      <p className="text-base font-medium text-black mt-1">
                        {product.price}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
