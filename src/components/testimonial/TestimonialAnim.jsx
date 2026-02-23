"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { firebaseDB, auth } from "../../firebase/FirebaseConfig";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight, IconPlus } from "@tabler/icons-react";
import { toast } from "react-toastify";

const TestimonialAnim = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [active, setActive] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    quote: "",
    photo: "",
  });

  // fetch testimonials
  useEffect(() => {
    const q = query(
      collection(firebaseDB, "testimonials"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arr = [];
      snapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      setTestimonials(arr);
    });

    return () => unsubscribe();
  }, []);

  // check already added
  useEffect(() => {
    checkUserTestimonial();
  }, []);

  const checkUserTestimonial = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const q = query(
      collection(firebaseDB, "testimonials"),
      where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      setAlreadyAdded(true);
    }
  };

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // add testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (alreadyAdded) {
      toast.warning("You already added testimonial");
      return;
    }

    if (!formData.name || !formData.quote) {
      toast.error("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(firebaseDB, "testimonials"), {
        name: formData.name,
        designation: formData.designation,
        quote: formData.quote,
        src:
          formData.photo ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        userId: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      toast.success("Testimonial Added");

      setAlreadyAdded(true);
      setShowForm(false);

      setFormData({
        name: "",
        designation: "",
        quote: "",
        photo: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error adding testimonial");
    }

    setLoading(false);
  };

  // navigation
  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const isActive = (index) => index === active;

  return (
    <div className="bg-gradient-to-b from-[#eabaa0] via-[#FDFBF5] to-white py-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-[#03A6A1]">
          Worker Testimonials
        </h2>

        <button
          disabled={alreadyAdded}
          onClick={() => setShowForm(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition 
          ${
            alreadyAdded
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#03A6A1] hover:bg-[#02807C] cursor-pointer"
          }`}
        >
          <IconPlus size={18} />
          {alreadyAdded ? "Already Added" : "Add Testimonial"}
        </button>

      </div>

      {/* testimonial section */}
      {testimonials.length > 0 && (
        <div className="relative mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10">

          {/* image */}
          <div className="relative h-70 w-70 mx-auto">

            <AnimatePresence mode="wait">

              {testimonials.map((item, index) =>
                isActive(index) && (
                  <motion.img
                    key={item.id}
                    src={item.src}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute w-full h-full object-cover rounded-2xl shadow-xl border"
                  />
                )
              )}

            </AnimatePresence>

          </div>

          {/* text */}
          <div className="flex flex-col justify-center">

            <AnimatePresence mode="wait">

              <motion.div
                key={testimonials[active]?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >

                <h3 className="text-2xl font-bold text-[#03A6A1]">
                  {testimonials[active]?.name}
                </h3>

                <p className="text-[#FF4F0F]">
                  {testimonials[active]?.designation}
                </p>

                <p className="mt-3 text-gray-600">
                  {testimonials[active]?.quote}
                </p>

              </motion.div>

            </AnimatePresence>

            <div className="flex gap-4 mt-5">

              <button
                onClick={handlePrev}
                className="p-2 bg-[#03A6A1] text-white rounded-full"
              >
                <IconArrowLeft />
              </button>

              <button
                onClick={handleNext}
                className="p-2 bg-[#FF4F0F] text-white rounded-full"
              >
                <IconArrowRight />
              </button>

            </div>

          </div>

        </div>
      )}

      {/* FORM MODAL */}
      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-96 space-y-3"
          >

            <h3 className="text-xl font-bold">
              Add Testimonial
            </h3>

            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="designation"
              placeholder="Designation"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="photo"
              placeholder="Photo URL"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <textarea
              name="quote"
              placeholder="Your testimonial"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-3">

              <button
                type="submit"
                disabled={loading}
                className="bg-[#03A6A1] text-white px-4 py-2 rounded"
              >
                {loading ? "Adding..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
};

export default TestimonialAnim;