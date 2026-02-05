"use client";

import { useState } from "react";
import type { TreeNode } from "@/types/blog";
import Link from "next/link";

interface FileTreeProps {
  nodes: TreeNode[];
  level?: number;
}

function FileTreeNode({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(level === 0);

  const paddingLeft = level * 16 + 8;

  if (node.type === "file") {
    return (
      <Link
        className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
        href={`/post/${node.slug}`}
        style={{ paddingLeft: `${paddingLeft}px` }}
        target="_blank"
      >
        <svg
          className="h-4 w-4 shrink-0 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
        <span className="truncate">{node.title || node.name}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        className="flex w-full cursor-pointer items-center gap-1 rounded px-2 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        style={{ paddingLeft: `${paddingLeft}px` }}
        type="button"
      >
        <svg
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
        <svg
          className="h-4 w-4 shrink-0 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
        <span className="truncate">{node.name}</span>
      </button>
      {isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeNode
              key={`${child.path}-${index}`}
              level={level + 1}
              node={child}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree({ nodes, level = 0 }: FileTreeProps) {
  return (
    <div className="space-y-0.5">
      {nodes.map((node, index) => (
        <FileTreeNode key={`${node.path}-${index}`} level={level} node={node} />
      ))}
    </div>
  );
}
