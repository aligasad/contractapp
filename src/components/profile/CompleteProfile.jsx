import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

function CompleteProfile() {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  const uid = userData?.user?.uid;
  const email = userData?.user?.email;

  const [form, setForm] = useState({
    name: "",
    email: email || "",
    address: "",
    pincode: "",
    photoURL: "",
    bio: "",
  });

  // Fetch existing user profile
  useEffect(() => {
    if (!uid) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(firebaseDB, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setForm((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [uid, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signedUpAt = new Date().toISOString();

      const updatedForm = {
        ...form,
        signedUpAt,
      };

      await setDoc(doc(firebaseDB, "users", uid), updatedForm);

      // Update localStorage
      const updatedUserData = {
        ...userData,
        user: {
          ...userData.user,
          ...updatedForm,
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUserData));

      toast.success("Profile saved successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">

      {/* Main responsive container */}
      <div
        className="
          w-full
          min-h-screen
          px-4 py-6
          sm:px-6 sm:py-8
          md:px-8
          lg:px-10
          xl:px-12
        "
      >

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            w-full
            bg-white
            rounded-2xl
            shadow-lg
            p-5
            sm:p-6
            md:p-8
            lg:p-10
            space-y-5
          "
        >

          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Complete Your Profile
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Add your personal information
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="
                w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-green-500
                transition
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="
                w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                bg-gray-100
                text-gray-500
                cursor-not-allowed
              "
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>

            <textarea
              name="address"
              placeholder="Enter your complete address"
              value={form.address}
              onChange={handleChange}
              required
              rows={4}
              className="
                w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                outline-none
                resize-none
                focus:ring-2
                focus:ring-green-500
                focus:border-green-500
                transition
              "
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              placeholder="Enter pincode"
              value={form.pincode}
              onChange={handleChange}
              required
              className="
                w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-green-500
                transition
              "
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image URL
            </label>

            <input
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              value={form.photoURL}
              onChange={handleChange}
              className="
                w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-green-500
                transition
              "
            />
          </div>

          {/* Biography */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biography
            </label>

            <textarea
              name="bio"
              placeholder="Tell us something about yourself..."
              value={form.bio}
              onChange={handleChange}
              rows={5}
              className="
                w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                outline-none
                resize-none
                focus:ring-2
                focus:ring-green-500
                focus:border-green-500
                transition
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              bg-green-600
              hover:bg-green-700
              active:bg-green-800
              text-white
              py-3
              rounded-lg
              cursor-pointer
              transition-colors
              duration-300
              font-semibold
              text-base
              sm:text-lg
            "
          >
            Save Profile
          </button>

        </form>
      </div>
    </div>
  );
}

export default CompleteProfile;
