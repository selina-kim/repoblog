import { getAllPostsMetadata } from "@/utils/app/posts";
import { PostListItem } from "@/components/PostListItem";

export default async function HomePage() {
  const posts = await getAllPostsMetadata();

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
              <PostListItem
                key={post.slug}
                slug={post.slug}
                summary={post.summary}
                title={post.title || ""}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
