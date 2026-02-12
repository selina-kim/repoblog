import { PostFrontmatter } from "@/types/blog";

function findFrontMatter(rawContent: string): RegExpMatchArray | null {
  const frontmatterMatch = rawContent.match(/^---\s*\n([\s\S]*?)\n---/);
  return frontmatterMatch;
}

export function extractFrontmatter(rawContent: string): PostFrontmatter | null {
  const frontmatterMatch = findFrontMatter(rawContent);
  if (!frontmatterMatch) {
    return null;
  }

  const frontmatterBlock = frontmatterMatch[1];

  // parse known fields for PostFrontmatter
  const frontmatter: PostFrontmatter = {};
  const lines = frontmatterBlock.split("\n");
  for (const line of lines) {
    const match = line.match(/^([\w-]+):\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // remove wrapping quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      switch (key) {
        case "title":
        case "summary":
          frontmatter[key] = value;
          break;
        case "createdAt":
        case "lastUpdatedAt":
          frontmatter[key] = value; // ISO string
          break;
        case "tags":
          // support comma-separated or yaml array
          if (value.startsWith("[") && value.endsWith("]")) {
            try {
              frontmatter.tags = JSON.parse(value);
            } catch {
              frontmatter.tags = value
                .slice(1, -1)
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
            }
          } else {
            frontmatter.tags = value
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);
          }
          break;
        default:
          // TODO: ignore unknown keys for now
          break;
      }
    }
  }

  return frontmatter;
}

export function extractContent(rawContent: string): string {
  const frontmatterMatch = findFrontMatter(rawContent);
  if (!frontmatterMatch) {
    return rawContent;
  }
  return rawContent.slice(frontmatterMatch[0].length).trim();
}

export function extractTitle(content: string): string | null {
  const frontmatter = extractFrontmatter(content);
  if (frontmatter && frontmatter.title) {
    return frontmatter.title;
  }
  return null;
}

export function generateSlugFromFilename(path: string): string {
  const fileName = path.split("/").pop() || path;
  return fileName
    .replace(/\.(md|mdx)$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
