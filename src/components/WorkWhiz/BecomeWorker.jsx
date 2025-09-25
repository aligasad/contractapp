// src/components/BecomeWorker.jsx
import { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import WorkerDashboard from "../WorkerDashboard/WorkerDashboard";
import Loader from "../loader/Loader";

function BecomeWorker() {
  const { workers, setWorkers, loading, setLoading, districtCityMap = {}, skillsProfessionMap = {} } = useData();
  const [hasData, setHasData] = useState(false);
  const [editMode, setEditMode] = useState(false);



  // -------------------{ Fetch worker data }-------------------------
  useEffect(() => {
    const fetchWorker = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(firebaseDB, "workers", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorkers({ uid: user.uid, ...docSnap.data() });
        setHasData(true);
      } else {
        setHasData(false);
      }
      setLoading(false);
    };

    fetchWorker();
  }, []);

  // -----------------------{ Delete worker }---------------------------
  const deleteWorker = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(firebaseDB, "workers", user.uid));
    setWorkers({});
    setHasData(false);
  };

  // ----------------------{ Save/Update worker }----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(firebaseDB, "workers", user.uid), {
      ...workers,
      uid: user.uid,
    });

    setHasData(true);
    setEditMode(false);
  };

  if (loading) return Loader;

  return (
    <>
      <div className="min-h-screen bg-[#FFE3BB] px-6 pt-10">
        <div className="relative bg-gradient-to-br from-[#FFE3BB] via-white to-[#FFF9F3] overflow-hidden p-8 rounded-2xl shadow-lg w-full max-w-5xl mx-auto border-2 border-[#03A6A1]">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#03A6A1]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFA673]/20 rounded-full blur-3xl"></div>
          {!hasData || editMode ? (
            // ----- { FORM } ------------------------------------
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-3xl font-bold text-center text-[#03A6A1] mb-6">
                {editMode ? "✏️ Edit Your Details" : "🚀 Become a Worker"}
              </h2>

              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                value={workers.name || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, name: e.target.value })
                }
                className="w-full border-2 border-[#FFA673] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
                required
              />

              {/* Phone */}
              <input
                type="text"
                placeholder="Phone Number"
                value={workers.phone || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, phone: e.target.value })
                }
                className="w-full border-2 border-[#FFA673] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
                required
              />

              {/* Skills Select */}
              <select
                name="skills"
                onChange={(e) => {
                  setWorkers({
                    ...workers,
                    skills: e.target.value,
                    professional: "",
                  }); // city reset kar do
                }}
                className="w-full border-2 border-[#FFA673] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
                required
              >
                <option value="">Select Skills</option>
                {Object.keys(skillsProfessionMap).map((skills) => (
                  <option key={skills} value={skills}>
                    {skills}
                  </option>
                ))}
              </select>

              {/* Profession Select */}
              <select
                name="professional"
                onChange={(e) =>
                  setWorkers({ ...workers, professional: e.target.value })
                }
                className="w-full border-2 border-[#FFA673] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
                required
                disabled={!workers.skills} // jab tak district select na ho tab tak disable
              >
                <option value="">Select Professional</option>
                {workers.skills &&
                  skillsProfessionMap[workers.skills].map((professional) => (
                    <option key={professional} value={professional}>
                      {professional}
                    </option>
                  ))}
              </select>

              {/* District */}
              <select
                value={workers.district || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, district: e.target.value, city: "" })
                }
                className="w-full border-2 border-[#FFA673] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
                required
              >
                <option value="">Select District</option>
                {Object.keys(districtCityMap).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              {/* City */}
              <select
                value={workers.city || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, city: e.target.value })
                }
                className="w-full border-2 border-[#FFA673] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
                required
                disabled={!workers.district}
              >
                <option value="">Select City</option>
                {workers.district &&
                  districtCityMap[workers.district].map((city) => (
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
                  setWorkers({ ...workers, area: e.target.value })
                }
                className="w-full border-2 border-[#FFA673] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
                required
              />

              {/* Profile Pic */}
              <input
                type="url"
                placeholder="Profile Picture URL"
                value={workers.profilePic || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, profilePic: e.target.value })
                }
                className="w-full border-2 border-[#FFA673] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
                required
              />

              {/* About Me */}
              <textarea
                placeholder="About Me"
                value={workers.aboutMe || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, aboutMe: e.target.value })
                }
                className="w-full border-2 border-[#FFA673] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A6A1] h-24"
                required
              ></textarea>

              {/* Experience */}
              <input
                type="text"
                placeholder="Experience"
                value={workers.experience || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, experience: e.target.value })
                }
                className="w-full border-2 border-[#FFA673] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
                required
              />

              {/* Checkbox */}
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  checked={workers.available || false}
                  onChange={(e) =>
                    setWorkers({ ...workers, available: e.target.checked })
                  }
                  className="accent-[#03A6A1] w-5 h-5"
                />
                <span className="text-[#03A6A1] font-medium">Available</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#03A6A1] hover:bg-[#02807d] text-white p-3 rounded-lg font-semibold text-lg shadow-md transition"
              >
                {editMode ? "Update Details" : "Submit"}
              </button>
            </form>
          ) : (
            <>
              {/* ------------------{ Worker Profile }--------------- */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#03A6A1] mb-6">
                  🎉 Your Worker Profile
                </h2>

                <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:gap-6 md:items-center  text-left">
                  {/* Image Section */}
                  <div className="flex justify-center">
                    <img
                      src={workers.profilePic}
                      alt="profile"
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-top border-4 border-[#03A6A1] shadow-md"
                    />
                  </div>

                  {/* ----------------------------{ Details Left }------------------------- */}
                  <div className=" md:space-y-2 text-lg">
                    <p>
                      <strong className="text-[#FF4F0F]">Name:</strong>{" "}
                      {workers.name}
                    </p>
                    <p>
                      <strong className="text-[#FF4F0F]">Phone:</strong>{" "}
                      {workers.phone}
                    </p>
                    <p>
                      <strong className="text-[#FF4F0F]">Skills:</strong>{" "}
                      {workers.skills}
                    </p>
                  </div>

                  {/* Details Right */}
                  <div className=" md:space-y-2 text-lg">
                    <p>
                      <strong className="text-[#FF4F0F]">Location:</strong>{" "}
                      {workers.area}, {workers.city}, {workers.district}
                    </p>
                    <p>
                      <strong className="text-[#FF4F0F]">Experience:</strong>{" "}
                      {workers.experience}
                    </p>
                    <p>
                      <strong className="text-[#FF4F0F]">About Me:</strong>{" "}
                      {workers.aboutMe}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6 w-full md:w-[50%]">
                <button
                  onClick={() => setEditMode(true)}
                  className="cursor-pointer flex-1 bg-[#FFA673] hover:bg-[#ff9555] text-white p-3 rounded-lg font-semibold shadow-md"
                >
                  Edit
                </button>
                <button
                  onClick={deleteWorker}
                  className="cursor-pointer flex-1 bg-[#FF4F0F] hover:bg-[#d93f0c] text-white p-3 rounded-lg font-semibold shadow-md"
                >
                  Delete
                </button>
              </div>
              <div className="w-full h-0.5 bg-[#ff9555] mt-6"></div>
              {/* Worker Dashboard */}
            </>
          )}
        </div>
      </div>
      <WorkerDashboard worker={workers} />
    </>
  );
}

export default BecomeWorker;
