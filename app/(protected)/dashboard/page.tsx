"use client";

import { useUser } from "@clerk/nextjs";
import { useProjectStore } from "@/store/store";

export default function Dashboard() {
  const { user } = useUser();
  const project = useProjectStore((state) => state.project);

  console.log(project);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.username}</p>
      {project && <p>Project: {project.projectName}</p>}
    </div>
  );
}
