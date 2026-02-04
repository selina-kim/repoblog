import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/utils/github";
import { MDXRemote } from "next-mdx-remote-client/rsc";

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
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500">{post.path}</p>
        </div>

        <div className="prose prose-gray max-w-none rounded-lg border border-gray-200 bg-white p-8">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
