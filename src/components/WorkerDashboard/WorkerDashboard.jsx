import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

const WorkerDashboard = ({ worker }) => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Worker ke bookings fetch karna
  useEffect(() => {
    if (!worker || !worker.uid) return;

    const q = query(
      collection(firebaseDB, "bookings"),
      where("workerId", "==", worker.uid) // workerId match karega
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(data);
    });

    return () => unsubscribe();
  }, [worker]);

  // ✅ Status update function
  const handleUpdateStatus = async (id, status) => {
    try {
      await updateDoc(doc(firebaseDB, "bookings", id), { status });
      alert(`Booking marked as ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // ✅ Search filter
  const filteredBookings = bookings.filter(
    (b) =>
      b.userAddress?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.userAddress?.phone?.toLowerCase().includes(search.toLowerCase()) ||
      b.date?.includes(search)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Worker Info */}
      {worker ? (
        <div className="bg-white shadow-md rounded-xl p-5 mb-6">
          <h2 className="text-2xl font-bold text-center text-[#03A6A1]">
          Dashboard
          </h2>
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-6">
          Worker details not available
        </p>
      )}

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, phone or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[#03A6A1]"
        />
      </div>

      {/* Bookings List */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Address</th>
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
                  <td className="p-3 border">{b.userAddress?.name}</td>
                  <td className="p-3 border">{b.userAddress?.phone}</td>
                  <td className="p-3 border">{b.userAddress?.address}</td>
                  <td className="p-3 border">{b.date}</td>
                  <td className="p-3 border">{b.time}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        b.status === "pending"
                          ? "bg-yellow-200 text-yellow-700"
                          : b.status === "confirmed"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 border flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(b.id, "confirmed")}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(b.id, "declined")}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerDashboard;
