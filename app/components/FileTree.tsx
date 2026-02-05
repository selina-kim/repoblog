"use client";

import { useState } from "react";
import type { TreeNode } from "@/types/blog";
import Link from "next/link";
import { ChevronIcon } from "@/assets/icons/ChevronIcon";
import { FileIcon } from "@/assets/icons/FileIcon";
import { FolderIcon } from "@/assets/icons/FolderIcon";

interface FileTreeProps {
  nodes: TreeNode[];
  level?: number;
}

interface FileTreeNodeProps {
  node: TreeNode;
  level?: number;
  isLast?: boolean;
}

function FileTreeNode({ node, level = 0, isLast = false }: FileTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(level === 0);

  const isFolder = node.type === "folder";
  const indentStep = 24;

  return (
    <div className="relative">
      <div style={{ marginLeft: level === 0 ? "0" : `${indentStep}px` }}>
        {level > 0 && (
          <>
            <div
              className="absolute top-0 border-l border-gray-300"
              style={{
                left: "14px",
                height: isLast ? "50%" : "100%",
              }}
            />
            <div className="absolute top-4 left-3.5 w-2.5 border-t border-gray-300" />
          </>
        )}
        {isFolder ? (
          <>
            <button
              className="relative flex w-full cursor-pointer items-center gap-1 rounded px-2 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
              type="button"
            >
              <ChevronIcon
                className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
              <FolderIcon className="h-4 w-4 shrink-0 text-blue-500" />
              <span className="truncate">{node.name}</span>
            </button>
            {isOpen && node.children && (
              <div className="relative">
                {node.children.map((child, index) => (
                  <FileTreeNode
                    isLast={index === node.children!.length - 1}
                    key={`${child.path}-${index}`}
                    level={level + 1}
                    node={child}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <Link
            className="relative flex items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
            href={`/post/${node.slug}`}
            target="_blank"
          >
            <FileIcon className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="truncate">{node.title || node.name}</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export function FileTree({ nodes, level = 0 }: FileTreeProps) {
  return (
    <div className="space-y-0.5">
      {nodes.map((node, index) => (
        <FileTreeNode
          isLast={index === nodes.length - 1}
          key={`${node.path}-${index}`}
          level={level}
          node={node}
        />
      ))}
    </div>
  );
}
