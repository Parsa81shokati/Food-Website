import { useRouter } from "next/navigation";
import React from "react";

import OrderHeader from "./OrderHeader";
import OrderItems from "./OrderItems";
import ShippingInfo from "./ShippingInfo";
import OrderActions from "./OrderActions";

function OrderCard({ order, onToggle, isExpanded }) {
  const totalItems = (order.orderItems || []).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const firstItems = (order.orderItems || []).slice(0, 3);
  const remainingCount = (order.orderItems || []).length - 3;

  // فرمت تاریخ (بدون ساعت)
  const formatDate = (dateString) => {
    if (!dateString) return "Not delivered yet";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* ========== هدر (نمای بسته) ========== */}
      <OrderHeader
        onToggle={onToggle}
        totalItems={totalItems}
        firstItems={firstItems}
        remainingCount={remainingCount}
        order={order}
        formatDate={formatDate}
        isExpanded={isExpanded}
      />

      {/* ==========جزئیات (نمای بازشو)  ========== */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isExpanded && (
          <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50/60 to-white p-5 space-y-5">
            {/* لیست کامل محصولات */}
            <OrderItems totalItems={totalItems} order={order} />

            {/* آدرس و اطلاعات پرداخت */}
            <ShippingInfo order={order} formatDate={formatDate} />

            {/* دکمه‌های اقدامات */}
            <OrderActions order={order} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
