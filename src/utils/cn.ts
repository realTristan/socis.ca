import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
export const cn = (...inputs: (string | undefined)[]) => twMerge(clsx(inputs));
