export function extractFrontmatter(content: string): {
  metadata: Record<string, string>;
  content: string;
} {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { metadata: {}, content };
  }

  const frontmatter = frontmatterMatch[1];
  const contentWithoutFrontmatter = content
    .slice(frontmatterMatch[0].length)
    .trim();

  const metadata: Record<string, string> = {};
  const lines = frontmatter.split("\n");

  for (const line of lines) {
    const match = line.match(/^([\w-]+):\s*["']?(.+?)["']?$/);
    if (match) {
      metadata[match[1]] = match[2].trim();
    }
  }

  return { metadata, content: contentWithoutFrontmatter };
}

export function extractTitleFromMDX(content: string): string | null {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const titleMatch = frontmatterMatch[1].match(/^title:\s*["']?(.+?)["']?$/m);
    if (titleMatch) {
      return titleMatch[1].trim();
    }
  }
  return null;
}

export function extractSlugFromMDX(content: string): string | null {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const slugMatch = frontmatterMatch[1].match(/^slug:\s*["']?(.+?)["']?$/m);
    if (slugMatch) {
      return slugMatch[1].trim();
    }
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
