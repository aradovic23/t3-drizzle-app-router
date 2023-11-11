import { tenants } from "./../../db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tenantRouter = createTRPCRouter({
  // QUERIES
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.tenants.findMany();
  }),
  getUserTenants: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return await ctx.db.query.tenants.findMany({
      where: eq(tenants.userId, ctx.auth.userId),
    });
  }),
  getTenantByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.query.tenants.findFirst({
        where: eq(tenants.name, input.name),
      });
    }),
  // MUTATIONS
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
  delete: privateProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await ctx.db
        .delete(tenants)
        .where(
          and(eq(tenants.id, input.id), eq(tenants.userId, ctx.auth.userId)),
        );
    }),
});
