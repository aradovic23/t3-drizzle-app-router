import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CreateTenant from "@/components/create-tenant";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";

export default async function Page() {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/auth-callback?origin=dashboard");
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.externalId, user.id),
  });

  if (!dbUser) {
    return null;
  }

  return (
    <div className="grid h-screen place-content-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-center text-3xl font-semibold">
          Hello, {user.firstName}!
        </h1>
        <CreateTenant userId={dbUser?.id} />
      </div>
    </div>
  );
}
