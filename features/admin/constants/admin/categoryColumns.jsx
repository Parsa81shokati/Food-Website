import Link from "next/link";
import { FaRegPenToSquare } from "react-icons/fa6";

export const categoryColumns = [
  {
    key: "image",
    title: "Image",
    render: (category) => (
      <div className="flex items-center">
        <img
          src={category.image?.url}
          alt={category.name}
          className="
            w-14 h-14
            rounded-xl
            object-cover
            border border-gray-100
            shadow-sm
          "
        />
      </div>
    ),
  },

  {
    key: "name",
    title: "Name",
    sortable: true,
    render: (category) => (
      <div className="space-y-1">
        <p className="font-semibold text-gray-800">{category.name}</p>
      </div>
    ),
  },

  {
    key: "actions",
    title: "Actions",
    render: (category) => (
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/categories/${category.id}`}
          className="
            inline-flex items-center gap-1
            px-3 py-1.5
            rounded-full
            text-sm font-medium
            bg-[#9e0910]/10
            text-[#9e0910]
            hover:bg-[#9e0910]
            hover:text-white
            transition
          "
        >
          <FaRegPenToSquare className="w-3.5 h-3.5" />
          Edit
        </Link>
      </div>
    ),
  },
];
