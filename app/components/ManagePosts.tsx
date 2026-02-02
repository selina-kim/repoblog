import Link from "next/link";

export function ManagePosts() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Your Posts</h2>
      <p className="mb-6 text-gray-600">
        Manage your blog posts stored in your GitHub repository.
      </p>
      <Link
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        href="/posts/new"
      >
        + Create New Post
      </Link>
    </div>
  );
}
