import client from "@/lib/apolloClient";
import { verifyToken } from "@/lib/auth";
import { GET_USER_BY_PHONE } from "@/lib/queries/UserLogin";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = verifyToken(token);

    if (!decoded?.phone) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // گرفتن اطلاعات کامل کاربر از Hygraph
    const { data } = await client.query({
      query: GET_USER_BY_PHONE,
      variables: { phone: decoded.phone },
      fetchPolicy: "no-cache",
    });

    const user = data?.peoples?.[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // اینجا می‌تونی اطلاعات بیشتری از دیتابیس بگیری
    // فعلاً فقط phone رو برمی‌گردونیم
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
