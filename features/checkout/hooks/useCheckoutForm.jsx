import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PUBLISH_ORDER } from "@/features/checkout/mutation/createOrder";
import { useMutation } from "@apollo/client/react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCheckoutData,
  setCheckoutData,
} from "@/features/checkout/checkoutSlice";

const EMPTY_FORM = {
  isForSelf: true,
  customerName: "",
  customerPhone: "",
  address: "",
  note: "",
};

function useCheckoutForm({ user, items, firstErrorRef }) {
  const router = useRouter();

  // const [formData, setFormData] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // کد تخفیف: یک منبع حقیقت مستقل، جدا از formData
  const [discountCode, setDiscountCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");

  const dispatch = useDispatch();

  const formData = useSelector((state) => state.checkout.formData);

  useEffect(() => {
    if (user) {
      dispatch(
        setCheckoutData({
          customerName: `${user.firstName} ${user.lastName}`,
          customerPhone: user.phone,
        }),
      );
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setCheckoutData({
        [name]: value,
      }),
    );

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // فقط اگر سفارش برای شخص دیگری باشد
    if (!formData.isForSelf) {
      if (!formData.customerName.trim()) {
        errors.customerName = "Recipient name is required";
      } else if (formData.customerName.trim().length < 3) {
        errors.customerName = "Name must be at least 3 characters";
      }

      if (!formData.customerPhone.trim()) {
        errors.customerPhone = "Phone number is required";
      } else if (!/^09\d{9}$/.test(formData.customerPhone)) {
        errors.customerPhone = "Phone must be 11 digits and start with 09";
      }
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
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
    setAppliedCode(discountCode.toUpperCase());
  };

  const handleRemoveDiscount = () => {
    setDiscountCode("");
    setAppliedCode("");
  };

  const handleSubmit = async () => {
    console.log("handleSubmit");
    if (!validateForm()) {
      setTimeout(() => {
        firstErrorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
      return;
    }

    setFormErrors({});
    const customer = formData.isForSelf
      ? {
          customerName: `${user?.firstName} ${user?.lastName}`,
          customerPhone: user?.phone,
        }
      : {
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
        };

    if (formData.isForSelf && (!user?.firstName || !user?.phone)) {
      setFormErrors({
        submit: "Your profile information is incomplete",
      });
      return;
    }
    const payload = {
      items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
      customerName: customer.customerName,
      customerPhone: customer.customerPhone,
      address: formData.address,
      note: formData.note,
      discountCode: appliedCode || "",
    };

    if (!items || items.length === 0) {
      setSubmitError("Your cart is empty");
      return;
    }

    if (isSubmitting) return;
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Request failed");
      }

      const id = data?.orderId;

      router.push({
        pathname: "/checkout/demoPayment",
        query: { total: data.pricing.totalPrice, orderId: id },
      });
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const setFormData = (data) => {
    dispatch(setCheckoutData(data));
  };

  return {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    isSubmitting,
    discountCode,
    appliedCode,
    setDiscountCode,
    submitError,
    handleChange,
    handleApplyDiscount,
    handleRemoveDiscount,
    handleSubmit,
  };
}

export default useCheckoutForm;
