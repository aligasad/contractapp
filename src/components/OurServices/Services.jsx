import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaTint,
  FaShieldAlt,
  FaHeart,
  FaMagic,
  FaSeedling,
} from "react-icons/fa";
import electrician from "../../assets/ServiceLogo/electrician.webp";
import Beauty from "../../assets/ServiceLogo/Beauty.webp";
import catering from "../../assets/ServiceLogo/catering.webp";
import Cleaning from "../../assets/ServiceLogo/Cleaning.webp";
import computer from "../../assets/ServiceLogo/computer.webp";
import construction from "../../assets/ServiceLogo/construction.webp";
import electronicDevice from "../../assets/ServiceLogo/electronicDevice.webp";
import Laundary from "../../assets/ServiceLogo/Laundary.webp";
import painting from "../../assets/ServiceLogo/painting.webp";
import plumbing from "../../assets/ServiceLogo/plumbing.webp";
import renovation from "../../assets/ServiceLogo/renovation.webp";
import shifting from "../../assets/ServiceLogo/shifting.webp";

const benefits = [
  {
    icon: shifting,
    title: "Shifting Service",
    moveTo: "shifting",
  },
  {
    icon: painting,
    title: "Home Painting Service",
    moveTo: "painting",
  },
  {
    icon: construction,
    title: "Home Construction",
    moveTo: "construction",
  },
  {
    icon: electrician,
    title: "Electrician",
    moveTo: "electrician",
  },
  {
    icon: renovation,
    title: "Home Renovation",
    moveTo: "renovation",
  },
  {
    icon: catering,
    title: "Catering Services",
    moveTo: "catering",
  },
  {
    icon: Cleaning,
    title: "Cleaning Services",
    moveTo: "cleaning",
  },
  {
    icon: Laundary,
    title: "Laundry Services",
    moveTo: "laundary",
  },
  {
    icon: Beauty,
    title: "Beautician",
    moveTo: "beautician",
  },
  {
    icon: computer,
    title: "Computer and networking",
    moveTo: "computer",
  },
  {
    icon: plumbing,
    title: "Plumbing Service",
    moveTo: "plumbing",
  },
  {
    icon: electronicDevice,
    title: "Electronic Devices",
    moveTo: "electronicdevice",
  },
];

const Services = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#fffdfa] via-[#FDFBF5] to-[#eabaa0]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-2 text-[#03a6a1] mb-4">
            <FaLeaf className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Our best workers
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-[#03a6a1]">Our</span>{" "}
            <span className="text-[#ff4f0f]">Services</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover trusted services and skilled workers near you — reliable,
            affordable, and professional.
          </p>
        </motion.div>

        {/* Services Grid------------------------------------- */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 px-3 sm:px-6 md:px-13 gap-4 sm:gap-6 md:gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              className={`rounded-xl pb-2 px-1 w-26 h-26 sm:w-32 sm:h-32 lg:w-36 lg:h-36 grid place-items-center text-center hover:shadow-lg ${
                index % 2 !== 0
                  ? "hover:shadow-[#03a6a1]/50"
                  : "hover:shadow-[#ff4f0f]/50"
              } transition duration-300`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                onClick={() => {
                  navigate(item.moveTo);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="cursor-pointer"
              >
                {/* Diamond Shape Background --------------------------------*/}
                <div
                  className={`grid place-items-center mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-0 ${
                    index % 2 !== 0 ? "bg-[#03a6a1]" : "bg-[#ff4f0f]"
                  }`}
                  style={{
                    clipPath: index % 2 !== 0 ? "polygon(42% 1%, 63% 19%, 90% 10%, 100% 70%, 48% 100%, 33% 81%, 7% 88%, 0% 30%)" : "polygon(72% 2%, 75% 23%, 95% 20%, 90% 84%, 68% 74%, 63% 96%, 6% 75%, 17% 60%, 0 51%, 25% 11%)",
                  }}
                >
                  {/* ICONS CODE--------------------------------------------- */}
                  {/* <img src={item.icon} className="h-10 sm:h-12" /> */}
                  <div
                    className="h-10 sm:h-12 w-10 sm:w-12"
                    style={{
                      backgroundColor: index % 2 !== 0 ? "#faeee4" : "#faeee4",
                      WebkitMaskImage: `url(${item.icon})`,
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskImage: `url(${item.icon})`,  // image icons----------------    --------------------!!!
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      maskSize: "contain",
                    }}
                  ></div>
                </div>
                <h3 className={`text-[11px] sm:text-sm md:text-base font-semibold ${index % 2 !== 0 ? "text-[#03a6a1]" : "text-[#ff4f0f]"}`}>
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Metrics */}
        <motion.div
          className="mt-16 text-center grid grid-cols-2 md:grid-cols-4 gap-6 text-[#03a6a1]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-3xl font-bold">5★</div>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
          <div>
            <div className="text-3xl font-bold">10K+</div>
            <p className="text-sm text-gray-500">Happy Customers</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#ff4f0f]">100%</div>
            <p className="text-sm text-gray-500">Verified Workers</p>
          </div>
          <div>
            <div className="text-3xl font-bold">24/7</div>
            <p className="text-sm text-gray-500">Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
