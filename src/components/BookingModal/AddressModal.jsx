import React, { useState } from "react";
import { toast } from "react-toastify";

const AddressModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = () => {
    if (!name || !phone || !address || !pincode) {
      toast.warning("Please fill all fields");
      return;
    }

    onSave({ name, phone, address, pincode });
    onClose();
  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#FFE3BB] rounded-2xl shadow-2xl p-6 w-[400px] relative animate-fadeIn">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#03A6A1] mb-6 text-center">
          🏠 Enter Address Details
        </h2>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-2 border-[#03A6A1]/30 focus:border-[#03A6A1] focus:ring-2 focus:ring-[#03A6A1]/40 outline-none rounded-lg px-4 py-2 mb-3 shadow-sm"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border-2 border-[#03A6A1]/30 focus:border-[#03A6A1] focus:ring-2 focus:ring-[#03A6A1]/40 outline-none rounded-lg px-4 py-2 mb-3 shadow-sm"
        />
        <textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border-2 border-[#03A6A1]/30 focus:border-[#03A6A1] focus:ring-2 focus:ring-[#03A6A1]/40 outline-none rounded-lg px-4 py-2 mb-3 shadow-sm resize-none"
          rows="3"
        ></textarea>
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full border-2 border-[#03A6A1]/30 focus:border-[#03A6A1] focus:ring-2 focus:ring-[#03A6A1]/40 outline-none rounded-lg px-4 py-2 mb-5 shadow-sm"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium shadow hover:bg-gray-400 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="cursor-pointer px-5 py-2 rounded-lg font-medium text-white shadow transition-all bg-gradient-to-r from-[#03A6A1] to-[#FFA673] hover:from-[#FF4F0F] hover:to-[#FFA673]"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
