import Link from "next/link";
import { FaRegPenToSquare } from "react-icons/fa6";
import DeleteFood from "@/components/admin/DeleteFood";

export const foodColumns = [
  {
    key: "image",
    title: "Image",
    render: (food) => (
      <div className="flex items-center">
        <img
          src={food.image?.url}
          alt={food.title}
          className="
            w-14 h-14 rounded-xl object-cover
            border border-gray-100
            shadow-sm
          "
        />
      </div>
    ),
  },

  {
    key: "title",
    title: "Title",
    sortable: true,
    render: (food) => (
      <div className="space-y-1 max-w-xs">
        <p className="font-semibold text-gray-800">{food.title}</p>
        <p className="text-xs text-gray-500 truncate">
          {food.description?.substring(0, 50)}...
        </p>
      </div>
    ),
  },

  {
    key: "category",
    title: "Category",
    render: (food) => (
      <span
        className="
          inline-flex items-center
          px-3 py-1
          rounded-full
          text-xs font-medium
          bg-[#9e0910]/10
          text-[#9e0910]
        "
      >
        {food.category}
      </span>
    ),
  },

  {
    key: "price",
    title: "Price",
    sortable: true,
    render: (food) => (
      <span className="font-semibold text-gray-800">
        {food.price?.toLocaleString()}
        <span className=" text-gray-500"> $</span>
      </span>
    ),
  },

  {
    key: "actions",
    title: "Actions",
    render: (food) => (
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/foods/${food.id}`}
          className="
            inline-flex items-center gap-1
            px-3 py-1.5
            rounded-full
            text-sm font-medium
            bg-[#9e0910]/10
            text-[#9e0910]
            hover:bg-[#9e0910] hover:text-white
            transition
          "
        >
          <FaRegPenToSquare className="w-3.5 h-3.5" />
          Edit
        </Link>

        <DeleteFood food={food} />
      </div>
    ),
  },
];
