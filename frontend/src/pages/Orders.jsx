import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("rollyrich_orders")) || [];
    setOrders(savedOrders.reverse());
    setIsLoading(false);
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          {orders.map((order, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-[#e6e6e6]"
            >
              <div className="flex flex-col md:flex-row justify-between mb-6 pb-4 border-b border-[#e6e6e6]">
                <div>
                  <h2 className="text-2xl font-semibold text-[#1a1a1a]">
                    Order #{orders.length - idx}
                  </h2>
                  <div className="flex items-center mt-2">
                    <span className="bg-[#f8f5ec] text-[#D4AF37] px-3 py-1 rounded-full text-sm font-medium">
                      {order.paymentMethod?.toUpperCase() || "CARD"}
                    </span>
                    <span className="ml-3 text-sm text-gray-500">
                      {order.orderedAt ? formatDate(order.orderedAt) : "Date not available"}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-xl font-bold text-[#D4AF37]">
                    ₹{order.total?.toLocaleString() || "0"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.items?.reduce((acc, item) => acc + item.quantity, 0) || 0} items
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               
                <div>
                  <h3 className="text-lg font-semibold mb-4">Items</h3>
                  <div className="space-y-4">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-start border-b border-[#f0f0f0] pb-4">
                        <div className="bg-gray-100 border-2 border-dashed rounded-xl w-20 h-20 flex-shrink-0" />
                        <div className="ml-4 flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Size: {item.size || "One Size"} | Qty: {item.quantity}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                            <span className="text-xs text-gray-500">₹{item.price?.toLocaleString()} each</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

            
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer & Shipping</h3>
                  <div className="bg-[#f9f9f9] rounded-xl p-5">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="font-medium">{order.customer?.name || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium">{order.customer?.phone || "Not provided"}</p>
                        <p className="font-medium text-sm">{order.customer?.email || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Shipping Address</p>
                        <p className="font-medium">
                          {order.customer?.address || "Not provided"},<br />
                          {order.customer?.city || ""} - {order.customer?.pincode || ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order Status</p>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="font-medium">Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
               
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-2 text-sm bg-[#f9f9f9] rounded-xl p-5">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0)?.toLocaleString() || "0"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="text-green-600">- ₹{order.discount || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (12%)</span>
                        <span>₹{Math.round((order.total - (order.discount || 0)) * 0.12)?.toLocaleString() || "0"}</span>
                      </div>
                      <div className="flex justify-between border-t border-[#e6e6e6] pt-2 mt-2 font-bold">
                        <span>Grand Total</span>
                        <span className="text-[#D4AF37]">₹{order.total?.toLocaleString() || "0"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}