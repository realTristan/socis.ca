import generateResetCode from "./generateResetCode";

export default async function verifyResetCode(
  email: string,
  code: string,
): Promise<boolean> {
  for (let i = -1; i < 10; i++) {
    const timeInMinutes = Math.floor(Date.now() / 1000 / 60) - i;
    const resetCode = await generateResetCode(email, timeInMinutes);

    if (resetCode === code) {
      return true;
    }
  }

  return false;
}
