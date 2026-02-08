import Tiptap from "@/app/components/Tiptap";
import { auth } from "@/auth";
import { getBlogConfig } from "@/utils/blog-config";
import { generateStyleVars } from "@/utils/style-vars";
import { redirect } from "next/navigation";
import "./editorStyle.css";

export default async function EditorPage() {
  const session = await auth();

  const config = await getBlogConfig();
  const styleVars = generateStyleVars(config);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
        <p className="mt-1 text-sm text-gray-600">
          Write and publish your blog post
        </p>
      </div>
      <Tiptap style={styleVars} />
    </div>
  );
}
