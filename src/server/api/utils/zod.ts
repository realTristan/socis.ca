import { z } from "zod";

export const zstring = (min?: number, max?: number) =>
  z
    .string()
    .min(min ?? 1)
    .max(max ?? 255);

export const znumber = (min?: number, max?: number) =>
  z
    .number()
    .min(min ?? 1)
    .max(max ?? 1_000_000_000_000);
