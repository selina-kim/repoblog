import { auth } from "@/auth";
import { REPO_NAME } from "@/app/constants";
import { NextResponse } from "next/server";

function extractTitleFromMDX(content: string): string | null {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const titleMatch = frontmatterMatch[1].match(/^title:\s*["']?(.+?)["']?$/m);
    if (titleMatch) {
      return titleMatch[1].trim();
    }
  }
  return null;
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.username) {
    return NextResponse.json(
      { error: "Unauthorized - No username" },
      { status: 401 },
    );
  }

  if (!session.accessToken) {
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
    // get the repository info to find the default branch
    const repoResponse = await fetch(
      `https://api.github.com/repos/${username}/${REPO_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!repoResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch repository info" },
        { status: repoResponse.status },
      );
    }

    const repoData = await repoResponse.json();
    const defaultBranch = repoData.default_branch;

    // fetch the file tree from the default branch
    const treeResponse = await fetch(
      `https://api.github.com/repos/${username}/${REPO_NAME}/git/trees/${defaultBranch}?recursive=1`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!treeResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch file tree" },
        { status: treeResponse.status },
      );
    }

    const treeData = await treeResponse.json();

    // filter for .md and .mdx files
    const mdFiles = treeData.tree.filter(
      (item: { path: string; type: string }) =>
        item.type === "blob" &&
        (item.path.endsWith(".md") || item.path.endsWith(".mdx")),
    );

    // fetch titles for MDX files
    const postsWithTitles = await Promise.all(
      mdFiles.map(async (item: { path: string; sha: string; size: number }) => {
        const fileName = item.path.split("/").pop() || item.path;
        let title = fileName.replace(/\.(md|mdx)$/, "");

        // only fetch content for MDX files to extract title
        if (item.path.endsWith(".mdx")) {
          try {
            const contentResponse = await fetch(
              `https://api.github.com/repos/${username}/${REPO_NAME}/contents/${item.path}?ref=${defaultBranch}`,
              {
                headers: {
                  Authorization: `Bearer ${session.accessToken}`,
                  Accept: "application/vnd.github+json",
                },
              },
            );

            if (contentResponse.ok) {
              const contentData = await contentResponse.json();
              const content = Buffer.from(
                contentData.content,
                "base64",
              ).toString("utf-8");
              const extractedTitle = extractTitleFromMDX(content);
              if (extractedTitle) {
                title = extractedTitle;
              }
            }
          } catch (error) {
            console.error(`Error fetching content for ${item.path}:`, error);
          }
        }

        return {
          path: item.path,
          sha: item.sha,
          size: item.size,
          title,
        };
      }),
    );

    return NextResponse.json({ posts: postsWithTitles });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
