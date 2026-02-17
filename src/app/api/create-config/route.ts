import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { createDefaultConfig } from "@/utils/blog-config";
import { Octokit, RequestError } from "octokit";
import { CONFIG_FILENAME, REPO_NAME } from "@/constants/github";

export async function POST() {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json(
      {
        error:
          "Unauthorized - No access token. Please sign out and sign in again.",
      },
      { status: 401 },
    );
  }

  try {
    const username = session.user.username;
    const octokit = new Octokit({ auth: session.accessToken });
    // first check if config already exists
    try {
      const checkConfigResponse = await octokit.rest.repos.getContent({
        owner: username,
        repo: REPO_NAME,
        path: CONFIG_FILENAME,
      });

      // if config exists, return 409
      if (checkConfigResponse.status === 200) {
        return NextResponse.json(
          {
            error: "Configuration already exists",
          },
          { status: 409 },
        );
      }
    } catch (error) {
      // if config doesn't exist, create it
      if ((error as RequestError).status === 404) {
        await createDefaultConfig(session.accessToken);
        return NextResponse.json({
          success: true,
          message: "Default configuration created successfully",
        });
      }

      throw error;
    }
  } catch (error) {
    const reqError = error as RequestError;
    console.error(reqError.status, reqError.message);
    return NextResponse.json(
      { error: `Failed to create config: ${reqError.message}` },
      { status: reqError.status },
    );
  }
}
