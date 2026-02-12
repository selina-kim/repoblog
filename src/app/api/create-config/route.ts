import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { createDefaultConfigInRepo } from "@/utils/blog-config";
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
    // first check if config already exists
    const checkResponse = await fetch(
      `https://api.github.com/repos/${username}/${REPO_NAME}/contents/${CONFIG_FILENAME}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    // if config exists, return success without creating
    if (checkResponse.ok) {
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
