import useAuth from "@/features/auth/hooks/useAuth";
import { useQuery } from "@apollo/client/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiShoppingBag } from "react-icons/fi";
import { GET_USER_ORDERS } from "@/features/userProfile/orders/queries/userOrders";
import { getUserStatus, userOrderTabs } from "@/utils/orderStatus";
import RequireAuth from "@/components/auth/RequireAuth";
import OrderCard from "@/features/userProfile/orders/components/OrderCard";

function UserOrders() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("all");
  const { user, loading: authLoading } = useAuth();
  const [expandedId, setExpandedId] = useState(null);

  const { data, loading } = useQuery(GET_USER_ORDERS, {
    variables: { userId: user?.id },
    skip: !user,
  });

  const orders = data?.orders || [];

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return getUserStatus(order.orderStatus) === filterStatus;
  });

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#9e0910]/20 border-t-[#9e0910] rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 py-15 px-4 md:pt-22">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <div className="mb-8 flex items-center gap-3">
            <FiShoppingBag className="text-[#9e0910]" />
            <div>
              <h1 className="text-2xl font-bold">My Orders</h1>
              <p className="text-gray-500 text-sm">Track your orders easily</p>
            </div>
          </div>

          {/* FILTER TABS (SIMPLIFIED) */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {Object.entries(userOrderTabs).map(([key, tab]) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-4 md:px-4 py-2 rounded-full text-[10px] md:text-sm flex items-center gap-1 md:gap-2 transition ${
                  filterStatus === key
                    ? "bg-[#9e0910] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.icon && <tab.icon size={14} />}
                {tab.label}
              </button>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-10 text-center rounded-xl shadow">
              <FiShoppingBag className="text-5xl mx-auto text-gray-300 mb-4" />
              <h3 className="font-semibold text-lg">No orders found</h3>
              <p className="text-gray-500 mt-2">Try a different filter</p>

              <button
                onClick={() => router.push("/")}
                className="mt-4 px-6 py-2 bg-[#9e0910] text-white rounded-lg"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  orderStatus={order.orderStatus}
                  paymentStatus={order.paymentStatus}
                  onToggle={() =>
                    setExpandedId(expandedId === order.id ? null : order.id)
                  }
                  isExpanded={expandedId === order.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}

export default UserOrders;
