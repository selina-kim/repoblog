import { auth } from "@/auth";
import { REPO_NAME } from "@/constants/github";
import { NextResponse } from "next/server";
import type { TreeNode } from "@/types/blog";
import { generateSlugFromFilename, parseRawMdx } from "@/utils/mdx-utils";
import { Octokit, RequestError } from "octokit";
import { fetchWithRetry } from "@/utils/fetch-retry";

export const revalidate = 60;

function buildTree(
  items: {
    path: string;
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

  try {
    // get the repository info to find the default branch
    const username = session.user.username;
    const octokit = new Octokit({ auth: session.accessToken });
    const repoResponse = await fetchWithRetry(() =>
      octokit.rest.repos.get({
        owner: username,
        repo: REPO_NAME,
      }),
    );

    const defaultBranch = repoResponse.data.default_branch;

    // fetch file tree
    const treeResponse = await fetchWithRetry(() =>
      octokit.rest.git.getTree({
        owner: username,
        repo: REPO_NAME,
        tree: defaultBranch,
        tree_sha: defaultBranch,
        recursive: "true",
      }),
    );

    const treeData = treeResponse.data;

    // filter for .md and .mdx files
    const mdFiles = treeData.tree.filter(
      (item: { path: string; type: string }) =>
        item.type === "blob" &&
        (item.path.endsWith(".md") || item.path.endsWith(".mdx")),
    );

    // fetch titles for MDX files
    const postsWithTitles = await Promise.all(
      mdFiles.map(async (item: { path: string }) => {
        const fileName = item.path.split("/").pop() || item.path;
        let title = fileName.replace(/\.(md|mdx)$/, "");
        const slug = generateSlugFromFilename(item.path);

        // fetch raw content for MDX files to extract title and slug
        if (item.path.endsWith(".mdx")) {
          try {
            const contentResponse = await fetchWithRetry(() =>
              octokit.rest.repos.getContent({
                owner: username,
                repo: REPO_NAME,
                path: item.path,
              }),
            );

            const contentData = contentResponse.data;

            if (!Array.isArray(contentData) && contentData.type === "file") {
              const content = Buffer.from(
                contentData.content,
                "base64",
              ).toString("utf-8");
              const { frontmatter } = parseRawMdx(content);
              if (frontmatter?.title) {
                title = frontmatter?.title;
              }
            } else {
              throw new Error(`${item.path} file not found`);
            }
          } catch (error) {
            console.error(`Error fetching content for ${item.path}:`, error);
          }
        }

        return {
          path: item.path,
          title,
          slug,
        };
      }),
    );

    const tree = buildTree(postsWithTitles);

    return NextResponse.json({ tree, posts: postsWithTitles });
  } catch (error) {
    const reqError = error as RequestError;
    console.error(reqError.status, reqError.message);
    return NextResponse.json(
      { error: `Failed to fetch posts: ${reqError.message}` },
      { status: reqError.status },
    );
  }
}
