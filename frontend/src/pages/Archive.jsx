import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/features/products/productSlice";
import { motion } from "framer-motion";

export default function Archive() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  const archiveDrops = items.filter((item) => item.status === "soldout");

  return (
    <section className="min-h-screen bg-[#f5f3ef] text-black py-20 px-6">
      <h2 className="text-4xl md:text-5xl font-bold uppercase text-center mb-12 tracking-wide">
        Past Drops Archive
      </h2>

      {status === "loading" && <p className="text-center">Loading archive...</p>}

      {status === "succeeded" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {archiveDrops.map((product, index) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-white rounded-lg shadow-xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600 text-sm">₹{product.price}</p>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                <span className="text-white text-2xl font-bold tracking-wider">SOLD OUT</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
