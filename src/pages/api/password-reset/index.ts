import { type NextApiRequest, type NextApiResponse } from "next";
import verifyResetCode from "../_lib/verifyResetCode";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, code, password } = req.body;
  if (!code || !email || !password) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const validCode = await verifyResetCode(email, code);
  if (!validCode) {
    return res.status(400).json({ message: "Invalid reset code" });
  }

  // TODO: Update password in database

  return res.status(200).json({ message: "Password updated" });
}
