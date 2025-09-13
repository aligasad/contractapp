import { motion } from "framer-motion";
import { useData } from "../../context/data/MyState";

function AllWorkers() {
  const { worker } = useData();

  if (!worker || worker.length === 0) {
    return <p className="text-center mt-10">No workers available...</p>;
  }

  return (
    <section className="text-gray-600 body-font bg-gradient-to-br from-[#caf5e7] to-[#e6fffa] min-h-screen">
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
                      <p className="text-xs text-[#ff4f0f] shadow-inner shadow-gray-700 bg-gray-300 w-fit px-1 mt-0.5 ">
                        {worker.skills}
                      </p>

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
      </div>
    </section>
  );
}

export default AllWorkers;
