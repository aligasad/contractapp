import { motion } from "framer-motion";
import { useData } from "../../context/data/MyState";
import { useState } from "react";

function AllWorkers() {
  const { worker } = useData();

  if (!worker || worker.length === 0) {
    return <p className="text-center mt-10">No workers available...</p>;
  }

  console.log("LENGTH::",worker.length);

  return (
    <section className="text-gray-600 body-font relative bg-gradient-to-br from-[#FFE3BB] via-white to-[#FFF9F3] overflow-hidden min-h-screen">
      {/* Decorative Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#03A6A1]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFA673]/20 rounded-full blur-3xl"></div>
      <div className="container px-5 py-12 mx-auto">
        <div className="text-center mb-12">
          <h1 className="sm:text-5xl text-3xl font-extrabold title-font text-gray-900">
            Our Skilled Workers
          </h1>
          <div className="mt-3 h-1 w-28 bg-green-600 rounded mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our verified and experienced workers. Reliable, skilled, and
            always ready to help you.
          </p>
        </div>

        <div className="grid grid-cols-2 px-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
          {worker.length > 0 ? (
            worker.map((worker, index) => (
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
                  className="relative h-55 sm:h-76 rounded-xl overflow-hidden shadow-md group"
                >
                  {/* Background Image */}
                  <img
                    src={worker.profilePic}
                    alt={worker.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-500"
                  />

                  {/* Blur Overlay with Details */}
                  <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="w-full backdrop-blur-md bg-white/30 text-white p-2 pt-0 sm:pt-1 sm:p-3">
                      <h3 className="text-base font-bold text-gray-800 flex items-center">
                        {worker.name}{" "}
                      </h3>
                      <div className="h-[1.5px] bg-[#ff4f0f] w-full"></div>
                      <p className="text-xs text-[#eadeda] w-fit  mt-0.5 ">
                        {worker.skills}
                      </p>

                      <div className="grid grid-cols-1 text-[11px]">
                        <p className="hidden sm:block text-gray-100">
                          <span className=" font-semibold text-gray-800 text-[12px]">
                            Company:
                          </span>{" "}
                          {worker.company}
                        </p>
                        <p className="text-[#eadeda]">
                          <span className="font-semibold text-gray-800 text-[12px]">
                            Role:
                          </span>{" "}
                          {worker.role}
                        </p>
                      </div>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between">
                        <p className=" hidden text-[11px] ">
                          <span className="font-semibold text-gray-800 text-[12px]">
                            Contact:
                          </span>{" "}
                          {worker.phone}
                        </p>
                      </div>

                      <div className="flex flex-row gap-2 mt-2">
                        <button
                          className="w-1/2 cursor-pointer py-1 text-xs sm:text-sm lg:text-base bg-[#03A6A1] rounded-md shadow hover:bg-[#FF4F0F] transition"
                        >
                          Hire
                        </button>

                        {JSON.parse(localStorage.getItem("user"))?.user
                          ?.email === "asadalamalig@gmail.com" && (
                          <button
                            onClick={() =>
                              (window.location.href = `/workerinfo/${worker.id}`)
                            }
                            className="w-1/2 cursor-pointer py-1 text-xs sm:text-sm lg:text-base bg-[#FF4F0F] rounded-md shadow hover:bg-[#03A6A1] transition"
                          >
                            Details
                          </button>
                        )}
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
        
      </div>
    </section>
  );
}

export default AllWorkers;
