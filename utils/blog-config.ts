import { CONFIG_FILENAME, REPO_NAME } from "@/constants/github";
import { env } from "@/env";
import type { BlogConfig } from "@/types/blog";
import { DEFAULT_BLOG_CONFIG } from "@/constants/default-blog-config";
import yaml from "js-yaml";

export async function getBlogConfig(): Promise<BlogConfig> {
  const token = env.GITHUB_TOKEN;
  const owner = env.OWNER_GITHUB_USERNAME;

  if (!token || !owner) {
    console.warn("Missing GitHub credentials, using default config");
    return DEFAULT_BLOG_CONFIG;
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
        next: { revalidate: 0 },
      },
    );

    if (!repoResponse.ok) {
      console.warn("Failed to fetch repo info, using default config");
      return DEFAULT_BLOG_CONFIG;
    }

    const repoData = await repoResponse.json();
    const defaultBranch = repoData.default_branch;

    // fetch config from root of repo
    const configResponse = await fetch(
      `https://api.github.com/repos/${owner}/${REPO_NAME}/contents/${CONFIG_FILENAME}?ref=${defaultBranch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 0 },
      },
    );

    if (!configResponse.ok) {
      console.warn(`${CONFIG_FILENAME} not found, using default config`);
      return DEFAULT_BLOG_CONFIG;
    }

    const configData = await configResponse.json();
    const yamlContent = Buffer.from(configData.content, "base64").toString(
      "utf-8",
    );

    const config = yaml.load(yamlContent) as BlogConfig;
    return config;
  } catch (error) {
    console.error("Error fetching blog config:", error);
    return DEFAULT_BLOG_CONFIG;
  }
}
