import React from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaPencilAlt,
  FaShieldAlt,
} from "react-icons/fa";

function ContactInformation({
  formData,
  handleChange,
  formErrors,
  firstErrorRef,
}) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* اطلاعات تماس */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/80">
        <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] px-6 py-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <FaUser className="text-white/80" /> Contact Information
          </h2>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  name="customerName"
                  ref={formErrors.customerName ? firstErrorRef : null}
                  value={formData.customerName}
                  onChange={handleChange}
                  disabled={formData.isForSelf}
                  placeholder="Enter full name"
                  className={`w-full pl-10 pr-4 py-3.5 border-2 rounded-xl outline-none transition-all text-sm ${
                    formData.isForSelf
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                      : formErrors.customerName
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
                  }`}
                />
              </div>

              {formErrors.customerName && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {formErrors.customerName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  name="customerPhone"
                  ref={formErrors.customerPhone ? firstErrorRef : null}
                  value={formData.customerPhone}
                  onChange={handleChange}
                  disabled={formData.isForSelf}
                  placeholder="Enter phone number"
                  className={`w-full pl-10 pr-4 py-3.5 border-2 rounded-xl outline-none transition-all text-sm ${
                    formData.isForSelf
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                      : formErrors.customerPhone
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
                  }`}
                />
              </div>

              {formErrors.customerPhone && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {formErrors.customerPhone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* آدرس تحویل */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/80">
        <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] px-6 py-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <FaMapMarkerAlt className="text-white/80" /> Delivery Address
          </h2>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Address <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3.5 top-4 text-gray-400 text-sm" />

              <textarea
                name="address"
                ref={formErrors.address ? firstErrorRef : null}
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, city, postal code"
                rows="3"
                className={`w-full pl-10 pr-4 py-3.5 border-2 rounded-xl outline-none transition-all text-sm resize-none ${
                  formErrors.address
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
                }`}
              />
            </div>

            {formErrors.address && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                {formErrors.address}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Order Note{" "}
              <span className="text-gray-400 text-xs">(Optional)</span>
            </label>

            <div className="relative">
              <FaPencilAlt className="absolute left-3.5 top-4 text-gray-400 text-sm" />

              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Any special delivery instructions?"
                rows="2"
                className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl outline-none transition-all text-sm resize-none focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ویژگی‌های امنیتی */}

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100/80">
        <div className="flex items-center gap-2">
          <FaShieldAlt className="text-[#9e0910] text-lg" />
          <span>Your information is secure and encrypted</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {/* <FaLock className="text-gray-400" /> */}
          <span className="text-xs text-gray-400">256-bit SSL</span>
        </div>
        <div className="flex items-center gap-1">
          {/* <MdVerified className="text-green-500" /> */}
          <span className="text-xs text-green-600">Trusted</span>
        </div>
      </div>
    </div>
  );
}

export default ContactInformation;
