import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HeroSection2 = () => {
  const navigate = useNavigate();

  const images = [
    "https://images.pexels.com/photos/6196231/pexels-photo-6196231.jpeg",
    "https://images.pexels.com/photos/25525455/pexels-photo-25525455.jpeg",
    "https://images.pexels.com/photos/5125230/pexels-photo-5125230.jpeg",
    "https://images.pexels.com/photos/4254158/pexels-photo-4254158.jpeg",
    "https://images.pexels.com/photos/3285203/pexels-photo-3285203.jpeg",
  ];

  const [current, setCurrent] = useState(0);

  // auto change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative bg-gradient-to-br from-[#FFE3BB] via-white to-[#FFF9F3] overflow-hidden py-5 sm:py-20 px-6 md:px-20">
      {/* Decorative Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#03A6A1]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFA673]/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <span className="inline-block bg-[#FF4F0F]/10 text-[#FF4F0F] px-3 py-1 rounded-full text-sm font-medium mb-4">
            🚀 Fast • Local • Reliable
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#03A6A1] mb-6 leading-tight">
            We Provide <span className="text-[#FF4F0F]">Trusted Workers </span>
            for You.
          </h1>

          <p className="text-lg text-gray-700 mb-8 max-w-md">
            Hire verified local talent effortlessly.{" "}
            <span className="font-semibold text-[#03A6A1]">
              From urgent needs to planned projects,
            </span>{" "}
            WorkWhiz delivers.
          </p>

          {/* Features */}
          <div className="flex items-center gap-6 mb-8 text-[#03A6A1] font-medium">
            <div className="flex items-center gap-2">⏱ Instant Hiring</div>
            <div className="flex items-center gap-2">📍 Verified Locals</div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Link to="/terms&condition" className="hover:scale-105 transition">
              <button className="text-sm sm:text-base cursor-pointer bg-gradient-to-r from-[#03A6A1] to-[#02807C] text-white px-5 sm:px-5 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Term & Condition
              </button>
            </Link>
            <Link to="/join" className="hover:scale-105 transition">
              <button className="text-sm sm:text-base cursor-pointer border-2 border-[#FFA673] text-[#FF4F0F] hover:bg-[#FFA673] hover:text-white px-5 sm:px-7 py-3 rounded-full font-semibold transition-all duration-300">
                Become a Worker
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image --------- - --------- - -------- - -------- - -------- - -------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            {/* Background blur effect */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#03A6A1]/20 rounded-full blur-2xl"></div>

            {/* Image slider */}
            <div className="relative w-[330px] sm:w-72 md:w-96 lg:w-[30rem] h-[250px]  md:h-[300px] overflow-hidden rounded-tl-[110px] sm:rounded-2xl shadow-2xl">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="WorkWhiz Hero"
                  className={`absolute w-full h-full object-cover transition-all duration-1000 ease-in-out
            ${
              index === current
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
                />
              ))}
            </div>

            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection2;
