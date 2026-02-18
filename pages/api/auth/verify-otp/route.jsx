// pages/api/auth/verify-otp.js
import jwt from "jsonwebtoken";
import { gql, GraphQLClient } from "graphql-request";

const OTP_SECRET = process.env.JWT_SECRET || "change_this_secret";
const hygraphEndpoint = process.env.HYGRAPH_ENDPOINT;

let otpStore = new Map(); // همان Map از send-otp.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, otp } = req.body;

  const record = otpStore.get(phone);
  if (!record) return res.status(400).json({ error: "OTP not found" });
  if (Date.now() > record.expires)
    return res.status(400).json({ error: "OTP expired" });
  if (Number(otp) !== record.otp)
    return res.status(400).json({ error: "OTP invalid" });

  // پاک کردن OTP بعد از استفاده
  otpStore.delete(phone);

  // بررسی وجود کاربر در Hygraph
  const client = new GraphQLClient(hygraphEndpoint, {
    headers: { Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}` },
  });

  const query = gql`
    query GetUserByPhone($phone: String!) {
      peoples(where: { phone: $phone }) {
        id
        firstName
        lastName
        role
      }
    }
  `;

  const data = await client.request(query, { phone });
  let user = data.peoples[0];

  // اگر وجود نداشت، ایجاد کن
  if (!user) {
    const mutation = gql`
      mutation CreateUser($phone: String!) {
        createPeople(data: { phone: $phone, role: user }) {
          id
          phone
          role
        }
      }
    `;
    const createData = await client.request(mutation, { phone });
    user = createData.createPeople;
  }

  // JWT بساز
  const token = jwt.sign(
    { id: user.id, phone: user.phone, role: "user" },
    OTP_SECRET,
    { expiresIn: "7d" },
  );

  // ست کردن HttpOnly Cookie
  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`,
  );

  res.status(200).json({ success: true, user });
}
