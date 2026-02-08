import Link from "next/link";

interface EditorTriggerProps {
  postId?: string;
}

export function EditorTrigger({ postId }: EditorTriggerProps) {
  return (
    <Link
      className="bg-main-accent inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
      href={`/editor/${postId ? postId : "draft"}`}
      target="_blank"
    >
      + Create New Post
    </Link>
  );
}
