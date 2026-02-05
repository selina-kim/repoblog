import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EditorPage() {
  const session = await auth();

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

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-gray-600">Editor coming soon...</p>
      </div>
    </div>
  );
}
