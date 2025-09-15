import React, { useState } from "react";

const AddressModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = () => {
    if (!name || !phone || !address || !pincode) {
      alert("Please fill all fields");
      return;
    }

    onSave({ name, phone, address, pincode });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px]">
        <h2 className="text-lg font-bold text-[#03A6A1] mb-4 text-center">
          Enter Address Details
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          rows="3"
        ></textarea>
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#03A6A1] text-white rounded-lg hover:bg-[#FF4F0F]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
