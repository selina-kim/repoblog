"use client";

import { useCheckRepo } from "@/app/hooks/useCheckRepo";
import { useEnsureConfig } from "@/app/hooks/useEnsureConfig";
import { Setup } from "./Setup";
import { ManageContent } from "./ManageContent";

interface DashboardContentProps {
  username: string;
}

export function DashboardContent({ username }: DashboardContentProps) {
  const { hasRepo, isLoading, error, refresh } = useCheckRepo(username);

  useEnsureConfig();

  if (hasRepo === true) {
    return <ManageContent />;
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
