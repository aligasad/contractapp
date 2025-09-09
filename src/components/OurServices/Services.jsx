import React from "react";
import { motion } from "framer-motion";
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
    icon: electrician,
    title: "Electrician",
  },
  {
    icon: plumbing,
    title: "Plumbing Service",
  },
  {
    icon: shifting,
    title: "Shifting Service",
  },
  {
    icon: painting,
    title: "Home Painting Service",
  },
  {
    icon: construction,
    title: "Home Construction",
  },
  {
    icon: renovation,
    title: "Home Renovation",
  },
  {
    icon: catering,
    title: "Catering Services",
  },
  {
    icon: Cleaning,
    title: "Cleaning Services",
  },
  {
    icon: Laundary,
    title: "Laundry Services",
  },
  {
    icon: Beauty,
    title: "Beautician",
  },
  {
    icon: computer,
    title: "Computer and networking",
  },
  {
    icon: electronicDevice,
    title: "Electronic Devices",
  },
];

const Services = () => {
  return (

    <section className="py-20 px-6 bg-gradient-to-b from-[#eabaa0] via-[#FDFBF5] to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Heading Tag */}
          <div className="flex justify-center items-center gap-2 text-[#03a6a1] mb-4">
            <FaLeaf className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Our best workers
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-[#03a6a1]">Our</span>{" "}
            <span className="text-amber-500">Services</span>
          </h2>

          {/* Subtext */}
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover trusted services and skilled workers near you — reliable,
            affordable, and professional.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 px-3 sm:px-6 md:px-13 gap-4 sm:gap-6 md:gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              className=" rounded-xl py-2 px-1 w-26 h-26 sm:w-32 sm:h-32 lg:w-36 lg:h-36 grid place-items-center text-center hover:shadow-lg hover:shadow-[#03a6a1]/20 transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.05, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mx-auto mb-1">
                <img src={item.icon} className="h-12, sm:h-13, md:h-14" />
              </div>
              <h3 className="text-sm sm:text-base text-[#03a6a1]">
                {item.title}
              </h3>
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
            <div className="text-3xl font-bold text-amber-500">100%</div>
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
