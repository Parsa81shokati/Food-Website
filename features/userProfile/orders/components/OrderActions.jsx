import { useRouter } from "next/router";
import React from "react";

function OrderActions({ order }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap pt-2">
      {order.orderStatus !== "delivered" &&
        order.orderStatus !== "cancelled" && (
          <button
            onClick={() => router.push(`/orders/${order.id}`)}
            className="px-4 py-2 text-sm bg-[#9e0910] text-white rounded-lg hover:bg-[#7e0710] transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Track Order
          </button>
        )}
    </div>
  );
}

export default OrderActions;
