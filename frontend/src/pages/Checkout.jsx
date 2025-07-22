import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Confetti from "react-confetti";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const location = useLocation();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const confettiRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const gst = Math.round((subtotal - discount) * 0.12);
  const grandTotal = subtotal - discount + gst;

  useEffect(() => {
    const navbarToggle = document.getElementById("navbar-toggle");
    if (navbarToggle && !navbarToggle.checked) {
      navbarToggle.checked = false;
    }

    const closeNavbar = () => {
      if (navbarToggle && navbarToggle.checked) {
        navbarToggle.checked = false;
      }
    };

    window.addEventListener("beforeunload", closeNavbar);
    return () => {
      window.removeEventListener("beforeunload", closeNavbar);
      closeNavbar();
    };
  }, [location]);

  useEffect(() => {
    if (cartItems.length === 0) navigate("/shop");

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => {
        navigate("/orders");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [orderPlaced, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({ ...paymentForm, [name]: value });
    setPaymentErrors({ ...paymentErrors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode || !/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Enter 6-digit pincode";
    if (!form.phone || !/^\d{10}$/.test(form.phone))
      newErrors.phone = "Enter 10-digit phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    let newErrors = {};

    if (selectedMethod === "card") {
      if (!paymentForm.cardName.trim())
        newErrors.cardName = "Cardholder name is required";
      if (
        !paymentForm.cardNumber ||
        !/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, ""))
      )
        newErrors.cardNumber = "Enter valid 16-digit card number";
      if (
        !paymentForm.expiry ||
        !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentForm.expiry)
      )
        newErrors.expiry = "Enter valid MM/YY format";
      if (!paymentForm.cvv || !/^\d{3}$/.test(paymentForm.cvv))
        newErrors.cvv = "Enter 3-digit CVV";
    }

    if (selectedMethod === "upi") {
      if (!paymentForm.upiId || !/^[\w.-]+@[\w.-]+$/.test(paymentForm.upiId))
        newErrors.upiId = "Enter valid UPI ID (e.g., name@bank)";
    }

    setPaymentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "ROLLY10") {
      const discountAmt = Math.round(subtotal * 0.1);
      setDiscount(discountAmt);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponApplied(false);
      setCouponError("Invalid coupon code");
    }
  };

  const generatePDFInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFillColor(212, 175, 55);
    doc.rect(0, 0, 220, 30, "F");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text("ROLLYRICH", 105, 20, null, null, "center");

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("INVOICE", 105, 45, null, null, "center");
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 60);
    doc.text(
      `Order ID: ${Math.floor(100000 + Math.random() * 900000)}`,
      14,
      68
    );

    doc.setFontSize(14);
    doc.text("Customer Details", 14, 80);
    doc.setFontSize(11);
    doc.text(`Name: ${order.customer.name}`, 14, 90);
    doc.text(`Email: ${order.customer.email}`, 14, 98);
    doc.text(`Phone: ${order.customer.phone}`, 14, 106);
    doc.text(
      `Address: ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}`,
      14,
      114
    );

    const rows = order.items.map((item) => [
      item.title,
      item.size || "N/A",
      item.quantity,
      `₹${item.price}`,
      `₹${item.price * item.quantity}`,
    ]);

    doc.autoTable({
      startY: 130,
      head: [["Product", "Size", "Qty", "Price", "Total"]],
      body: rows,
      headStyles: {
        fillColor: [212, 175, 55],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Subtotal: ₹${subtotal}`, 150, finalY);
    doc.text(`Discount: -₹${discount}`, 150, finalY + 8);
    doc.text(`GST (12%): ₹${gst}`, 150, finalY + 16);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text(`Grand Total: ₹${grandTotal}`, 150, finalY + 28);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Thank you for shopping with ROLLYRICH",
      105,
      280,
      null,
      null,
      "center"
    );
    doc.text(
      "Elegance is not being noticed, it's being remembered",
      105,
      285,
      null,
      null,
      "center"
    );

    doc.save(`ROLLYRICH_Invoice_${new Date().getTime()}.pdf`);
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    setShowPayment(true);
  };

  const handleFakePayment = () => {
    if (selectedMethod !== "cod" && !validatePayment()) return;

    const orderData = {
      customer: form,
      items: cartItems,
      total: grandTotal,
      orderedAt: new Date().toLocaleString(),
      paymentMethod: selectedMethod,
    };

    const existing = JSON.parse(localStorage.getItem("rollyrich_orders")) || [];
    const updatedOrders = [orderData, ...existing];
    localStorage.setItem("rollyrich_orders", JSON.stringify(updatedOrders));

    setTimeout(() => {
      generatePDFInvoice(orderData);
    }, 500);

    setOrderPlaced(true);
    setShowPayment(false);
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .substring(0, 19);
  };

  const formatExpiry = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "$1/$2")
      .substring(0, 5);
  };

  const paymentFormValid = () => {
    if (selectedMethod === "cod") return true;

    if (selectedMethod === "card") {
      return (
        paymentForm.cardName.trim() &&
        /^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, "")) &&
        /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentForm.expiry) &&
        /^\d{3}$/.test(paymentForm.cvv)
      );
    }

    if (selectedMethod === "upi") {
      return /^[\w.-]+@[\w.-]+$/.test(paymentForm.upiId);
    }

    return false;
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#1a1a1a] px-4 md:px-12 py-12 font-['EB_Garamond'] pb-36 mt-11">
      <motion.h1
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold text-center mb-10 tracking-wider"
      >
        Secure Luxury Checkout
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-[#e6e6e6]"
        >
          <h2 className="text-2xl font-semibold mb-6 border-b pb-3 border-[#e6e6e6]">
            Billing Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { field: "name", label: "Full Name", type: "text" },
              { field: "email", label: "Email", type: "email" },
              { field: "phone", label: "Phone", type: "tel" },
              { field: "address", label: "Address", type: "text" },
              { field: "city", label: "City", type: "text" },
              { field: "pincode", label: "Pincode", type: "text" },
            ].map(({ field, label, type }) => (
              <div
                key={field}
                className={field === "address" ? "md:col-span-2" : ""}
              >
                <label className="block text-sm font-medium text-[#5c5c5c] mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={field}
                  placeholder={label}
                  className={`px-4 py-3 w-full rounded-lg border ${
                    errors[field] ? "border-[#d32f2f]" : "border-[#d4d4d4]"
                  } focus:outline-none focus:ring-1 focus:ring-[#D4AF37]`}
                  onChange={handleChange}
                  value={form[field]}
                />
                {errors[field] && (
                  <span className="text-[#d32f2f] text-xs mt-1 block">
                    {errors[field]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-[#e6e6e6] h-fit"
        >
          <h2 className="text-2xl font-semibold mb-6 border-b pb-3 border-[#e6e6e6]">
            Your Order
          </h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between py-3 border-b border-[#f0f0f0]"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-xl border border-gray-300"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-[#6b6b6b]">
                      Size: {item.size || "One Size"} | Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <span className="font-medium">
                  ₹{item.price * item.quantity}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <input
                type="text"
                placeholder="Enter coupon code (ROLLY10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="px-4 py-3 rounded-lg border border-[#d4d4d4] w-full focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={applyCoupon}
                className="bg-[#f8f5ec] text-[#1a1a1a] px-4 py-3 rounded-lg font-medium whitespace-nowrap border border-[#e0d8c0]"
              >
                Apply
              </motion.button>
            </div>
            {couponError && (
              <span className="text-[#d32f2f] text-xs">{couponError}</span>
            )}
            {couponApplied && (
              <span className="text-[#388e3c] text-xs">
                Coupon applied! 10% discount added
              </span>
            )}
          </div>

          <div className="space-y-3 text-base">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-[#388e3c]">- ₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (12%)</span>
              <span>₹{gst}</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t border-[#e6e6e6]">
            <span>Total</span>
            <span className="text-[#D4AF37]">₹{grandTotal}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "#c19c30" }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-[#D4AF37] text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Proceed to Payment
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white h-full w-full max-w-md p-6 md:p-8 shadow-2xl overflow-y-auto"
            >
              <button
                onClick={() => setShowPayment(false)}
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-6">Payment Method</h3>
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Billing Details</h4>
                <div className="bg-[#f9f9f9] rounded-lg p-4 text-sm">
                  <p className="mb-1">
                    <span className="font-medium">Name:</span> {form.name}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Email:</span> {form.email}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Phone:</span> {form.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {form.address}
                    , {form.city} - {form.pincode}
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#5c5c5c] mb-2">
                  Select Payment Method
                </label>
                <div className="space-y-3">
                  {["Card", "UPI", "COD"].map((method) => (
                    <motion.div
                      key={method}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer ${
                        selectedMethod === method.toLowerCase()
                          ? "border-[#D4AF37] bg-[#fdf9ec]"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedMethod(method.toLowerCase())}
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-12" />
                      <span className="ml-4 font-medium">{method}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMethod}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  {selectedMethod === "card" && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold mb-2">
                        Card Details
                      </h4>

                      <div>
                        <label className="block text-sm font-medium text-[#5c5c5c] mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          placeholder="Name on card"
                          className={`px-4 py-3 w-full rounded-lg border ${
                            paymentErrors.cardName
                              ? "border-[#d32f2f]"
                              : "border-[#d4d4d4]"
                          } focus:outline-none focus:ring-1 focus:ring-[#D4AF37]`}
                          onChange={handlePaymentChange}
                          value={paymentForm.cardName}
                        />
                        {paymentErrors.cardName && (
                          <span className="text-[#d32f2f] text-xs mt-1 block">
                            {paymentErrors.cardName}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#5c5c5c] mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          className={`px-4 py-3 w-full rounded-lg border ${
                            paymentErrors.cardNumber
                              ? "border-[#d32f2f]"
                              : "border-[#d4d4d4]"
                          } focus:outline-none focus:ring-1 focus:ring-[#D4AF37]`}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            setPaymentForm({
                              ...paymentForm,
                              cardNumber: formatted,
                            });
                            setPaymentErrors({
                              ...paymentErrors,
                              cardNumber: "",
                            });
                          }}
                          value={paymentForm.cardNumber}
                        />
                        {paymentErrors.cardNumber && (
                          <span className="text-[#d32f2f] text-xs mt-1 block">
                            {paymentErrors.cardNumber}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#5c5c5c] mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            className={`px-4 py-3 w-full rounded-lg border ${
                              paymentErrors.expiry
                                ? "border-[#d32f2f]"
                                : "border-[#d4d4d4]"
                            } focus:outline-none focus:ring-1 focus:ring-[#D4AF37]`}
                            onChange={(e) => {
                              const formatted = formatExpiry(e.target.value);
                              setPaymentForm({
                                ...paymentForm,
                                expiry: formatted,
                              });
                              setPaymentErrors({
                                ...paymentErrors,
                                expiry: "",
                              });
                            }}
                            value={paymentForm.expiry}
                          />
                          {paymentErrors.expiry && (
                            <span className="text-[#d32f2f] text-xs mt-1 block">
                              {paymentErrors.expiry}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#5c5c5c] mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            placeholder="123"
                            maxLength={3}
                            className={`px-4 py-3 w-full rounded-lg border ${
                              paymentErrors.cvv
                                ? "border-[#d32f2f]"
                                : "border-[#d4d4d4]"
                            } focus:outline-none focus:ring-1 focus:ring-[#D4AF37]`}
                            onChange={handlePaymentChange}
                            value={paymentForm.cvv}
                          />
                          {paymentErrors.cvv && (
                            <span className="text-[#d32f2f] text-xs mt-1 block">
                              {paymentErrors.cvv}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === "upi" && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold mb-2">
                        UPI Details
                      </h4>

                      <div>
                        <label className="block text-sm font-medium text-[#5c5c5c] mb-1">
                          UPI ID
                        </label>
                        <input
                          type="text"
                          name="upiId"
                          placeholder="yourname@bank"
                          className={`px-4 py-3 w-full rounded-lg border ${
                            paymentErrors.upiId
                              ? "border-[#d32f2f]"
                              : "border-[#d4d4d4]"
                          } focus:outline-none focus:ring-1 focus:ring-[#D4AF37]`}
                          onChange={handlePaymentChange}
                          value={paymentForm.upiId}
                        />
                        {paymentErrors.upiId && (
                          <span className="text-[#d32f2f] text-xs mt-1 block">
                            {paymentErrors.upiId}
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-500">
                        <p>Example UPI formats:</p>
                        <ul className="list-disc pl-5 mt-1">
                          <li>yourname@bank</li>
                          <li>yournumber@upi</li>
                          <li>yourname@bankname</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedMethod === "cod" && (
                    <div className="bg-[#f9f9f9] rounded-xl p-5 text-center">
                      <div className="text-5xl mb-3">💰</div>
                      <p className="text-lg font-medium">
                        Pay when your luxury items arrive
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Cash on Delivery (COD) available for all orders
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t border-[#e6e6e6]">
                <span>Total</span>
                <span className="text-[#D4AF37]">₹{grandTotal}</span>
              </div>

              <motion.button
                whileHover={{
                  scale: paymentFormValid() ? 1.03 : 1,
                  backgroundColor: paymentFormValid() ? "#c19c30" : "#b0b0b0",
                }}
                onClick={handleFakePayment}
                disabled={!paymentFormValid()}
                className={`w-full mt-6 py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                  paymentFormValid()
                    ? "bg-[#D4AF37] text-white hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {selectedMethod === "cod" ? "Place Order" : "Pay Now"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
          >
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={500}
              colors={["#D4AF37", "#ffffff", "#f0f0f0"]}
              gravity={0.1}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center bg-white rounded-2xl p-8 max-w-md mx-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 20, -20, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-4"
              >
                Order Confirmed!
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg mb-4"
              >
                Thank you for choosing{" "}
                <span className="font-semibold text-[#D4AF37]">ROLLYRICH</span>
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">Redirecting to orders...</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
