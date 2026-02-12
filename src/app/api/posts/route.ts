import { auth } from "@/src/auth";
import { REPO_NAME } from "@/src/constants/github";
import { NextResponse } from "next/server";
import type { TreeNode } from "@/src/types/blog";
import {
  extractSlugFromMDX,
  extractTitleFromMDX,
  generateSlugFromFilename,
} from "@/src/utils/mdx-utils";

export const revalidate = 60;

function buildTree(
  items: {
    path: string;
    sha: string;
    size: number;
    title?: string;
    slug?: string;
  }[],
): TreeNode[] {
  const root: TreeNode[] = [];
  const folderMap = new Map<string, TreeNode>();

  for (const item of items) {
    const parts = item.path.split("/");
    let currentLevel = root;
    let currentPath = "";

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const isFile = i === parts.length - 1;

      if (isFile) {
        currentLevel.push({
          name: part,
          path: item.path,
          type: "file",
          sha: item.sha,
          title: item.title,
          slug: item.slug,
        });
      } else {
        let folder = folderMap.get(currentPath);
        if (!folder) {
          folder = {
            name: part,
            path: currentPath,
            type: "folder",
            children: [],
          };
          folderMap.set(currentPath, folder);
          currentLevel.push(folder);
        }
        currentLevel = folder.children!;
      }
    }
  }

  return root;
}

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
        let slug = generateSlugFromFilename(item.path);

        // only fetch content for MDX files to extract title and slug
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
              const extractedSlug = extractSlugFromMDX(content);
              if (extractedSlug) {
                slug = extractedSlug;
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
          slug,
        };
      }),
    );

    const tree = buildTree(postsWithTitles);

    return NextResponse.json({ tree, posts: postsWithTitles });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
