import { verifyOtp } from "@/lib/otpStore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, otp } = req.body;

  console.log("Received OTP:", otp);
  console.log("Type of received OTP:", typeof otp);

  const isValid = verifyOtp(phone, otp);

  if (!isValid) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }

  return res.status(200).json({
    message: "OTP verified",
  });
}
