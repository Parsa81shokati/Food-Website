import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation"; // <-- اضافه شده
import { IoFastFoodSharp } from "react-icons/io5";
import { FiChevronRight, FiChevronDown, FiLogOut } from "react-icons/fi";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { menuItems } from "./Routes";

function MobileSidebar({
  routes,
  sidebarOpen,
  setSidebarOpen,
  user,
  isLinkActive,
  handleLogout,
  setOnopenLogin,
}) {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const pathname = usePathname(); // <-- دریافت مسیر فعلی

  // تابع بررسی فعال بودن زیرمنوهای اکانت
  const isAccountLinkActive = (href) => pathname === href;

  const getInitial = () => {
    if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        sidebarOpen ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* محتوای سایدبار */}
      <div
        className={`sidebar-content absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ===== هدر (لوگو + اطلاعات کاربر) ===== */}
        <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] p-6 text-white">
          <div className="flex items-center gap-3 ">
            <IoFastFoodSharp className="text-3xl" />
            <div>
              <h2 className="text-xl font-bold">Foody</h2>
              <p className="text-xs opacity-80">Delicious & Fresh</p>
            </div>
          </div>

          {user && (
            <div className="mt-4 pt-4 border-t border-white/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold backdrop-blur-sm border-3 border-white/40">
                    {getInitial()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex flex-row gap-5 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user?.firstName} {user?.lastName || ""}
                  </p>
                  <div className="flex items-center">
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                      {user?.role === "admin" ? "Administrator" : "Member"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== منوی سایدبار ===== */}
        <nav className="p-4 h-[calc(100%-180px)] overflow-y-auto">
          {/* ===== آیتم "Profile" (فقط در صورت لاگین) ===== */}
          {user && (
            <>
              <div
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1 cursor-pointer text-gray-700 hover:bg-[#9e0910]/10 hover:text-[#9e0910]"
              >
                <span className="text-xl">
                  <FaUser />
                </span>
                <span className="font-medium flex-1">Profile</span>
                <div className="flex items-center">
                  {showAccountMenu ? (
                    <FiChevronDown className="text-lg" />
                  ) : (
                    <FiChevronRight className="text-lg" />
                  )}
                </div>
              </div>

              {/* ===== منوی اکانت (زیرمجموعه) ===== */}
              {showAccountMenu && (
                <div className="bg-gray-50 rounded-2xl px-2 py-1 mb-2">
                  {menuItems.map((item) => {
                    const isActive = isAccountLinkActive(item.href);
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1 ${
                          isActive
                            ? "bg-[#9e0910] text-white"
                            : "text-gray-700 hover:bg-[#9e0910]/10 hover:text-[#9e0910]"
                        }`}
                      >
                        <span
                          className={`text-xl ${
                            isActive ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <div className="flex-1">
                          <span className="font-medium">{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => {
                      handleLogout();
                      setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all mt-1"
                  >
                    <FiLogOut className="text-xl" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </>
          )}

          {/* ===== آیتم‌های اصلی (Home, Menu, ...) ===== */}
          {routes.map((route) => {
            const isActive = isLinkActive(route);
            return (
              <Link
                key={route.id}
                href={route.pathname}
                scroll={route.pathname.includes("#") ? false : true}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1
                  ${
                    isActive
                      ? "bg-[#9e0910] text-white"
                      : "text-gray-700 hover:bg-[#9e0910]/10 hover:text-[#9e0910]"
                  }`}
              >
                <span
                  className={`text-xl ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                >
                  {route.icon}
                </span>
                <span className="font-medium">{route.name}</span>
                {isActive && (
                  <span className="mr-auto text-xs bg-white/20 px-2 py-1 rounded-full">
                    Current
                  </span>
                )}
              </Link>
            );
          })}

          {/* ===== دکمه ورود (در صورت لاگین نبودن) ===== */}
          {!user && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  setOnopenLogin(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#9e0910] text-white rounded-xl hover:bg-[#7e0710] transition-all"
              >
                <FaUser className="text-xl" />
                <span className="font-medium">Login / Sign Up</span>
              </button>
            </div>
          )}
        </nav>

        {/* ===== فوتر ===== */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-xs text-gray-400 border-t bg-white">
          © 2024 Foody. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
