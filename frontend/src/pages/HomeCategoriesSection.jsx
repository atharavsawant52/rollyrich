import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.5, ease: "easeInOut" },
};

export default function HomeCategoriesSection() {
  const products = useSelector((state) => state.products.items);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [hoveredImage, setHoveredImage] = useState("");

  useEffect(() => {
    const categoryMap = new Map();

    products.forEach((product) => {
      const { category, image } = product;
      if (categoryMap.has(category)) {
        categoryMap.get(category).count += 1;
      } else {
        categoryMap.set(category, {
          id: categoryMap.size + 1,
          name: category,
          count: 1,
          image: image || "/bg/default.jpg",
        });
      }
    });

    const categoryArray = Array.from(categoryMap.values());
    setCategories(categoryArray);
    if (categoryArray.length > 0) setHoveredImage(categoryArray[0].image);
  }, [products]);

  return (
    <section className="bg-white py-28 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="space-y-8"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={item}
              whileHover={{ scale: 1.02, x: 4 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center justify-between border-b border-gray-300 pb-3 cursor-pointer group"
              onMouseEnter={() => setHoveredImage(cat.image)}
              onClick={() =>
                navigate(`/category/${encodeURIComponent(cat.name)}`)
              }
            >
              <div className="flex items-center gap-4">
                <span className="text-md text-gray-400 font-semibold w-6">
                  {String(cat.id).padStart(2, "0")}
                </span>
                <span className="text-lg md:text-xl font-medium text-black group-hover:tracking-wider transition-all duration-300">
                  {cat.name}
                </span>
              </div>
              <span className="text-sm text-gray-500 font-medium group-hover:text-black transition">
                {cat.count}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-start gap-6"
        >
          <motion.img
            key={hoveredImage}
            src="https://rollyrich.s3.ap-south-1.amazonaws.com/home/capsule-grps.jpg"
            alt="Category Preview"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
          />

          <h2 className="text-2xl md:text-3xl font-bold leading-tight">
            Explore Your Style
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed max-w-prose">
            RollyRich redefines streetwear. Every collection tells a story,
            every drop is a new chapter. Discover what speaks to you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
