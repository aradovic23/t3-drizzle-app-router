import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { Button, buttonVariants } from "../_components/ui/button";
import { db } from "~/server/db";
import { UserButton } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";

export function TenantCard() {
  return (
    <Card>
      <CardHeader>
        <div className="relative mb-2 h-32 w-full"></div>
        <CardTitle>Tenant {Math.floor(Math.random() * 100)}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">
          Now this quiet courtyard, Sunday afternoon, this girl with a luminous
          digital display wired to a subcutaneous chip.
        </p>
      </CardContent>
      <CardFooter>
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href="/tenants/name"
        >
          Visit
        </Link>
      </CardFooter>
    </Card>
  );
}

export default async function Page() {
  const data = await db.query.tenants.findMany();
  console.log("🚀 data ===>", data);

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
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <TenantCard key={i} />
        ))}
      </div>
    </div>
  );
}
