import { type NextApiRequest, type NextApiResponse } from "next";
import generateResetCode from "../_lib/generateResetCode";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, code } = req.body;
  if (!code) {
    return res.status(400).json({ message: "Code is required" });
  }

  // Verify the code
  for (let i = -1; i < 10; i++) {
    const timeInMinutes = Math.floor(Date.now() / 1000 / 60) - i;
    const resetCode = await generateResetCode(email, timeInMinutes);

    if (resetCode === code) {
      return res.status(200).json({ message: "Verification success" });
    }
  }

  // Update the password in the database

  return res.status(400).json({ message: "Verification failed" });
}
