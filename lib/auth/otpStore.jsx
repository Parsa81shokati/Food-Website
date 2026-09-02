import { getStore } from "@netlify/blobs";

const store = getStore("otp-store");

export async function saveOtp(phone, otp) {
  await store.setJSON(`otp:${phone}`, {
    otp: Number(otp),
    expires: Date.now() + 3 * 60 * 1000,
  });
}

export async function verifyOtp(phone, otp) {
  const record = await store.get(`otp:${phone}`, {
    type: "json",
  });

  if (!record) {
    return false;
  }

  if (record.expires < Date.now()) {
    await store.delete(`otp:${phone}`);
    return false;
  }

  if (record.otp !== Number(otp)) {
    return false;
  }

  await store.delete(`otp:${phone}`);

  return true;
}
