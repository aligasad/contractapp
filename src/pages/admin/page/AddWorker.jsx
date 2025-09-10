import { useEffect } from "react";
import { useData } from "../../../context/data/MyState";

function AddWorker() {
  const context = useData();
  const { workers, setWorkers, addWorker } = context;

  // Add new fields to your initial state if not already present
  // Example: { ...workers, brand: '', stock: '', discount: '', tags: '' }

  // District aur city ka mapping----------------------------------- --------------------------- ------------
  const districtCityMap = {
    "West Champaran": ["Bettiah", "Bagaha", "Narkatiaganj"],
    Siwan: ["Siwan", "Mairwa", "Gopalganj"],
  };

  return (
    <div className="py-6 min-h-screen bg-gradient-to-br from-green-50 to-lime-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
        <h1 className="text-center text-2xl font-extrabold text-green-800 mb-6 tracking-wide">
          Add New Workers
        </h1>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Worker's Name"
            value={workers.name}
            onChange={(e) => setWorkers({ ...workers, name: e.target.value })}
          />
          <input
            type="number"
            name="phone"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Phone (74XXXXXX26)"
            value={workers.phone || ""}
            onChange={(e) => setWorkers({ ...workers, phone: e.target.value })}
          />
          <input
            type="text"
            name="skills"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Skills"
            value={workers.skills || ""}
            onChange={(e) => setWorkers({ ...workers, skills: e.target.value })}
          />
          <input
            type="text"
            name="professional"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Professional In(eg. Invertor, Wiring etc)"
            value={workers.professional || ""}
            onChange={(e) => setWorkers({ ...workers, professional: e.target.value })}
            required
          />

          {/* District Select */}
          <select
            name="district"
            onChange={(e) => {
              setWorkers({ ...workers, district: e.target.value, city: "" }); // city reset kar do
            }}
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            required
          >
            <option value="">Select District</option>
            {Object.keys(districtCityMap).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          {/* City Select */}
          <select
            name="city"
            onChange={(e) => setWorkers({ ...workers, city: e.target.value })}
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            required
            disabled={!workers.district} // jab tak district select na ho tab tak disable
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
            name="area"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Area "
            value={workers.area}
            onChange={(e) => setWorkers({ ...workers, area: e.target.value })}
          />
          <input
            type="text"
            name="experience"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Experience (comma separated)"
            value={workers.experience || ""}
            onChange={(e) =>
              setWorkers({ ...workers, experience: e.target.value })
            }
          />
          <input
            type="url"
            name="profilePic"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="URL Pic"
            value={workers.profilePic || ""}
            onChange={(e) =>
              setWorkers({ ...workers, profilePic: e.target.value })
            }
          />
          <textarea
            cols="30"
            rows="4"
            name="aboutMe"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="aboutMe"
            value={workers.aboutMe}
            onChange={(e) =>
              setWorkers({ ...workers, aboutMe: e.target.value })
            }
          ></textarea>
          {/* New Ingredients Field */}
          {/* <textarea
            cols="30"
            rows="3"
            name="ingredients"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Ingredients (comma separated or paragraph)"
            value={workers.ingredients || ""}
            onChange={(e) =>
              setWorkers({ ...workers, ingredients: e.target.value })
            } */}

          {/* Checkbox------------- */}
          {/* <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={workers.isNew || false}
                onChange={(e) =>
                  setWorkers({ ...workers, isNew: e.target.checked })
                }
                className="accent-green-500 w-4 h-4"
              />
              <span className="text-green-700 text-sm">Mark as New</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={workers.onSale || false}
                onChange={(e) =>
                  setWorkers({ ...workers, onSale: e.target.checked })
                }
                className="accent-green-500 w-4 h-4"
              />
              <span className="text-green-700 text-sm">On Sale</span>
            </label>
          </div> */}
        </div>
        <button
          onClick={addWorker}
          className="mt-6 w-full bg-gradient-to-r from-green-400 to-lime-400 text-white font-bold py-2 rounded-lg shadow hover:from-green-500 hover:to-lime-500 transition"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddWorker;
