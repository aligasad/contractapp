// import { useEffect, useState } from "react";
// import { auth, firebaseDB } from "../../firebase/FirebaseConfig"; // apna firebase config import karo
// import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
// import Loader from "../loader/Loader";

// function BecomeWorker() {
//   const [loading, setLoading] = useState(true);
//   const [workerData, setWorkerData] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     skills: "",
//     area: "",
//     city: "",
//     district: "",
//     experience: "",
//     aboutMe: "",
//     profilePic: "",
//     experienceYears: "",
//   });
//   const [editing, setEditing] = useState(false);

//   const user = auth.currentUser;

//   // District aur city ka mapping----------------------------------- --------------------------- ------------
//   const districtCityMap = {
//     "West Champaran": ["Bettiah", "Bagaha", "Narkatiaganj"],
//     Siwan: ["Siwan", "Mairwa", "Gopalganj"],
//   };

//   // Worker data fetch
//   useEffect(() => {
//     const fetchWorker = async () => {
//       if (!user) {
//         setLoading(false);
//         return;
//       }
//       try {
//         const docRef = doc(firebaseDB, "workers", user.uid);
//         const snap = await getDoc(docRef);

//         if (snap.exists()) {
//           setWorkerData(snap.data());
//         }
//       } catch (error) {
//         console.error("Error fetching worker:", error);
//       }
//       setLoading(false);
//     };

//     fetchWorker();
//   }, [user]);

//   // Handle input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Add new worker
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return;

//     setLoading(true);
//     try {
//       const docRef = doc(firebaseDB, "workers", user.uid);
//       await setDoc(docRef, {
//         ...form,
//         userId: user.uid,
//         createdAt: new Date(),
//       });
//       setWorkerData({ ...form, userId: user.uid });
//       setForm({
//         fullName: "",
//         phone: "",
//         skills: "",
//         area: "",
//         city: "",
//         district: "",
//         profilePic: "",
//         aboutMe: "",
//         experienceYears: "",
//       });
//     } catch (error) {
//       console.error("Error adding worker:", error);
//     }
//     setLoading(false);
//   };

//   // Update worker
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!user) return;

//     setLoading(true);
//     try {
//       const docRef = doc(firebaseDB, "workers", user.uid);
//       await updateDoc(docRef, { ...form });
//       setWorkerData({ ...form, userId: user.uid });
//       setEditing(false);
//     } catch (error) {
//       console.error("Error updating worker:", error);
//     }
//     setLoading(false);
//   };

//   // Delete worker
//   const handleDelete = async () => {
//     if (!user) return;

