import { REPO_NAME } from "@/constants/github";
import { ENV } from "@/env";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const imagePath = path.join("/");
  const token = ENV.GITHUB_TOKEN;
  const owner = ENV.OWNER_GITHUB_USERNAME;

  if (!token || !owner) {
    return NextResponse.json(
      { error: "GitHub credentials not configured" },
      { status: 500 },
    );
  }

  try {
    // fetch image from GitHub raw content
    const url = `https://raw.githubusercontent.com/${owner}/${REPO_NAME}/main/images/${imagePath}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.raw",
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: response.status },
      );
    }

    const blob = await response.blob();
    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

    return new Response(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 },
    );
  }
}
