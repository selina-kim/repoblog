import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { createDefaultConfigInRepo } from "@/utils/blog-config";
import { Octokit } from "octokit";
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

  const username = session.user.username;

  try {
    const octokit = new Octokit({ auth: session.accessToken });

    // first check if config already exists
    const checkConfigResponse = await octokit.rest.repos.getContent({
      owner: username,
      repo: REPO_NAME,
      path: CONFIG_FILENAME,
    });

    // if config exists, return success without creating
    if (checkConfigResponse.status === 200) {
      return NextResponse.json({
        success: true,
        message: "Configuration already exists",
        alreadyExists: true,
      });
    }

    // if config doesn't exist, create it
    const result = await createDefaultConfigInRepo(session.accessToken);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create config." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Default configuration created successfully.",
      created: true,
    });
  } catch (error) {
    console.error("Error creating config:", error);
    return NextResponse.json(
      { error: "Failed to create config." },
      { status: 500 },
    );
  }
}
