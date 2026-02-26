import { useSelector, useDispatch } from "react-redux";
import { calculateDiscountPrice } from "@/helper/helper";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import LoginSignUpModal from "@/components/Login/LoginSignUpModal";
import { useRouter } from "next/router";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaPencilAlt,
  FaTag,
  FaTruck,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import { MdDiscount, MdPayment, MdShoppingCart } from "react-icons/md";
import { BsArrowRight, BsCheckCircleFill, BsCreditCard } from "react-icons/bs";
import { clearCart, deleteItem } from "@/redux-toolkit/features/CheckoutSlice";

import Empty from "@/components/checkout/Empty";

function CheckoutPage() {
  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  // نمونه کدهای تخفیف
  const validDiscounts = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME15: 15,
    FOODY5: 5,
  };

  useEffect(() => {
    if (!loading && !user) {
      setShowLogin(true);
    }
  }, [loading, user]);

  const shippingCost = 5;
  const freeShippingThreshold = 50;

  // Subtotal (after item discounts)
  const subtotal = items.reduce((total, item) => {
    const finalPrice = calculateDiscountPrice(
      item.price,
      item.discountPercentage,
    );
    return total + finalPrice * item.quantity;
  }, 0);

  // Apply coupon discount
  const discountAmount = (subtotal * discountValue) / 100;

  // محاسبه هزینه ارسال (رایگان بالای مبلغ مشخص)
  const finalShippingCost =
    subtotal >= freeShippingThreshold ? 0 : shippingCost;

  const total = subtotal + finalShippingCost - discountAmount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // پاک کردن خطای مربوطه
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (formData.fullName.length < 3) {
      errors.fullName = "Name must be at least 3 characters";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      errors.phone = "Phone must be 11 digits starting with 09";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    } else if (formData.address.length < 10) {
      errors.address = "Please enter a complete address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      alert("Please enter a discount code");
      return;
    }

    setIsApplying(true);
    // شبیه‌سازی درخواست API
    setTimeout(() => {
      const code = discountCode.toUpperCase().trim();
      if (validDiscounts[code]) {
        setDiscountValue(validDiscounts[code]);
        setAppliedCode(code);
        alert(`✅ Discount applied: ${validDiscounts[code]}% off`);
      } else {
        setDiscountValue(0);
        setAppliedCode("");
        alert("❌ Invalid discount code");
      }
      setIsApplying(false);
    }, 500);
  };

  const handleRemoveDiscount = () => {
    setDiscountCode("");
    setDiscountValue(0);
    setAppliedCode("");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // اسکرول به بالای فرم برای نمایش خطاها
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          peopleId: user.id,
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: calculateDiscountPrice(item.price, item.discountPercentage),
          })),
          address: formData.address,
          note: formData.note,
          discountCode: appliedCode || null,
          discountAmount: discountAmount,
          shippingCost: finalShippingCost,
          total: total,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // پاک کردن سبد خرید
      dispatch(deleteItem());

      // رفتن به صفحه پرداخت
      router.push(`/payment/${data.orderId}`);
    } catch (err) {
      console.error(err);
      alert("Error creating order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // اگر سبد خرید خالی است
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Empty />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      {showLogin && <LoginSignUpModal onClose={() => setShowLogin(false)} />}

      <div className="container mx-auto px-4">
        {/* عنوان صفحه */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#9e0910]/10 px-4 py-2 rounded-full mb-4">
            <MdShoppingCart className="text-[#9e0910]" />
            <span className="text-sm font-medium text-[#9e0910]">Checkout</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Complete Your <span className="text-[#9e0910]">Order</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* فرم اطلاعات مشتری */}
          <div className="lg:col-span-2 space-y-6">
            {/* اطلاعات تماس */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FaUser /> Contact Information
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all ${
                          formErrors.fullName
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
                        }`}
                      />
                    </div>
                    {formErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="09123456789"
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all ${
                          formErrors.phone
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* آدرس تحویل */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FaMapMarkerAlt /> Delivery Address
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street, City, Postal Code"
                      rows="3"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all ${
                        formErrors.address
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
                      }`}
                    />
                  </div>
                  {formErrors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Note (Optional)
                  </label>
                  <div className="relative">
                    <FaPencilAlt className="absolute left-3 top-4 text-gray-400" />
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="Any special instructions?"
                      rows="2"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ویژگی‌های امنیتی */}
            <div className="flex items-center gap-4 text-sm text-gray-500 bg-white p-4 rounded-xl shadow-sm">
              <FaShieldAlt className="text-[#9e0910] text-xl" />
              <span>Your information is secure and encrypted</span>
              <FaLock className="text-gray-400 ml-auto" />
            </div>
          </div>

          {/* خلاصه سفارش */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg sticky top-24">
              {/* هدر */}
              <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] px-6 py-4 rounded-t-2xl">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MdPayment /> Order Summary
                </h2>
              </div>

              {/* محتوا */}
              <div className="p-6 space-y-4">
                {/* لیست محصولات */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {items.map((item) => {
                    const finalPrice = calculateDiscountPrice(
                      item.price,
                      item.discountPercentage,
                    );

                    return (
                      <div
                        key={item.id}
                        className="flex justify-between items-start text-sm border-b border-gray-100 pb-2"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold text-[#9e0910]">
                          ${(finalPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* کد تخفیف */}
                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="SAVE10"
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
                        disabled={!!appliedCode}
                      />
                    </div>
                    {!appliedCode ? (
                      <button
                        onClick={handleApplyDiscount}
                        disabled={isApplying}
                        className="px-4 py-2 bg-[#9e0910] text-white rounded-xl text-sm hover:bg-[#7e0710] transition disabled:opacity-50"
                      >
                        {isApplying ? "..." : "Apply"}
                      </button>
                    ) : (
                      <button
                        onClick={handleRemoveDiscount}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-300 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {appliedCode && (
                    <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                      <BsCheckCircleFill /> Code {appliedCode} applied (
                      {discountValue}% off)
                    </p>
                  )}
                </div>

                {/* جزئیات قیمت */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <FaTruck /> Shipping:
                    </span>
                    {finalShippingCost === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">
                        ${finalShippingCost.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {discountValue > 0 && (
                    <div className="flex justify-between text-sm text-[#9e0910]">
                      <span>Discount ({discountValue}%):</span>
                      <span className="font-medium">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {subtotal < freeShippingThreshold && (
                    <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded-lg">
                      Add ${(freeShippingThreshold - subtotal).toFixed(2)} more
                      for free shipping
                    </p>
                  )}

                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-[#9e0910]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* دکمه پرداخت */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white py-3.5 rounded-xl font-medium hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      Proceed to Payment
                      <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* روش‌های پرداخت */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <BsCreditCard className="text-gray-400" />
                  <span className="text-xs text-gray-400">Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// در انتهای فایل CheckoutPage.js، قبل از export default
CheckoutPage.getLayout = function getLayout(page) {
  return <>{page}</>; // برگرداندن صفحه بدون هیچ لایوتی
};

export default CheckoutPage;
