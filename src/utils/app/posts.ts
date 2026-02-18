import { REPO_NAME } from "@/constants/github";
import type { Post, PostFrontmatter, PostMetadata } from "@/types/blog";
import {
  extractContent,
  extractFrontmatter,
  generateSlugFromFilename,
} from "../mdx-utils";
import { fetchWithRetry } from "../fetch-retry";
import { env } from "@/env";
import { Octokit } from "octokit";

export async function getAllPostsMetadata(): Promise<PostMetadata[]> {
  const token = env.GITHUB_TOKEN;
  const username = env.OWNER_GITHUB_USERNAME;
  const octokit = new Octokit({ auth: token });

  try {
    // get repository info to find default branch
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
    const mdxFiles = treeData.tree.filter(
      (item: { path: string; type: string }) =>
        item.type === "blob" &&
        (item.path.endsWith(".md") || item.path.endsWith(".mdx")),
    );

    // fetch metadata for each file
    const posts = await Promise.all(
      mdxFiles.map(async (item: { path: string }) => {
        const slug = generateSlugFromFilename(item.path);
        let frontmatter: PostFrontmatter = {};

        // fetch raw content for MDX files to extract metadata
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

              const extractedFrontmatter = extractFrontmatter(content);

              if (extractedFrontmatter) {
                frontmatter = extractedFrontmatter;
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
          slug,
          ...frontmatter,
        };
      }),
    );

    return posts;
  } catch (error) {
    console.error("Error in getAllPostsMetadata:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const token = env.GITHUB_TOKEN;
  const username = env.OWNER_GITHUB_USERNAME;
  const octokit = new Octokit({ auth: token });

  try {
    const postsMetadata = await getAllPostsMetadata();
    const postMetadata = postsMetadata.find((p) => p.slug === slug);

    if (!postMetadata) {
      return null;
    }

    const contentResponse = await fetchWithRetry(() =>
      octokit.rest.repos.getContent({
        owner: username,
        repo: REPO_NAME,
        path: postMetadata.path,
      }),
    );

    const contentData = contentResponse.data;

    if (!Array.isArray(contentData) && contentData.type === "file") {
      const rawContent = Buffer.from(contentData.content, "base64").toString(
        "utf-8",
      );

      const content = extractContent(rawContent);

      return {
        metadata: postMetadata,
        content,
      };
    } else {
      throw new Error(`${postMetadata.path} file not found`);
    }
  } catch (error) {
    console.error("Error in getPostBySlug:", error);
    return null;
  }
}
