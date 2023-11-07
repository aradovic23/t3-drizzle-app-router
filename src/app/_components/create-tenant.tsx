"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "~/trpc/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1),
  displayName: z.string().min(1),
  description: z.string().min(1).max(500),
  userId: z.number(),
});

export default function CreateTenant({ userId }: { userId: string }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      displayName: "",
      description: "",
      userId: 0,
    },
  });

  const utils = api.useContext();
  const { mutate: create, isLoading } = api.tenant.create.useMutation({
    async onSuccess(data) {
      await utils.tenant.invalidate();
      router.push(`/dashboard/my-tenants/${data}`);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    create({
      name: values.name,
      displayName: values.displayName,
      description: values.description,
      userId,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create tenant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create tenant</DialogTitle>
          <DialogDescription>
            Enter basic info to get you started. Make sure you choose your slug
            as you whish as it is unique and it will be shown in the URL bar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Name</FormLabel>
                  <FormControl>
                    <Input placeholder="best-bar" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how people will find you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Café Restaurant" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="We are the best place in this part of the town..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed on your tenant page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
