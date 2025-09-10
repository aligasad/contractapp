// TestimonialAnim.jsx
"use client";
import React, { useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion"; // Make sure to install framer-motion

import asadDp from "../../assets/react.svg";
import { useData } from "../../context/data/MyState";

const TestimonialAnim = ({ autoplay = false }) => {
  const context = useData();
  const { mode } = context;
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      name: "Aisha Khan",
      designation: "Frontend Developer at CodeCraft",
      quote:
        "Using this platform improved our workflow tremendously. The animations are smooth and the interface is super intuitive.",
      src: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
    },
    {
      name: "Ravi Verma",
      designation: "Product Designer at Creatix",
      quote:
        "I love the simplicity and flexibility. It feels like magic every time the UI updates with such elegance.",
      src: "https://wallpapers.com/images/hd/professional-profile-pictures-1080-x-1080-460wjhrkbwdcp1ig.jpg",
    },
  ];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="bg-gradient-to-b from-[#eabaa0]  via-[#FDFBF5] to-[#fffdfa]">
      <div className="relative mx-auto max-w-6xl px-6 py-5 font-sans antialiased">
      {/* Decorative Backgrounds */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#03A6A1]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFA673]/20 rounded-full blur-3xl"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        {/* Image Section */}
        <div className="relative mx-auto h-64 sm:h-80 w-64 sm:w-80">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.5,
                  scale: isActive(index) ? 1 : 0.9,
                  zIndex: isActive(index) ? 30 : 0,
                  rotate: isActive(index) ? 0 : -5,
                }}
                exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="h-full w-full rounded-3xl object-cover shadow-2xl border-4 border-[#029590]/70"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between py-6">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-[#029590]/30 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#035590]/30"
          >
            <h3 className="text-2xl font-bold text-[#03A6A1]">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-[#FF4F0F] font-medium">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-4 text-gray-700 text-lg leading-relaxed">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(6px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.015 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Arrows */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={handlePrev}
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#03A6A1] to-[#02807C] shadow-md hover:scale-110 transition"
            >
              <IconArrowLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FFA673] to-[#FF4F0F] shadow-md hover:scale-110 transition"
            >
              <IconArrowRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TestimonialAnim;
