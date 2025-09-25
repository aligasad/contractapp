import { useNavigate } from "react-router-dom";
import Carousel from "../../../heroSection/Carousel";

const services = [
  {
    title: "Marriage",
    description: "Exquisite menus for memorable weddings.",
    image:
      "https://i.pinimg.com/1200x/29/ea/ec/29eaeccf0ff8df28c5504b690e5e1821.jpg",
    moveTo: "/catering/marriage",
  },
  // {
  //   title: "Bartabanda",
  //   description: "Traditional delicacies for milestone celebrations.",
  //   image: "03A6A1",
  //   moveTo: "/catering/bartabanda"
  // },
];

const Catering = () => {
  const navigate = useNavigate();
  const images = [
    {
      src: "https://www.shutterstock.com/image-illustration/linkedin-banner-poster-design-background-260nw-2250461485.jpg",
      link: "",
    },
    {
      src: "https://www.shutterstock.com/image-illustration/linkedin-banner-poster-design-background-260nw-2250461485.jpg",
      link: "",
    },
  ];
  return (
    <div>
      {/* Catering Services */}
      <div className="text-center px-6 py-10 bg-gradient-to-r from-[#FFE3BB] via-white to-[#FFF7EB] shadow-inner rounded-2xl mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#03A6A1]">
          Catering Services
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-700 text-base md:text-lg">
          WorkWhiz offers professional catering services for all occasions. From
          weddings and parties to corporate events, our expert chefs and staff
          provide delicious food, seamless service, and an unforgettable
          experience for your guests.
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
            bottom-6 opacity-65 hover:opacity-10npm run dev0
            md:bottom-[-70px] md:group-hover:bottom-6
          "
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

export default Catering;
