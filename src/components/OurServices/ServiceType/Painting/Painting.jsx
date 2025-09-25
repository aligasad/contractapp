import { useNavigate } from "react-router-dom";
import Carousel from "../../../heroSection/Carousel";

const services = [
  {
    title: "Interior Painting",
    description:
      "Professional house inner wall painting for fresh, vibrant interiors.",
    image:
      "http://static1.squarespace.com/static/58f2de7b579fb3f5948c63d8/669f637b726bc74ad44a392e/68af34984728b9257c3104e7/1757177710472/painter-thinking.png?format=1500w",
    moveTo: "/painting/interiorpainting",
  },
  {
    title: "Exterior Painting",
    description:
      "Expert house outer wall painting for durable, attractive exterior.",
    image:
      "https://i.pinimg.com/736x/ef/5b/f4/ef5bf49a1d88c1016a698d4354472fd0.jpg",
    moveTo: "/painting/exteriorpainting",
  },
];

const Painting = () => {
  const navigate = useNavigate();

  const images = [
    {
      src: "https://i.ibb.co/YTVqRgNd/Untitled-design-9.png",
      link: "",
    },
    {
      src: "https://i.ibb.co/nqGdjGmH/Untitled-design-10.png",
      link: "",
    },
    {
      src: "https://static.homeguide.com/assets/images/content/homeguide-woman-painting-apartment-interior-wall-with-paint-roller.jpg",
      link: "",
    },
  ];

  return (
    <div>
      {/* Top Section with Heading + Description */}
      <div className="text-center px-6 py-10 bg-gradient-to-r from-[#FFE3BB] via-white to-[#FFF7EB] shadow-inner rounded-2xl mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#03A6A1]">
          Home Painter
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-700 text-base md:text-lg">
          WorkWhiz offers expert home painting services to refresh your walls
          with vibrant, durable, and professional finishes. Our painters ensure
          smooth application and long-lasting colors for your home.
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

export default Painting;
