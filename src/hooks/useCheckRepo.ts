"use client";

import { useCallback, useEffect, useState } from "react";

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
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/check-repo");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error}`);
      }

      if (data.hasRepo !== undefined) {
        setHasRepo(data.hasRepo);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to check repository.",
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
