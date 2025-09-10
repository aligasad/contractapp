import Carousel from "../../../heroSection/Carousel";

const services = [
  {
    title: "Wash Basin",
    description: "Installation and repair of wash basins.",
    image: "https://via.placeholder.com/300x400?text=Light",
  },
  {
    title: "Tap And Faucets",
    description: "Installation and maintenance of taps and faucets.",
    image: "https://via.placeholder.com/300x400?text=Sockets",
  },
  {
    title: "Toilet",
    description: "Repair and maintenance of toilet systems.",
    image: "https://via.placeholder.com/300x400?text=Telephone",
  },
  {
    title: "Water Tank",
    description: "Installation and repair of water tanks.",
    image: "https://via.placeholder.com/300x400?text=MCB",
  },
  {
    title: "Blockages",
    description: "Clearing blockages in plumbing systems.",
    image: "https://via.placeholder.com/300x400?text=Fan",
  },
  {
    title: "Whole House Plumbing",
    description: "Complete plumbing solutions for entire houses.",
    image: "https://via.placeholder.com/300x400?text=Fan",
  },
];

const Cleaning = () => {
  const images = [
    {
      src: 'https://www.thesilverbird.com/wp-content/uploads/2019/06/House-shifting.jpg',
      link: "",
    },
    {
      src: 'https://www.thesilverbird.com/wp-content/uploads/2019/06/House-shifting.jpg',
      link: "",
    },
  ];
  return (
    <div>
      {/* Top Section with Heading + Description */}
      <div className="text-center px-6 py-10 bg-gradient-to-r from-[#FFE3BB] via-white to-[#FFF7EB]">
        <h2 className="text-3xl md:text-4xl font-bold text-[#03A6A1]">
          Our Electrical Services
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-700 text-base md:text-lg">
          WorkWhiz provides professional and reliable electrical services for
          your home and office. From lighting to wiring and socket
          installations, our experts ensure safety and quality work.
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
            bottom-6 opacity-65
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
