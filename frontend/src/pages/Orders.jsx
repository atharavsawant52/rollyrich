import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const statusColors = {
    "Order Placed": "bg-blue-100 text-blue-800 border-blue-200",
    Processing: "bg-amber-100 text-amber-800 border-amber-200",
    Shipped: "bg-purple-100 text-purple-800 border-purple-200",
    "In Transit": "bg-indigo-100 text-indigo-800 border-indigo-200",
    Delivered: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full border ${
        statusColors[status] || statusColors["Order Placed"]
      }`}
    >
      {status}
    </span>
  );
};

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("rollyrich_orders")) || [];

    const ordersWithStatus = savedOrders.map((order) => ({
      ...order,
      status: order.status || "Order Placed",
    }));

    const sortedOrders = [...ordersWithStatus].sort(
      (a, b) => new Date(b.orderedAt) - new Date(a.orderedAt)
    );

    setOrders(sortedOrders);
    setIsLoading(false);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getDeliveryDate = (orderDate) => {
    if (!orderDate) return "Calculating...";
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleSection = (orderId, section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [section]: !prev[orderId]?.[section],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] pt-32 px-4 md:px-10 pb-20 font-['EB_Garamond']">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight text-[#1a1a1a]"
      >
        Your Luxury Orders 🧾
      </motion.h1>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xl text-gray-600 mb-8">
            You haven't placed any orders yet. Discover our luxury collection:
          </p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#c19c30" }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
            >
              Shop Luxury Collection
            </motion.button>
          </Link>
        </div>
      ) : (
        <div className="space-y-10 max-w-6xl mx-auto">
          {orders.map((order, idx) => {
            const orderNumber = orders.length - idx;

            return (
              <motion.div
                key={order.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-[#f0f0f0] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-[#f9e076]"></div>

                <div className="flex flex-col md:flex-row justify-between mb-6 pb-4 border-b border-[#e6e6e6]">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1a1a1a]">
                      Order #{orderNumber}
                    </h2>
                    <div className="flex flex-wrap items-center mt-2 gap-2">
                      <span className="bg-[#f8f5ec] text-[#D4AF37] px-3 py-1 rounded-full text-sm font-medium">
                        {order.paymentMethod?.toUpperCase() || "CARD"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(order.orderedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-xl font-bold text-[#D4AF37]">
                      ₹{order.total?.toLocaleString() || "0"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.items?.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      ) || 0}{" "}
                      items
                    </p>
                    <p className="text-sm text-[#5c6b70] mt-1 font-medium">
                      Est. delivery: {getDeliveryDate(order.orderedAt)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-[#333]">
                      Items
                    </h3>
                    <div className="space-y-3">
                      {order.items?.map((item, i) => (
                        <Link
                          to={`/product/${item.id}`}
                          key={i}
                          className="flex items-center gap-4 p-3 hover:bg-[#faf9f5] rounded-lg transition-colors border border-[#f0f0f0]"
                        >
                          <div className="bg-gray-100 border border-[#eaeaea] rounded-lg w-16 h-16 flex-shrink-0 overflow-hidden">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-base hover:text-[#D4AF37] transition-colors truncate">
                              {item.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="text-xs bg-[#f5f5f5] px-2 py-1 rounded">
                                Size: {item.size || "One Size"}
                              </span>
                              <span className="text-xs bg-[#f5f5f5] px-2 py-1 rounded">
                                Qty: {item.quantity}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="font-medium text-sm">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-500">
                                ₹{item.price?.toLocaleString()} each
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="border border-[#eaeaea] rounded-xl overflow-hidden mb-6">
                      <div
                        className="flex justify-between items-center p-5 cursor-pointer"
                        onClick={() =>
                          toggleSection(order.id || idx, "customer")
                        }
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-[#333]">
                            Customer Details
                          </h3>
                          {!expandedSections[order.id || idx]?.customer && (
                            <p className="text-gray-600 mt-1 truncate">
                              {order.customer?.name || "Not provided"}
                            </p>
                          )}
                        </div>
                        <motion.div
                          animate={{
                            rotate: expandedSections[order.id || idx]?.customer
                              ? 0
                              : 360,
                          }}
                          transition={{ duration: 0.3 }}
                          className="bg-[#f8f5ec] p-1.5 rounded-full"
                        >
                          {expandedSections[order.id || idx]?.customer ? (
                            <MinusIcon />
                          ) : (
                            <PlusIcon />
                          )}
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {expandedSections[order.id || idx]?.customer && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="px-5 pb-5"
                          >
                            <div className="pt-4 border-t border-[#eaeaea] space-y-3">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Full Name
                                </p>
                                <p className="font-medium">
                                  {order.customer?.name || "Not provided"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Contact</p>
                                <p className="font-medium">
                                  {order.customer?.phone || "Not provided"}
                                </p>
                                <p className="font-medium text-sm">
                                  {order.customer?.email || "Not provided"}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="border border-[#eaeaea] rounded-xl overflow-hidden">
                      <div
                        className="flex justify-between items-center p-5 cursor-pointer"
                        onClick={() =>
                          toggleSection(order.id || idx, "shipping")
                        }
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-[#333]">
                            Shipping Info
                          </h3>
                          {!expandedSections[order.id || idx]?.shipping && (
                            <p className="text-gray-600 mt-1 truncate">
                              {order.customer?.city || "Not provided"}
                            </p>
                          )}
                        </div>
                        <motion.div
                          animate={{
                            rotate: expandedSections[order.id || idx]?.shipping
                              ? 0
                              : 360,
                          }}
                          transition={{ duration: 0.3 }}
                          className="bg-[#f8f5ec] p-1.5 rounded-full"
                        >
                          {expandedSections[order.id || idx]?.shipping ? (
                            <MinusIcon />
                          ) : (
                            <PlusIcon />
                          )}
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {expandedSections[order.id || idx]?.shipping && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="px-5 pb-5"
                          >
                            <div className="pt-4 border-t border-[#eaeaea] space-y-3">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Shipping Address
                                </p>
                                <p className="font-medium">
                                  {order.customer?.address || "Not provided"},
                                  <br />
                                  {order.customer?.city || ""} -{" "}
                                  {order.customer?.pincode || ""}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Order Status
                                </p>
                                <StatusBadge
                                  status={order.status || "Order Placed"}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4 text-[#333]">
                        Order Summary
                      </h3>
                      <div className="space-y-2 text-sm bg-[#faf9f5] rounded-xl p-5 border border-[#eaeaea]">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>
                            ₹
                            {order.items
                              ?.reduce(
                                (acc, item) => acc + item.price * item.quantity,
                                0
                              )
                              ?.toLocaleString() || "0"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Discount</span>
                          <span className="text-green-600">
                            - ₹{order.discount || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST (12%)</span>
                          <span>
                            ₹
                            {Math.round(
                              (order.total - (order.discount || 0)) * 0.12
                            )?.toLocaleString() || "0"}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-[#e6e6e6] pt-2 mt-2 font-bold">
                          <span>Grand Total</span>
                          <span className="text-[#D4AF37]">
                            ₹{order.total?.toLocaleString() || "0"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
