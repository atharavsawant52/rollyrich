import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer className="bg-white text-sm text-gray-700 border-t overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-4 gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
      >
        <div>
          <h3 className="font-semibold text-black mb-3 tracking-wide">HELP</h3>
          <p className="mb-2 text-sm leading-relaxed">
            Need help? Our Client Advisors are just a call away at{" "}
            <span className="text-black font-medium">+91 77188 07424</span> or{" "}
            <span className="text-black font-medium">
              contact@rollyrich.com
            </span>
          </p>
          <ul className="space-y-1 mt-3 text-sm">
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-black mb-3 tracking-wide">
            SERVICES
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Personalization
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Exchange policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-black mb-3 tracking-wide">
            ABOUT ROLLY RICH
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Rolly Rich Culture
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Latest News
              </a>
            </li>
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <h3 className="font-semibold text-black mb-3 tracking-wide">
            EMAIL SIGN-UP
          </h3>
          <p className="text-sm">
            Sign up for Rolly Rich emails and receive the latest news from the
            Maison, including exclusive online pre-launches and new collections.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h4 className="font-semibold text-black mb-4 tracking-wide">
          Follow Us on Social Media
        </h4>
        <div className="flex justify-center gap-6 text-xl text-black">
          {[
            {
              icon: FaInstagram,
              link:
                "https://www.instagram.com/rollyrichworld?utm_source=qr&igsh=MWdhajNrMHd3b2dkNQ%3D%3D",
            },
            {
              icon: FaFacebookF,
              link: "https://www.facebook.com/profile.php?id=61571963498340",
            },
            {
              icon: FaTwitter,
              link: "https://x.com/rollyrichworld",
            },
            {
              icon: FaPinterestP,
              link: "https://in.pinterest.com/RollyRich/",
            },
            {
              icon: FaLinkedinIn,
              link: "https://www.linkedin.com/in/rolly-rich-48b325346/",
            },
          ].map(({ icon: Icon, link }, i) => (
            <motion.a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#111" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-black"
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row justify-between items-center text-xs border-t px-4 py-6 max-w-7xl mx-auto text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex gap-4 mb-2 md:mb-0">
          <a href="#" className="hover:underline">
            Legal Notices
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <div>© Rolly Rich</div>
      </motion.div>
    </footer>
  );
}
