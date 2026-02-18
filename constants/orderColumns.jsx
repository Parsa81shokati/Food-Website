import Link from "next/link";
import { FaRegPenToSquare } from "react-icons/fa6";
import DeleteFood from "@/components/admin/DeleteFood";

export const orderColumns = [
  {
    key: "ordernumber",
    title: "Order #",
    render: (order) => <p className="font-medium">{order.orderNumber}</p>,
  },
  {
    key: "customer",
    title: "Customer",
    sortable: true,
    render: (order) => (
      <div>
        <p className="font-medium text-gray-800">
          {order.people?.firstName} {order.people?.lastName}
        </p>
        <p className="text-xs text-gray-500">{order.people?.phone}</p>
      </div>
    ),
  },
  {
    key: "items",
    title: "Items",
    render: (order) => (
      <div className="space-y-1">
        {order.orderItems.map((item, idx) => (
          <div key={idx} className="text-xs text-gray-600">
            {item.meal.title} — ${item.price}
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "totalprice",
    title: "Total Price",
    sortable: true,
    render: (order) => (
      <span className="font-medium text-gray-800">
        ${order.totalPrice.toLocaleString()}
      </span>
    ),
  },
  {
    key: "orderstatus",
    title: "Order Status",
    sortable: true,
    render: (order) => {
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-700",
        preparing: "bg-blue-100 text-blue-700",
        delivered: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
      };

      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.orderStatus]}`}
        >
          {order.orderStatus}
        </span>
      );
    },
  },
  {
    key: "payment",
    title: "Payment",
    sortable: true,
    render: (order) =>
      order.paymentStatus === "paid" ? (
        <span className="text-green-600 font-medium">Paid</span>
      ) : (
        <span className="text-red-600 font-medium">Unpaid</span>
      ),
  },
  {
    key: "actions",
    title: "Actions",
    render: (order) => (
      <select
        value={order.orderStatus}
        onChange={(e) => handleStatusChange(order.id, e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#9e0910] outline-none"
      >
        <option value="pending">Pending</option>
        <option value="preparing">Preparing</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    ),
  },
];
