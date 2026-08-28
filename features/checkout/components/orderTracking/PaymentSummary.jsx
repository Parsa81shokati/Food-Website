import React from "react";
import { FaReceipt } from "react-icons/fa";

function PaymentSummary({ order }) {
  return (
    <div className="border-t pt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaReceipt className="text-[#9e0910]" /> Payment Summary
      </h2>
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${order?.subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${order?.shippingCost}</span>
        </div>
        {order?.discountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-${order?.discountAmount}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300">
          <span>Total</span>
          <span className="text-[#9e0910]">${order?.totalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;
