// pages/offers.js
import { useState } from "react";
import { useRouter } from "next/router";
import { MdLocalOffer } from "react-icons/md";
import { FiTag, FiCopy, FiCheck, FiShoppingBag } from "react-icons/fi";
import { FaStar, FaMedal, FaCrown } from "react-icons/fa";

function OffersPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(null);

  // تخفیف‌های پلکانی
  const offers = [
    {
      tier: 1,
      label: "1st",
      title: "First Purchase",
      discount: "15%",
      code: "WELCOME15",
      icon: <FaStar className="text-yellow-400" />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      tier: 2,
      label: "2nd",
      title: "Second Purchase",
      discount: "20%",
      code: "LOYAL20",
      icon: <FaMedal className="text-amber-400" />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
    {
      tier: 3,
      label: "3rd",
      title: "Third Purchase",
      discount: "30%",
      code: "THIRD30",
      icon: <FaCrown className="text-yellow-400" />,
      color: "text-[#9e0910]",
      bg: "bg-[#9e0910]/5",
      border: "border-[#9e0910]/20",
    },
    {
      tier: 4,
      label: "4th+",
      title: "VIP Member",
      discount: "40%",
      code: "VIP40",
      icon: <FaCrown className="text-yellow-400" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
  ];

  // تخفیف‌های ویژه
  const specials = [
    { title: "Weekend", discount: "10%", code: "WEEKEND10" },
    { title: "Flash Sale", discount: "25%", code: "FLASH25" },
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  // تعداد خرید کاربر (فرضی)
  const userPurchases = 2;
  const currentOffer =
    offers.find((o) => o.tier === userPurchases) || offers[0];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* هدر */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-[#9e0910]/10 rounded-lg">
            <MdLocalOffer className="text-xl text-[#9e0910]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Offers</h1>
            <p className="text-sm text-gray-500">Your purchase rewards</p>
          </div>
        </div>

        {/* وضعیت کاربر */}
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Your discount</p>
            <p className="text-2xl font-bold text-[#9e0910]">
              {currentOffer.discount}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Purchases</p>
            <p className="text-sm font-semibold text-gray-800">
              {userPurchases}
            </p>
          </div>
        </div>

        {/* تخفیف‌های پلکانی */}
        <div className="space-y-3 mb-8">
          {offers.map((offer) => {
            const isActive = offer.tier === userPurchases;
            const isUnlocked = offer.tier <= userPurchases;

            return (
              <div
                key={offer.tier}
                className={`bg-white rounded-xl border p-4 transition-all ${
                  isActive ? "border-[#9e0910] shadow-sm" : "border-gray-200"
                } ${!isUnlocked ? "opacity-50" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${offer.bg} flex items-center justify-center`}
                    >
                      {offer.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {offer.label} Purchase
                      </p>
                      <p className="text-xs text-gray-500">{offer.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${offer.color}`}>
                      {offer.discount}
                    </p>
                    {isUnlocked && (
                      <button
                        onClick={() => copyCode(offer.code)}
                        className="text-xs text-gray-400 hover:text-[#9e0910] transition-colors flex items-center gap-1"
                      >
                        {copied === offer.code ? (
                          <>
                            <FiCheck className="text-green-500" /> Copied
                          </>
                        ) : (
                          <>
                            <FiCopy /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                {isActive && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className="text-xs text-[#9e0910] font-medium">
                      ✓ Active
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* تخفیف‌های ویژه */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm font-medium text-gray-600 mb-3">
            Special Offers
          </p>
          <div className="space-y-2">
            {specials.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">{item.discount}</p>
                </div>
                <button
                  onClick={() => copyCode(item.code)}
                  className="text-xs text-gray-400 hover:text-[#9e0910] transition-colors flex items-center gap-1"
                >
                  {copied === item.code ? (
                    <>
                      <FiCheck className="text-green-500" /> Copied
                    </>
                  ) : (
                    <>
                      <FiCopy /> Copy
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* دکمه خرید */}
        <button
          onClick={() => router.push("/")}
          className="w-full mt-8 bg-[#9e0910] text-white py-3 rounded-xl hover:bg-[#7e0710] transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          <FiShoppingBag />
          Start Shopping
        </button>
      </div>
    </div>
  );
}

export default OffersPage;
