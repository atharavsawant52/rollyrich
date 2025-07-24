import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import CountUp from "react-countup";

function LuxuryReviews() {
  const [activeReview, setActiveReview] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const reviews = [
    {
      id: 1,
      stars: 5,
      text: "From the moment I wore it, I knew this wasn’t just fashion — it was art. Every stitch speaks of precision and luxury.",
      author: "Sam Karan",
      location: "Thane, IND",
    },
    {
      id: 2,
      stars: 5,
      text: "Pure luxury. The silhouette, the fabric, the finesse — everything felt curated just for me.",
      author: "Harshvanda Sharam",
      location: "Bhopal, IND",
    },
    {
      id: 3,
      stars: 5,
      text: "This isn’t just clothing — it’s confidence tailored to perfection. The blazer I ordered feels like it belongs on a runway.",
      author: "Sanket Yewale",
      location: "Mumbai, IND",
    },
    {
      id: 4,
      stars: 4,
      text: "Impeccable elegance. The delivery was fast, the packaging luxurious, and the outfit fit flawlessly.",
      author: "Meera Joshi",
      location: "Pune, IND",
    },
    {
      id: 5,
      stars: 5,
      text: "Wearing this made me feel unstoppable. The design, the tailoring, the fabric — it's everything a modern icon needs.",
      author: "Raghav D’souza",
      location: "Delhi, IND",
    },
  ];

  const stats = [
    { number: 1200, label: "Five-Star Reviews", suffix: "+" },
    { number: 95, label: "Client Satisfaction", suffix: "%" },
    { number: 5000, label: "Happy Clients", suffix: "+" },
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, reviews.length]);

 
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveReview((prev) => (prev + 1) % reviews.length),
    onSwipedRight: () =>
      setActiveReview((prev) =>
        prev === 0 ? reviews.length - 1 : prev - 1
      ),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-stone-800 mb-4">
              Client Experiences
            </h2>
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl text-amber-500">★</span>
              ))}
            </div>
            <div className="w-14 h-0.5 bg-stone-300 mx-auto"></div>
          </div>

          
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
         
            <div
              className="lg:w-2/3 transition-all"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              {...swipeHandlers}
            >
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-stone-200 shadow-lg"
              >
                <div className="absolute top-4 left-5 text-6xl text-amber-100 font-playfair">
                  “
                </div>
                <div className="flex mb-4">
                  {[...Array(reviews[activeReview].stars)].map((_, i) => (
                    <span key={i} className="text-lg text-amber-500">★</span>
                  ))}
                </div>
                <p className="text-stone-700 italic text-base md:text-lg leading-relaxed mb-6">
                  {reviews[activeReview].text}
                </p>
                <div className="flex items-center">
                  <div className="w-11 h-11 rounded-full bg-stone-300 flex items-center justify-center text-stone-700 font-bold mr-3">
                    {reviews[activeReview].author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800">
                      {reviews[activeReview].author}
                    </p>
                    <p className="text-stone-500 text-xs">
                      {reviews[activeReview].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/3 space-y-4">
              {reviews.map((review, index) => (
                <button
                  key={review.id}
                  onClick={() => setActiveReview(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    index === activeReview
                      ? "bg-stone-900 text-white border-stone-800 shadow-xl"
                      : "bg-white hover:bg-stone-100 border-stone-200"
                  }`}
                >
                  <div className="flex mb-2">
                    {[...Array(review.stars)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          index === activeReview
                            ? "text-amber-400"
                            : "text-amber-500"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    className={`text-sm mb-2 ${
                      index === activeReview
                        ? "text-stone-200"
                        : "text-stone-600"
                    }`}
                  >
                    {review.text.slice(0, 80)}...
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      index === activeReview
                        ? "text-amber-300"
                        : "text-stone-500"
                    }`}
                  >
                    {review.author}
                  </p>
                </button>
              ))}
            </div>
          </div>

       
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-gradient-to-b from-stone-50 to-stone-100 border border-stone-200 shadow-sm hover:shadow-md transition-transform hover:scale-105"
              >
                <p className="text-4xl font-playfair font-bold text-amber-700 mb-2">
                  <CountUp end={stat.number} duration={2} suffix={stat.suffix} />
                </p>
                <p className="text-xs tracking-wide text-stone-600 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LuxuryReviews;
