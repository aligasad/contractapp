import React, { useEffect } from "react";

function AboutUs() {
  useEffect(()=> {
    window.scrollTo({top:0, behavior:'smooth'});
  });
  return (
    <div className="min-h-screen bg-[#FFE3BB]">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">About Us</h1>
        <p className="max-w-2xl mx-auto opacity-90">
          We provide trusted, verified, and professional labour services for companies,
          contractors, and organizations across multiple industries.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

          {/* Who We Are */}
          <section>
            <h2 className="text-2xl font-bold text-[#03A6A1] mb-3">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We are a labour contractor platform that connects skilled and unskilled workers
              with contractors, companies, and organizations. Our mission is to simplify
              labour management, improve transparency, and ensure reliable workforce
              availability.
            </p>
          </section>

          {/* Our Mission */}
          <section>
            <h2 className="text-2xl font-bold text-[#03A6A1] mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to provide verified, skilled, and trustworthy labour to meet
              workforce requirements efficiently while ensuring proper worker management,
              identity verification, and availability tracking.
            </p>
          </section>

          {/* What We Provide */}
          <section>
            <h2 className="text-2xl font-bold text-[#03A6A1] mb-3">
              What We Provide
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-[#FFE3BB]/40 p-4 rounded-lg">
                ✔ Verified Worker Profiles
              </div>

              <div className="bg-[#FFE3BB]/40 p-4 rounded-lg">
                ✔ Labour Identity & Record Management
              </div>

              <div className="bg-[#FFE3BB]/40 p-4 rounded-lg">
                ✔ Worker Availability Tracking
              </div>

              <div className="bg-[#FFE3BB]/40 p-4 rounded-lg">
                ✔ Workforce Management System
              </div>

              <div className="bg-[#FFE3BB]/40 p-4 rounded-lg">
                ✔ Contractor Dashboard Control
              </div>

              <div className="bg-[#FFE3BB]/40 p-4 rounded-lg">
                ✔ Secure Worker Information Storage
              </div>

            </div>
          </section>

          {/* Industries */}
          <section>
            <h2 className="text-2xl font-bold text-[#03A6A1] mb-3">
              Industries We Serve
            </h2>

            <div className="grid md:grid-cols-3 gap-4 text-gray-600">

              <div className="bg-gray-50 p-4 rounded-lg">Construction</div>
              <div className="bg-gray-50 p-4 rounded-lg">Factory & Manufacturing</div>
              <div className="bg-gray-50 p-4 rounded-lg">Warehouse</div>
              <div className="bg-gray-50 p-4 rounded-lg">Loading & Unloading</div>
              <div className="bg-gray-50 p-4 rounded-lg">Cleaning Services</div>
              <div className="bg-gray-50 p-4 rounded-lg">General Labour Work</div>

            </div>
          </section>

          {/* Commitment */}
          <section>
            <h2 className="text-2xl font-bold text-[#03A6A1] mb-3">
              Our Commitment
            </h2>

            <p className="text-gray-600">
              We are committed to providing reliable labour services, maintaining proper
              worker records, and ensuring smooth communication between workers and contractors.
              Our system helps manage labour efficiently and professionally.
            </p>

          </section>

        </div>

      </div>

      

    </div>
  );
}

export default AboutUs;