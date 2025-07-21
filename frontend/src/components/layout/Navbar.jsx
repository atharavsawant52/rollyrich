import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../../redux/features/auth/authSlice";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          key="navbar"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
            isHome
              ? "bg-transparent text-white"
              : "bg-white text-black shadow-md"
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/">
              <img
                src="https://rollyrich.com/logo.svg"
                alt="RollyRich Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Links */}
            <div
              className={`hidden md:flex items-center gap-8 text-sm uppercase font-medium tracking-wider ${
                isHome ? "text-white" : "text-black"
              }`}
            >
              <Link to="/shop" className={styles.navUnderline}>Shop</Link>
              <Link to="/about" className={styles.navUnderline}>About</Link>
              <Link to="/archive" className={styles.navUnderline}>Archive</Link> {/* 👈 Added Archive link */}
              {user?.role === "admin" && (
                <Link to="/admin/add-product" className={styles.navUnderline}>
                  Add Product
                </Link>
              )}
              <Link to="/cart" className={styles.navUnderline}>
                Cart ({totalQuantity})
              </Link>
              {user ? (
                <>
                  <span className="font-semibold text-rose-500 flex items-center gap-1">
                    👋 {user.name.split(" ")[0]}
                  </span>
                  <button onClick={handleLogout} className={styles.navUnderline}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className={styles.navUnderline}>
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(true)}
                className={`text-xl ${isHome ? "text-white" : "text-black"}`}
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-6 text-xl font-light uppercase text-white"
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-6 right-6 text-3xl font-thin text-white"
                >
                  ×
                </button>

                {user && (
                  <span className="absolute top-6 left-6 text-rose-500 font-bold text-base">
                    👋 {user.name.split(" ")[0]}
                  </span>
                )}

                <Link to="/" onClick={() => setMenuOpen(false)} className="hover:opacity-80">Home</Link>
                <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:opacity-80">Shop</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:opacity-80">About</Link>
                <Link to="/archive" onClick={() => setMenuOpen(false)} className="hover:opacity-80">Archive</Link> {/* 👈 Added for mobile */}
                {user?.role === "admin" && (
                  <Link to="/admin/add-product" onClick={() => setMenuOpen(false)} className="hover:opacity-80">
                    Add Product
                  </Link>
                )}
                <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:opacity-80">
                  Cart ({totalQuantity})
                </Link>
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="hover:opacity-80"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:opacity-80">
                    Login
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
