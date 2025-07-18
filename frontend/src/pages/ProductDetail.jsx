import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useSelector(state =>
    state.products.items.find(item => item.id === id)
  );

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Collapse States
  const [showDetails, setShowDetails] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showCare, setShowCare] = useState(true);

  useEffect(() => {
    if (product?.media?.[0]) {
      setSelectedImage(product.media[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-400 text-xl">
        Product not found.
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="pt-28 min-h-screen bg-[#f9f9f9] max-w-7xl mx-auto px-6 py-10"
    >
      {/* 🔙 Go Back Button */}
      <div className="flex justify-end mb-6">
        <motion.button
          whileHover={{ x: 5 }}
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 underline hover:text-black transition"
        >
          ← Go Back
        </motion.button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Image Display */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div>
            {selectedImage.endsWith(".webm") ? (
              <video
                src={selectedImage}
                className="w-full h-[500px] object-contain border rounded-xl shadow-lg"
                controls
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                src={selectedImage}
                alt="Main"
                className="w-full h-[500px] object-contain border rounded-xl shadow-lg"
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.media?.map((img, idx) => (
              <motion.div whileHover={{ scale: 1.1 }} key={idx}>
                {img.endsWith(".webm") ? (
                  <video
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover border rounded-lg cursor-pointer ${
                      selectedImage === img ? "ring-2 ring-black" : ""
                    }`}
                    muted
                  />
                ) : (
                  <img
                    src={img}
                    alt={`Thumb ${idx}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover border rounded-lg cursor-pointer ${
                      selectedImage === img ? "ring-2 ring-black" : ""
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Product Info */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-2xl font-medium text-black">₹{product.price}</p>

          {/* Size Selection */}
          {product.sizes?.length > 0 && (
            <div>
              <p className="font-semibold mb-2">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 rounded border text-sm font-medium ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
              <a
                href="#"
                className="text-sm text-blue-600 mt-2 inline-block underline"
              >
                View size chart
              </a>
            </div>
          )}

          {/* Add to Cart or Sold Out */}
          {product.status === "soldout" ? (
            <span className="inline-block bg-red-600 text-white px-4 py-2 text-sm rounded shadow">
              SOLD OUT
            </span>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition shadow"
            >
              Add to Cart
            </motion.button>
          )}

          {/* Product Details Accordion */}
          <motion.div
            whileHover={{ y: -2 }}
            className="mt-6 border p-4 rounded-xl shadow bg-white"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Product Details</h3>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-lg font-bold text-gray-500"
              >
                {showDetails ? "-" : "+"}
              </button>
            </div>
            <AnimatePresence>
              {showDetails && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="list-disc ml-5 text-gray-700 text-sm space-y-1 mt-2 overflow-hidden"
                >
                  {product.details?.composition && (
                    <li>Composition: {product.details.composition}</li>
                  )}
                  {product.details?.fit && <li>Fit: {product.details.fit}</li>}
                  {product.details?.gsm && <li>GSM: {product.details.gsm}</li>}
                  {product.details?.print && (
                    <li>Print: {product.details.print}</li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.div
            whileHover={{ y: -2 }}
            className="mt-6 border p-4 rounded-xl shadow bg-white"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Product Description</h3>
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="text-lg font-bold text-gray-500"
              >
                {showDescription ? "-" : "+"}
              </button>
            </div>
            <AnimatePresence>
              {showDescription && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-gray-700 text-sm whitespace-pre-line mt-2 overflow-hidden"
                >
                  {product.description}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Care Instructions */}
          <motion.div
            whileHover={{ y: -2 }}
            className="mt-6 border p-4 rounded-xl shadow bg-white"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Product Care</h3>
              <button
                onClick={() => setShowCare(!showCare)}
                className="text-lg font-bold text-gray-500"
              >
                {showCare ? "-" : "+"}
              </button>
            </div>
            <AnimatePresence>
              {showCare && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="list-disc ml-5 text-gray-700 text-sm space-y-1 mt-2 overflow-hidden"
                >
                  {product.care?.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
