"use client";

import { useEffect, useState } from "react";
import type { TreeNode } from "@/types/blog";

interface Post {
  path: string;
  sha: string;
  size: number;
  title: string;
  slug: string;
}

export function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/posts");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch posts");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setPosts(data.posts || []);
        setTree(data.tree || []);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch posts";
        if (
          errorMessage.toLowerCase().includes("tree") ||
          errorMessage.toLowerCase().includes("not found")
        ) {
          setError(null);
          setPosts([]);
          setTree([]);
        } else {
          setError(errorMessage);
          setPosts([]);
          setTree([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, tree, isLoading, error };
}
