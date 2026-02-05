"use client";

import Link from "next/link";
import { useGetPosts } from "../hooks/useGetPosts";
import { FileTree } from "./FileTree";
import { Loader } from "./Loader";

export function ManagePosts() {
  const { tree, isLoading, error } = useGetPosts();

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
            <p className="mt-1 text-sm text-gray-600">
              Browse and manage your content
            </p>
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

        {!isLoading && !error && tree.length === 0 && (
          <p className="text-center text-gray-600">
            No posts yet. Create your first post to get started!
          </p>
        )}

        {!isLoading && !error && tree.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <FileTree nodes={tree} />
          </div>
        )}
      </div>
    </div>
  );
}
