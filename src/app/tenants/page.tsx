import { currentUser } from "@clerk/nextjs";
import { db } from "~/server/db";
import TenantCard from "../_components/tenant-card";

export default async function Page() {
  const data = await db.query.tenants.findMany();
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between px-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-semibold">All Tenants</h1>
          <p className="text-sm text-slate-600">
            here goes a list of all tenants in the app, clicking each one opens
            tenants page
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {(data ?? []).map((tenant) => (
          <TenantCard
            key={tenant.id}
            id={tenant.id}
            name={tenant.name}
            displayName={tenant.displayName}
            description={tenant.description}
            tenantUserId={tenant?.userId}
            currentUserId={user?.id}
          />
        ))}
      </div>
    </div>
  );
}
