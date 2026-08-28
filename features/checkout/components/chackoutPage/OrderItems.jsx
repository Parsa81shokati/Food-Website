import React from "react";
import { calculateDiscountPrice } from "@/helper/helper";

function OrderItems({ items }) {
  return (
    <div>
      {" "}
      {items.map((item) => {
        const finalPrice = calculateDiscountPrice(
          item.price,
          item.discountPercentage,
        );

        return (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              {item.image ? (
                <img
                  src={item.image.url}
                  alt={item.title}
                  className="text-gray-400 text-xs font-bold"
                />
              ) : (
                <span className="text-gray-400 text-xs font-bold">
                  {item.title?.charAt(0) || "?"}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {item.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Qty: {item.quantity}</span>
                {item.discountPercentage && (
                  <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
                    -{item.discountPercentage}%
                  </span>
                )}
              </div>
            </div>
            <span className="font-semibold text-[#9e0910] text-sm whitespace-nowrap">
              ${(finalPrice * item.quantity).toFixed(2)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default OrderItems;
