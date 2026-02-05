"use client";

import { useEffect, useState } from "react";

export function useEnsureConfig() {
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAndCreateConfig() {
      try {
        const response = await fetch("/api/create-config", {
          method: "POST",
        });

        if (!response.ok) {
          const data = await response.json();
          // 409 means config already exists, which is fine
          if (response.status !== 409) {
            setError(data.error || "Failed to ensure config exists");
          }
        }
      } catch (err) {
        console.error("Error ensuring config:", err);
        setError("Failed to check config");
      } finally {
        setIsChecking(false);
      }
    }

    checkAndCreateConfig();
  }, []);

  return { isChecking, error };
}
