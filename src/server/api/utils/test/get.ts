import { Response } from "@/lib/responses";

interface Input {
  text: string;
}
export function GET(input: Input) {
  // Return the response
  return {
    result: input.text,
    ...Response.Success,
  };
}
