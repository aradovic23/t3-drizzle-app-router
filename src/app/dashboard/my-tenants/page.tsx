import { TenantCard } from "~/app/tenants/page";

import { api } from "~/trpc/server";

export default async function Page() {
  const data = await api.tenant.getUserTenants.query();

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-3">
      {data.map((tenant) => (
        <TenantCard
          key={tenant.id}
          name={tenant.name}
          displayName={tenant.displayName}
          description={tenant.description}
        />
      ))}
    </div>
  );
}
