"use client";

import { useCheckRepo } from "@/app/hooks/useCheckRepo";
import { Setup } from "./Setup";
import { ManagePosts } from "./ManagePosts";

interface DashboardContentProps {
  username: string;
}

export function DashboardContent({ username }: DashboardContentProps) {
  const { hasRepo } = useCheckRepo(username);

  if (hasRepo === true) {
    return <ManagePosts />;
  }

  return <Setup username={username} />;
}
