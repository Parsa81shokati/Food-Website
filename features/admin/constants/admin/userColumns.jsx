import Link from "next/link";

export const userColumns = (handleRoleChange, handleBlockToggle) => [
  {
    key: "name",
    title: "Name",
    sortable: true,
    render: (user) => (
      <div>
        <p className="font-medium text-gray-800">
          {user.firstName} {user.lastName}
        </p>
      </div>
    ),
  },
  {
    key: "role",
    title: "Role",
    render: (user) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          user.role === "ADMIN"
            ? "bg-[#9e0910]/10 text-[#9e0910]"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {user.role}
      </span>
    ),
  },

  {
    key: "status",
    title: "Status",
    sortable: true,
    render: (user) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          user.isBlocked
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {user.isBlocked ? "Blocked" : "Active"}
      </span>
    ),
  },

  {
    key: "actions",
    title: "Actions",
    render: (user) => (
      <div className="flex gap-3 p-2">
        <button
          onClick={() =>
            handleRoleChange(user.id, user.role === "ADMIN" ? "USER" : "ADMIN")
          }
          className="text-[#9e0910] hover:bg-[#9e0910]/10 px-3 py-1 rounded-full text-sm font-medium transition"
        >
          Change Role
        </button>

        <button
          onClick={() => handleBlockToggle(user.id, user.isBlocked)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            user.isBlocked
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          {user.isBlocked ? "Unblock" : "Block"}
        </button>
      </div>
    ),
  },
];
