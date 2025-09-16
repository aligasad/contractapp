import React, { useContext, useEffect } from "react";
import Carousel from "../../components/heroSection/Carousel";
import ProductCard from "../../components/productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { Link } from "react-router-dom";
import { useData } from "../../context/data/MyState";
import { motion } from "framer-motion";
import HeroSection2 from "../../components/heroSection/HeroSection2";
import TransformSection from "../../components/heroSection/TransforSection";
import TestimonialAnim from "../../components/testimonial/TestimonialAnim";
import Services from "../../components/OurServices/Services";

function Home() {
  const { resetFilter } = useData();
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

      <motion.div
        initial={{ opacity: 0, x: -100 }} // start off-screen to the left
        animate={{ opacity: 1, x: 0 }} // move to center
        exit={{ opacity: 0 }} // exit off-screen to the right
        transition={{ duration: 1 }}
      >
        {/* <HeroSection /> */}
        <HeroSection2 />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)} // Remove animation after it's done
      >
        <Services />
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)} 
      >
        <ProductShow />
      </motion.div> */}

      {/* <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)} 
      >
        <TransformSection />
      </motion.div> */}

      {/* <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)} 
      >
        <ProductCard />
      </motion.div> */}

      {/* <ProductApi /> */}
      {/* <div className="flex justify-center md:-mt-10 mb-4 ">
        <Link to={"/allproducts"}>
          <button
            onClick={resetFilter}
            className=" bg-gray-300 px-5 py-2 rounded-xl cursor-pointer"
          >
            See more
          </button>
        </Link>
      </div> */}

      <TestimonialAnim />
    </>
  );
}

export default Home;
