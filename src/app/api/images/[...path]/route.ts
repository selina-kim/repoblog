import { REPO_NAME } from "@/constants/github";
import { NextResponse } from "next/server";
import { env } from "@/env";
import { Octokit, RequestError } from "octokit";
import { fetchWithRetry } from "@/utils/fetch-retry";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const imagePath = path.join("/");
  const token = env.GITHUB_TOKEN;
  const username = env.OWNER_GITHUB_USERNAME;
  const octokit = new Octokit({ auth: token });

  if (!token || !username) {
    return NextResponse.json(
      { error: "GitHub credentials not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetchWithRetry(() =>
      octokit.rest.repos.getContent({
        owner: username,
        repo: REPO_NAME,
        path: `images/${imagePath}`,
        mediaType: {
          format: "raw",
        },
        request: {
          parseSuccessResponseBody: false,
        },
      }),
    );

    // octokit matches anything that is not JSON nor charset utf-8 and blindly transforms it to text
    // need to do type acrobatics, because the return type doesn't take into account `request.parseSuccessResponseBody`
    const res = new Response(response.data as unknown as ReadableStream);
    const blob = await res.blob();

    const contentType =
      response.headers["content-type"] || "application/octet-stream";
    return new Response(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    const reqError = error as RequestError;
    console.error(reqError.status, reqError.message);
    return NextResponse.json(
      { error: `Failed to fetch image: ${reqError.message}` },
      { status: reqError.status },
    );
  }
}
