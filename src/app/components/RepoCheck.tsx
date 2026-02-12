"use client";

import { Setup } from "./Setup";

interface RepoCheckProps {
  hasRepo: boolean | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function RepoCheck({
  hasRepo,
  isLoading,
  error,
  refresh,
}: RepoCheckProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-start gap-2 text-gray-600">
        <div className="border-main-accent h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        Checking for repository...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="mb-2 text-xl font-semibold text-red-800">Error</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (hasRepo !== true) {
    return <Setup refresh={refresh} />;
  }

  return null;
}
