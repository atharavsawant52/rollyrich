import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/features/products/productSlice";
import ProductCard from "../components/ui/ProductCard";
import { motion } from "framer-motion";

export default function Shop() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const categories = [
    "All",
    ...new Set(
      items
        .filter((item) => item.status !== "soldout")
        .map((item) => item.category)
    ),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? items.filter((product) => product.status !== "soldout")
      : items.filter(
          (product) =>
            product.category === selectedCategory &&
            product.status !== "soldout"
        );

  return (
    <section className="min-h-screen px-6 md:px-14 py-20 mt-10 bg-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-bold text-center mb-10 uppercase tracking-wide"
      >
        Available Drops
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            } transition duration-200 text-sm font-medium uppercase`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {status === "loading" && (
        <p className="text-center text-gray-400">Loading drops...</p>
      )}

      {status === "succeeded" && (
        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
