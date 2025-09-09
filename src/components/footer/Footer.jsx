import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { firebaseDB } from "../../firebase/FirebaseConfig";

const Footer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState("");

  async function handleSubscribe() {
    if (!user) {
      toast.warning("Please login to subscribe.");
      return;
    }
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const subscribersRef = collection(firebaseDB, "subscribers");
      const q = query(subscribersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.warning("This email is already subscribed.");
        return;
      }

      await addDoc(subscribersRef, {
        email,
        subscribedAt: Timestamp.now(),
      });

      setEmail("");
      toast.success("Thank you for subscribing!");
    } catch (error) {
      console.error("Error adding email:", error);
      toast.error("Failed to subscribe. Please try again later.");
    }
  }

  return (
    <footer className="bg-[#EE4E4E] text-white px-6 md:px-20 py-12 relative overflow-hidden">
      {/* Decorative Gradient Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#FFF455]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-[#FFC700]/20 rounded-full blur-3xl"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 z-10">
        {/* Logo and Description */}
        <div>
          <h2 className="text-xl font-bold flex items-center mb-4">
            <span className="text-2xl mr-2">⚡</span> WorkWhiz
          </h2>
          <p className="text-sm leading-relaxed mb-4 text-white/90">
            Smart tools & solutions to simplify your workflow. Work faster,
            smarter, and better with WorkWhiz 🚀
          </p>
          <div className="flex space-x-3">
            {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, index) => (
              <div
                key={index}
                className="group w-9 h-9 flex items-center justify-center bg-white/10 rounded-full cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:bg-[#FFF455]"
              >
                <Icon className="text-white text-lg group-hover:text-[#219C90]" />
              </div>
            ))}
          </div>
        </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FFF455]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li
                className="hover:underline cursor-pointer hover:text-[#FFC700]"
                onClick={() => navigate("about")}
              >
                About Us
              </li>
              <li className="hover:underline cursor-pointer hover:text-[#FFC700]">
                Services
              </li>
              <li
                className="hover:underline cursor-pointer hover:text-[#FFC700]"
                onClick={() => navigate("pricing")}
              >
                Pricing
              </li>
              <li className="hover:underline cursor-pointer hover:text-[#FFC700]">
                Reviews
              </li>
              <li className="hover:underline cursor-pointer hover:text-[#FFC700]">
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FFF455]">
              Customer Care
            </h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-center gap-2 hover:text-[#FFC700]">
                <MdEmail />{" "}
                <a href="mailto:support@workwhiz.com">support@workwhiz.com</a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FFC700]">
                <MdPhone /> <a href="tel:+911234567890">+91-1234567890</a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FFC700]">
                <MdLocationOn />{" "}
                <a
                  href="https://www.google.com/maps?q=Lucknow"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lucknow, India
                </a>
              </li>
            </ul>
          </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#FFF455]">
            Stay Updated
          </h3>
          <p className="text-sm mb-4 text-white/90">
            Get the latest updates & productivity hacks from WorkWhiz.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70 mb-3 focus:outline-none focus:ring-2 focus:ring-[#FFC700]"
          />
          <button
            onClick={handleSubscribe}
            className="border-gray-600 border w-full bg-gradient-to-r from-[#FFC700] to-[#EE4E4E] text-white font-medium py-2 rounded-md transition transform hover:scale-105 hover:opacity-90 cursor-pointer"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white/80 z-10">
        <p className="mb-4 md:mb-0">© 2025 WorkWhiz. All rights reserved.</p>
        <div className="flex space-x-6">
          <a
            onClick={() => navigate("privacy-policy")}
            className="hover:underline cursor-pointer hover:text-[#FFC700]"
          >
            Privacy Policy
          </a>
          <a
            onClick={() => navigate("terms&condition")}
            className="hover:underline cursor-pointer hover:text-[#FFC700]"
          >
            Terms & Conditions
          </a>
          <a
            href="#"
            className="hover:underline cursor-pointer hover:text-[#FFC700]"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
