import React from "react";

import { MdPayment } from "react-icons/md";

import OrderItems from "./OrderItems";
import { calculateDiscountPrice } from "@/helper/helper";
import DiscountCode from "./DiscountCode";
import PricingSummary from "./PricingSummary";
import SubmitButton from "./SubmitButton";

function OrderSummary({ items, handleSubmit, isSubmitting, setDiscountCode }) {
  const subtotal = items.reduce((sum, item) => {
    const price = calculateDiscountPrice(item.price, item.discountPercentage);

    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal >= 50 ? 0 : 5;

  const total = subtotal + shipping;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/80 sticky top-24">
        {/* هدر */}

        <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] px-6 py-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <MdPayment className="text-white/80" /> Order Summary
            <span className="ml-auto text-xs bg-white/20 px-2.5 py-1 rounded-full">
              {items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </h2>
        </div>

        {/* محتوا */}

        <div className="p-5 space-y-4">
          {/* لیست محصولات */}

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <OrderItems items={items} />
          </div>

          {/* کد تخفیف */}
          <DiscountCode setDiscountCode={setDiscountCode} />

          {/* جزئیات قیمت */}
          <PricingSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />

          {/* دکمه پرداخت */}

          <SubmitButton
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
