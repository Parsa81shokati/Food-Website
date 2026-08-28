import {
  FiShoppingBag,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

export const getUserStatus = (status) => {
  const active = ["pending", "confirmed", "processing", "preparing", "sent"];

  if (active.includes(status)) return "active";
  if (status === "delivered") return "delivered";
  if (status === "cancelled") return "cancelled";

  return "active";
};

export const userOrderTabs = {
  all: {
    label: "All",
  },
  active: {
    label: "In Progress",
    icon: FiClock,
  },
  delivered: {
    label: "Delivered",
    icon: FiCheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    icon: FiXCircle,
  },
};
