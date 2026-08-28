import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";

function RegisterStep({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  error,
  onSubmit,
  isLoading,
}) {
  return (
    <div className="flex flex-col gap-8 mt-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Create Account
      </h2>
      <p className="text-center text-gray-500 -mt-4">
        Enter your details to complete registration
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              <HiOutlineUserCircle />
            </span>
            <input
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              <HiOutlineUserCircle />
            </span>
            <input
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className={`bg-[#9e0910] text-white py-3 rounded-xl font-medium hover:bg-[#68070b] transition-colors focus:ring-2 focus:ring-[#9e0910]/50 focus:outline-none ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Registering..." : "Sign Up"}
      </button>
    </div>
  );
}

export default RegisterStep;
