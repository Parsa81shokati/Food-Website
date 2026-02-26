import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function ReserveTableModal({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              Reserve a Table
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#9e0910] outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#9e0910] outline-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#9e0910] outline-none"
              />
              <input
                type="time"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#9e0910] outline-none"
              />
            </div>

            <input
              type="number"
              min="1"
              placeholder="Number of Guests"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#9e0910] outline-none"
            />

            <button
              type="submit"
              className="w-full mt-4 bg-[#9e0910] hover:bg-[#7f070d] transition text-white py-3 rounded-full font-medium"
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
