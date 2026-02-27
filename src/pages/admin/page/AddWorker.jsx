import { useEffect } from "react";
import { useData } from "../../../context/data/MyState";

function AddWorker() {
  const context = useData();

  const {
    workers,
    setWorkers,
    addWorker,
    worker,
    stateDistrictMap,
    companyRoleMap,
  } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-6 min-h-screen bg-gradient-to-br from-green-50 to-lime-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
        <h1 className="text-center text-2xl font-extrabold text-green-800 mb-6">
          Add New Worker
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Worker Name"
            value={workers.name || ""}
            onChange={(e) => setWorkers({ ...workers, name: e.target.value })}
            className="input"
          />

          {/* Phone */}
          <input
            type="number"
            placeholder="Phone Number"
            value={workers.phone || ""}
            onChange={(e) => setWorkers({ ...workers, phone: e.target.value })}
            className="input"
          />
          {/* Aadhar Number */}
          <input
            type="number"
            placeholder="Aadhar Number"
            value={workers.aadhar || ""}
            onChange={(e) => setWorkers({ ...workers, aadhar: e.target.value })}
            className="input"
          />

          {/* Gender */}
          <select
            value={workers.gender || ""}
            onChange={(e) => setWorkers({ ...workers, gender: e.target.value })}
            className="input"
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
            onChange={(e) => setWorkers({ ...workers, dob: e.target.value })}
            className="input"
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
            disabled={!workers.company}
            onChange={(e) =>
              setWorkers({
                ...workers,
                role: e.target.value,
              })
            }
            className="input"
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
            disabled={!workers.district}
            onChange={(e) =>
              setWorkers({
                ...workers,
                city: e.target.value,
              })
            }
            className="input"
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
            onChange={(e) => setWorkers({ ...workers, area: e.target.value })}
            className="input"
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
          />

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
          />

          {/* Availability */}
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

          <hr />
          <h3>Account Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
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
        </div>

        <button
          onClick={addWorker}
          className="mt-6 w-full bg-gradient-to-r from-green-400 to-lime-400 text-white font-bold py-2 rounded-lg cursor-pointer"
        >
          Add Worker
        </button>
      </div>
    </div>
  );
}

export default AddWorker;
