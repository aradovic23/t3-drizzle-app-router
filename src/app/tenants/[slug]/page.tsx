import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { slug: string } }) {
  const tenant = await api.tenant.getTenantByName.query({ name: params.slug });
  return (
    <div className="flex flex-col">
      <p>{tenant?.id}</p>
      <p>{tenant?.displayName}</p>
      <p>{tenant?.createdAt?.toLocaleDateString()}</p>
      <p>{tenant?.description}</p>
    </div>
  );
}
