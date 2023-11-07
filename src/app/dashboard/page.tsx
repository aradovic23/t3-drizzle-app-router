import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CreateTenant from "@/components/create-tenant";

export default async function Page() {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/auth-callback?origin=dashboard");
  }

  return (
    <div className="grid place-content-center">
      <div className="flex flex-col gap-3">
        <CreateTenant userId={user?.id} />
      </div>
    </div>
  );
}
