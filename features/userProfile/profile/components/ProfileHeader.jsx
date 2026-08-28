import React from "react";

import { MdOutlinePhone } from "react-icons/md";

function ProfileHeader({ user }) {
  return (
    <div>
      {" "}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#9e0910] to-[#c20e17] flex items-center justify-center text-white text-xl font-semibold shadow-md">
            {user?.firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {user?.firstName} {user?.lastName}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MdOutlinePhone className="text-[#9e0910]" />
              <span>{user?.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
