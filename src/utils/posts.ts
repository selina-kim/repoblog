import { REPO_NAME } from "@/constants/github";
import type { Post, PostFrontmatter, PostMetadata } from "@/types/blog";
import {
  extractContent,
  extractFrontmatter,
  generateSlugFromFilename,
} from "./mdx-utils";
import { fetchWithRetry } from "./fetch-retry";
import { env } from "@/env";

// build-time data fetching (no user auth, uses env token)
export async function getAllPostsMetadata(): Promise<PostMetadata[]> {
  const token = env.GITHUB_TOKEN;
  const owner = env.OWNER_GITHUB_USERNAME;

  if (!token || !owner) {
    throw new Error(
      "GITHUB_TOKEN and OWNER_GITHUB_USERNAME must be set in environment variables",
    );
  }

  try {
    // get repository info to find default branch
    const repoResponse = await fetchWithRetry(() =>
      fetch(`https://api.github.com/repos/${owner}/${REPO_NAME}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      }),
    );

    if (!repoResponse.ok) {
      throw new Error("Failed to fetch repository info");
    }

    const repoData = await repoResponse.json();
    const defaultBranch = repoData.default_branch;

    // fetch file tree
    const treeResponse = await fetchWithRetry(() =>
      fetch(
        `https://api.github.com/repos/${owner}/${REPO_NAME}/git/trees/${defaultBranch}?recursive=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        },
      ),
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
      mdFiles.map(async (item: { path: string }) => {
        const slug = generateSlugFromFilename(item.path);
        let frontmatter: PostFrontmatter = {};

        // fetch raw content for MDX files to extract metadata
        if (item.path.endsWith(".mdx")) {
          try {
            const contentResponse = await fetchWithRetry(() =>
              fetch(
                `https://api.github.com/repos/${owner}/${REPO_NAME}/contents/${item.path}?ref=${defaultBranch}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json",
                  },
                },
              ),
            );

            if (contentResponse.ok) {
              const contentData = await contentResponse.json();
              const content = Buffer.from(
                contentData.content,
                "base64",
              ).toString("utf-8");

              const extractedFrontmatter = extractFrontmatter(content);
              if (extractedFrontmatter) {
                frontmatter = extractedFrontmatter;
              }
            }
          } catch (error) {
            console.error(`Error fetching content for ${item.path}:`, error);
          }
        }

        return {
          path: item.path,
          slug,
          ...frontmatter,
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
  const token = env.GITHUB_TOKEN;
  const owner = env.OWNER_GITHUB_USERNAME;

  if (!token || !owner) {
    throw new Error(
      "GITHUB_TOKEN and OWNER_GITHUB_USERNAME must be set in environment variables",
    );
  }

  try {
    const postsMetadata = await getAllPostsMetadata();
    const postMetadata = postsMetadata.find((p) => p.slug === slug);

    if (!postMetadata) {
      return null;
    }

    // get repository info to find default branch
    const repoResponse = await fetchWithRetry(() =>
      fetch(`https://api.github.com/repos/${owner}/${REPO_NAME}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      }),
    );

    if (!repoResponse.ok) {
      throw new Error("Failed to fetch repository info");
    }

    const repoData = await repoResponse.json();
    const defaultBranch = repoData.default_branch;

    // fetch full content
    const contentResponse = await fetchWithRetry(() =>
      fetch(
        `https://api.github.com/repos/${owner}/${REPO_NAME}/contents/${postMetadata.path}?ref=${defaultBranch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        },
      ),
    );

    if (!contentResponse.ok) {
      return null;
    }

    const contentData = await contentResponse.json();
    const rawContent = Buffer.from(contentData.content, "base64").toString(
      "utf-8",
    );
    const content = extractContent(rawContent);

    return {
      metadata: postMetadata,
      content,
    };
  } catch (error) {
    console.error("Error in getPostBySlug:", error);
    return null;
  }
}
