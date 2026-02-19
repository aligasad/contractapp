// src/components/BecomeWorker.jsx

import { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import WorkerDashboard from "../WorkerDashboard/WorkerDashboard";
import Loader from "../loader/Loader";

function BecomeWorker() {

  const {
    workers,
    setWorkers,
    loading,
    setLoading,
    districtCityMap = {},
    companyRoleMap = {}
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
          ...docSnap.data()
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

    const user = auth.currentUser;

    if (!user) return;

    await setDoc(doc(firebaseDB, "workers", user.uid), {

      ...workers,
      uid: user.uid

    });

    setHasData(true);

    setEditMode(false);

  };

  if (loading) return <Loader />;

  return (

    <>
      <div className="min-h-screen bg-[#FFE3BB] px-6 pt-10">

        <div className="relative bg-gradient-to-br from-[#FFE3BB] via-white to-[#FFF9F3] p-8 rounded-2xl shadow-lg w-full max-w-5xl mx-auto border-2 border-[#03A6A1]">

          {!hasData || editMode ? (

            <form onSubmit={handleSubmit} className="space-y-4">

              <h2 className="text-3xl font-bold text-center text-[#03A6A1]">

                {editMode ? "Edit Worker Profile" : "Become a Worker"}

              </h2>

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
                type="text"
                placeholder="Phone"
                value={workers.phone || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, phone: e.target.value })
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
                    maritalStatus: e.target.value
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
                    role: ""
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
                    role: e.target.value
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
                    city: ""
                  })
                }
                className="input"
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
                  setWorkers({
                    ...workers,
                    city: e.target.value
                  })
                }
                disabled={!workers.district}
                className="input"
                required
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
                  setWorkers({
                    ...workers,
                    area: e.target.value
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
                    experience: e.target.value
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
                    profilePic: e.target.value
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
                    aboutMe: e.target.value
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
                      available: e.target.checked
                    })
                  }
                />

                Available

              </label>

              {/* Submit */}

              <button
                type="submit"
                className="w-full bg-[#03A6A1] text-white p-3 rounded-lg"
              >

                {editMode ? "Update" : "Submit"}

              </button>

            </form>

          ) : (

            <>
              {/* Worker Profile */}

              <div className="text-center">

                <img
                  src={workers.profilePic}
                  className="w-32 h-32 rounded-full mx-auto"
                />

                <h2 className="text-2xl font-bold mt-4">

                  {workers.name}

                </h2>

                <p>{workers.phone}</p>

                <p>{workers.gender}</p>

                <p>DOB: {workers.dob}</p>

                <p>Status: {workers.maritalStatus}</p>

                <p>
                  {workers.company} - {workers.role}
                </p>

                <p>
                  {workers.area}, {workers.city}, {workers.district}
                </p>

                <p>{workers.experience}</p>

                <p>{workers.aboutMe}</p>

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-orange-400 px-4 py-2 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={deleteWorker}
                    className="bg-red-500 px-4 py-2 text-white rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </>

          )}

        </div>

      </div>

      <WorkerDashboard worker={workers} />

    </>
  );

}

export default BecomeWorker;
