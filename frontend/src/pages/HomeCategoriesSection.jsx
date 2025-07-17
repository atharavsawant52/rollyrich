import { motion } from "framer-motion";

const categories = [
  { id: 1, name: "Wallpapers", count: "200+" },
  { id: 2, name: "Wonderwall Match", count: "16" },
  { id: 3, name: "WondeRoll", count: "16" },
  { id: 4, name: "Paints", count: "500+" },
  { id: 5, name: "Glue / Resin", count: "3" },
  { id: 6, name: "Outlet", count: "209" },
];

// Motion Variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.5, ease: "easeInOut" },
};

export default function HomeCategoriesSection() {
  return (
    <section className="bg-white py-28 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left Category List - Stagger + Hover */}
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

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-start gap-6"
        >
          <motion.img
            src="/drops/homecategoriesSection.png"
            alt="RollyRich Welcome"
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-60 object-cover object-top rounded-lg shadow-xl"
          />

          <h2 className="text-2xl md:text-3xl font-bold leading-tight">
            Welcome to the amazing world of RollyRich!
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed max-w-prose">
            RollyRich is more than fashion. It’s a statement. Every drop is a
            symbol of creativity, confidence, and culture — wrapped into designs
            that spark emotions and demand attention.
          </p>

          <a
            href="/data/lookbook2025.pdf"
            className="mt-4 underline text-sm hover:opacity-80 transition"
          >
            ↓ Download Lookbook 2025
          </a>
        </motion.div>
      </div>
    </section>
  );
}
