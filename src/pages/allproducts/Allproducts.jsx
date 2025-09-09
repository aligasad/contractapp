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

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {worker.map((worke, index) => {
            const {
              id,
              name,
              phone,
              skills,
              experienceYears,
              district,
              city,
              area,
              aboutMe,
              profilePic,
            } = worke;

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl shadow-lg overflow-hidden group"
              >
                {/* Background with blur (Glassmorphism effect) */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-300/40 to-lime-200/40 backdrop-blur-md"></div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col items-center p-6 text-center">
                  <img
                    src={profilePic}
                    alt={name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h2 className="text-lg font-bold text-gray-800">{name}</h2>
                  <p className="text-sm text-gray-500">📞 {phone}</p>

                  <div className="mt-4 space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">🛠 Skills:</span> {skills}
                    </p>
                    <p>
                      <span className="font-semibold">⏳ Exp:</span>{" "}
                      {experienceYears} years
                    </p>
                    <p>
                      <span className="font-semibold">📍 Location:</span>{" "}
                      {area}, {city}, {district}
                    </p>
                  </div>

                  <p className="mt-3 text-xs italic text-gray-600">
                    “{aboutMe}”
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                  <span className="px-4 py-1 text-sm font-semibold text-white bg-green-700 rounded-full shadow-md">
                    Verified Worker
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AllWorkers;
