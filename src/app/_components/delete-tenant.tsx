"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function DeleteTenant({ id }: { id: number }) {
  const utils = api.useContext();
  const router = useRouter();
  const { mutate: deleteTenant, isLoading } = api.tenant.delete.useMutation({
    async onSuccess() {
      await utils.tenant.get.invalidate();
      router.refresh();
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete tenant?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? This action cannot be reverted. The tenant will be
            deleted form the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={clsx(isLoading ? "bg-zinc-100" : "bg-red-500")}
            onClick={() => deleteTenant({ id })}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
