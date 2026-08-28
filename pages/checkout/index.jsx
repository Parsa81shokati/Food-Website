import { useSelector, useDispatch } from "react-redux";
import useAuth from "@/features/auth/hooks/useAuth";
import { MdDiscount, MdPayment, MdShoppingCart } from "react-icons/md";
import RecipientSection from "@/features/checkout/components/chackoutPage/RecipientSection";
import ContactInformation from "@/features/checkout/components/chackoutPage/ContactInformation";
import OrderSummary from "@/features/checkout/components/chackoutPage/OrderSummary";
import useCheckoutForm from "@/features/checkout/hooks/useCheckoutForm";
import RequireAuth from "@/components/auth/RequireAuth";
import { useRef } from "react";
import Alert from "@/components/public/Alert";
import Empty from "@/features/cart/components/Empty";

function CheckoutPage() {
  const items = useSelector((state) => state.cart.selectedItems);
  const { user } = useAuth();
  const firstErrorRef = useRef(null);

  const {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    isSubmitting,
    discountCode,
    appliedCode,
    setDiscountCode,
    handleChange,
    handleApplyDiscount,
    handleRemoveDiscount,
    handleSubmit,
    submitError,
  } = useCheckoutForm({ user, items, firstErrorRef });

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Empty onClose={null} />
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/60 pt-10 md:pt-13 pb-12">
        {/* {showLogin && <LoginSignUpModal onClose={() => setShowLogin(false)} />} */}

        <div className="container mx-auto px-4 max-w-7xl">
          {/* عنوان صفحه */}

          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 bg-[#9e0910]/10 px-5 py-2.5 rounded-full mb-4 shadow-sm">
              <MdShoppingCart className="text-[#9e0910] text-lg" />

              <span className="text-sm font-semibold text-[#9e0910] tracking-wide">
                Checkout
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
              Complete Your{" "}
              <span className="text-[#9e0910] relative">
                Order
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#9e0910]/30 rounded-full"></span>
              </span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Fill in the details below to finalize your purchase
            </p>
          </div>
          <Alert message={submitError} />
          <RecipientSection
            formData={formData}
            setFormData={setFormData}
            user={user}
            setFormErrors={setFormErrors}
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* فرم اطلاعات مشتری */}

            <ContactInformation
              formData={formData}
              handleChange={handleChange}
              formErrors={formErrors}
              firstErrorRef={firstErrorRef}
            />

            {/* خلاصه سفارش */}
            <OrderSummary
              handleSubmit={handleSubmit}
              items={items}
              isSubmitting={isSubmitting}
              setDiscountCode={setDiscountCode}
            />
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

CheckoutPage.getLayout = function getLayout(page) {
  return <>{page}</>; // برگرداندن صفحه بدون هیچ لایوتی
};

export default CheckoutPage;
