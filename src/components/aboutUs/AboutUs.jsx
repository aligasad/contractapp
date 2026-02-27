import React, { useEffect } from "react";

function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <div className="min-h-screen bg-[#FFE3BB]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">About Us</h1>
        <p className="max-w-2xl mx-auto opacity-90">
          We provide trusted, verified, and professional labour services for
          companies, contractors, and organizations across multiple industries.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-12">
          {/* Who We Are */}
          <section>
            <h2 className="text-2xl font-bold text-[#03A6A1] mb-3">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We are a labour contractor platform that connects skilled and
              unskilled workers with contractors, companies, and organizations.
              Our mission is to simplify labour management, improve
              transparency, and ensure reliable workforce availability.
            </p>
          </section>

          {/* Our Mission */}
          <section>
            <h2 className="text-2xl font-bold text-[#03A6A1] mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to provide verified, skilled, and trustworthy
              labour to meet workforce requirements efficiently while ensuring
              proper worker management, identity verification, and availability
              tracking.
            </p>
          </section>

          {/* What We Provide */}
          <section>
            <h2 className="text-2xl font-bold text-[#03A6A1] mb-3">
              What We Provide
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Verified Worker Profiles",
                "Labour Identity & Record Management",
                "Worker Availability Tracking",
                "Workforce Management System",
                "Contractor Dashboard Control",
                "Secure Worker Information Storage",
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#FFE3BB]/40 p-4 rounded-lg hover:shadow-md transition cursor-pointer"
                >
                  ✔ {item}
                </div>
              ))}
            </div>
          </section>

          {/* Industries */}
          <section>
            <h2 className="text-2xl font-bold text-[#03A6A1] mb-3">
              Industries We Serve
            </h2>

            <div className="grid md:grid-cols-3 gap-4 text-gray-600">
              {[
                "Construction",
                "Factory & Manufacturing",
                "Warehouse",
                "Loading & Unloading",
                "Cleaning Services",
                "General Labour Work",
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Commitment */}
          <section>
            <h2 className="text-2xl font-bold text-[#03A6A1] mb-3">
              Our Commitment
            </h2>

            <p className="text-gray-600">
              We are committed to providing reliable labour services,
              maintaining proper worker records, and ensuring smooth
              communication between workers and contractors. Our system helps
              manage labour efficiently and professionally.
            </p>
          </section>

          {/* Owner Section */}
          <section className="relative bg-white py-6 sm:px-8 rounded-3xl shadow-xl overflow-hidden">
            {/* Decorative Accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F]"></div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
              About the Owner
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-10">
              {/* Left Side - Profile Circle */}
              <div className="flex flex-col items-center">
                <div
                  className="w-28 h-28 rounded-full bg-gradient-to-br 
                      from-[#03A6A1] to-[#FF4F0F] 
                      flex items-center justify-center 
                      text-white text-3xl font-bold shadow-lg overflow-hidden"
                >
                  <img src="https://i.ibb.co/HL36n1gq/asadslfijj.jpg" alt="" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  Asad Alam
                </h3>
              </div>

              {/* Right Side - Details Grid */}
              <div className="flex-1 grid sm:grid-cols-2 gap-1 text-gray-700">
                <div className="bg-gray-100 p-2  border border-gray-100">
                  <p className="text-xs uppercase text-gray-500 tracking-wide text-justify">
                    I'm a passionate developer who loves creating beautiful,
                    functional, and user-friendly digital experiences. With
                    expertise in modern web technologies, I help businesses and
                    individuals bring their digital visions to life.
                  </p>
                </div>
                <div className="bg-gray-100 p-4  border border-gray-100">
                  <p className="text-xs uppercase text-gray-500 tracking-wide">
                    Qualification
                  </p>
                  <p className="font-semibold mt-1">B-Tech in CSE</p>
                </div>

                <div className="bg-gray-100 p-4  border border-gray-100">
                  <p className="text-xs uppercase text-gray-500 tracking-wide">
                    Software Devloper at
                  </p>
                  <p className="font-semibold mt-1 text-[#03A6A1]">
                    Zaphira Organic Farm (OPC) Pvt. Ltd.
                  </p>
                </div>

                <div className="bg-gray-100 p-4  border border-gray-100 ">
                  <p className="text-xs uppercase text-gray-500 tracking-wide">
                    Portfolio Website
                  </p>
                  <a
                    href="https://asadinfo.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold mt-1 text-[#FF4F0F] hover:underline break-all"
                  >
                    https://asadinfo.vercel.app
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
