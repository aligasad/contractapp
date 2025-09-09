import { useEffect } from "react";
import { useData } from "../../../context/data/MyState";

function UpdateProduct() {
  const context = useData(); // custom hook
  const { workers, setWorkers, updateWorker } = context;

  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" py-3 ">
      <div className=" flex justify-center items-center h-full">
        <div className=" bg-gray-800 px-10 py-5 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Update Product
            </h1>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Worker's Name"
                value={workers.name}
                onChange={(e) =>
                  setWorkers({ ...workers, name: e.target.value })
                }
              />
              <input
                type="number"
                name="phone"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Phone (74XXXXXX26)"
                value={workers.phone || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, phone: e.target.value })
                }
              />
              <input
                type="text"
                name="skills"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Skills"
                value={workers.skills || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, skills: e.target.value })
                }
              />
              <input
                type="text"
                name="area"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Area "
                value={workers.area}
                onChange={(e) =>
                  setWorkers({ ...workers, area: e.target.value })
                }
              />
              <input
                type="text"
                name="city"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="city"
                value={workers.city || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, city: e.target.value })
                }
              />
              <input
                type="text"
                name="distric"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Distric"
                value={workers.distric || ""}
                onChange={(e) =>
                  setWorkers({ ...workers, distric: e.target.value })
                }
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
              {/* Rating Field */}
              {/* <input
            type="number"
            name="rating"
            min="1"
            max="5"
            step="0.1"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Rating (1-5)"
            value={products.rating || ""}
            onChange={(e) =>
              setProducts({ ...products, rating: e.target.value })
            }
          /> */}
              {/* Review Field */}
              {/* <textarea
            cols="30"
            rows="2"
            name="review"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Review"
            value={products.review || ""}
            onChange={(e) =>
              setProducts({ ...products, review: e.target.value })
            }
          ></textarea> */}
              {/* Checkboxes */}
              {/* <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={products.isNew || false}
                    onChange={(e) =>
                      setProducts({ ...products, isNew: e.target.checked })
                    }
                    className="accent-green-500 w-4 h-4"
                  />
                  <span className="text-green-700 text-sm">Mark as New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={products.onSale || false}
                    onChange={(e) =>
                      setProducts({ ...products, onSale: e.target.checked })
                    }
                    className="accent-green-500 w-4 h-4"
                  />
                  <span className="text-green-700 text-sm">On Sale</span>
                </label>
              </div> */}
            </div>
          </div>
          <div className=" flex justify-center mb-3">
            <button
              onClick={updateWorker}
              className="mt-3 px-6 py-2 bg-[#449474] text-white font-semibold rounded-full hover:bg-[#003d29] transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
