import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import {
  FiLogOut,
  FiUser,
  FiShoppingBag,
  FiSettings,
  FiHelpCircle,
  FiChevronDown,
} from "react-icons/fi";
import { MdFavorite, MdDashboard, MdLocalOffer } from "react-icons/md";
import { FaCrown, FaUserCircle } from "react-icons/fa";
import { BsGift, BsBell } from "react-icons/bs";

function UserDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const router = useRouter();
  const dropdownRef = useRef(null);

  // بستن وقتی بیرون کلیک شد
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // گرفتن حرف اول نام
  const getInitial = () => {
    if (user?.firstNames) {
      return user.firstNames.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  // آیتم‌های منو
  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      description: "Manage your account",
      icon: <FiUser className="text-lg" />,
      href: "/profile",
      color: "text-blue-500",
    },
    {
      id: "orders",
      label: "My Orders",
      description: "Track your orders",
      icon: <FiShoppingBag className="text-lg" />,
      href: "/orders",
      color: "text-green-500",
    },
    {
      id: "favorites",
      label: "Favorites",
      description: "Your saved items",
      icon: <MdFavorite className="text-lg" />,
      href: "/favorites",
      color: "text-red-500",
    },
    {
      id: "offers",
      label: "Special Offers",
      description: "Exclusive deals for you",
      icon: <MdLocalOffer className="text-lg" />,
      href: "/offers",
      color: "text-purple-500",
      badge: "3 New",
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Stay updated",
      icon: <BsBell className="text-lg" />,
      href: "/notifications",
      color: "text-yellow-500",
      badge: "5",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Analytics & stats",
      icon: <MdDashboard className="text-lg" />,
      href: "/dashboard",
      color: "text-indigo-500",
      adminOnly: true,
    },
    {
      id: "settings",
      label: "Settings",
      description: "Preferences",
      icon: <FiSettings className="text-lg" />,
      href: "/settings",
      color: "text-gray-500",
    },
    {
      id: "help",
      label: "Help & Support",
      description: "Get assistance",
      icon: <FiHelpCircle className="text-lg" />,
      href: "/help",
      color: "text-teal-500",
    },
  ];

  // فیلتر آیتم‌ها بر اساس نقش کاربر
  const filteredItems = menuItems.filter(
    (item) => !item.adminOnly || (item.adminOnly && user?.role === "admin"),
  );

  const handleNavigation = (href) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* دکمه پروفایل */}
      <button
        onClick={() => setOpen(!open)}
        className={`group relative flex items-center gap-2 md:gap-3 px-2 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white rounded-full transition-all duration-300 hover:shadow-lg ${
          open ? "shadow-lg scale-105" : ""
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {/* آواتار با حرف اول */}
        <div className="relative">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm md:text-base backdrop-blur-sm border border-white/30">
            {getInitial()}
          </div>
          {user?.role === "admin" && (
            <div className="absolute -top-1 -right-1">
              <div className="relative">
                <FaCrown className="text-yellow-300 text-xs drop-shadow-lg" />
                <div className="absolute inset-0 animate-ping opacity-75">
                  <FaCrown className="text-yellow-300 text-xs" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* نام کاربری */}
        <span className="hidden md:block text-sm font-medium max-w-[100px] truncate">
          {user?.firstNames || user?.email?.split("@")[0]}
        </span>

        {/* آیکون فلش */}
        <FiChevronDown
          className={`hidden md:block text-sm transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />

        {/* افکت نور */}
        <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
      </button>

      {/* منوی کشویی */}
      {open && (
        <div className="absolute left-0 md:left-auto md:right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slideDown">
          {/* هدر منو */}
          <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] p-5 text-white">
            <div className="flex items-center gap-4">
              {/* آواتار بزرگ */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold backdrop-blur-sm border-3 border-white/40">
                  {getInitial()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>

              {/* اطلاعات کاربر */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-lg truncate">
                  {user?.firstNames} {user?.lastName || ""}
                </p>
                <p className="text-sm opacity-90 truncate">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {user?.role === "admin" ? "Administrator" : "Member"}
                  </span>
                  <span className="text-xs bg-green-500/30 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* آیتم‌های منو */}
          <div className="py-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                className="w-full flex items-center gap-4 px-5 py-3 hover:bg-red-50/50 transition-all duration-200 group relative"
              >
                {/* آیکون با پس‌زمینه دایره‌ای */}
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color.replace("text", "from")}/10 to-transparent flex items-center justify-center transition-all duration-200 group-hover:scale-110`}
                >
                  <span className={`${item.color} transition-transform`}>
                    {item.icon}
                  </span>
                </div>

                {/* متن و توضیحات */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 group-hover:text-[#9e0910] transition-colors">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] bg-[#9e0910]/10 text-[#9e0910] px-1.5 py-0.5 rounded-full font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.description}
                  </p>
                </div>

                {/* وضعیت هاور */}
                <div
                  className={`opacity-0 -translate-x-2 transition-all duration-200 ${
                    hoveredItem === index ? "opacity-100 translate-x-0" : ""
                  }`}
                >
                  <div className="w-1.5 h-1.5 bg-[#9e0910] rounded-full" />
                </div>

                {/* خط زیرین متحرک */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#9e0910] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    hoveredItem === index ? "scale-x-100" : ""
                  }`}
                />
              </button>
            ))}
          </div>

          {/* بخش گیشه */}
          <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-100">
            <div className="flex items-center gap-3">
              <BsGift className="text-amber-500 text-xl" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800">
                  Reward Points
                </p>
                <p className="text-xs text-amber-600">
                  You have <span className="font-bold">250</span> points
                </p>
              </div>
              <button className="text-xs bg-amber-500 text-white px-3 py-1 rounded-full hover:bg-amber-600 transition-colors">
                Redeem
              </button>
            </div>
          </div>

          {/* دکمه خروج */}
          <button
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-red-50 transition-all duration-200 group border-t border-gray-100"
          >
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <FiLogOut className="text-red-500 text-lg group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-sm font-medium text-red-600 group-hover:text-red-700">
                Logout
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                Sign out from your account
              </p>
            </div>
          </button>

          {/* فوتر */}
          <div className="px-5 py-3 bg-gray-50/80 text-center border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Logged in as{" "}
              <span className="font-medium text-gray-700">{user?.email}</span>
            </p>
          </div>
        </div>
      )}

      {/* استایل انیمیشن */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 5px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
}

export default UserDropdown;
