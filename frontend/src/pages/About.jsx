import { motion } from 'framer-motion';

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

export default function About() {
  return (
    <section className="min-h-screen bg-[#f5f3ef] text-black py-20 px-6">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold uppercase text-center mb-12 tracking-wide">
        Meet Vinayak Mali
      </h2>

      {/* Founder Bio */}
      <motion.div
        className="max-w-3xl mx-auto mb-20 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="text-lg md:text-xl text-gray-700">
          <strong>Vinayak Mali</strong> is a popular YouTuber and a beloved people's celebrity — known as <strong>"Dadus"</strong> by his fans.  
          Coming from a middle-class Marathi family, he brings joy and authenticity through his powerful Agri-Koli and regional content.
        </p>
        <div className="mt-4 flex justify-center gap-4 text-blue-700 underline text-sm">
          <a href="https://www.instagram.com/iam_vinayakmali" target="_blank">Instagram</a>
          <a href="https://www.youtube.com/channel/UCSB-L3HN2tJoizsxR45vUFQ" target="_blank">YouTube</a>
          <a href="http://rollyrich.com/" target="_blank">ROLRYRICH</a>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto space-y-16">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="border-l-4 border-black pl-6 relative"
          >
            <div className="absolute w-3 h-3 bg-black rounded-full -left-1 top-1.5" />
            <p className="text-sm uppercase tracking-widest text-gray-500">{item.year}</p>
            <h3 className="text-xl md:text-2xl font-semibold mt-1">{item.title}</h3>
            <p className="text-gray-700 mt-2 max-w-prose">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
