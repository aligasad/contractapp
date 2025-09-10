import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const HeroSection2 = () => {
  const navigate = useNavigate();
  return (

    <section className="relative bg-gradient-to-br from-[#FFE3BB] via-white to-[#FFF9F3] overflow-hidden py-20 px-6 md:px-20">
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
            Find <span className="text-[#FF4F0F]">Trusted Workers</span>
            <br /> Anytime, Anywhere
          </h1>

          <p className="text-lg text-gray-700 mb-8 max-w-md">
            WorkWhiz makes hiring{" "}
            <span className="font-semibold text-[#03A6A1]">
              local, verified workers
            </span>{" "}
            easy. Whether it’s urgent help or planned tasks — we’ve got you
            covered.
          </p>

          {/* Features */}
          <div className="flex items-center gap-6 mb-8 text-[#03A6A1] font-medium">
            <div className="flex items-center gap-2">⏱ Instant Hiring</div>
            <div className="flex items-center gap-2">📍 Verified Locals</div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Link to="/hire" className="hover:scale-105 transition">
              <button className="cursor-pointer bg-gradient-to-r from-[#03A6A1] to-[#02807C] text-white px-7 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Hire a Worker
              </button>
            </Link>
            <Link to="/join" className="hover:scale-105 transition">
              <button className="cursor-pointer border-2 border-[#FFA673] text-[#FF4F0F] hover:bg-[#FFA673] hover:text-white px-7 py-3 rounded-full font-semibold transition-all duration-300">
                Become a Worker
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#03A6A1]/20 rounded-full blur-2xl"></div>
            <img
              src="https://wallpaperaccess.com/full/3113314.jpg"
              alt="WorkWhiz Hero"
              className="relative w-72 md:w-96 lg:w-[30rem] rounded-2xl shadow-2xl hover:scale-105 transition duration-500 ease-in-out"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection2;
