import Link from "next/link";
import DeleteTenant from "../_components/delete-tenant";
import { Badge } from "../_components/ui/badge";
import { buttonVariants } from "../_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";

export interface TenantProps {
  id: number;
  name: string | null;
  displayName: string | null;
  description: string | null;
  currentUserId?: string;
  tenantUserId?: string | null;
}

export default function TenantCard({
  id,
  name,
  displayName,
  description,
  currentUserId,
  tenantUserId,
}: TenantProps) {
  const isUsersTenant = currentUserId === tenantUserId;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="relative">
        <div className="hero-pattern relative mb-2 h-32 w-full rounded-md"></div>
        {isUsersTenant ? (
          <Badge className="absolute right-8 top-8 max-w-xs">Your tenant</Badge>
        ) : null}
        <CardTitle>{displayName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-zinc-500">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isUsersTenant ? (
          <div className="flex gap-2 rounded-md p-2 outline-dashed outline-1 outline-zinc-200">
            <DeleteTenant id={id} />
            <Link
              href={`/dashboard/my-tenants/${name}`}
              className={buttonVariants({ variant: "outline" })}
            >
              View
            </Link>
          </div>
        ) : null}
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href={`/tenants/${name}`}
        >
          {isUsersTenant ? "Visit online" : "Visit"}
        </Link>
      </CardFooter>
    </Card>
  );
}
