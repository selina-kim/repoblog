import { auth } from "@/auth";
import { REPO_NAME } from "@/constants/github";
import { NextResponse } from "next/server";

export async function GET() {
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
    const response = await fetch(
      `https://api.github.com/repos/${username}/${REPO_NAME}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    if (response.status === 200) {
      return NextResponse.json({ hasRepo: true });
    } else if (response.status === 404) {
      return NextResponse.json({ hasRepo: false });
    } else {
      return NextResponse.json(
        {
          error: response.statusText,
        },
        { status: response.status },
      );
    }
  } catch (error) {
    console.error("Error checking repository:", error);
    return NextResponse.json(
      { error: "Failed to check repository." },
      { status: 500 },
    );
  }
}
