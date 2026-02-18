import AdminLayout from "@/components/admin/_layout";
import DataTable from "@/components/admin/DataTable";
import Filters from "@/components/admin/Filters";
import PageHeader from "@/components/admin/PageHeader";
import Search from "@/components/admin/Search";
import { categoryColumns } from "@/constants/categoryColumns";
import { foodColumns } from "@/constants/foodColumns";
import { SORT_PRESETS } from "@/constants/sortOptions";
import { useTableData } from "@/hooks/useTableData";
import client from "@/lib/apolloClient";
import { GET_CATEGORIES } from "@/lib/queries/Categories";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_CATEGORIES,
  });

  return {
    props: {
      categories: data.categories,
    },
  };
}

function Categories({ categories }) {
  console.log(categories);
  const { data, onSearch, onSortChange, sortConfig } = useTableData({
    data: categories || [],
    searchableFields: ["name"], //مشخص می‌کنه جستجو روی کدوم فیلدها انجام بشه
  });
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="Categories Management"
        description="Manage your Categories "
        action={{
          href: "/admin/categories/add",
          label: "Add Category",
          icon: null,
        }}
      />
      <div
        className="
        bg-white
        p-6
        rounded-2xl
        shadow-sm
        border border-gray-100
        flex flex-col md:flex-row
        md:items-center
        justify-between
        gap-4
      "
      >
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Search onSearch={onSearch} placeholder="Search category..." />
          <Filters
            options={[...SORT_PRESETS.DEFAULT, ...SORT_PRESETS.CATEGORY]}
            onSortChange={onSortChange}
          />
        </div>

        <div className="text-sm text-gray-500">
          Total:{" "}
          <span className="font-semibold text-[#9e0910]">{data.length}</span>{" "}
          categories
        </div>
      </div>

      {/* Table */}
      <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        border border-gray-100
        overflow-hidden
      "
      >
        <DataTable
          columns={categoryColumns}
          data={data}
          keyField="id"
          sortConfig={sortConfig}
        />
      </div>
    </div>
  );
}

export default Categories;

Categories.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
