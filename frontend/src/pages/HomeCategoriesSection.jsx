import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categoryImageMap = {
  jacket: "https://ik.imagekit.io/v88ozoebq/rollyrich/jacket.png?updatedAt=1752989702252",
  sweatshirt: "https://ik.imagekit.io/v88ozoebq/rollyrich/SweatShirt.png?updatedAt=1752989680971",
  shirt: "https://ik.imagekit.io/v88ozoebq/rollyrich/Shirt.png?updatedAt=1752989608784",
  "t-shirt": "https://ik.imagekit.io/v88ozoebq/rollyrich/T-Shirt.png?updatedAt=1752989542144",
  bottomwear: "https://ik.imagekit.io/v88ozoebq/rollyrich/BottomWear.png?updatedAt=1752989754579",
};

export default function HomeCategoriesSection() {
  const products = useSelector((state) => state.products.items);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const videoSectionRef = useRef(null);

  const categories = Array.from(
    products.reduce((map, product) => {
      const key = product.category.trim().toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          id: map.size + 1,
          name: product.category,
          count: 1,
          image:
            categoryImageMap[key] ||
            product.image ||
            "https://rollyrich.s3.ap-south-1.amazonaws.com/home/capsule-grps.jpg",
        });
      } else {
        map.get(key).count += 1;
      }
      return map;
    }, new Map()).values()
  );


  useEffect(() => {
    if (!videoSectionRef.current) return;

    gsap.fromTo(
      videoSectionRef.current,
      { opacity: 0, scale: 1.03 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: "top 85%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);


  useEffect(() => {
    if (!containerRef.current) return;

    const items = gsap.utils.toArray(".category-item");

    if (!items.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, [categories]);

  return (
    <section className="bg-white py-28 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start md:flex-row flex-col-reverse">

        <div
          ref={videoSectionRef}
          className="flex flex-col items-start gap-6 order-first md:order-none w-full"
        >
          <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-xl border border-gray-200">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="https://ik.imagekit.io/v88ozoebq/rollyrich/rollyrich_heroSection_intro.mp4?updatedAt=1752914397208"
                type="video/mp4"
              />
            </video>
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 mix-blend-overlay pointer-events-none animate-glide" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold leading-tight">
            Explore Your Style
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-prose">
            RollyRich redefines streetwear. Every collection tells a story,
            every drop is a new chapter. Discover what speaks to you.
          </p>
        </div>

        <div ref={containerRef} className="space-y-8">
          {categories.map((cat) => (
            <div
              key={`${cat.name}-${cat.id}`}
              className="category-item flex items-center justify-between border-b border-gray-200 pb-3 cursor-pointer group relative overflow-hidden hover:pl-2 hover:bg-gray-100 transition-all duration-300"
              onClick={() => navigate(`/category/${encodeURIComponent(cat.name)}`)}
            >
              <div className="flex items-center gap-4 ml-2">
                <span className="text-md text-gray-400 font-semibold w-6">
                  {String(cat.id).padStart(2, "0")}
                </span>
                <span className="text-lg md:text-xl font-medium text-black group-hover:tracking-wider transition-all duration-300">
                  {cat.name}
                </span>
              </div>
              <span className="text-sm text-gray-500 font-medium group-hover:text-black transition">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
