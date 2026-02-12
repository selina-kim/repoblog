"use client";

import { useCheckRepo } from "@/src/app/hooks/useCheckRepo";
import { RepoCheck } from "./RepoCheck";
import { ManageContent } from "./ManageContent";

interface DashboardContentProps {
  username: string;
}

export function DashboardContent({ username }: DashboardContentProps) {
  const { hasRepo, isLoading, error, refresh } = useCheckRepo(username);

  if (hasRepo === true) {
    return <ManageContent />;
  }

  return (
    <RepoCheck
      error={error}
      hasRepo={hasRepo}
      isLoading={isLoading}
      refresh={refresh}
    />
  );
}
