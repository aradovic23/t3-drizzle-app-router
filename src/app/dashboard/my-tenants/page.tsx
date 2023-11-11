import { Suspense } from "react";

import { api } from "~/trpc/server";
import Loading from "./loading";
import TenantCard from "~/app/_components/tenant-card";

export default async function Page() {
  const data = await api.tenant.getUserTenants.query();

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-3">
      <Suspense fallback={<Loading />}>
        {data.map((tenant) => (
          <TenantCard
            id={tenant.id}
            key={tenant.id}
            name={tenant.name}
            displayName={tenant.displayName}
            description={tenant.description}
          />
        ))}
      </Suspense>
    </div>
  );
}
