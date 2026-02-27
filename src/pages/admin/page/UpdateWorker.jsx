import { useEffect } from "react";
import { useData } from "../../../context/data/MyState";

function UpdateProduct() {
  const context = useData();

  const {
    workers,
    setWorkers,
    updateWorker,
    stateDistrictMap = {},
    companyRoleMap = {},
  } = context;

  // scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl border border-green-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl px-6 py-4">
          <h1 className="text-center text-white text-2xl font-bold tracking-wide">
            Update Worker Details
          </h1>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-green-700">
              Worker Name
            </label>
            <input
              type="text"
              value={workers.name || ""}
              onChange={(e) => setWorkers({ ...workers, name: e.target.value })}
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Phone Number
            </label>
            <input
              type="number"
              value={workers.phone || ""}
              onChange={(e) =>
                setWorkers({ ...workers, phone: e.target.value })
              }
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          {/* Aadhar Number */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Aadhar Number
            </label>
            <input
              type="number"
              value={workers.aadhar || ""}
              onChange={(e) =>
                setWorkers({ ...workers, aadhar: e.target.value })
              }
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Gender
            </label>
            <select
              value={workers.gender || ""}
              onChange={(e) =>
                setWorkers({ ...workers, gender: e.target.value })
              }
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Date of Birth
            </label>
            <input
              type="date"
              value={workers.dob || ""}
              onChange={(e) => setWorkers({ ...workers, dob: e.target.value })}
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Marital Status
            </label>
            <select
              value={workers.maritalStatus || ""}
              onChange={(e) =>
                setWorkers({
                  ...workers,
                  maritalStatus: e.target.value,
                })
              }
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Company
            </label>
            <select
              value={workers.company || ""}
              onChange={(e) =>
                setWorkers({
                  ...workers,
                  company: e.target.value,
                  role: "",
                })
              }
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="">Select Company</option>
              {Object.keys(companyRoleMap).map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-semibold text-green-700">Role</label>
            <select
              value={workers.role || ""}
              onChange={(e) => setWorkers({ ...workers, role: e.target.value })}
              disabled={!workers.company}
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="">Select Role</option>
              {workers.company &&
                companyRoleMap[workers.company]?.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              District
            </label>
            <select
              value={workers.district || ""}
              onChange={(e) =>
                setWorkers({
                  ...workers,
                  district: e.target.value,
                  city: "",
                })
              }
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="">Select District</option>
              {Object.keys(stateDistrictMap).map((district) => (
                <option key={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-semibold text-green-700">City</label>
            <select
              value={workers.city || ""}
              onChange={(e) => setWorkers({ ...workers, city: e.target.value })}
              disabled={!workers.district}
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="">Select City</option>
              {workers.district &&
                stateDistrictMap[workers.district]?.map((city) => (
                  <option key={city}>{city}</option>
                ))}
            </select>
          </div>

          {/* Area */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-green-700">Area</label>
            <input
              type="text"
              value={workers.area || ""}
              onChange={(e) => setWorkers({ ...workers, area: e.target.value })}
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Profile Pic */}
          <input
            type="text"
            placeholder="Profile Picture URL"
            value={workers.profilePic || ""}
            onChange={(e) =>
              setWorkers({
                ...workers,
                profilePic: e.target.value,
              })
            }
            className="input"
          />

          {/* About */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-green-700">
              About Worker
            </label>
            <textarea
              rows="3"
              value={workers.aboutMe || ""}
              onChange={(e) =>
                setWorkers({ ...workers, aboutMe: e.target.value })
              }
              className="w-full mt-1 bg-green-50 border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Availability */}
          <div className="md:col-span-2 flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              checked={workers.available || false}
              onChange={(e) =>
                setWorkers({
                  ...workers,
                  available: e.target.checked,
                })
              }
              className="w-5 h-5 accent-green-500"
            />
            <span className="text-green-700 font-medium">Worker Available</span>
          </div>
        </div>

        <hr className="px-5" />
        <h3 className="px-5 font-bold mt-5">Account Details</h3>
        <div className="grid sm:grid-cols-2 gap-4 p-5">
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

        {/* Button */}
        <div className="p-6 pt-0">
          <button
            onClick={updateWorker}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition shadow-lg cursor-pointer"
          >
            Update Worker
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
