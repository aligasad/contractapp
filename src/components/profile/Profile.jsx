import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import { firebaseDB, auth } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // -------FOR PASSWORD UPDATE-----------------
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 🔐 Change Password (Simple Version)
  const handleChangePassword = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!newPassword || !confirmPassword) {
      return toast.warning("Please fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await updatePassword(user, newPassword);
      toast.success("Password changed successfully 🎉");

      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordSection(false);
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        toast.error("Please login again to change password");
      } else {
        toast.error("Password change failed");
      }
    }
  };

  // -------END PASSWORD UPDATE-----------------

  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    bio: "",
    address: "",
    pincode: "",
  });

  // Load User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(firebaseDB, "users", user.uid);
          const docSnap = await getDoc(docRef);

          let firestoreData = {};

          if (docSnap.exists()) {
            firestoreData = docSnap.data();
          }

          const combinedData = {
            name: user.displayName || firestoreData.name || "",
            email: user.email,
            photoURL: user.photoURL || firestoreData.photoURL || "",
            bio: firestoreData.bio || "",
            address: firestoreData.address || "",
            pincode: firestoreData.pincode || "",
          };

          setUserData(combinedData);
          setFormData(combinedData);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update Profile
  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      // ✅ Update Firebase Authentication
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      console.log("DATA DIA", formData);
      // ✅ Update Firestore (merge to avoid overwrite)
      const userRef = doc(firebaseDB, "users", user.uid);

      await setDoc(
        userRef,
        {
          name: formData.name,
          email: user.email,
          photoURL: formData.photoURL,
          bio: formData.bio,
          address: formData.address,
          pincode: formData.pincode,
          updatedAt: new Date(),
        },
        { merge: true },
      );

      toast.success("Profile updated successfully 🎉");
      setEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-[#f6fef9] flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
          My Profile
        </h2>

        <div className="flex flex-col items-center space-y-4">
          <img
            src={formData.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />

          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="Image URL"
                className="border p-2 rounded w-full"
              />

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pin Code"
                className="border p-2 rounded w-full"
              />

              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-800">
                {userData.name}
              </h3>
              <p className="text-sm text-gray-500">{userData.email}</p>
              <p className="text-sm text-gray-600 mt-2">
                {userData.bio || "No bio added"}
              </p>

              <div className="flex items-center gap-3 ">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-[#4CAF50] text-white text-xs md:text-sm px-3 py-1 rounded-lg hover:bg-[#3b873e] cursor-pointer"
                >
                  Edit Profile
                </button>
                {/* 🔐 Change Password Button */}
                <button
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="bg-blue-600 text-white text-xs md:text-sm px-3 py-1 rounded-lg cursor-pointer"
                >
                  Change Password
                </button>
              </div>
              {/* 🔐 Password Section */}
              {showPasswordSection && (
                <div className="mt-4 space-y-3">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border p-2 rounded w-full"
                  />

                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-2 rounded w-full"
                  />

                  <button
                    onClick={handleChangePassword}
                    className="bg-blue-700 text-white px-4 py-2 rounded w-full"
                  >
                    Update Password
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        <div
          className="mt-4 bg-gradient-to-r from-gray-50 to-gray-100 
                rounded-2xl p-5 border border-gray-200"
        >
          <div className="space-y-4">
            {/* Address Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-1">
              <span className="text-sm font-semibold text-gray-600">
                Address
              </span>

              <span
                className="text-sm text-gray-800 bg-white px-4 py-2 
                       rounded-lg shadow-sm border border-gray-200 
                       mt-1 sm:mt-0"
              >
                {userData.address || "Not provided"}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-300 opacity-40"></div>

            {/* Pin Code Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-semibold text-gray-600">
                Pin Code
              </span>

              <span className="text-sm font-bold text-blue-600 tracking-wide">
                {userData.pincode || "Not provided"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={handleSignOut}
            className="text-white bg-rose-700 px-4 py-2 rounded-lg hover:bg-white hover:text-rose-700 border-2 border-rose-700 cursor-pointer transition-all duration-200 "
          >
            Log Out
          </button>
          <button
            onClick={() => navigate("/join")}
            className="text-rose-700 bg-white border-rose-700 border-2 px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white transition-all duration-200 cursor-pointer "
          >
            Become a Worker
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          App version 1.0.1
        </p>
      </div>
    </div>
  );
}

export default Profile;
