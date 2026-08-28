import { signToken } from "@/lib/auth/jwt";
import client from "@/lib/apollo/Client";
import { GET_USER_BY_PHONE } from "@/features/auth/queries/getUserByPhone";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body;

  const { data } = await client.query({
    query: GET_USER_BY_PHONE,
    variables: { phone },
  });

  const id = data?.peoples[0].id;

  const token = signToken({
    id,
    phone,
  });

  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=21600; SameSite=Lax`,
  );

  return res.status(200).json({
    message: "Session created",
  });
}
