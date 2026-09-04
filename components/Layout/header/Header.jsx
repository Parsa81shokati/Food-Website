import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { useRouter } from "next/router";
import LoginSignUpModal from "@/features/auth/components/LoginSignUpModal";
import useAuth from "@/features/auth/hooks/useAuth";
import { logout } from "@/features/auth/services/auth.service";

import CheckoutModal from "../../../features/cart/components/CheckoutModal";
import HeaderLogo from "./HeaderLogo";
import DesktopNav from "./DesktopNav";
import UserSection from "./UserSection";
import MobileSidebar from "./MobileSidebar";
import { routes } from "./Routes";

function Header() {
  const [onOpenCheckout, setOnOpenCheckout] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, loading, showLoginModal, setShowLoginModal } = useAuth();
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

  const handleLogout = async () => {
    try {
      await logout();
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
        <HeaderLogo closeMenu={setSidebarOpen} />

        <DesktopNav isLinkActive={isLinkActive} routes={routes} />

        <div className="flex items-center gap-2 md:gap-3">
          {/* سبد خرید */}
          <CheckoutModal
            onOpenCheckout={onOpenCheckout}
            setOnOpenCheckout={setOnOpenCheckout}
            onOpenLogin={showLoginModal}
            setOnopenLogin={setShowLoginModal}
          />

          {/* بخش کاربری */}
          <UserSection
            loading={loading}
            user={user}
            setOnopenLogin={setShowLoginModal}
            handleLogout={handleLogout}
          />

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
      <MobileSidebar
        routes={routes}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        isLinkActive={isLinkActive}
        handleLogout={handleLogout}
        setOnopenLogin={setShowLoginModal}
      />

      {/* مودال ورود */}
      {showLoginModal && (
        <LoginSignUpModal
          onClose={() => setShowLoginModal(false)}
          isOpen={showLoginModal}
        />
      )}
    </>
  );
}

export default Header;
