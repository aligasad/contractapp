// WorkerList.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useData } from "../../context/data/MyState";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

const WorkerList = () => {
  const { category } = useParams();
  const context = useData();
  const { worker, searchkey, filterType } = context;

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
        <h1
          class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
          //   style={{ color: mode === "dark" ? "white" : "" }}
        >
          {category.toLocaleUpperCase()} EXPERTS !
        </h1>
        <div class="h-1 w-25 bg-green-700 rounded"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {worker.length > 0 ? (
          worker
            ?.filter((obj) =>
              (obj.skills || "")
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(category.toLowerCase())
            )
            .filter(
              (obj) =>
                (obj.skills || "")
                  .toLowerCase()
                  .includes(searchkey?.toLowerCase() || "") ||
                (obj.area || "")
                  .toLowerCase()
                  .includes(searchkey?.toLowerCase() || "")
            )
            .filter((item) =>
              (item.category || "")
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(filterType?.toLowerCase() || "")
            )
            .map((worker, index) => (
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
                      <p className="text-xs">{worker.skills}</p>

                      <div className="grid grid-cols-1 text-[11px]">
                        <p>
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
                        <div>
                          <button className="cursor-pointer px-2 py-1 text-[11px] bg-[#03A6A1] rounded-md shadow hover:bg-[#FF4F0F] transition">
                            Hire
                          </button>
                          <button
                            onClick={() =>
                              (window.location.href = `/productinfo/${worker.id}`)
                            }
                            className="cursor-pointer px-2 py-1 text-[11px] bg-[#03A6A1] rounded-md shadow hover:bg-[#FF4F0F] transition"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
        ) : (
          <p className="text-gray-600">No workers found for {category}</p>
        )}
      </div>
    </div>
  );
};

export default WorkerList;
