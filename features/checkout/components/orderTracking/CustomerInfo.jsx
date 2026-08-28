import React from "react";
import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function CustomerInfo({ order }) {
  return (
    <div className="border-t pt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaUser className="text-[#9e0910]" /> Customer Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <FaUser className="text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Name</p>
            <p className="font-medium text-gray-800">{order?.customerName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaPhone className="text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-medium text-gray-800">{order?.customerPhone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 md:col-span-2">
          <FaMapMarkerAlt className="text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="font-medium text-gray-800">{order?.address}</p>
          </div>
        </div>
        {/* <div className="flex items-center gap-3 md:col-span-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Order Time</p>
                        <p className="font-medium text-gray-800">
                          {order.orderTime}
                        </p>
                      </div>
                    </div> */}
      </div>
    </div>
  );
}

export default CustomerInfo;
