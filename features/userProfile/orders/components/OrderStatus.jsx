import React from "react";
import { FiCheckCircle, FiClock, FiTruck, FiXCircle } from "react-icons/fi";

const orderStatuses = {
  pending: {
    label: "Pending",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: FiClock,
  },
  processing: {
    label: "Processing",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: FiClock,
  },
  preparing: {
    label: "Preparing",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: FiClock,
  },
  sent: {
    label: "Sent",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: FiTruck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: FiCheckCircle,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-green-50 text-green-700 border-green-200",
    icon: FiCheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    icon: FiXCircle,
  },
};

function OrderStatus({ status }) {
  const data = orderStatuses[status];

  if (!data) {
    return <span className="text-xs text-gray-500">{status}</span>;
  }

  const Icon = data.icon;

  return (
    <span
      className={`
      inline-flex items-center gap-1.5
      px-2.5 py-1 rounded-full
      text-xs font-medium border
      ${data.color}
      `}
    >
      <Icon className="text-xs" />
      {data.label}
    </span>
  );
}

export default OrderStatus;
