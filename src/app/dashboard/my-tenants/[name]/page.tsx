import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { name: string } }) {
  const tenant = await api.tenant.getTenantByName.query({ name: params.name });

  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-4 flex flex-col gap-2 p-2">
        <h1 className="mb-5 text-3xl font-semibold">
          {tenant?.displayName}{" "}
          <span className="text-sm text-zinc-500">/{tenant?.name}</span>
        </h1>
        <div className="flex max-w-lg flex-col gap-3">
          <Input defaultValue={tenant?.displayName ?? ""} />
          <Input defaultValue={tenant?.description ?? ""} />
          <Button>Update</Button>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex flex-col gap-2 rounded-md bg-slate-300/20 p-2">
          <h3 className="text-lg font-medium">Details</h3>
          <div className="flex flex-col gap-1">
            <p>total homepage views 340000</p>
            <p>categories 15</p>
            <p>products 150</p>
          </div>
        </div>
      </div>
    </div>
  );
}
