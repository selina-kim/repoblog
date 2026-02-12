"use client";

import Link from "next/link";
import { GitHubIcon } from "@/src/assets/icons/GitHubIcon";

interface SetupProps {
  refresh: () => void;
}

const CREATE_REPO_URL =
  "https://github.com/new?name=repoblog-content&description=Blog+content+for+RepoBlog";

export function Setup({ refresh }: SetupProps) {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Repository Not Found
      </h2>
      <p className="mb-4 text-gray-700">
        You need to create a GitHub repository named{" "}
        <code className="rounded bg-white px-2 py-1 font-mono text-sm text-gray-900">
          repoblog-content
        </code>{" "}
        to start managing your blog posts.
      </p>
      <Link
        className="bg-main-accent mb-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        href={CREATE_REPO_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        <GitHubIcon className="h-5 w-5" />
        Create Repository on GitHub
      </Link>
      <div className="mb-4 space-y-2 text-sm text-gray-700">
        <p className="font-semibold">To create the repository:</p>
        <ol className="ml-5 list-decimal space-y-1">
          <li>Click the button above to go to GitHub</li>
          <li>
            Set the repository name to{" "}
            <code className="rounded bg-white px-1 font-mono text-gray-900">
              repoblog-content
            </code>
          </li>
          <li>Choose public visibility</li>
          <li>Click Create repository</li>
          <li>Return here and click the below button</li>
        </ol>
      </div>
      <button
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-50"
        onClick={refresh}
      >
        ↻ Check Again
      </button>
    </div>
  );
}
