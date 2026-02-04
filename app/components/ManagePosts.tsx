"use client";

import Link from "next/link";
import { useGetPosts } from "../hooks/useGetPosts";
import { PostListItem } from "./PostListItem";
import { Loader } from "./Loader";

export function ManagePosts() {
  const { posts, isLoading, error } = useGetPosts();

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            href="/posts/new"
          >
            + Create New Post
          </Link>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Loader />
            Loading posts...
          </div>
        )}

        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {!isLoading && !error && posts.length === 0 && (
          <p className="text-center text-gray-600">
            No posts yet. Create your first post to get started!
          </p>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="space-y-3">
            {posts.map((post) => (
              <PostListItem
                key={post.sha}
                path={post.path}
                sha={post.sha}
                title={post.title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
