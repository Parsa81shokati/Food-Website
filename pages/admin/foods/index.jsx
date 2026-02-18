import AdminLayout from "@/components/admin/_layout";
import DataTable from "@/components/admin/DataTable";
import DeleteFood from "@/components/admin/DeleteFood";
import Filters from "@/components/admin/Filters";
import PageHeader from "@/components/admin/PageHeader";
import Search from "@/components/admin/Search";
import { foodColumns } from "@/constants/foodColumns";
import { SORT_PRESETS } from "@/constants/sortOptions";
import { useTableData } from "@/hooks/useTableData";
import client from "@/lib/apolloClient";
import { GET_FOODS_BY_CATEGORY } from "@/lib/queries/Foods";
import Link from "next/link";

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_FOODS_BY_CATEGORY,
  });
  return {
    props: {
      foods: data,
    },
  };
}

export default function FoodsPage({ foods }) {
  const { data, onSearch, onSortChange, sortConfig } = useTableData({
    data: foods.meals || [],
    searchableFields: ["title", "category"], //مشخص می‌کنه جستجو روی کدوم فیلدها انجام بشه
  });

  return (
    <div className="p-6 md:p-6 max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="Foods Management"
        description="Manage your food menu items"
        action={{
          href: "/admin/foods/add",
          label: "Add Food",
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
          <Search onSearch={onSearch} placeholder="Search foods..." />
          <Filters
            options={[...SORT_PRESETS.DEFAULT, ...SORT_PRESETS.FOOD]}
            onSortChange={onSortChange}
          />
          <div className="flex items-center text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-[#9e0910]">{data.length}</span>{" "}
            items
          </div>
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
          columns={foodColumns}
          data={data}
          keyField="id"
          sortConfig={sortConfig}
        />
      </div>
    </div>
  );
}

FoodsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
