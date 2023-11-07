import { currentUser } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const authRouter = createTRPCRouter({
  authCallback: publicProcedure.query(async ({ ctx }) => {
    const user = await currentUser();

    if (!user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const dbUser = await ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, user.id),
    });

    if (!dbUser) {
      await ctx.db.insert(users).values({
        id: user.id,
        role: "ADMIN",
      });
    }

    return { success: true };
  }),
  dbUser: privateProcedure.query(async ({ ctx }) => {
    const user = await currentUser();

    if (!user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.auth.userId),
    });
  }),
});
