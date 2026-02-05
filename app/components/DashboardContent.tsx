"use client";

import { useCheckRepo } from "@/app/hooks/useCheckRepo";
import { useEnsureConfig } from "@/app/hooks/useEnsureConfig";
import { Setup } from "./Setup";
import { ManagePosts } from "./ManagePosts";

interface DashboardContentProps {
  username: string;
}

export function DashboardContent({ username }: DashboardContentProps) {
  const { hasRepo, isLoading, error, refresh } = useCheckRepo(username);

  useEnsureConfig();

  if (hasRepo === true) {
    return <ManagePosts />;
  }

  return (
    <Setup
      error={error}
      hasRepo={hasRepo}
      isLoading={isLoading}
      refresh={refresh}
    />
  );
}
