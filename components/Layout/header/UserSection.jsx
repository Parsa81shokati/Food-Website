import UserDropdown from "@/features/userProfile/UserDropdown";
import React from "react";

import { FaUser } from "react-icons/fa";

function UserSection({ loading, user, setOnopenLogin, handleLogout }) {
  return (
    <div className="md:w-[130px] flex justify-end">
      {loading ? (
        <div
          className="
          flex items-center gap-2 
          px-4 py-2 
          rounded-full 
          border border-gray-200
          bg-white
          animate-pulse
        "
        >
          {/* avatar skeleton */}
          <div
            className="
            w-8 h-8 
            rounded-full 
            bg-gray-200
          "
          />

          {/* text skeleton */}
          <div
            className="
            hidden md:block
            w-14 h-3 
            rounded-full 
            bg-gray-200
          "
          />
        </div>
      ) : !user ? (
        <button
          onClick={() => setOnopenLogin(true)}
          className="relative group hidden md:block"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#9e0910] to-[#c20e17] rounded-full blur opacity-60 group-hover:opacity-100 transition-all" />
          <div className="relative w-[120px] flex items-center justify-center gap-2 px-2 py-2.5 bg-white rounded-full border border-[#9e0910]/30 hover:border-[#9e0910] transition-all">
            <FaUser className="text-[#9e0910] text-sm" />
            <span className="text-sm font-medium text-gray-700">Login</span>
          </div>
        </button>
      ) : (
        <div className="hidden md:block">
          <UserDropdown user={user} onLogout={handleLogout} />
        </div>
      )}
    </div>
  );
}

export default UserSection;
