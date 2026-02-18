import React from "react";
import AdminLayout from "../../components/admin/_layout";

function Dashbord() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#9e0910]">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-4xl font-bold text-gray-800 mt-3">0</p>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#9e0910]">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-4xl font-bold text-gray-800 mt-3">0</p>
        </div>

        {/* Foods */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#9e0910]">
          <h3 className="text-gray-500 text-sm">Total Foods</h3>
          <p className="text-4xl font-bold text-gray-800 mt-3">0</p>
        </div>

        {/* Categories */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#9e0910]">
          <h3 className="text-gray-500 text-sm">Total Categories</h3>
          <p className="text-4xl font-bold text-gray-800 mt-3">0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;

Dashbord.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
