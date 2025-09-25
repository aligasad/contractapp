import { useNavigate } from "react-router-dom";
import Carousel from "../../../heroSection/Carousel";

const services = [
  {
    title: "Hair",
    description: "Professional styling for your hair.",
    image:
      "https://i.pinimg.com/736x/15/7b/8a/157b8afef3f373d0ff5bef1139fcc95e.jpg",
    moveTo: "/workers/hair",
  },
  {
    title: "Waxing",
    description: "Efficient services for smooth skin.",
    image:
      "https://i.pinimg.com/736x/8d/c7/17/8dc7172d2a74f83778c46f8e082f05db.jpg",
    moveTo: "/waxing",
  },
  // {
  //   title: "Bridal Packages",
  //   description: "Tailored packages for brides-to-be.",
  //   image:
  //     "https://i.pinimg.com/736x/b0/f7/18/b0f71854cb8ac1f351a12bbf35068d8d.jpg",
  //   moveTo: "/bridalpackages",
  // },
  {
    title: "Makeup",
    description: "Expert makeup application for any occasion.",
    image:
      "https://i.pinimg.com/736x/0d/62/3a/0d623a9caa9d3540f9cbad09f7229581.jpg",
    moveTo: "/makeup",
  },
  {
    title: "Mehendi",
    description: "Intricate designs for traditional adornment.",
    image:
      "https://i.pinimg.com/736x/65/55/81/655581205eee1cbd937f49017e951795.jpg",
    moveTo: "/mehendi",
  },
  {
    title: "Facial",
    description: "Rejuvenating treatments for your skin.",
    image:
      "https://i.pinimg.com/1200x/5d/0c/ed/5d0ced66453076be0e9df481560b1174.jpg",
    moveTo: "/facial",
  },
];

const Beautician = () => {
  useEffect(() => {
    if (category === "hair") {
      setHeading("Hair Professional styling Hair");
    } else if (category === "waxing") {
      setHeading("Waxing");
    } else if (category === "bridalpackages") {
      setHeading("Bridal Packages");
    } else if (category === "Makeup") {
      setHeading("Makeup");
    } else if (category === "mehendi") {
      setHeading("Mehendi");
    } else if (category === "fan") {
      setHeading("Fan");
    } else if (category === "facial") {
      setHeading("Facial");
    }
  }, []);
  const navigate = useNavigate();
  const images = [
    {
      src: "https://i.pinimg.com/1200x/09/41/c2/0941c206bee42d7502f0d94f4e9a95cf.jpg",
      link: "",
    },
    {
      src: "https://i.pinimg.com/736x/16/4b/7b/164b7be0690df36bf7366eef963a6676.jpg",
      link: "",
    },
  ];

  return (
    <div>
      {/* Beautician Services */}
      <div className="text-center px-6 py-10 bg-gradient-to-r from-[#FFE3BB] via-white to-[#FFF7EB] shadow-inner rounded-2xl mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#03A6A1]">
          Beautician Services
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-700 text-base md:text-lg">
          WorkWhiz offers expert beautician services at your convenience. From
          skincare and makeup to hair styling and grooming, our professionals
          bring salon-quality care to your home for a comfortable and refreshing
          beauty experience.
        </p>
      </div>

      {/* Carousel Section */}
      <div>
        <Carousel images={images} />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-8 px-2 lg:px-6 md:px-8 py-8 place-items-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative w-[180px] md:w-[200px] lg:w-[220px] h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] rounded-xl shadow-lg overflow-hidden group"
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
              <p className="text-sm mt-2 text-center">{service.description}</p>
            </div>

            {/* Button */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 z-10
                transition-all duration-500 w-[100px] cursor-pointer
                bottom-6 opacity-60 hover:opacity-100
                md:bottom-[-70px] md:group-hover:bottom-6"
            >
              <button
                className="px-3 py-2 bg-[#03A6A1] text-white font-medium rounded-md shadow-md hover:bg-[#FF4F0F] transition-colors duration-300 cursor-pointer"
                onClick={() => {
                  navigate(service.moveTo);
                  window.scrollTo({ top: 0, behavior: "smooth" });
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

export default Beautician;
