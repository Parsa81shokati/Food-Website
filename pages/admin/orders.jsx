import AdminLayout from "@/components/admin/_layout";
import DataTable from "@/components/admin/DataTable";
import Filters from "@/components/admin/Filters";
import PageHeader from "@/components/admin/PageHeader";
import Search from "@/components/admin/Search";
import { foodColumns } from "@/constants/foodColumns";
import { orderColumns } from "@/constants/orderColumns";
import { SORT_PRESETS } from "@/constants/sortOptions";
import { useTableData } from "@/hooks/useTableData";
import { GET_ORDERS } from "@/lib/queries/OrdersQuery";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import React from "react";

function Orders() {
  const { data } = useQuery(GET_ORDERS);
  console.log(data);
  const {
    data: tableData,
    onSearch,
    onSortChange,
    sortConfig,
  } = useTableData({
    data: data?.orders || [],
    searchableFields: ["phone", "firstName", "lastName", "ordernumber"], //مشخص می‌کنه جستجو روی کدوم فیلدها انجام بشه
  });
  return (
    // <div className="overflow-x-auto max-w-5xl mx-auto bg-white shadow-md rounded-2xl space-y-6 px-10 py-6">
    //   {/* Header */}
    //   <div className="flex items-center justify-between">
    //     <h1 className="text-2xl font-extrabold text-gray-800">
    //       Orders Management
    //     </h1>
    //   </div>

    //   {/* Table */}
    //   <div className="bg-white shadow-md rounded-2xl">
    //     <table className="w-full text-sm ">
    //       <thead>
    //         <tr className="bg-gray-100 text-gray-700">
    //           <th className="p-5 text-left">Order #</th>
    //           <th className="p-5 text-left">Customer</th>
    //           <th className="p-5 text-left">Items</th>
    //           <th className="p-5 text-left">Total Price</th>
    //           <th className="p-5 text-left">Order Status</th>
    //           <th className="p-5 text-left">Payment</th>
    //           <th className="p-5 text-left">Action</th>
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {data?.orders.map((order) => (
    //           <tr
    //             key={order.id}
    //             className="border-b hover:bg-gray-50 transition"
    //           >
    //             <td className="p-4 font-medium">{order.orderNumber}</td>

    //             <td className="p-4">
    //               <p className="font-medium text-gray-800">
    //                 {order.people?.firstName} {order.people?.lastName}
    //               </p>
    //               <p className="text-xs text-gray-500">{order.people?.phone}</p>
    //             </td>

    //             <td className="p-4 space-y-1">
    //               {order.orderItems.map((item, idx) => (
    //                 <div key={idx} className="text-xs text-gray-600">
    //                   {item.meal.title} — ${item.price}
    //                 </div>
    //               ))}
    //             </td>

    //             <td className="p-4 font-medium text-center text-gray-700">
    //               ${order.totalPrice.toLocaleString()}
    //             </td>

    //             <td className="p-4 text-center">
    //               <span className="bg-gray-200 text-gray-700  px-3 py-1 rounded-full text-xs">
    //                 {order.orderStatus}
    //               </span>
    //             </td>

    //             <td className="p-4 text-center">
    //               {order.paymentStatus === "paid" ? (
    //                 <span className="text-green-600 font-medium">Paid</span>
    //               ) : (
    //                 <span className="text-red-600 font-medium">Unpaid</span>
    //               )}
    //             </td>

    //             <td className="p-4">
    //               <select
    //                 value={order.orderStatus}
    //                 onChange={(e) =>
    //                   handleStatusChange(order.id, e.target.value)
    //                 }
    //                 className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#9e0910] outline-none"
    //               >
    //                 <option value="pending">Pending</option>
    //                 <option value="preparing">Preparing</option>
    //                 <option value="delivered">Delivered</option>
    //                 <option value="cancelled">Cancelled</option>
    //               </select>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <PageHeader title="Orders Management" description="Manage Orders " />
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Search onSearch={onSearch} placeholder="Search foods..." />
          <Filters
            options={[...SORT_PRESETS.DEFAULT, ...SORT_PRESETS.ORDER]}
            onSortChange={onSortChange}
          />
        </div>
        <div className="text-sm text-gray-500">
          Total:{" "}
          <span className="font-semibold text-[#9e0910]">
            {tableData.length}
          </span>{" "}
          orders
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <DataTable
          columns={orderColumns}
          data={data?.orders}
          keyField="id"
          sortConfig={sortConfig}
        />
      </div>
    </div>
  );
}

export default Orders;

Orders.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
