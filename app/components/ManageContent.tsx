"use client";

import Link from "next/link";
import { useGetPosts } from "../hooks/useGetPosts";
import { FileTree } from "./FileTree";
import { Loader } from "./Loader";

export function ManageContent() {
  const { tree, isLoading, error } = useGetPosts();

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Manage Content</h2>
        <p className="mt-1 text-sm text-gray-600">
          Browse and manage your content
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4">
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

        {!isLoading && !error && tree.length > 0 && <FileTree nodes={tree} />}
      </div>

      <div className="flex justify-end">
        <Link
          className="bg-main-accent inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          href="/dashboard/editor"
        >
          + Create New Post
        </Link>
      </div>
    </div>
  );
}
