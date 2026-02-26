import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser, FaUserCircle } from "react-icons/fa";
import CheckoutModal from "../checkout/CheckoutModal";
import { useRouter } from "next/router";
import LoginSignUpModal from "../Login/LoginSignUpModal";
import useAuth from "@/hooks/useAuth";
import { FiLogOut, FiHome, FiInfo, FiPhone } from "react-icons/fi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { GiFullPizza } from "react-icons/gi";
import UserDropdown from "../UserDropdown";

export const routes = [
  {
    id: "1",
    pathname: "/",
    name: "Home",
    icon: <FiHome className="text-lg" />,
  },
  {
    id: "2",
    pathname: "/Menu",
    name: "Menu",
    icon: <MdOutlineRestaurantMenu className="text-lg" />,
  },
  {
    id: "3",
    pathname: "/#reservation",
    name: "Reservation",
    icon: <GiFullPizza className="text-lg" />,
  },
  {
    id: "4",
    pathname: "/#aboutUs",
    name: "About Us",
    icon: <FiInfo className="text-lg" />,
  },
  {
    id: "5",
    pathname: "/#contact",
    name: "Contact",
    icon: <FiPhone className="text-lg" />,
  },
];

function Header() {
  const [onOpenCheckout, setOnOpenCheckout] = useState(false);
  const [onOpenLogin, setOnopenLogin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, loading } = useAuth();
  const router = useRouter();

  // تابع بررسی فعال بودن لینک
  const isLinkActive = (route) => {
    // اگه صفحه اصلی هستیم
    if (router.pathname === "/") {
      // برای لینک‌های هش (#) فقط اگه هش در URL باشه فعال میشن
      if (route.pathname.includes("#")) {
        const hash = route.pathname.split("#")[1];
        return router.asPath.includes(`#${hash}`);
      }
      // برای لینک Home فقط وقتی فعاله که هیچ هشی نداشته باشیم
      return route.pathname === "/" && !router.asPath.includes("#");
    }

    // برای صفحات دیگه (مثل /Menu)
    // اگه route هش داره و صفحه اصلی نیستیم، فعال نباشه
    if (route.pathname.includes("#")) {
      return false;
    }

    // برای صفحه Menu و صفحات مشابه
    return route.pathname === router.pathname;
  };

  // تشخیص اسکرول برای تغییر استایل هدر
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // بستن سایدبار با کلیک خارج
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarOpen && !e.target.closest(".sidebar-content")) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 flex justify-between items-center py-3 px-4 md:px-8 lg:px-16 w-full bg-white/99 border-b z-30 transition-all duration-300 ${
          scrolled
            ? "border-[#9e0910]/20 shadow-md py-2"
            : "border-red-800/30 shadow-sm"
        }`}
      >
        {/* Logo با انیمیشن */}
        <Link
          href="/"
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="relative">
            <IoFastFoodSharp className="text-[#9e0910] text-3xl md:text-4xl transition-transform group-hover:rotate-12 duration-300" />
            <div className="absolute -inset-1 bg-[#9e0910]/20 rounded-full blur-md group-hover:bg-[#9e0910]/30 transition-all" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold leading-tight">
              <span className="text-[#9e0910]">F</span>oody
            </h1>
            <span className="text-[10px] md:text-xs text-gray-500 -mt-1">
              Delicious & Fresh
            </span>
          </div>
        </Link>

        {/* لینک‌های دسکتاپ */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {routes.map((route) => {
            const isActive = isLinkActive(route);

            return (
              <Link
                key={route.id}
                href={route.pathname}
                scroll={route.pathname.includes("#") ? false : true}
                className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-full transition-all duration-300 group overflow-hidden
                  ${
                    isActive
                      ? "text-[#9e0910]"
                      : "text-gray-700 hover:text-[#9e0910]"
                  }`}
              >
                <span className="relative z-10">{route.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#9e0910] rounded-full" />
                )}
                <span className="absolute inset-0 bg-[#9e0910]/0 group-hover:bg-[#9e0910]/5 transition-all duration-300 rounded-full" />
              </Link>
            );
          })}
        </nav>

        {/* بخش راست - کاربری و سبد خرید */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* سبد خرید */}
          <CheckoutModal
            onOpenCheckout={onOpenCheckout}
            setOnOpenCheckout={setOnOpenCheckout}
            onOpenLogin={onOpenLogin}
            setOnopenLogin={setOnopenLogin}
          />

          {/* بخش کاربری */}
          {loading ? (
            <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
          ) : !user ? (
            <button
              onClick={() => setOnopenLogin(true)}
              className="relative group hidden md:block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9e0910] to-[#c20e17] rounded-full blur opacity-60 group-hover:opacity-100 transition-all" />
              <div className="relative flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#9e0910]/30 hover:border-[#9e0910] transition-all">
                <FaUser className="text-[#9e0910] text-sm" />
                <span className="text-sm font-medium text-gray-700">Login</span>
              </div>
            </button>
          ) : (
            <div className="hidden md:block">
              <UserDropdown user={user} onLogout={handleLogout} />
            </div>
          )}

          {/* دکمه منوی موبایل */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#9e0910]/10 transition-all group"
            aria-label="Open menu"
          >
            <HiMenu className="text-2xl text-gray-700 group-hover:text-[#9e0910] transition-colors" />
          </button>
        </div>
      </header>

      {/* سایدبار موبایل */}
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
          {/* هدر سایدبار */}
          <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] p-6 text-white">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <IoFastFoodSharp className="text-3xl" />
                <div>
                  <h2 className="text-xl font-bold">Foody</h2>
                  <p className="text-xs opacity-80">Delicious & Fresh</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-all"
                aria-label="Close menu"
              >
                <HiX className="text-2xl" />
              </button>
            </div>

            {/* اطلاعات کاربر در سایدبار */}
            {user && (
              <div className="mt-4 pt-4 border-t border-white/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <FaUserCircle className="text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.email}</p>
                    <p className="text-xs opacity-80">Welcome back!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* لینک‌های سایدبار */}
          <nav className="p-4">
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
                    className={`text-xl ${isActive ? "text-white" : "text-gray-500"}`}
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

            {/* لینک‌های اضافی برای موبایل */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              {!user ? (
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
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <FiLogOut className="text-xl" />
                  <span className="font-medium">Logout</span>
                </button>
              )}
            </div>
          </nav>

          {/* فوتر سایدبار */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-xs text-gray-400 border-t">
            © 2024 Foody. All rights reserved.
          </div>
        </div>
      </div>

      {/* مودال ورود */}
      {onOpenLogin && (
        <LoginSignUpModal
          onClose={() => setOnopenLogin(false)}
          isOpen={onOpenLogin}
        />
      )}
    </>
  );
}

export default Header;
