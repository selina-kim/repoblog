"use client";

import Link from "next/link";
import { useGetPosts } from "../hooks/useGetPosts";
import { PostListItem } from "./PostListItem";
import { Loader } from "./Loader";
import { useState } from "react";

export function ManagePosts() {
  const { posts, isLoading, error } = useGetPosts();
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const response = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        alert("Blog published successfully! Changes are now live.");
      } else {
        alert("Failed to publish. Please try again.");
      }
    } catch (error) {
      console.error("Error publishing:", error);
      alert("Failed to publish. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
            <p className="text-sm text-gray-500">
              Changes won&apos;t be visible on the public blog until you publish
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
              disabled={isPublishing}
              onClick={handlePublish}
            >
              {isPublishing ? "Publishing..." : "Publish Changes"}
            </button>
            <Link
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              href="/posts/new"
            >
              + Create New Post
            </Link>
          </div>
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
