import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginFailure, loginSuccess } from "../redux/features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        (u.email === email || u.username === email) && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch(loginSuccess(user));
      navigate("/");
    } else {
      const error = "😓 Invalid email or password!";
      dispatch(loginFailure(error));
      setErrorMessage(error);

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 relative">
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ y: -80, opacity: 0, scale: 0.9 }}
            animate={{ y: 20, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 mt-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-50"
          >
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.4 }}
              className="block font-medium"
            >
              {errorMessage}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 py-16"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center space-y-4"
        >
          <h2 className="text-3xl font-light">Welcome back</h2>
          <p className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline">
              Create one
            </Link>
            <br />
            <span className="underline cursor-pointer">Forgot password?</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-light border-b border-black pb-1 mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <motion.input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              whileFocus={{ scale: 1.01 }}
              className="w-full border border-gray-300 px-4 py-3 text-sm placeholder-gray-500"
            />
            <motion.input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              whileFocus={{ scale: 1.01 }}
              className="w-full border border-gray-300 px-4 py-3 text-sm placeholder-gray-500"
            />

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-black text-white uppercase font-medium hover:opacity-90 transition rounded"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
