import React, { useState, useEffect } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import AddressModal from "./AddressModal"; // import address modal

const BookingModal = ({ isOpen, onClose, worker }) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      generateDates();
      setSelectedDate("");
      setSelectedTime("");
      setDescription("");
    }
  }, [isOpen]);

  const generateDates = () => {
    const today = new Date();
    const tempDates = [];
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      tempDates.push({
        iso: nextDate.toISOString().split("T")[0],
        day: nextDate.toLocaleDateString("en-US", { weekday: "short" }),
        date: nextDate.getDate(),
      });
    }
    setDates(tempDates);
  };

  const timeSlots = [
    "7 AM - 9 AM",
    "9 AM - 11 AM",
    "11 AM - 1 PM",
    "1 PM - 3 PM",
    "3 PM - 5 PM",
    "5 PM - 7 PM",
  ];

  // Step 1 → Open Address Modal instead of direct save
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    const booking = {
      workerId: worker?.id,
      workerName: worker?.name,
      date: selectedDate,
      time: selectedTime,
      description,
    };

    setBookingData(booking);
    setShowAddressModal(true); // open address modal
  };

  // Step 2 → Save booking + address
  const handleSaveAddress = async (address) => {
    if (!bookingData) return;

    setLoading(true);
    try {
      await addDoc(collection(firebaseDB, "bookings"), {
        ...bookingData,
        userAddress: address, // address merge
        createdAt: Timestamp.now(),
        status: "pending",
      });

      alert("Booking Confirmed with Address 🎉");
      setShowAddressModal(false);
      onClose();
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to save booking!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 max-h-[90vh]">
        <div className="bg-[#FFE3BB] rounded-2xl shadow-xl p-6 w-[420px]">
          <h2 className="text-xl font-bold text-[#03A6A1] mb-4 text-center">
            Book {worker?.name}
          </h2>

          {/* Dates */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Select Date</p>
            <div className="flex gap-2 flex-wrap">
              {dates.map((d, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedDate(d.iso);
                    setSelectedTime("");
                  }}
                  className={`px-3 py-2 rounded-lg shadow-sm border 
                    ${
                      selectedDate === d.iso
                        ? "bg-[#FF4F0F] text-white border-[#FF4F0F]"
                        : "bg-white text-gray-800 border-gray-300"
                    } hover:bg-[#FFA673] hover:text-white transition`}
                >
                  <div className="text-sm font-medium">{d.day}</div>
                  <div className="text-lg font-bold">{d.date}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Times */}
          {selectedDate && (
            <div className="mt-5">
              <p className="font-semibold text-gray-700 mb-2">Select Time</p>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(slot)}
                    className={`px-3 py-2 rounded-lg shadow-sm border text-sm font-medium
                      ${
                        selectedTime === slot
                          ? "bg-[#03A6A1] text-white border-[#03A6A1]"
                          : "bg-white text-gray-800 border-gray-300"
                      } hover:bg-[#FFA673] hover:text-white transition`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {selectedDate && selectedTime && (
            <div className="mt-5">
              <p className="font-semibold text-gray-700 mb-2">Description</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe issue/information in your words..."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
                rows="3"
              ></textarea>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="px-4 py-2 bg-[#03A6A1] text-white rounded-lg hover:bg-[#FF4F0F] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSave={handleSaveAddress}
      />
    </>
  );
};

export default BookingModal;
