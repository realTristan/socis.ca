import verifyResetCode from "@/pages/api/_lib/verifyResetCode";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, code } = req.body;
  if (!code || !email) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const validCode = await verifyResetCode(email, code);
  return validCode
    ? res.status(200).json({ message: "Valid reset code" })
    : res.status(400).json({ message: "Invalid reset code" });
}
