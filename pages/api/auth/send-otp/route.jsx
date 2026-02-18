import { NextResponse } from "next/server";

const otpStore = new Map(); // در پروژه واقعی بهتره Redis باشه

export async function POST(req) {
  const { phone } = await req.json();

  if (!phone || !/^09\d{9}$/.test(phone)) {
    return NextResponse.json(
      { error: "Invalid phone number" },
      { status: 400 },
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore.set(phone, {
    code: otp,
    expires: Date.now() + 2 * 60 * 1000, // 2 دقیقه اعتبار
  });

  console.log("OTP:", otp, "for", phone); // بعداً SMS API میاد اینجا

  return NextResponse.json({ success: true });
}
