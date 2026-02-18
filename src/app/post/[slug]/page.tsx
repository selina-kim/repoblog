import { notFound } from "next/navigation";
import { getPostBySlug } from "@/utils/app/posts";
import { getBlogConfig } from "@/utils/app/blog-config";
import { generateStyleVars } from "@/utils/style-vars";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { env } from "@/env";
import "@/styles/mdx.css";

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

  const styleVars = generateStyleVars(config);
  const author = env.OWNER_DISPLAY_NAME;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {post.metadata.title}
          </h1>
          {post.metadata.createdAt && (
            <p className="mb-2 text-sm text-gray-500">
              {new Date(post.metadata.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          {author && <p className="mb-2 text-sm text-gray-600">By {author}</p>}
          {post.metadata.summary && (
            <p className="mt-4 text-lg text-gray-600">
              {post.metadata.summary}
            </p>
          )}
        </div>

        <div
          className="mdx-content rounded-lg border border-gray-200 bg-white p-8"
          style={styleVars}
        >
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
