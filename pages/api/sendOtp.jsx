import { saveOtp } from "@/lib/otpStore";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { phone } = req.body;

    if (!/^09\d{9}$/.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    saveOtp(phone, otp);

    console.log("OTP:", otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("SEND OTP CRASH:", error);
    return res.status(500).json({ error: "Server crashed" });
  }
}
