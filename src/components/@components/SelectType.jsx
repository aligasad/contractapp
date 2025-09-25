import React, { useState } from "react";

const electricianServices = [
  { title: "Inverter", moveTo: "/electrician/inverter" },
  { title: "Wiring", moveTo: "/electrician/wiring" },
  { title: "Light", moveTo: "/electrician/light" },
  { title: "Solar Repair And Installation", moveTo: "/electrician/solar" },
  { title: "Whole House Wiring", moveTo: "/electrician/whole" },
  { title: "Power Sockets and Switch Boards", moveTo: "/electrician/power" },
  { title: "Telephone And Networking Sockets", moveTo: "/electrician/telephone" },
  { title: "MCB & MCCBs", moveTo: "/electrician/mcb" },
  { title: "Fan", moveTo: "/electrician/fan" },
  { title: "Sub Meter", moveTo: "/electrician/meter" },
];

const beauticianServices = [
  { title: "Hair", moveTo: "/beautician/hair" },
  { title: "Waxing", moveTo: "/beautician/waxing" },
  { title: "Bridal Packages", moveTo: "/beautician/bridalpackages" },
  { title: "Makeup", moveTo: "/beautician/makeup" },
  { title: "Mehendi", moveTo: "/beautician/mehendi" },
  { title: "Facial", moveTo: "/beautician/facial" },
];

const SelectType = () => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getCategories = () => {
    if (selectedSkill === "Electrician") return electricianServices;
    if (selectedSkill === "Beautician") return beauticianServices;
    return [];
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      {/* Skill Select */}
      <label className="block mb-2 font-semibold">Select Skill</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={selectedSkill}
        onChange={(e) => {
          setSelectedSkill(e.target.value);
          setSelectedCategory(""); // reset category when skill changes
        }}
      >
        <option value="">-- Select Skill --</option>
        <option value="Electrician">Electrician</option>
        <option value="Beautician">Beautician</option>
      </select>

      {/* Category Select */}
      {selectedSkill && (
        <>
          <label className="block mb-2 font-semibold">Select Category</label>
          <select
            className="w-full border p-2 rounded mb-4"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            {getCategories().map((service, index) => (
              <option key={index} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Display Result */}
      {selectedCategory && (
        <div className="mt-4 p-3 bg-teal-50 border rounded">
          ✅ You selected <b>{selectedSkill}</b> → <b>{selectedCategory}</b>
        </div>
      )}
    </div>
  );
};

export default SelectType;
