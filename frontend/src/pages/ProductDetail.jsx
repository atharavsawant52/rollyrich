import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart } from "../redux/features/cart/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === id)
  );

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  const [showDetails, setShowDetails] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showCare, setShowCare] = useState(true);

  useEffect(() => {
    if (product?.media?.[0]) {
      setSelectedImage(product.media[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.media?.[0],
      size: selectedSize,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));
    setError("");
  };

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
      <div className="flex justify-end mb-6">
        <motion.button
          whileHover={{ x: 5 }}
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 underline hover:text-black transition"
        >
          ← Go Back
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div>
            {selectedImage.endsWith(".webm") ? (
              <video
                src={selectedImage}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[500px] object-contain border rounded-xl shadow-lg"
              />
            ) : (
              <img
                src={selectedImage}
                className="w-full h-[500px] object-contain border rounded-xl shadow-lg"
                alt="Product"
              />
            )}
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.media?.map((img, i) => (
              <motion.div whileHover={{ scale: 1.1 }} key={i}>
                {img.endsWith(".webm") ? (
                  <video
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`w-20 h-20 object-cover border rounded-lg cursor-pointer ${
                      selectedImage === img ? "ring-2 ring-black" : ""
                    }`}
                  />
                ) : (
                  <img
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover border rounded-lg cursor-pointer ${
                      selectedImage === img ? "ring-2 ring-black" : ""
                    }`}
                    alt={`Thumb ${i}`}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-2xl font-medium text-black">₹{product.price}</p>

          {product.sizes?.length > 0 && (
            <div className="mt-4">
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

          {product.status === "soldout" ? (
            <span className="inline-block bg-red-600 text-white px-4 py-2 text-sm rounded shadow mt-6">
              SOLD OUT
            </span>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition shadow"
              >
                Add to Cart
              </motion.button>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-red-600 text-sm"
                  >
                    ⚠️ {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {[
            {
              title: "Product Details",
              open: showDetails,
              toggle: setShowDetails,
              content: product.details,
            },
            {
              title: "Product Description",
              open: showDescription,
              toggle: setShowDescription,
              content: product.description,
            },
            {
              title: "Product Care",
              open: showCare,
              toggle: setShowCare,
              content: product.care,
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="mt-6 border p-4 rounded-xl shadow bg-white"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{section.title}</h3>
                <button
                  onClick={() => section.toggle(!section.open)}
                  className="text-lg font-bold text-gray-500"
                >
                  {section.open ? "-" : "+"}
                </button>
              </div>
              <AnimatePresence>
                {section.open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm mt-2 overflow-hidden text-gray-700"
                  >
                    {Array.isArray(section.content) ? (
                      <ul className="list-disc ml-5 space-y-1">
                        {section.content.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : typeof section.content === "object" ? (
                      <ul className="list-disc ml-5 space-y-1">
                        {Object.entries(section.content).map(([key, value]) => (
                          <li key={key}>
                            {key[0].toUpperCase() + key.slice(1)}: {value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="whitespace-pre-line">{section.content}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
