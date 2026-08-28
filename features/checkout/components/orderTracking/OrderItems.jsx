import React from "react";

import { MdDeliveryDining } from "react-icons/md";

function OrderItems({ order }) {
  return (
    <div className="border-t pt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <MdDeliveryDining className="text-[#9e0910]" /> Order Items
      </h2>
      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
        {order?.orderItems?.map((item, id) => (
          <div
            key={id}
            className="flex items-center justify-between border-b border-gray-200 last:border-0 pb-2 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.meal.image.url}
                alt={item.meal.title}
                className="w-10 h-10 object-cover rounded-lg border border-gray-200"
              />
              <div>
                <p className="font-medium text-gray-800">{item.meal.title}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <span className="font-semibold text-[#9e0910]">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderItems;
