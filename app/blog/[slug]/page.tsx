import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/utils/posts";
import { getBlogConfig } from "@/utils/blog-config";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import "./mdxStyle.css";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, config] = await Promise.all([
    getPostBySlug(slug),
    getBlogConfig(),
  ]);

  if (!post) {
    notFound();
  }

  const styleVars = {
    "--heading-color": config.styles.typography.headingColor,
    "--text-color": config.styles.typography.textColor,
    "--link-color": config.styles.typography.linkColor,
    "--link-hover-color": config.styles.typography.linkHoverColor,
    "--code-bg": config.styles.typography.codeBg,
    "--code-color": config.styles.typography.codeColor,
    "--text-size": `${config.styles.fontSizes.textSize}rem`,
    "--h1-size": `${config.styles.fontSizes.h1Size}rem`,
    "--h2-size": `${config.styles.fontSizes.h2Size}rem`,
    "--h3-size": `${config.styles.fontSizes.h3Size}rem`,
    "--h4-size": `${config.styles.fontSizes.h4Size}rem`,
    "--h5-size": `${config.styles.fontSizes.h5Size}rem`,
    "--h6-size": `${config.styles.fontSizes.h6Size}rem`,
    "--line-height": config.styles.lineHeights.lineHeight,
    "--heading-line-height": config.styles.lineHeights.headingLineHeight,
    "--paragraph-margin": `${config.styles.spacing.paragraphMargin}rem`,
    "--heading-margin-top": `${config.styles.spacing.headingMarginTop}rem`,
    "--heading-margin-bottom": `${config.styles.spacing.headingMarginBottom}rem`,
    "--list-margin": `${config.styles.spacing.listMargin}rem`,
    "--heading-weight": config.styles.fontWeights.headingWeight,
    "--text-weight": config.styles.fontWeights.textWeight,
    "--bold-weight": config.styles.fontWeights.boldWeight,
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {post.metadata?.title || post.title}
          </h1>
          {post.metadata?.date && (
            <p className="mb-2 text-sm text-gray-500">
              {new Date(post.metadata.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          {post.metadata?.author && (
            <p className="mb-2 text-sm text-gray-600">
              By {post.metadata.author}
            </p>
          )}
          {post.metadata?.description && (
            <p className="mt-4 text-lg text-gray-600">
              {post.metadata.description}
            </p>
          )}
        </div>

        <div
          className="mdx-content max-w-none rounded-lg border border-gray-200 bg-white p-8"
          style={styleVars}
        >
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
