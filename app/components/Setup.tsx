"use client";

import Link from "next/link";

interface SetupProps {
  hasRepo: boolean | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function Setup({ hasRepo, isLoading, error, refresh }: SetupProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 text-gray-600">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          Checking for repository...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="mb-2 text-xl font-semibold text-red-800">Error</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (hasRepo !== true) {
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
          className="mb-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          href={`https://github.com/new?name=repoblog-content&description=Blog+content+for+RepoBlog`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              fillRule="evenodd"
            />
          </svg>
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
            <li>Choose public or private visibility</li>
            <li>Click Create repository</li>
            <li>
              Return here and click the <b>Check Again</b> button
            </li>
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

  return null;
}
