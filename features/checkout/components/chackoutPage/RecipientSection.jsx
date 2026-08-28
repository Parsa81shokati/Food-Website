import React from "react";
import { FaUserFriends, FaUserCheck } from "react-icons/fa";

function RecipientSection({ formData, setFormData, user, setFormErrors }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/80">
      {/* <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaUserFriends className="text-white/80" />
          Recipient
        </h2>
      </div> */}

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label
            className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              formData.isForSelf
                ? "border-[#9e0910] bg-[#9e0910]/5 shadow-md shadow-[#9e0910]/10"
                : "border-gray-200 hover:border-[#9e0910]/40 hover:bg-gray-50"
            }`}
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                isForSelf: true,
                customerName: `${user?.firstName} ${user?.lastName}`,
                customerPhone: user?.phone,
              }));

              setFormErrors((prev) => ({
                ...prev,
                customerName: "",
                customerPhone: "",
              }));
            }}
          >
            <input
              type="radio"
              checked={formData.isForSelf}
              onChange={() => {}}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                formData.isForSelf
                  ? "border-[#9e0910] bg-[#9e0910]"
                  : "border-gray-300"
              }`}
            >
              {formData.isForSelf && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FaUserCheck
                  className={
                    formData.isForSelf ? "text-[#9e0910]" : "text-gray-400"
                  }
                />
                <span
                  className={`font-medium ${formData.isForSelf ? "text-[#9e0910]" : "text-gray-700"}`}
                >
                  Order for myself
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Use your saved info
              </p>
            </div>
          </label>

          <label
            className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              !formData.isForSelf
                ? "border-[#9e0910] bg-[#9e0910]/5 shadow-md shadow-[#9e0910]/10"
                : "border-gray-200 hover:border-[#9e0910]/40 hover:bg-gray-50"
            }`}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                isForSelf: false,
                customerName: "",
                customerPhone: "",
              }))
            }
          >
            <input
              type="radio"
              checked={!formData.isForSelf}
              onChange={() => {}}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                !formData.isForSelf
                  ? "border-[#9e0910] bg-[#9e0910]"
                  : "border-gray-300"
              }`}
            >
              {!formData.isForSelf && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FaUserFriends
                  className={
                    !formData.isForSelf ? "text-[#9e0910]" : "text-gray-400"
                  }
                />
                <span
                  className={`font-medium ${!formData.isForSelf ? "text-[#9e0910]" : "text-gray-700"}`}
                >
                  Order for someone else
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Enter recipient details
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default RecipientSection;
