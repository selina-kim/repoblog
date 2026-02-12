"use client";

import { useGetPosts } from "../hooks/useGetPosts";
import { FileTree } from "./FileTree";
import { Loader } from "./Loader";
import { EditorTrigger } from "./EditorTrigger";
import { useEnsureConfig } from "../hooks/useEnsureConfig";

export function ManagePosts() {
  const { isChecking, error: configError } = useEnsureConfig();
  const { tree, isLoading, error: getPostsError } = useGetPosts();

  const renderConfigStatus = () => {
    if (isChecking) {
      return (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
          <div className="flex items-center justify-center gap-2">
            <Loader />
            Checking for config.yaml file...
          </div>
        </div>
      );
    }
    if (configError) {
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 text-xl font-semibold text-red-800">Error</h2>
          <p className="text-red-600">{configError}</p>
        </div>
      );
    }
    return;
  };

  const renderPostFileTree = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Loader />
          Loading posts...
        </div>
      );
    }
    if (getPostsError) {
      return <p className="text-center text-red-600">Error: {getPostsError}</p>;
    }
    if (tree.length === 0) {
      return (
        <p className="text-center text-gray-600">
          No posts yet. Create your first post to get started!
        </p>
      );
    }
    return <FileTree nodes={tree} />;
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Manage Content</h2>
        <p className="mt-1 text-sm text-gray-600">
          Browse and manage your content
        </p>
      </div>
      {renderConfigStatus()}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        {renderPostFileTree()}
      </div>
      <div className="flex justify-end">
        <EditorTrigger />
      </div>
    </div>
  );
}
