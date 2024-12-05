import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
export default async function SyncUser() {
  const db = new PrismaClient();
  const { userId } = await auth();

  if (!userId) {
    throw new Error("No user found");
  }

  const client = await clerkClient();

  const user = await client.users.getUser(userId);

  if (!user.emailAddresses[0]?.emailAddress) {
    return notFound();
  }

  await db.user.upsert({
    where: {
      email: user.emailAddresses[0]?.emailAddress ?? "",
    },
    update: {
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    create: {
      id: userId,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      password: "defaultPassword", // Add a default or generated password here
    },
  });
  return redirect("/dashboard");
}
