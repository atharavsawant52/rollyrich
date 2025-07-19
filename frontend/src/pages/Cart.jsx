import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, size, amount) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (!item) return;

    const newQty = item.quantity + amount;
    if (newQty < 1) return;

    dispatch(updateQuantity({ id, size, quantity: newQty }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-32 px-4 py-10 max-w-6xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-10 text-center tracking-tight">
        Your Cart 🛒
      </h2>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-20"
        >
          Your cart is empty.
        </motion.div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${item.size}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6 bg-white rounded-xl shadow px-4 py-4"
            >
              <div className="w-28 h-28 overflow-hidden rounded-xl border bg-white">
                {item.image?.endsWith(".webm") ? (
                  <video
                    src={item.image}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    src={item.image || "/default.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1 w-full">
                <Link
                  to={`/product/${item.id}`}
                  className="text-lg font-semibold hover:underline hover:text-black transition"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                <p className="text-sm text-gray-500">Price: ₹{item.price}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.size, -1)
                    }
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-black rounded"
                  >
                    –
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.size, 1)
                    }
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-black rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right min-w-[80px]">
                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  onClick={() =>
                    dispatch(removeFromCart({ id: item.id, size: item.size }))
                  }
                  className="text-sm text-red-500 mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row justify-between items-center"
          >
            <h3 className="text-2xl font-bold text-black mb-4 md:mb-0">
              Total: ₹{totalAmount}
            </h3>

            <div className="flex gap-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-md shadow-sm transition"
              >
                Clear Cart
              </button>
              <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition shadow">
                Checkout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
