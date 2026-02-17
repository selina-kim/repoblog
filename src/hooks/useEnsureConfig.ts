"use client";

import { useEffect, useState, useRef } from "react";

export function useEnsureConfig() {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    async function checkAndCreateConfig() {
      try {
        setIsChecking(true);
        const response = await fetch("/api/create-config", {
          method: "POST",
        });

        if (!response.ok) {
          const data = await response.json();
          // 409 means config already exists, which is fine
          if (response.status !== 409) {
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
