import Carousel from "../../../heroSection/Carousel";

const services = [
  {
    title: "Tank Cleaning",
    description: "Expert cleaning and disinfection of water storage tanks.",
    image:
      "https://i.pinimg.com/1200x/bb/13/76/bb137617476e3947eeaa47548c3592d7.jpg",
    moveTo: "/tankcleaning",
  },
  {
    title: "House Cleaning",
    description: "Thorough cleaning and sanitization of residential spaces.",
    image:
      "https://i.pinimg.com/736x/5a/d3/bb/5ad3bb3a2e65bdae78eb73acf5762406.jpg",
    moveTo: "/housecleaning",
  },
  {
    title: "Waste Management",
    description: "Efficient handling and disposal of waste materials.",
    image:
      "https://i.pinimg.com/1200x/68/8c/cf/688ccf4afb65d0414cfd588733ba8544.jpg",
    moveTo: "/wastemanagement",
  },
];

const Cleaning = () => {
  const images = [
    {
      src: "https://www.thesilverbird.com/wp-content/uploads/2019/06/House-shifting.jpg",
      link: "",
    },
    {
      src: "https://www.thesilverbird.com/wp-content/uploads/2019/06/House-shifting.jpg",
      link: "",
    },
  ];
  return (
    <div>
      {/* Cleaning Services */}
      <div className="text-center px-6 py-10 bg-gradient-to-r from-[#FFE3BB] via-white to-[#FFF7EB] shadow-inner rounded-2xl mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#03A6A1]">
          Cleaning Services
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-700 text-base md:text-lg">
          WorkWhiz provides professional cleaning services to keep your home and
          workplace spotless. From deep cleaning and sanitization to regular
          maintenance, our trained team ensures a safe, hygienic, and refreshing
          environment for you and your family.
        </p>
      </div>

      {/* Carousel Section */}
      <div>
        <Carousel images={images} />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-8 px-2 lg:px-17 md:px-18 py-8 place-items-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative w-45 md:w-50 lg-w-55 h-50 sm:h-60 md:h-65 lg:h-70 rounded-xl shadow-lg overflow-hidden group"
          >
            {/* Background Image */}
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
            {/* Text */}
            <div className="absolute top-4 left-4 right-4 text-white z-10">
              <h3 className="text-base md:text-xl font-semibold text-center text-[#FFA673]">
                {service.title}
              </h3>
              <div className="bg-[#03A6A1] h-[2px] mt-1"></div>
              <p className="text-sm mt-2 text-center ">{service.description}</p>
            </div>

            {/* Button */}
            <div
              className="
            absolute left-1/2 transform -translate-x-1/2 z-10
            transition-all duration-500 w-25 cursor-pointer
            bottom-6 opacity-65 hover:opacity-100
            md:bottom-[-70px] md:group-hover:bottom-6
          "
            >
              <button
                className="px-3 py-2 bg-[#03A6A1] text-white font-medium rounded-md shadow-md hover:bg-[#FF4F0F] transition-colors duration-300 cursor-pointer"
                onClick={() => {
                  navigate(service.moveTo);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  window.location.reload();
                }}
              >
                Hire Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cleaning;
