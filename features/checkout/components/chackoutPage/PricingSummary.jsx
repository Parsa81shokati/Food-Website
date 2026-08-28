import React from "react";
import { FaTruck } from "react-icons/fa";

function PricingSummary({ subtotal, shipping, total }) {
  return (
    <div className="border-t border-gray-200 pt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>

      {/* {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )} */}

      <div className="flex justify-between text-sm">
        <span className="text-gray-600 flex items-center gap-1">
          <FaTruck className="text-gray-400" /> Shipping:
        </span>

        {shipping === 0 ? (
          <span className="text-green-600 font-medium">Free</span>
        ) : (
          <span className="font-medium">${shipping.toFixed(2)}</span>
        )}
      </div>

      <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
        <span>Total</span>
        <span className="text-[#9e0910]">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default PricingSummary;
