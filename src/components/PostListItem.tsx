import Link from "next/link";

interface PostListItemProps {
  title: string;
  summary?: string;
  slug: string;
}

export function PostListItem({ title, summary, slug }: PostListItemProps) {
  return (
    <Link
      className="block rounded-lg border border-gray-200 bg-white p-6 transition-colors"
      href={`/post/${slug}`}
      key={slug}
    >
      <h2 className="mb-2 text-2xl font-semibold text-gray-900">{title}</h2>
      <p className="truncate text-sm text-gray-500">{summary}</p>
    </Link>
  );
}
