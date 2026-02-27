// src/components/BecomeWorker.jsx

import { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import {
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import WorkerDashboard from "../WorkerDashboard/WorkerDashboard";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";

function BecomeWorker() {
  const {
    workers,
    setWorkers,
    addWorker,
    loading,
    setLoading,
    stateDistrictMap = {},
    companyRoleMap = {},
  } = useData();

  const [hasData, setHasData] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // ------------------- Fetch worker data -------------------
  useEffect(() => {
    const fetchWorker = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const docRef = doc(firebaseDB, "workers", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorkers({
          uid: user.uid,
          ...docSnap.data(),
        });

        setHasData(true);
      } else {
        setHasData(false);
      }

      setLoading(false);
    };

    fetchWorker();
  }, []);

  // ------------------- Delete worker -------------------

  const deleteWorker = async () => {
    const user = auth.currentUser;

    if (!user) return;

    await deleteDoc(doc(firebaseDB, "workers", user.uid));

    setWorkers({});

    setHasData(false);
  };

  // ------------------- Submit worker -------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !workers.name ||
      !workers.phone ||
      !workers.gender ||
      !workers.district ||
      !workers.role
    ) {
      return toast.warning("Please fill all required fields");
    }

    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        toast.error("User not logged in");
        return;
      }

      // IMPORTANT: use setDoc with user.uid
      await setDoc(doc(firebaseDB, "workers", user.uid), {
        ...workers,
        uid: user.uid,
        email: user.email,
        time: Date.now(),
      });

      toast.success("Worker Profile Saved!");

      setHasData(true);
      setEditMode(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save worker");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="min-h-screen bg-[#FFE3BB] px-6 py-10">
        <div className="relative bg-gradient-to-br from-[#FFE3BB] via-white to-[#FFF9F3] p-8 rounded-2xl shadow-lg w-full max-w-5xl mx-auto border-2 border-[#03A6A1]">
          {!hasData || editMode ? (
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <h2 className="text-3xl font-bold text-center text-[#03A6A1]">
                {editMode ? "Edit Worker Profile" : "Become a Worker"}
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Name */}

                <input
                  type="text"
                  placeholder="Full Name"
                  value={workers.name || ""}
                  onChange={(e) =>
                    setWorkers({ ...workers, name: e.target.value })
                  }
                  className="input"
                  required
                />

                {/* Phone */}

                <input
                  type="number"
                  placeholder="Phone"
                  value={workers.phone || ""}
                  onChange={(e) =>
                    setWorkers({ ...workers, phone: e.target.value })
                  }
                  className="input"
                  required
                />
                {/* Aadhar Number */}
                <input
                  type="number"
                  placeholder="Aadhar"
                  value={workers.aadhar || ""}
                  onChange={(e) =>
                    setWorkers({ ...workers, aadhar: e.target.value })
                  }
                  className="input"
                  required
                />

                {/* Gender */}

                <select
                  value={workers.gender || ""}
                  onChange={(e) =>
                    setWorkers({ ...workers, gender: e.target.value })
                  }
                  className="input"
                  required
                >
                  <option value="">Select Gender</option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>

                  <option value="Other">Other</option>
                </select>

                {/* DOB */}

                <input
                  type="date"
                  value={workers.dob || ""}
                  onChange={(e) =>
                    setWorkers({ ...workers, dob: e.target.value })
                  }
                  className="input"
                  required
                />

                {/* Marital Status */}

                <select
                  value={workers.maritalStatus || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      maritalStatus: e.target.value,
                    })
                  }
                  className="input"
                  required
                >
                  <option value="">Marital Status</option>

                  <option value="Single">Single</option>

                  <option value="Married">Married</option>

                  <option value="Divorced">Divorced</option>

                  <option value="Widowed">Widowed</option>
                </select>

                {/* Company */}

                <select
                  value={workers.company || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      company: e.target.value,
                      role: "",
                    })
                  }
                  className="input"
                  required
                >
                  <option value="">Select Company</option>

                  {Object.keys(companyRoleMap).map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>

                {/* Role */}

                <select
                  value={workers.role || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      role: e.target.value,
                    })
                  }
                  disabled={!workers.company}
                  className="input"
                  required
                >
                  <option value="">Select Role</option>

                  {workers.company &&
                    companyRoleMap[workers.company].map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                </select>

                {/* District */}

                <select
                  value={workers.district || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      district: e.target.value,
                      city: "",
                    })
                  }
                  className="input"
                  required
                >
                  <option value="">Select District</option>

                  {Object.keys(stateDistrictMap).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>

                {/* City */}

                <select
                  value={workers.city || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      city: e.target.value,
                    })
                  }
                  disabled={!workers.district}
                  className="input"
                  required
                >
                  <option value="">Select City</option>

                  {workers.district &&
                    stateDistrictMap[workers.district].map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>

                {/* Area */}

                <input
                  type="text"
                  placeholder="Area"
                  value={workers.area || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      area: e.target.value,
                    })
                  }
                  className="input"
                  required
                />

                {/* Experience */}

                <input
                  type="text"
                  placeholder="Experience"
                  value={workers.experience || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      experience: e.target.value,
                    })
                  }
                  className="input"
                  required
                />

                {/* Profile Pic */}

                <input
                  type="text"
                  placeholder="Profile Pic URL"
                  value={workers.profilePic || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      profilePic: e.target.value,
                    })
                  }
                  className="input"
                  required
                />

                {/* About */}

                <textarea
                  placeholder="About Worker"
                  value={workers.aboutMe || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      aboutMe: e.target.value,
                    })
                  }
                  className="input"
                  required
                />

                {/* Available */}

                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={workers.available || false}
                    onChange={(e) =>
                      setWorkers({
                        ...workers,
                        available: e.target.checked,
                      })
                    }
                  />
                  Available
                </label>
              </div>

              <hr />
              <h3>Account Details</h3>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Account Holder Name */}

                <input
                  type="text"
                  placeholder="Enter Account Holder Name"
                  value={workers.accountHolderName || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      accountHolderName: e.target.value,
                    })
                  }
                  className="input"
                  required
                />
                {/* Bank Name Name */}

                <input
                  type="text"
                  placeholder="Enter Bank Name"
                  value={workers.bankName || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      bankName: e.target.value,
                    })
                  }
                  className="input"
                  required
                />

                {/* Account Number */}

                <input
                  type="number"
                  placeholder="Enter Account Number"
                  value={workers.accountNumber || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      accountNumber: e.target.value,
                    })
                  }
                  className="input"
                  required
                />

                {/* Account IFSC Code */}

                <input
                  type="text"
                  placeholder="Enter IFSC Code"
                  value={workers.ifscCode || ""}
                  onChange={(e) =>
                    setWorkers({
                      ...workers,
                      ifscCode: e.target.value,
                    })
                  }
                  className="input"
                  required
                />
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="w-full bg-[#03A6A1] text-white p-3 rounded-lg cursor-pointer cursor-pointer"
              >
                {editMode ? "Update" : "Submit"}
              </button>
            </form>
          ) : (
            <>
              {/* Worker Profile */}

              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-[#FFE3BB] overflow-hidden">
                {/* Header Gradient */}
                <div className="bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] h-24 relative">
                  {/* Profile Image */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-12">
                    <img
                      src={workers.profilePic || "/default-user.png"}
                      alt="profile"
                      className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-16 pb-6 px-6 text-center">
                  {/* Name */}
                  <h2 className="text-2xl font-bold text-gray-800">
                    {workers.name || "N/A"}
                  </h2>

                  {/* Role + Company */}
                  <p className="text-sm text-[#FF4F0F] font-semibold mt-1">
                    {workers.role || "N/A"} • {workers.company || "N/A"}
                  </p>

                  {/* Status Badge */}
                  <div className="mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        workers.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {workers.available ? "Available" : "Not Available"}
                    </span>
                  </div>

                  {/* Info Grid */}
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="bg-[#FFE3BB]/40 rounded-lg p-2">
                      <span className="font-semibold text-[#03A6A1]">
                        Phone
                      </span>
                      <p>{workers.phone || "N/A"}</p>
                    </div>

                    <div className="bg-[#FFE3BB]/40 rounded-lg p-2">
                      <span className="font-semibold text-[#03A6A1]">
                        Gender
                      </span>
                      <p>{workers.gender || "N/A"}</p>
                    </div>

                    <div className="bg-[#FFE3BB]/40 rounded-lg p-2">
                      <span className="font-semibold text-[#03A6A1]">DOB</span>
                      <p>{workers.dob || "N/A"}</p>
                    </div>

                    <div className="bg-[#FFE3BB]/40 rounded-lg p-2">
                      <span className="font-semibold text-[#03A6A1]">
                        Marital
                      </span>
                      <p>{workers.maritalStatus || "N/A"}</p>
                    </div>

                    <div className="bg-[#FFE3BB]/40 rounded-lg p-2 col-span-2">
                      <span className="font-semibold text-[#03A6A1]">
                        Location
                      </span>
                      <p>
                        {workers.area}, {workers.city}, {workers.district}
                      </p>
                    </div>

                    <div className="bg-[#FFE3BB]/40 rounded-lg p-2 col-span-2">
                      <span className="font-semibold text-[#03A6A1]">
                        Experience
                      </span>
                      <p>{workers.experience || "0"} Years</p>
                    </div>
                  </div>

                  {/* About */}
                  {workers.aboutMe && (
                    <div className="mt-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border">
                      {workers.aboutMe}
                    </div>
                  )}

                  {/* Bank Details */}
                  <div className="mt-6 text-left">
                    <h3 className="text-lg font-bold text-[#03A6A1] mb-3 text-center">
                      Bank Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                      {/* Account Holder */}
                      <div className="bg-[#FFE3BB]/40 rounded-lg p-3">
                        <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Account Holder
                        </span>
                        <p className="font-medium break-words">
                          {workers.accountHolderName || "N/A"}
                        </p>
                      </div>

                      {/* Bank Name */}
                      <div className="bg-[#FFE3BB]/40 rounded-lg p-3">
                        <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Bank Name
                        </span>
                        <p className="font-medium break-words">
                          {workers.bankName || "N/A"}
                        </p>
                      </div>

                      {/* Account Number */}
                      <div className="bg-[#FFE3BB]/40 rounded-lg p-3">
                        <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Account Number
                        </span>
                        <p className="font-mono tracking-wide">
                          {workers.accountNumber || "N/A"}
                        </p>
                      </div>

                      {/* IFSC */}
                      <div className="bg-[#FFE3BB]/40 rounded-lg p-3">
                        <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          IFSC Code
                        </span>
                        <p className="font-mono text-[#FF4F0F] tracking-wider">
                          {workers.ifscCode || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-6 justify-center">
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-5 py-2 bg-gradient-to-r from-[#FFA673] to-[#FF4F0F] text-white font-semibold rounded-lg shadow hover:scale-105 transition cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={deleteWorker}
                      className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 hover:scale-105 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BecomeWorker;
