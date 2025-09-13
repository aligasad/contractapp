// ElectricianWorkers.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useData } from "../../../../context/data/MyState";
import { motion } from "framer-motion";
import Carousel from "../../../heroSection/Carousel";

const ElectricianWorkers = () => {
  const { category } = useParams();
  const context = useData();
  const { worker, searchkey, filterType } = context;

  const [heading, setHeading] = useState("");

  // For heading - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    if (category === "solar") {
      setHeading("Solar Repair And Installation");
    } else if (category === "whole") {
      setHeading("Whole House Wiring");
    } else if (category === "power") {
      setHeading("Power Sockets and Switch Boards");
    } else if (category === "telephone") {
      setHeading("Telephone And Networking Sockets");
    } else if (category === "mcb") {
      setHeading("MCB & MCCBs");
    } else if (category === "fan") {
      setHeading("Fan");
    } else if (category === "inverter") {
      setHeading("Inverter");
    } else if (category === "light") {
      setHeading("Light");
    } else if (category === "wiring") {
      setHeading("Wiring");
    }
  }, []);

  // Filter The same category type workers---------------
  const filteredWorkers = worker
    ?.filter((obj) =>
      (obj.skills || "")
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes("electrician")
    )
    ?.filter((obj) =>
      (obj.professional || "")
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(category.replace(/\s+/g, "").toLowerCase())
    )
    .filter(
      (obj) =>
        (obj.skills || "")
          .toLowerCase()
          .includes(searchkey?.toLowerCase() || "") ||
        (obj.area || "").toLowerCase().includes(searchkey?.toLowerCase() || "")
    )
    .filter((item) =>
      (item.category || "")
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(filterType?.toLowerCase() || "")
    );

    // Poster images--------------------------------
  const images = [
    {
      src: "https://tse3.mm.bing.net/th/id/OIP.6jLhzynOzti5VZsmh_G6xwHaCS?pid=Api&P=0&h=180",
      link: "https://isavii.com/",
    },
    {
      src: "https://tse1.mm.bing.net/th/id/OIP.PpEN-jI0V-ufDNviNHHMwgHaC1?pid=Api&P=0&h=180",
      link: "/soap",
    },
  ];

  return (
    <>
    <Carousel images={images} />
    <div className="max-w-6xl mx-auto py-10">
      
      <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
        <h1
          class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
          //   style={{ color: mode === "dark" ? "white" : "" }}
        >
          {heading} !
        </h1>
        <div class="h-1 w-25 bg-green-700 rounded"></div>
      </div>
      
      <div className="grid grid-cols-2 px-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        {filteredWorkers && filteredWorkers.length > 0 ? (
          filteredWorkers.map((worker, index) => (
            <motion.div
              key={index}
              className=""
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                key={index}
                className="relative h-76 rounded-xl overflow-hidden shadow-md group"
              >
                {/* Background Image */}
                <img
                  src={worker.profilePic}
                  alt={worker.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Blur Overlay with Details */}
                <div className="absolute inset-0 bg-black/40 flex items-end">
                  <div className="w-full backdrop-blur-md bg-white/30 text-white p-3">
                    <h3 className="text-base font-bold text-gray-800 flex items-center">
                      {worker.name}{" "}
                    </h3>
                    <div className="h-[1.5px] bg-[#ff4f0f] w-full"></div>
                    <p className="text-xs text-[#ff4f0f] shadow-inner shadow-gray-700 bg-gray-300 w-fit px-1 mt-0.5 ">{worker.skills}</p>

                    <div className="grid grid-cols-1 text-[11px]">
                      <p className="text-gray-100">
                        <span className="font-semibold text-gray-800 text-[12px]">
                          Location:
                        </span>{" "}
                        {worker.area}, {worker.city}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-800 text-[12px]">
                          Experiance:
                        </span>{" "}
                        {worker.experience} yrs Exp
                      </p>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between">
                      <p className="text-[11px]">
                        <span className="font-semibold text-gray-800 text-[12px]">
                          Contact:
                        </span>{" "}
                        {worker.phone}
                      </p>
                      
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                        <button className="cursor-pointer px-2 py-1 text-[11px] bg-[#03A6A1] rounded-md shadow hover:bg-[#FF4F0F] transition">
                          Hire
                        </button>
                        <button
                          onClick={() =>
                            (window.location.href = `/productinfo/${worker.id}`)
                          }
                          className="cursor-pointer px-2 py-1 text-[11px] bg-[#FF4F0F] rounded-md shadow hover:bg-[#03A6A1] transition"
                        >
                          Details
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 w-full grid grid-cols-1 ">
            No workers found for {heading}
          </p>
        )}
      </div>
    </div></>
  );
};

export default ElectricianWorkers;