//     setLoading(true);
//     try {
//       const docRef = doc(firebaseDB, "workers", user.uid);
//       await deleteDoc(docRef);
//       setWorkerData(null);
//       setForm({
//         name: "",
//         phone: "",
//         skills: "",
//         area: "",
//         city: "",
//         district: "",
//         profilePic: "",
//         aboutMe: "",
//         experience: "",
//       });
//     } catch (error) {
//       console.error("Error deleting worker:", error);
//     }
//     setLoading(false);
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         {!workerData || editing ? (
//           <form
//             onSubmit={editing ? handleUpdate : handleSubmit}
//             className="space-y-4"
//           >
//             <h2 className="text-xl font-bold mb-4">
//               {editing ? "Edit Worker Details" : "Become a Worker"}
//             </h2>

//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             />
//             <input
//               type="text"
//               name="skills"
//               placeholder="Skills (e.g., Plumber, Electrician)"
//               value={form.skills}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             />
//             {/* District Select */}
//             <select
//               name="district"
//               value={form.district}
//               onChange={(e) => {
//                 setForm({ ...form, district: e.target.value, city: "" }); // city reset kar do
//               }}
//               className="w-full border p-2 rounded"
//               required
//             >
//               <option value="">Select District</option>
//               {Object.keys(districtCityMap).map((district) => (
//                 <option key={district} value={district}>
//                   {district}
//                 </option>
//               ))}
//             </select>

//             {/* City Select */}
//             <select
//               name="city"
//               value={form.city}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//               disabled={!form.district} // jab tak district select na ho tab tak disable
//             >
//               <option value="">Select City</option>
//               {form.district &&
//                 districtCityMap[form.district].map((city) => (
//                   <option key={city} value={city}>
//                     {city}
//                   </option>
//                 ))}
//             </select>

//             <input
//               type="text"
//               name="area"
//               placeholder="Area"
//               value={form.area}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             />
//             <input
//               type="url"
//               name="profilePic"
//               placeholder="Profile Picture URL"
//               value={form.profilePic}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             />

//             {/* About Me */}
//             <textarea
//               name="aboutMe"
//               placeholder="About Me (Write your work experience/life story)"
//               value={form.aboutMe}
//               onChange={handleChange}
//               className="w-full border p-2 rounded h-24"
//               required
//             ></textarea>

//             {/* Experience Years */}
//             <input
//               type="number"
//               name="experienceYears"
//               placeholder="Experience (in years)"
//               value={form.experienceYears}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             />

//             <button
//               type="submit"
//               className="w-full bg-[#219C90] hover:bg-[#19786f] text-white p-2 rounded font-semibold"
//             >
//               {editing ? "Update" : "Submit"}
//             </button>
//           </form>
//         ) : (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Your Worker Profile</h2>
//             <img
//               src={workerData.profilePic}
//               alt="Profile"
//               className="w-24 h-24 rounded-full object-cover border mb-4"
//             />
//             <p>
//               <strong>Name:</strong> {workerData.fullName}
//             </p>
//             <p>
//               <strong>Phone:</strong> {workerData.phone}
//             </p>
//             <p>
//               <strong>Skills:</strong> {workerData.skills}
//             </p>
//             <p>
//               <strong>Area:</strong> {workerData.area}
//             </p>
//             <p>
//               <strong>City:</strong> {workerData.city}
//             </p>
//             <p>
//               <strong>District:</strong> {workerData.district}
//             </p>
//             <p>
//               <strong>Experience:</strong> {workerData.experienceYears} years
//             </p>
//             <p className="mt-2">
//               <strong>About Me:</strong> {workerData.aboutMe}
//             </p>

//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={() => {
//                   setForm(workerData);
//                   setEditing(true);
//                 }}
//                 className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BecomeWorker;


import { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

function BecomeWorker() {
  const { workers, setWorkers, addWorker } = useData();
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const districtCityMap = {
    "West Champaran": ["Bettiah", "Bagaha", "Narkatiaganj"],
    Siwan: ["Siwan", "Mairwa", "Gopalganj"],
  };

  // ✅ Check if user already has worker data
  useEffect(() => {
    const fetchWorker = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(firebaseDB, "workers", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorkers(docSnap.data());
        setHasData(true);
      } else {
        setHasData(false);
      }
      setLoading(false);
    };

    fetchWorker();
  }, []);

  // ✅ Delete worker data
  const deleteWorker = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(firebaseDB, "workers", user.uid));
    setWorkers({});
    setHasData(false);
  };

  // ✅ Save or Update worker data
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

  if (loading) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {!hasData || editMode ? (
          // ------------------ FORM ------------------
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Your Details" : "Become a Worker"}
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={workers.name || ""}
              onChange={(e) => setWorkers({ ...workers, name: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={workers.phone || ""}
              onChange={(e) => setWorkers({ ...workers, phone: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="Skills"
              value={workers.skills || ""}
              onChange={(e) =>
                setWorkers({ ...workers, skills: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Professional In(eg. Invertor, Wiring etc)"
              value={workers.professional || ""}
              onChange={(e) =>
                setWorkers({ ...workers, professional: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />

            {/* District */}
            <select
              value={workers.district || ""}
              onChange={(e) =>
                setWorkers({ ...workers, district: e.target.value, city: "" })
              }
              className="w-full border p-2 rounded"
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
              onChange={(e) => setWorkers({ ...workers, city: e.target.value })}
              className="w-full border p-2 rounded"
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

            <input
              type="text"
              placeholder="Area"
              value={workers.area || ""}
              onChange={(e) => setWorkers({ ...workers, area: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="url"
              placeholder="Profile Picture URL"
              value={workers.profilePic || ""}
              onChange={(e) =>
                setWorkers({ ...workers, profilePic: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />

            <textarea
              placeholder="About Me"
              value={workers.aboutMe || ""}
              onChange={(e) =>
                setWorkers({ ...workers, aboutMe: e.target.value })
              }
              className="w-full border p-2 rounded h-20"
              required
            ></textarea>

            <input
              type="text"
              placeholder="Experience"
              value={workers.experience || ""}
              onChange={(e) =>
                setWorkers({ ...workers, experience: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#219C90] hover:bg-[#19786f] text-white p-2 rounded font-semibold"
            >
              {editMode ? "Update Details" : "Submit"}
            </button>
          </form>
        ) : (
          // ------------------ DETAILS ------------------
          <div>
            <h2 className="text-xl font-bold mb-4">Your Worker Profile</h2>
            <img
              src={workers.profilePic}
              alt="profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p><strong>Name:</strong> {workers.name}</p>
            <p><strong>Phone:</strong> {workers.phone}</p>
            <p><strong>Skills:</strong> {workers.skills}</p>
            <p>
              <strong>Location:</strong> {workers.area}, {workers.city},{" "}
              {workers.district}
            </p>
            <p><strong>Experience:</strong> {workers.experience}</p>
            <p><strong>About Me:</strong> {workers.aboutMe}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={deleteWorker}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BecomeWorker;
