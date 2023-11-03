import { SignInButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/auth-callback?origin=dashboard");
  }

  return (
    <div>
      <p>{user.firstName}</p>
      <SignInButton />
    </div>
  );
}
