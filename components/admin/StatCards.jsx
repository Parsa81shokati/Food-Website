// components/admin/common/StatCards.jsx
import {
  FaUsers,
  FaShoppingCart,
  FaUtensils,
  FaFolder,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const iconMap = {
  users: FaUsers,
  orders: FaShoppingCart,
  foods: FaUtensils,
  categories: FaFolder,
  revenue: FaShoppingCart,
  // ... سایر آیکون‌ها
};

export default function StatCards({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon] || FaFolder;

        return (
          <div
            key={index}
            className="bg-white flex justify-center flex-col items-center p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-center mb-3 gap-2">
              <div className={`p-2 rounded-lg ${stat.color || "bg-gray-100"}`}>
                <Icon
                  className={`w-5 h-5 ${stat.iconColor || "text-gray-600"}`}
                />
              </div>
              <p className="text-xl font-bold text-gray-600 ">{stat.value}</p>
            </div>

            <p className="text-sm text-gray-800 mt-1">{stat.title}</p>

            {stat.subtitle && (
              <p className="text-xs text-gray-400 mt-2">{stat.subtitle}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// // استفاده:
// <StatCards
//   stats={[
//     {
//       title: "Total Users",
//       value: usersCount,
//       icon: "users",
//       color: "bg-blue-50",
//       iconColor: "text-blue-600",
//     },
//     {
//       title: "Total Orders",
//       value: ordersCount,
//       icon: "orders",
//       color: "bg-green-50",
//       iconColor: "text-green-600",
//     },
//     // ...
//   ]}
// />;
