import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { buttonVariants } from "../_components/ui/button";
import { db } from "~/server/db";
import { UserButton } from "@clerk/nextjs";

export interface TenantProps {
  name: string | null;
  displayName: string | null;
  description: string | null;
}

export function TenantCard({ name, displayName, description }: TenantProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="hero-pattern relative mb-2 h-32 w-full rounded-md"></div>
        <CardTitle>{displayName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href={`/tenants/${name}`}
        >
          Visit
        </Link>
      </CardFooter>
    </Card>
  );
}

export default async function Page() {
  const data = await db.query.tenants.findMany();

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
        <div className="flex items-center gap-3">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard"
          >
            Go to dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {(data ?? []).map((tenant) => (
          <TenantCard
            key={tenant.id}
            name={tenant.name}
            displayName={tenant.displayName}
            description={tenant.description}
          />
        ))}
      </div>
    </div>
  );
}
