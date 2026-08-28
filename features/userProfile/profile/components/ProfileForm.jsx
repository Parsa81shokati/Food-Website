import { useRouter } from "next/router";
import React from "react";
import { FiEdit2, FiSave, FiCheckCircle } from "react-icons/fi";
import { MdOutlinePerson } from "react-icons/md";

function ProfileForm({
  isEditing,
  editForm,
  handleInputChange,
  handleEditToggle,
  loading,
  user,
  saveSuccess,
  handleSave,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <MdOutlinePerson className="text-[#9e0910] text-xl" />
          Personal Information
        </h2>
        {!isEditing && (
          <button
            onClick={handleEditToggle}
            className="text-sm text-[#9e0910] hover:text-[#7a0710] font-medium flex items-center gap-1 transition-colors bg-[#9e0910]/5 hover:bg-[#9e0910]/10 px-3 py-1.5 rounded-lg"
          >
            <FiEdit2 className="text-sm" />
            Edit
          </button>
        )}
      </div>

      {saveSuccess && (
        <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3 animate-slideDown">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <FiCheckCircle className="text-emerald-600 text-sm" />
          </div>
          <p className="text-sm text-emerald-700 font-medium">
            Profile updated successfully!
          </p>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={editForm.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9e0910]/10 focus:border-[#9e0910] transition-all bg-gray-50/50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={editForm.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9e0910]/10 focus:border-[#9e0910] transition-all bg-gray-50/50 focus:bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={editForm.phone}
                disabled
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {/* <FiLock className="text-gray-400 text-sm" /> */}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
              Phone number cannot be changed
            </p>
          </div>
          <div className="flex items-center gap-3 pt-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#9e0910] hover:bg-[#7a0710] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="text-sm" />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 px-5 py-2.5 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-gray-50/70 rounded-xl p-4 border border-gray-100/60">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Full Name
            </p>
            <p className="text-base font-medium text-gray-800 mt-1">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div className="bg-gray-50/70 rounded-xl p-4 border border-gray-100/60">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Phone
            </p>
            <p className="text-base font-medium text-gray-800 mt-1">
              {user?.phone}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
