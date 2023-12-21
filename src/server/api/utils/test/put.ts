import { Response } from "@/lib/responses";

interface Input {
  text: string;
}

export function PUT(input: Input) {
  // Mutation for databases, etc. goes here

  return {
    result: input.text,
    ...Response.Success,
  };
}
