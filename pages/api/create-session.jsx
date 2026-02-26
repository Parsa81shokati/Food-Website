import { signToken } from "@/lib/auth";
import client from "@/lib/apolloClient";
import { GET_USER_BY_PHONE } from "@/lib/queries/UserLogin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, id } = req.body;

  const token = signToken({
    id,
    phone,
  });

  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
  );

  return res.status(200).json({
    message: "Session created",
  });
}
