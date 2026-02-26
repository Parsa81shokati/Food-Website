const otpStore = new Map();

export function saveOtp(phone, otp) {
  otpStore.set(phone, {
    otp,
    expires: Date.now() + 5 * 60 * 1000, // 5 دقیقه
  });
}

export function verifyOtp(phone, otp) {
  const record = otpStore.get(phone);

  if (!record) return false;
  if (record.expires < Date.now()) {
    otpStore.delete(phone);
    return false;
  }

  if (record.otp !== Number(otp)) return false;

  otpStore.delete(phone);
  return true;
}
