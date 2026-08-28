export const toEnglishNumber = (value = "") => {
  return value.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
};

export const formatPhoneDisplay = (value = "") => {
  let digits = toEnglishNumber(value).replace(/\D/g, "");

  // حذف 98 یا +98 برای نمایش
  if (digits.startsWith("98")) {
    digits = digits.slice(2);
  }

  // حذف صفر اول
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (!digits) return "+98 ";

  if (digits.length <= 3) {
    return `+98 ${digits}`;
  }

  if (digits.length <= 6) {
    return `+98 ${digits.slice(0, 3)} ${digits.slice(3)}`;
  }

  return `+98 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
};
