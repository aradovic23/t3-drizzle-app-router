import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { tenants } from "~/server/db/schema";

export const tenantRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.tenants.findMany();
  }),
  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(1),
        displayName: z.string().min(1),
        description: z.string().min(1).max(500),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const tenant = await ctx.db.insert(tenants).values({
        name: input.name,
        displayName: input.displayName,
        description: input.description,
        userId: input.userId,
      });
      return tenant.insertId;
    }),
  getUserTenants: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return await ctx.db.query.tenants.findMany({
      where: eq(tenants.userId, ctx.auth.userId),
    });
  }),
});
