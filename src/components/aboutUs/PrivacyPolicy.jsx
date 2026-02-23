import React, { useEffect } from "react";

function PrivacyPolicy() {
  
  useEffect(()=> {
    window.scrollTo({top: 0, behavior:"smooth"});
  });
  return (
    <div className="min-h-screen bg-[#FFE3BB]">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
        <p className="opacity-90 max-w-2xl mx-auto">
          This Privacy Policy explains how we collect, use, store, and protect
          worker information in our Labour Contractor Management System.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 mb-2">
              We collect the following information when workers register:
            </p>

            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Full Name</li>
              <li>Phone Number</li>
              <li>Aadhar Number</li>
              <li>Date of Birth</li>
              <li>Gender and Marital Status</li>
              <li>Address (Area, City, District, State)</li>
              <li>Company and Job Role</li>
              <li>Work Experience</li>
              <li>Profile Photo</li>
              <li>Email Address</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              2. How We Use Your Information
            </h2>

            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>To manage worker records</li>
              <li>To verify worker identity</li>
              <li>To assign workers to companies or projects</li>
              <li>To contact workers when required</li>
              <li>To maintain labour management records</li>
              <li>To improve system performance and services</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              3. Data Storage and Security
            </h2>
            <p className="text-gray-600">
              All worker information is securely stored using modern cloud
              database technology (Firebase). We take reasonable security
              measures to protect your data from unauthorized access, misuse,
              or disclosure.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              4. Data Sharing Policy
            </h2>
            <p className="text-gray-600 mb-2">
              We do not sell or share your personal information with third parties,
              except in the following cases:
            </p>

            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>When required by law</li>
              <li>When required for contractor management purposes</li>
              <li>When required to assign work or verify identity</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              5. Contractor Access to Information
            </h2>
            <p className="text-gray-600">
              The contractor has access to worker information for labour
              management, verification, and assignment purposes. Contractor
              ensures that information is used responsibly.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              6. Worker Rights
            </h2>

            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Workers can update their personal information</li>
              <li>Workers can request correction of incorrect data</li>
              <li>Workers can request account deletion</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              7. Data Retention
            </h2>
            <p className="text-gray-600">
              Worker data is stored as long as the worker remains registered
              in the system. Data may be removed upon request or if the account
              is terminated.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              8. Privacy Policy Updates
            </h2>
            <p className="text-gray-600">
              We reserve the right to update this Privacy Policy at any time.
              Any changes will be reflected on this page.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              9. Consent
            </h2>
            <p className="text-gray-600">
              By using this system and registering as a worker, you consent to
              the collection and use of your information as described in this
              Privacy Policy.
            </p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] text-white text-center py-4">
        © {new Date().getFullYear()} WorkWhiz Labour Contractor System. All rights reserved.
      </div>

    </div>
  );
}

export default PrivacyPolicy;
