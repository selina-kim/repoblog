import Link from "next/link";
import { getAllPosts } from "@/src/utils/posts";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                className="block rounded-lg border border-gray-200 bg-white p-6 transition-colors hover:bg-gray-50"
                href={`/post/${post.slug}`}
                key={post.slug}
              >
                <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500">{post.path}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
