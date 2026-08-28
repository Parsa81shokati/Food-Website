import React from "react";
import { FiMapPin, FiFileText, FiCheckCircle } from "react-icons/fi";
import { MdPayment } from "react-icons/md";

function ShippingInfo({ order, formatDate }) {
  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="p-1 bg-blue-50 rounded-lg text-blue-600">
              <FiMapPin className="text-sm" />
            </span>
            Shipping Address
          </h4>
          <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
            {order.address || "No address provided"}
          </p>
          {order.deliveredAt && (
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1.5 bg-emerald-50/60 px-2 py-1 rounded-lg">
              <FiCheckCircle className="text-xs" />
              Delivered on {formatDate(order.deliveredAt)}
            </p>
          )}
        </div>

        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="p-1 bg-purple-50 rounded-lg text-purple-600">
              <MdPayment className="text-sm" />
            </span>
            Payment Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>${order.totalPrice?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="text-emerald-600">Free</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-[#9e0910]">
                <span>Discount</span>
                <span>-${order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t border-gray-100">
              <span>Total</span>
              <span className="text-[#9e0910]">
                ${order.totalPrice?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* یادداشت سفارش */}
      {order.notes && (
        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <span className="p-1 bg-amber-100 rounded-lg text-amber-600">
              <FiFileText className="text-sm" />
            </span>
            Order Notes
          </h4>
          <p className="text-sm text-gray-600 italic leading-relaxed">
            "{order.notes}"
          </p>
        </div>
      )}
    </div>
  );
}

export default ShippingInfo;
