import Carousel from "../../../heroSection/Carousel";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Inverter",
    description: "Installation and maintenance of power inverters.",
    image: "https://i.pinimg.com/1200x/42/90/b1/4290b10640cd46a269bf38b7b0c7ada1.jpg",
    moveTo: "/workers/inverter"
  },
  {
    title: "Wiring",
    description: "General electrical wiring services.",
    image: "https://i.pinimg.com/736x/02/20/96/022096f28eba03818597e0d3ba826ba7.jpg",
    moveTo: "/workers/wiring"
  },
  {
    title: "Light",
    description: "Installation and repair of lighting fixtures.",
    image: "https://i.pinimg.com/736x/23/02/5e/23025e91ed14dce3477ec6c44cc13328.jpg",
    moveTo: "/workers/light"
  },
  {
    title: "Solar Repair And Installation",
    description: "Repair and installation of solar power systems.",
    image: "https://i.pinimg.com/1200x/5f/6b/9f/5f6b9f8b1cbe50a58cd10c5f23e06cb6.jpg",
    moveTo: "/"
  },
  {
    title: "Whole House Wiring",
    description: "Complete wiring solutions for entire houses.",
    image: "https://i.pinimg.com/1200x/ef/07/b5/ef07b5effc723c2841479ebc2037d69b.jpg",
    moveTo: "/"
  },
  {
    title: "Power Sockets and Switch Boards",
    description: "Installation and maintenance of sockets and switch boards.",
    image: "https://i.pinimg.com/1200x/cc/7d/55/cc7d55387036bba181a87aa0eed67be9.jpg",
    moveTo: "/"
  },
  {
    title: "Telephone And Networking Sockets",
    description: "Setup and repair of telephone and networking sockets.",
    image: "https://i.pinimg.com/736x/4e/9c/ad/4e9cada4f0a55ffcdeef8c140cca42d0.jpg",
    moveTo: "/"
  },
  {
    title: "MCB & MCCBs",
    description: "Maintenance and installation of MCB and MCCBs.",
    image: "https://i.pinimg.com/736x/1b/9f/75/1b9f75287c70442878e3de23e540d088.jpg",
    moveTo: "/"
  },
  {
    title: "Fan",
    description: "Installation and repair of ceiling and wall fans.",
    image: "https://i.pinimg.com/736x/38/f4/88/38f488baa090b1ef9e65241331102d3d.jpg",
    moveTo: "/"
  },
  {
    title: "Sub Meter",
    description: "Installation and repair of sub meters for electricity.",
    image: "https://i.pinimg.com/736x/c0/21/27/c021273d42781a533d98941e21a057ce.jpg",
    moveTo: "/"
  },
];

const Electrician = () => {
  const navigate = useNavigate();
  const images = [
    {
      src: 'https://www.shutterstock.com/image-illustration/linkedin-banner-poster-design-background-260nw-2250461485.jpg',
      link: "",
    },
    {
      src: 'https://www.shutterstock.com/image-illustration/linkedin-banner-poster-design-background-260nw-2250461485.jpg',
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
            bottom-6 opacity-65 hover:opacity-100
            md:bottom-[-70px] md:group-hover:bottom-6
          "
            >
              <button
                className="px-3 py-2 bg-[#03A6A1] text-white font-medium rounded-md shadow-md hover:bg-[#FF4F0F] transition-colors duration-300 cursor-pointer"
                onClick={() => {
                  navigate(service.moveTo);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  // window.location.reload();
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

export default Electrician;
