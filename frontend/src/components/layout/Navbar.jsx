import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.svg"; // Update path as per your structure

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

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

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          key="navbar"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
              <img
                src={logo}
                alt="RollyRich Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm uppercase font-medium tracking-wider text-white">
              {[
                { name: "Shop", to: "/shop" },
                { name: "About", to: "/about" },
                { name: "Login", to: "/login" },
                { name: "Cart (0)", to: "/cart" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="group relative inline-block"
                >
                  <span className="transition-opacity duration-200 group-hover:opacity-80">
                    {item.name}
                  </span>
                  <span className="absolute left-0 -bottom-0.5 w-full h-[1.5px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(true)} className="text-xl text-white">
                ☰
              </button>
            </div>
          </div>


          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-6 text-xl font-light uppercase"
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-6 right-6 text-3xl font-thin"
                >
                  ×
                </button>

                <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:opacity-80 transition">
                  Shop
                </Link>
                <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:opacity-80 transition">
                  About
                </Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:opacity-80 transition">
                  Login
                </Link>
                <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:opacity-80 transition">
                  Cart (0)
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
