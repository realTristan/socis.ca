import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { GET } from "@/server/api/utils/test/get";
import { PUT } from "@/server/api/utils/test/put";
import { zstring } from "@/server/api/utils/zod";

export const testRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ text: zstring() }))
    .query(({ input }) => GET(input)),

  put: publicProcedure
    .input(z.object({ text: zstring() }))
    .mutation(async ({ input }) => PUT(input)),
});
