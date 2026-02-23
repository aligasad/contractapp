import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [result, setResult] = useState("");

  // smooth scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit (your function)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("message", formData.message);
      form.append("access_key", "72e5aab6-9072-4d19-a165-14fea5a42c82");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!")
        setResult("✅ Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setResult(`❌ Error: ${data.message}`);
      }
    } catch {
      setResult("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE3BB] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-[#03A6A1]/30 p-8">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#03A6A1] mb-2">
          Contact Us
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Have questions or need workers? Send us a message.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Message
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="5"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] text-white font-semibold py-3 rounded-lg hover:scale-105 transition"
          >
            Send Message
          </button>

          {/* Result */}
          {result && (
            <p className="text-center mt-3 font-medium text-gray-700">
              {result}
            </p>
          )}

        </form>

        {/* Extra info */}
        <div className="mt-8 border-t pt-5 text-center text-sm text-gray-600">
          <p>Labour Contractor Support</p>
          <p>Email: support@workwhiz.com</p>
          <p>Available: Monday - Saturday (9 AM - 6 PM)</p>
        </div>

      </div>
    </div>
  );
}

export default Contact;