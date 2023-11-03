import { currentUser } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const authRouter = createTRPCRouter({
  authCallback: publicProcedure.query(async ({ ctx }) => {
    const user = await currentUser();

    if (!user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // TODO: check if the user is in the db

    const dbUser = await ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.externalId, user.id),
    });

    if (!dbUser) {
      await ctx.db.insert(users).values({
        externalId: user.id,
        role: "ADMIN",
      });
    }

    return { success: true };
  }),
});
