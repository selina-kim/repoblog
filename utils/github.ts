import { REPO_NAME } from "@/app/constants";

export interface Post {
  path: string;
  sha: string;
  size: number;
  title: string;
  slug: string;
  content: string;
}

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

function extractSlugFromMDX(content: string): string | null {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const slugMatch = frontmatterMatch[1].match(/^slug:\s*["']?(.+?)["']?$/m);
    if (slugMatch) {
      return slugMatch[1].trim();
    }
  }
  return null;
}

function generateSlugFromFilename(path: string): string {
  const fileName = path.split("/").pop() || path;
  return fileName
    .replace(/\.(md|mdx)$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// build-time data fetching (no user auth, uses env token)
export async function getAllPosts(): Promise<Omit<Post, "content">[]> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;

  if (!token || !owner) {
    throw new Error(
      "GITHUB_TOKEN and GITHUB_REPO_OWNER must be set in environment variables",
    );
  }

  try {
    // get repository info to find default branch
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${REPO_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 0 }, // don't cache at build time
      },
    );

    if (!repoResponse.ok) {
      throw new Error("Failed to fetch repository info");
    }

    const repoData = await repoResponse.json();
    const defaultBranch = repoData.default_branch;

    // Fetch file tree
    const treeResponse = await fetch(
      `https://api.github.com/repos/${owner}/${REPO_NAME}/git/trees/${defaultBranch}?recursive=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 0 },
      },
    );

    if (!treeResponse.ok) {
      throw new Error("Failed to fetch file tree");
    }

    const treeData = await treeResponse.json();

    // filter for .md and .mdx files
    const mdFiles = treeData.tree.filter(
      (item: { path: string; type: string }) =>
        item.type === "blob" &&
        (item.path.endsWith(".md") || item.path.endsWith(".mdx")),
    );

    // fetch metadata for each file
    const posts = await Promise.all(
      mdFiles.map(async (item: { path: string; sha: string; size: number }) => {
        const fileName = item.path.split("/").pop() || item.path;
        let title = fileName.replace(/\.(md|mdx)$/, "");
        let slug = generateSlugFromFilename(item.path);

        // fetch content for MDX files to extract metadata
        if (item.path.endsWith(".mdx")) {
          try {
            const contentResponse = await fetch(
              `https://api.github.com/repos/${owner}/${REPO_NAME}/contents/${item.path}?ref=${defaultBranch}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/vnd.github+json",
                },
                next: { revalidate: 0 },
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

    return posts;
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;

  if (!token || !owner) {
    throw new Error(
      "GITHUB_TOKEN and GITHUB_REPO_OWNER must be set in environment variables",
    );
  }

  try {
    const posts = await getAllPosts();
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
      return null;
    }

    // get repository info to find default branch
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${REPO_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 0 },
      },
    );

    if (!repoResponse.ok) {
      throw new Error("Failed to fetch repository info");
    }

    const repoData = await repoResponse.json();
    const defaultBranch = repoData.default_branch;

    // fetch full content
    const contentResponse = await fetch(
      `https://api.github.com/repos/${owner}/${REPO_NAME}/contents/${post.path}?ref=${defaultBranch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 0 },
      },
    );

    if (!contentResponse.ok) {
      return null;
    }

    const contentData = await contentResponse.json();
    const content = Buffer.from(contentData.content, "base64").toString(
      "utf-8",
    );

    return {
      ...post,
      content,
    };
  } catch (error) {
    console.error("Error in getPostBySlug:", error);
    return null;
  }
}
