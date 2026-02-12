"use client";

import { useEffect, useState } from "react";

export function useEnsureConfig() {
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAndCreateConfig() {
      try {
        setIsChecking(true);
        const response = await fetch("/api/create-config", {
          method: "POST",
        });

        if (!response.ok) {
          const data = await response.json();
          if (response.status !== 409) {
            // 409 means config already exists, which is fine
            throw new Error(`HTTP ${response.status}: ${data.error}`);
          }
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to check repository.",
        );
      } finally {
        setIsChecking(false);
      }
    }

    checkAndCreateConfig();
  }, []);

  return { isChecking, error };
}
