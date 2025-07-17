import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6">
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
          <h2 className="text-3xl font-light">Create an account</h2>
          <p className="text-gray-600 text-sm">
            Already registered?{" "}
            <Link to="/login" className="underline">
              Login here
            </Link>
            <br />
            Want updates?{" "}
            <span className="underline cursor-pointer">Subscribe</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-light border-b border-black pb-1 mb-6">
            Sign Up
          </h2>
          <form className="space-y-6">
            <motion.input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 px-4 py-3 text-sm placeholder-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
            <motion.input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 px-4 py-3 text-sm placeholder-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-3 text-sm placeholder-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-black text-white uppercase font-medium hover:opacity-90 transition"
            >
              Create Account
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
