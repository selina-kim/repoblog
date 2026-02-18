import { CONFIG_FILENAME, REPO_NAME } from "@/constants/github";
import type { BlogConfig } from "@/types/blog";
import { DEFAULT_BLOG_CONFIG } from "@/constants/default-blog-config";
import yaml from "js-yaml";
import { fetchWithRetry } from "../fetch-retry";
import { env } from "@/env";
import { Octokit } from "octokit";

export async function getBlogConfig(): Promise<BlogConfig> {
  const token = env.GITHUB_TOKEN;
  const username = env.OWNER_GITHUB_USERNAME;
  const octokit = new Octokit({ auth: token });

  try {
    // fetch config from root of repo
    const response = await fetchWithRetry(() =>
      octokit.rest.repos.getContent({
        owner: username,
        repo: REPO_NAME,
        path: CONFIG_FILENAME,
      }),
    );

    const data = response.data;

    if (!Array.isArray(data) && data.type === "file") {
      const yamlString = Buffer.from(data.content, "base64").toString("utf-8");
      const config = yaml.load(yamlString) as BlogConfig;
      return config;
    } else {
      throw new Error("Config file not found.");
    }
  } catch (error) {
    console.error("Error fetching blog config:", error);
    return DEFAULT_BLOG_CONFIG;
  }
}
