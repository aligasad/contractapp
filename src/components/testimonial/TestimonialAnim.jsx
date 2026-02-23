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
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { firebaseDB, auth } from "../../firebase/FirebaseConfig";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowLeft,
  IconArrowRight,
  IconPlus,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

import { toast } from "react-toastify";

const TestimonialAnim = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [active, setActive] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    quote: "",
    photo: "",
  });

  const user = auth.currentUser;

  // FETCH testimonials
  useEffect(() => {
    const q = query(
      collection(firebaseDB, "testimonials"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arr = [];

      snapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });

      setTestimonials(arr);

      // check if user already added
      if (user) {
        const found = arr.find((item) => item.userId === user.uid);
        setAlreadyAdded(!!found);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // INPUT HANDLE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD OR UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!formData.name || !formData.quote) {
      toast.error("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        // UPDATE
        await updateDoc(doc(firebaseDB, "testimonials", editId), {
          name: formData.name,
          designation: formData.designation,
          quote: formData.quote,
          src:
            formData.photo ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        });

        toast.success("Testimonial Updated");
      } else {
        // ADD
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
      }

      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Error occurred");
    }

    setLoading(false);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete your testimonial?")) return;

    try {
      await deleteDoc(doc(firebaseDB, "testimonials", id));

      toast.success("Deleted Successfully");

      setAlreadyAdded(false);

      if (active > 0) setActive(active - 1);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // EDIT
  const handleEdit = (item) => {
    setEditId(item.id);

    setFormData({
      name: item.name,
      designation: item.designation,
      quote: item.quote,
      photo: item.src,
    });

    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      quote: "",
      photo: "",
    });

    setEditId(null);
    setShowForm(false);
  };

  // NAVIGATION
  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const current = testimonials[active];

  return (
    <div className="bg-gradient-to-b from-[#eabaa0] via-[#FDFBF5] to-white py-10 ">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#03A6A1] text-center ">
            Worker Testimonials
          </h2>
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        {/* Button */}
          <button
            disabled={alreadyAdded && !editId}
            onClick={() => setShowForm(true)}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white transition w-full sm:w-auto
      ${
        alreadyAdded && !editId
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#03A6A1] hover:bg-[#02807C]"
      }`}
          >
            <IconPlus size={16} className="font-bold" />
            <span className="text-sm font-semibold">
              {alreadyAdded ? "Already Added" : "Add Testimonial"}
            </span>
          </button>
      </div>

      {/* CONTENT */}
      {current && (
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 px-6 ">
          {/* IMAGE */}
          <div className="flex flex-col lg:flex-row items-center sm:items-end">
            {/* Image */}
            <motion.img
              key={current.id}
              src={current.src}
              className="
      w-52 h-52 sm:w-64 sm:h-64 lg:w-70 lg:h-70
      object-cover rounded-xl shadow
      order-1 lg:order-2
      lg:ml-auto
    "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* Text / Content */}
            <div className="order-2 lg:order-1">
              {/* your testimonial text */}
            </div>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold text-[#03A6A1]">
              {current.name}
            </h3>

            <p className="text-[#FF4F0F]">{current.designation}</p>

            <p className="mt-3 text-gray-600">{current.quote}</p>

            {/* EDIT DELETE BUTTON */}
            {user && user.uid === current.userId && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(current)}
                  className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  <IconEdit size={16} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(current.id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  <IconTrash size={16} />
                  Delete
                </button>
              </div>
            )}

            {/* NAV BUTTON */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={handlePrev}
                className="p-2 bg-[#03A6A1] text-white rounded-full cursor-pointer"
              >
                <IconArrowLeft />
              </button>

              <button
                onClick={handleNext}
                className="p-2 bg-[#FF4F0F] text-white rounded-full cursor-pointer"
              >
                <IconArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-96 space-y-3"
          >
            <h3 className="text-xl font-bold">
              {editId ? "Edit Testimonial" : "Add Testimonial"}
            </h3>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 rounded"
            />

            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="w-full border p-2 rounded"
            />

            <input
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="Photo URL"
              className="w-full border p-2 rounded"
            />

            <textarea
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              placeholder="Testimonial"
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-3">
              <button
                disabled={loading}
                className="bg-[#03A6A1] text-white px-4 py-2 rounded"
              >
                {loading ? "Saving..." : editId ? "Update" : "Submit"}
              </button>

              <button
                type="button"
                onClick={resetForm}
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
