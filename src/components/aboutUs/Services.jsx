import React, { useEffect } from "react";
import { FaUserTie, FaHardHat, FaClipboardCheck, FaUsers, FaClock, FaShieldAlt } from "react-icons/fa";

const Services = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const services = [
    {
      icon: <FaUsers className="text-3xl text-teal-600" />,
      title: "Worker Supply",
      description:
        "We provide skilled and unskilled workers for construction, factory, warehouse, and other labour requirements."
    },
    {
      icon: <FaClipboardCheck className="text-3xl text-teal-600" />,
      title: "Worker Registration",
      description:
        "Workers can easily register on our platform with their personal details, skills, and availability."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-teal-600" />,
      title: "Worker Verification",
      description:
        "We verify worker identity using Aadhaar and other documents to ensure trust and safety."
    },
    {
      icon: <FaHardHat className="text-3xl text-teal-600" />,
      title: "Skilled Labour",
      description:
        "We provide electricians, plumbers, masons, helpers, and other skilled professionals."
    },
    {
      icon: <FaClock className="text-3xl text-teal-600" />,
      title: "Quick Hiring",
      description:
        "Contractors can quickly find and hire workers based on their requirements and location."
    },
    {
      icon: <FaUserTie className="text-3xl text-teal-600" />,
      title: "Contractor Support",
      description:
        "We help contractors manage workers, track details, and maintain proper records."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-16">

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Our Services
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide reliable labour contractor services to help businesses and contractors find the right workers quickly and efficiently.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
          >
            <div className="mb-4">
              {service.icon}
            </div>

            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {service.title}
            </h2>

            <p className="text-gray-600">
              {service.description}
            </p>
          </div>
        ))}

      </div>

      {/* Bottom Section */}
      <div className="mt-16 bg-teal-600 text-white rounded-xl p-8 text-center shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">
          Need Workers for Your Project?
        </h2>
        <p className="mb-4">
          Join our platform and connect with verified workers easily.
        </p>

        <a
          href="/join"
          className="inline-block bg-white text-teal-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Become a Worker
        </a>
      </div>

    </div>
  );
};

export default Services;