import { calculateDiscountPrice } from "@/helper/helper";
import React from "react";
import { FiPackage } from "react-icons/fi";

function OrderItems({ totalItems, order }) {
  const discountedPrice = calculateDiscountPrice(
    order.price,
    order.discountPercentage,
  );
  console.log(order);
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span className="p-1 bg-[#9e0910]/10 rounded-lg text-[#9e0910]">
          <FiPackage className="text-sm" />
        </span>
        Order Items ({totalItems})
      </h4>
      <div className="space-y-3">
        {(order.orderItems || []).map((item, idx) => {
          const meal = item.meal || {};
          const imageUrl = meal.image?.url || null;

          const originalTotal = item.price * item.quantity;

          return (
            <div
              key={idx}
              className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={meal.title || "Product"}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <FiPackage className="text-2xl text-gray-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">
                  {meal.title || "Unknown"}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-sm font-medium text-[#9e0910]">
                    $ {meal.price} each
                  </span>
                  {meal.discountPercentage > 0 && (
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      {meal.discountPercentage}% OFF
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col text-right flex-shrink-0">
                <span className="text-sm text-gray-600 ">
                  ${item.price.toFixed(2)}
                </span>

                <p className=" text-gray-800"></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderItems;
