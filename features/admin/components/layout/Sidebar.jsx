import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuUsersRound } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineFastfood } from "react-icons/md";
import { IoReorderFourOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const routes = [
  { id: 1, route: "/admin", name: "Dashbord", icon: <FaChalkboardTeacher /> },
  { id: 2, route: "/admin/foods", name: "foods", icon: <MdOutlineFastfood /> },
  {
    id: 3,
    route: "/admin/categories",
    name: "categories",
    icon: <RxDashboard />,
  },
  {
    id: 4,
    route: "/admin/orders",
    name: "orders",
    icon: <IoReorderFourOutline />,
  },
  { id: 5, route: "/admin/users", name: "users", icon: <LuUsersRound /> },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-white shadow-xl min-h-screen px-5 py-6">
      {/* Header */}
      <h2 className="text-2xl font-extrabold text-gray-800 mb-8 border-b pb-4">
        Admin Panel
      </h2>

      {/* Menu */}
      <nav className="space-y-2">
        {routes.map((r) => {
          const isActive = router.pathname === r.route;

          return (
            <Link
              key={r.id}
              href={r.route}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-[#9e0910] text-white shadow"
                    : "text-gray-700 hover:bg-[#9e0910]/10 hover:text-[#9e0910]"
                }
              `}
            >
              <span className="text-lg">{r.icon}</span>
              <span className="font-medium">{r.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
