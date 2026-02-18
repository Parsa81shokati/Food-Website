import AdminLayout from "@/components/admin/_layout";
import DataTable from "@/components/admin/DataTable";
import Filters from "@/components/admin/Filters";
import PageHeader from "@/components/admin/PageHeader";
import Search from "@/components/admin/Search";
import { SORT_PRESETS } from "@/constants/sortOptions";
import { userColumns } from "@/constants/userColumns";
import { useTableData } from "@/hooks/useTableData";
import client from "@/lib/apolloClient";
import { BLOCK_USER, UPDATE_USER_ROLE } from "@/lib/Mutation/UpdateUserRole";
import { GET_USERS } from "@/lib/queries/User";
import { useMutation, useQuery } from "@apollo/client/react";
import React from "react";

export default function UsersPage() {
  const { data, refetch } = useQuery(GET_USERS, {
    client: client,
  });

  const {
    data: UserData,
    onSearch,
    onSortChange,
    sortConfig,
  } = useTableData({
    data: data?.peoples || [],
    searchableFields: ["firstName", "lastName"], //مشخص می‌کنه جستجو روی کدوم فیلدها انجام بشه
  });

  console.log(data);
  const [updateRole] = useMutation(UPDATE_USER_ROLE);

  const [toggleBlock] = useMutation(BLOCK_USER);

  const handleRoleChange = async (id, role) => {
    await updateRole({
      variables: { id, role },
    });
    refetch();
  };

  const handleBlockToggle = async (id, isBlocked) => {
    await toggleBlock({
      variables: { id, isBlocked: !isBlocked },
    });
    refetch();
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto">
      <PageHeader title="Users Management" description="Manage users" />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <Search onSearch={onSearch} placeholder="Search foods..." />
          <Filters
            options={[...SORT_PRESETS.DEFAULT, ...SORT_PRESETS.USER]}
            onSortChange={onSortChange}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <DataTable
          columns={userColumns(handleRoleChange, handleBlockToggle)}
          data={UserData}
          keyField="id"
          sortConfig={sortConfig}
        />
      </div>
    </div>
  );
}

UsersPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
