import { auth } from "@/auth";
import { REPO_NAME } from "@/constants/github";
import { fetchWithRetry } from "@/utils/fetch-retry";
import { NextResponse } from "next/server";
import { Octokit, RequestError } from "octokit";

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

  try {
    const username = session.user.username;
    const octokit = new Octokit({ auth: session.accessToken });
    await fetchWithRetry(() =>
      octokit.rest.repos.get({
        owner: username,
        repo: REPO_NAME,
      }),
    );

    return NextResponse.json({ hasRepo: true });
  } catch (error) {
    const reqError = error as RequestError;
    console.error(reqError.status, reqError.message);
    return NextResponse.json(
      { error: `Failed to check respository: ${reqError.message}` },
      { status: reqError.status },
    );
  }
}
