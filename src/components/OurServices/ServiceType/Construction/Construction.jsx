import Carousel from "../../../heroSection/Carousel";

const services = [
  {
    title: "Enggineer. Consultation",
    description: "Expert guidance and advice from experienced engineers.",
    image: "https://i.pinimg.com/736x/f6/ea/d0/f6ead07e3234762ba479c7d59888b1a1.jpg",
  },
  {
    title: "Home Design",
    description: "Collaborative creation of personalized home plans.",
    image: "https://i.pinimg.com/736x/56/77/f9/5677f93acf2e3106638c5955bd5753ae.jpg",
  },
  {
    title: "Mason (Raj Mistri)",
    description: "Builds walls, applies plaster, and handles brick, stone, and cement work for house structure.",
    image: "https://i.pinimg.com/1200x/d1/44/3d/d1443dca48e43c49e6ef120bfa3a5c2a.jpg",
  },
  {
    title: "Helper / Labourer",
    description: "Assists skilled workers, carries materials, and supports in construction tasks.",
    image: "https://i.pinimg.com/736x/06/49/1f/06491fc131d25e2aab2afe73ac0947e3.jpg",
  },
  {
    title: "Carpenter (Badhai)",
    description: "Works with wood to make doors, windows, furniture, and wooden frameworks.",
    image: "https://i.pinimg.com/1200x/91/90/08/919008e88c358a9bdaa5ef0b157f834b.jpg",
  },
  {
    title: "Tile or Marble Fitter (Tile Mistri)",
    description: "Installs floor and wall tiles for kitchens, bathrooms, and flooring.",
    image: "https://i.pinimg.com/736x/b7/5e/dd/b75eddcf03749b68d3aef042a3133d27.jpg",
  },
  {
    title: "Welder / Iron Gate & Grill Work",
    description: "A worker who shapes and joins iron or steel to make gates, windows, grills, and railings for homes.",
    image: "https://i.pinimg.com/1200x/c5/46/e9/c546e9dd2330c7419db05fd3f0cfe3ac.jpg",
  },
  {
    title: "Whole Home Construction:",
    description: " Construction services from start to finish.",
    image: "https://i.pinimg.com/736x/80/95/16/8095160db9c25da384452400c5928b2f.jpg",
  }
];

const Construction = () => {
  const images = [
    {
      src: 'https://i.pinimg.com/1200x/18/d2/2e/18d22ec394716576129649de5b0daf8a.jpg',
      link: "",
    },
    {
      src: 'https://i.pinimg.com/736x/a0/4b/e9/a04be9c4fcbefd088556ec4d410e0170.jpg',
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-8 px-7 lg:px-17 md:px-18 py-8 place-items-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative w-47 md:w-50 lg-w-55 h-50 sm:h-60 md:h-65 lg:h-70 rounded-xl shadow-lg overflow-hidden group"
          >
            {/* Background Image */}
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/45 transition-colors duration-500"></div>

            {/* Text */}
            <div className="absolute top-4 left-4 right-4 text-white z-10">
              <h3 className="text-xl font-semibold text-center text-shadow-2xs text-[#FFA673]">
                {service.title}
              </h3>
              <div className="bg-[#03A6A1] h-[2px] mt-1"></div>
              <p className="text-sm mt-2">{service.description}</p>
            </div>

            {/* Button */}
            <div
              className="
            absolute left-1/2 transform -translate-x-1/2 z-10
            transition-all duration-500 w-25
            bottom-6
            md:bottom-[-70px] md:group-hover:bottom-6
          "
            >
              <button 
              className="px-3 py-2 bg-[#03A6A1] text-white font-medium rounded-md shadow-md hover:bg-[#FF4F0F] transition-colors duration-300 cursor-pointer"
              onClick={() => {
                navigate(service.moveTo);
                window.scrollTo({top: 0, behavior: "smooth"});
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

export default Construction;
