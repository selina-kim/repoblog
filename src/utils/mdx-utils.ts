import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import { visit } from "unist-util-visit";
import yaml from "js-yaml";
import { PostFrontmatter } from "@/types/blog";

export const parseRawMdx = (
  rawContent: string,
): { frontmatter?: PostFrontmatter; content: string } => {
  const processor = remark().use(remarkFrontmatter, ["yaml"]);
  const tree = processor.parse(rawContent);

  let frontmatter: PostFrontmatter | undefined;

  visit(tree, "yaml", (node: { type: string; value: string }) => {
    frontmatter = yaml.load(node.value) as PostFrontmatter;
  });

  // remove the frontmatter (yaml node) from the tree
  tree.children = tree.children.filter((node) => node.type !== "yaml");
  const withoutFrontmatter = processor.stringify(tree).trim();

  return { frontmatter, content: withoutFrontmatter };
};

export const generateSlugFromFilename = (path: string): string => {
  const fileName = path.split("/").pop() || path;
  return fileName
    .replace(/\.(md|mdx)$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
