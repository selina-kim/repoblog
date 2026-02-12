import Tiptap from "@/src/app/components/Tiptap";
import { auth } from "@/src/auth";
import { getBlogConfig } from "@/src/utils/blog-config";
import { generateStyleVars } from "@/src/utils/style-vars";
import { notFound, redirect } from "next/navigation";
import "./editorStyle.css";
import { getPostBySlug } from "@/src/utils/posts";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const author = process.env.OWNER_DISPLAY_NAME;
  const { slug } = await params;
  const isNewDraft = slug === "draft";

  const config = await getBlogConfig();
  const styleVars = generateStyleVars(config);

  const post = {
    title: "Untitled",
    metadata: {
      title: "Untitled",
      date: "",
      description: "",
    },
  };

  if (!isNewDraft) {
    const existingPost = await getPostBySlug(slug);
    if (!existingPost) {
      notFound();
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto mb-6 max-w-3xl px-4">
        <div className="rounded bg-yellow-200 px-4 py-2 text-center font-mono text-xs font-semibold text-yellow-800">
          Editor Mode
        </div>
      </div>
      <article className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {post.metadata?.title || post.title}
          </h1>
          {post.metadata?.date && (
            <p className="mb-2 text-sm text-gray-500">
              {new Date(post.metadata.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          {author && <p className="mb-2 text-sm text-gray-600">By {author}</p>}
          {post.metadata?.description && (
            <p className="mt-4 text-lg text-gray-600">
              {post.metadata.description}
            </p>
          )}
        </div>
        <Tiptap style={styleVars} />
      </article>
    </div>
  );
}
