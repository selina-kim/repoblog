import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXTAUTH_URL: z.url(),
    NEXTAUTH_SECRET: z.string(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    OWNER_GITHUB_USERNAME: z.string(),
    OWNER_DISPLAY_NAME: z.string(),
    GITHUB_TOKEN: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
