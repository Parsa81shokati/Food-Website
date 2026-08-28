import React from "react";
import {
  FiCalendar,
  FiPackage,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import OrderStatus from "./OrderStatus";

function OrderHeader({
  onToggle,
  totalItems,
  firstItems,
  remainingCount,
  order,
  formatDate,
  isExpanded,
  getStatusComponent,
}) {
  console.log(formatDate(order.deliveredAt));
  return (
    <div
      className="p-5 cursor-pointer hover:bg-gray-50/60 transition-colors duration-200"
      onClick={onToggle}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* بخش سمت چپ */}
        <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
          {/*  تصاویر محصولات */}
          <div className="flex-shrink-0 min-w-[140px]">
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              Items ({totalItems})
            </p>
            <div className="flex items-center gap-1 mt-1">
              {firstItems.map((item, idx) => {
                const imageUrl = item.meal?.image?.url || null;
                return (
                  <div
                    key={idx}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-100 flex-shrink-0 transition-transform duration-200 hover:scale-105"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="product"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiPackage className="w-full h-full p-2 text-gray-400" />
                    )}
                  </div>
                );
              })}
              {remainingCount > 0 && (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 border-2 border-white flex-shrink-0">
                  +{remainingCount}
                </div>
              )}
              {firstItems.length === 0 && (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <FiPackage className="text-gray-400 text-xl" />
                </div>
              )}
            </div>
          </div>

          {/* جداکننده عمودی */}
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-200 to-transparent flex-shrink-0 hidden sm:block" />

          {/* ۲. تاریخ سفارش */}
          <div className="flex-shrink-0 min-w-[130px]">
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              Order Date
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-1.5 whitespace-nowrap">
              <FiCalendar className="text-[#9e0910] text-sm" />
              {formatDate(order.deliveredAt)}
            </p>
          </div>

          {/* جداکننده */}
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-200 to-transparent flex-shrink-0 hidden sm:block" />

          {/* ۳. قیمت کل */}
          <div className="flex-shrink-0 min-w-[110px]">
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              Total Amount
            </p>
            <p className="text-lg font-bold text-[#9e0910] whitespace-nowrap">
              ${order.totalPrice?.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>

        {/* بخش سمت راست: وضعیت‌ها + دکمه کشویی */}
        <div className="flex items-center gap-3 flex-wrap flex-shrink-0">
          <OrderStatus status={order.orderStatus} />

          <button
            className={`text-gray-400 hover:text-[#9e0910] transition-all duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderHeader;
