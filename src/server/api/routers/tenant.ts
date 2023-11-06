import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { tenants } from "~/server/db/schema";

export const tenantRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.tenants.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        displayName: z.string().min(1),
        description: z.string().min(1).max(500),
        userId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tenant = await ctx.db.insert(tenants).values({
        name: input.name,
        displayName: input.displayName,
        description: input.description,
        userId: input.userId,
      });
      return tenant.insertId;
    }),
});
