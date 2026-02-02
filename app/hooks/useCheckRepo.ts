"use client";

import { useCallback, useEffect, useState } from "react";
import { REPO_NAME } from "@/app/constants";

interface UseCheckRepoResult {
  hasRepo: boolean | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useCheckRepo(
  username: string | null | undefined,
): UseCheckRepoResult {
  const [hasRepo, setHasRepo] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkRepo = useCallback(async () => {
    if (!username) {
      setIsLoading(false);
      return;
    }

    try {
      setError(null);

      const response = await fetch("/api/check-repo");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.hasRepo !== undefined) {
        setHasRepo(data.hasRepo);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to check repository",
      );
      setHasRepo(null);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    checkRepo();
  }, [checkRepo]);

  return { hasRepo, isLoading, error, refresh: checkRepo };
}
