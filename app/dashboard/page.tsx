"use client";

import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user } = useUser();
  return (
    <div>
      <h1>Welcome, {user?.firstName}</h1>
      <p>Your email is {user?.emailAddresses[0]?.emailAddress}</p>
    </div>
  );
}
