import Link from "next/link";

interface PostListItemProps {
  title: string;
  path: string;
  sha: string;
}

export function PostListItem({ title, path, sha }: PostListItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{path}</p>
      </div>
      <Link
        className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        href={`/posts/${sha}`}
      >
        Edit
      </Link>
    </div>
  );
}
