import { motion } from "framer-motion";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const timeline = [
  {
    year: "2020",
    title: "The Spark",
    description:
      "Vinayak Mali — a small-town Marathi boy with a big voice — began creating Agri-Koli and regional content that instantly connected with thousands.",
  },
  {
    year: "2021",
    title: "Rise of 'Dadus'",
    description:
      "His content brought laughter, love, and cultural pride. People started calling him 'Dadus' — their own celebrity.",
  },
  {
    year: "2023",
    title: "Born to be RollyRich",
    description:
      "From storytelling to streetwear, Vinayak created ROLLYRICH — a brand built on originality, emotion, and exclusivity.",
  },
  {
    year: "2025",
    title: "Limited Drops. Never Restocked.",
    description:
      "ROLRYRICH isn't just clothing. It's culture. Each design drops once — then never again. That’s the legacy.",
  },
];

const fadeVariants = (fromLeft = true) => ({
  hidden: { opacity: 0, x: fromLeft ? -60 : 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
});

export default function About() {
  return (
    <section className="min-h-screen bg-[#f5f3ef] text-black py-20 px-4 sm:px-6 overflow-hidden">
      {/* Avatar Image */}
      <motion.div
        className="flex justify-center mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img
          src="https://ik.imagekit.io/v88ozoebq/rollyrich/image.png?updatedAt=1752947110656"
          alt="Vinayak Mali"
          className="w-28 sm:w-36 md:w-44 h-auto rounded-full object-cover shadow-xl border-4 border-white"
        />
      </motion.div>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-center mb-12 tracking-widest">
        {"Meet Vinayak Mali".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            viewport={{ once: true }}
          >
            {char}
          </motion.span>
        ))}
      </h2>

      {/* Bio */}
      <motion.div
        className="max-w-2xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          <strong>Vinayak Mali</strong> is a popular YouTuber and a beloved
          people's celebrity — known as <strong>"Dadus"</strong> by his fans.
          Coming from a middle-class Marathi family, he brings joy and
          authenticity through his powerful Agri-Koli and regional content.
        </p>
        <div className="mt-6 flex justify-center gap-6 text-black text-2xl">
          <a
            href="https://www.instagram.com/iam_vinayakmali"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:text-pink-600 transition duration-200" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCSB-L3HN2tJoizsxR45vUFQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="hover:text-red-600 transition duration-200" />
          </a>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black" />
        <div className="space-y-16">
          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                variants={fadeVariants(isLeft)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div className="w-full md:w-1/2 px-6 md:px-12">
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500">
                    {item.year}
                  </p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Group Image */}
      <motion.div
        className="max-w-5xl mx-auto mt-20"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <img
          src="https://rollyrich.s3.ap-south-1.amazonaws.com/home/basic-grps.webp"
          alt="Vinayak Group"
          className="rounded-2xl shadow-2xl w-full object-cover"
        />
      </motion.div>
    </section>
  );
}
