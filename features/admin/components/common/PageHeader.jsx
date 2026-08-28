// components/admin/common/PageHeader.jsx
import Link from "next/link";
import { FaPlus, FaArrowLeft, FaCog } from "react-icons/fa";

export default function PageHeader({
  title,
  description,
  action,
  backLink = null,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div>
        <div className="flex items-center gap-4">
          {backLink && (
            <Link
              href={backLink}
              className="text-gray-400 hover:text-[#9e0910] transition"
            >
              <FaArrowLeft />
            </Link>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            <span className="text-[#9e0910]">{title.split(" ")[0]}</span>{" "}
            {title.split(" ").slice(1).join(" ")}
          </h1>
        </div>

        {description && (
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {action && (
          <Link
            href={action.href}
            className="
              inline-flex items-center gap-2
              px-6 py-3
              bg-[#9e0910] hover:bg-[#9e0910]/90
              text-white
              rounded-full
              shadow-md hover:shadow-lg
              transition
              font-medium
            "
          >
            {action.icon || <FaPlus />}
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
}

// استفاده:
{
  /* <PageHeader
  title="Foods Management"
  description="Manage your food menu items"
  action={{
    href: "/admin/foods/add",
    label: "Add Food",
    icon: <FaPlus />,
  }}
  extraButtons={[
    {
      label: "Export CSV",
      variant: "secondary",
      onClick: () => exportData(),
    },
  ]}
/>; */
}
