import React, { useEffect } from "react";

function TermsAndCondition() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <div className="min-h-screen bg-[#FFE3BB]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">Terms & Conditions</h1>
        <p className="opacity-90 max-w-2xl mx-auto">
          Please read these terms carefully before registering or using the
          labour contractor system. By using this platform, you agree to follow
          all rules and conditions mentioned below.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* 1 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              1. Worker Registration and Information
            </h2>
            <p className="text-gray-600">
              All workers must provide accurate and complete personal
              information, including full name, phone number, address, Aadhar
              number, date of birth, and other required details. Providing
              false, incomplete, or misleading information may result in
              rejection or permanent removal from the system.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              2. Identity Verification
            </h2>
            <p className="text-gray-600">
              The contractor reserves the right to verify worker identity using
              provided documents. Workers must cooperate in verification if
              requested. Failure to verify identity may lead to account
              suspension or removal.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              3. Contractor Rights and Authority
            </h2>
            <p className="text-gray-600 mb-2">
              The contractor has full authority to:
            </p>

            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Approve or reject worker registrations</li>
              <li>Edit or update worker information if required</li>
              <li>Suspend or delete worker accounts</li>
              <li>Control worker availability status</li>
              <li>Assign workers to companies or job roles</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              4. Worker Responsibilities
            </h2>

            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Provide correct and genuine personal information</li>
              <li>Maintain discipline and professional behavior</li>
              <li>Follow contractor instructions</li>
              <li>Not misuse the platform</li>
              <li>Not create duplicate accounts</li>
              <li>Keep login credentials secure</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              5. Account Suspension or Termination
            </h2>
            <p className="text-gray-600">
              Contractor reserves the right to suspend or permanently delete
              worker accounts without prior notice if the worker:
            </p>

            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Provides false information</li>
              <li>Violates system rules</li>
              <li>Misbehaves or acts unprofessionally</li>
              <li>Uses fake identity</li>
              <li>Misuses the platform</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              6. Data Privacy and Security
            </h2>
            <p className="text-gray-600">
              Worker data is stored securely and used only for labour
              management, identity verification, and contractor purposes.
              Personal information will not be shared with unauthorized third
              parties.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              7. Platform Usage Rules
            </h2>

            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>
                Users must use the platform only for labour-related purposes
              </li>
              <li>Unauthorized access attempts are strictly prohibited</li>
              <li>Users must not attempt to damage or hack the system</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-600">
              The contractor is not responsible for disputes, damages, or losses
              caused by workers outside the system or during work assignments.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              9. Changes to Terms and Conditions
            </h2>
            <p className="text-gray-600">
              Contractor reserves the right to modify or update these terms at
              any time. Continued use of the platform means acceptance of the
              updated terms.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-bold text-[#03A6A1] mb-2">
              10. Agreement and Acceptance
            </h2>
            <p className="text-gray-600">
              By registering and using this system, the worker confirms that all
              provided information is correct and agrees to follow all rules and
              regulations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsAndCondition;
