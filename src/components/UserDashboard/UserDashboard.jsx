import React, { useEffect, useState } from "react";
import { firebaseDB, auth } from "../../firebase/FirebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [editBooking, setEditBooking] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Fetch user bookings------------------------------------
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(firebaseDB, "bookings"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(data);
    });

    return () => unsubscribe();
  }, []);

  // Cancel booking------------------------------------
  const handleCancel = async (id) => {
    try {
      await updateDoc(doc(firebaseDB, "bookings", id), { status: "cancelled" });
      alert("Booking cancelled ❌");
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  // Save updated date/time------------------------------------
  const handleUpdateBooking = async () => {
    if (!editBooking) return;
    try {
      await updateDoc(doc(firebaseDB, "bookings", editBooking.id), {
        date: newDate || editBooking.date,
        time: newTime || editBooking.time,
        status: "pending", // reset to pending for worker confirmation------------------------------------
      });
      alert("Booking updated");
      setEditBooking(null);
      setNewDate("");
      setNewTime("");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  // Search filter------------------------------------
  const filteredBookings = bookings.filter(
    (b) =>
      b.workerName?.toLowerCase().includes(search.toLowerCase()) ||
      b.date?.includes(search) ||
      b.time?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 relative bg-gradient-to-br from-[#FFE3BB] via-white to-[#FFF9F3] min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#03A6A1] mb-6">
        My Bookings
      </h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by worker, date, or time..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[#03A6A1]"
        />
      </div>

      {/* Bookings Table */}
      <div className="shadow-md rounded-xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="p-3 border">Worker</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">{b.workerName}</td>
                  <td className="p-3 border">{b.date}</td>
                  <td className="p-3 border">{b.time}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        b.status === "pending"
                          ? "bg-yellow-200 text-yellow-700"
                          : b.status === "confirmed"
                          ? "bg-green-200 text-green-700"
                          : b.status === "cancelled"
                          ? "bg-red-200 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 border flex gap-2 flex-wrap">
                    <button
                      onClick={() => setEditBooking(b)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {/* {editBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-xl font-bold text-[#03A6A1] mb-4 text-center">
              Update Booking
            </h3>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-600">Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-600">Time</label>
              <input
                type="text"
                placeholder="e.g. 2 PM - 4 PM"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditBooking(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateBooking}
                className="px-4 py-2 bg-[#03A6A1] text-white rounded hover:bg-teal-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Update Modal */}
      {editBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-xl font-bold text-[#03A6A1] mb-4 text-center">
              Update Booking
            </h3>

            {(() => {
              const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
              const bookingDate = editBooking.date; // already stored in yyyy-mm-dd

              if (bookingDate === today) {
                // ❌ Same day → no update allowed
                return (
                  <div className="text-center">
                    <p className="text-red-600 mb-6 font-medium">
                      You cannot update a booking on the same day. Please cancel
                      if needed.
                    </p>
                    <button
                      onClick={() => handleCancel(editBooking.id)}
                      className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel Booking
                    </button>
                    <button
                      onClick={() => setEditBooking(null)}
                      className="ml-3 px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Close
                    </button>
                  </div>
                );
              } else {
                // Future date → allow update
                // { Hum isme ye option lagaye hai ke user same date pe time and date update na kar paye sirf cancel kar paye matlab ke wo 18 Sep ka kisi worker ko book kiya ho aur 18 Sep ko wo update karna chahe to update button disable ho sirf cancel ho paye.}
                return (
                  <>
                    {/* Date----------------------------- */}
                    <div className="mb-4">
                      <label className="block mb-2 text-sm text-gray-600">
                        Date
                      </label>
                      <select
                        value={newDate || editBooking.date}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full border p-2 rounded-lg"
                      >
                        <option value="">-- Select Date --</option>
                        {Array.from({ length: 7 }).map((_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() + i);
                          const formatted = date.toISOString().split("T")[0];
                          return (
                            <option key={formatted} value={formatted}>
                              {date.toDateString()}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* Time */}
                    <div className="mb-4">
                      <label className="block mb-2 text-sm text-gray-600">
                        Time
                      </label>
                      <select
                        value={newTime || editBooking.time}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="w-full border p-2 rounded-lg"
                      >
                        <option value="">-- Select Time Slot --</option>
                        <option value="9 AM - 11 AM">9 AM - 11 AM</option>
                        <option value="11 AM - 1 PM">11 AM - 1 PM</option>
                        <option value="1 PM - 3 PM">1 PM - 3 PM</option>
                        <option value="3 PM - 5 PM">3 PM - 5 PM</option>
                        <option value="5 PM - 7 PM">5 PM - 7 PM</option>
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditBooking(null)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateBooking}
                        className="px-4 py-2 bg-[#03A6A1] text-white rounded hover:bg-teal-700"
                      >
                        Save
                      </button>
                    </div>
                  </>
                );
              }
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
