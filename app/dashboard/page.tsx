import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-7xl py-4 px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">
                {session.user.email}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  className="hover:cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-zinc-800 text-white hover:bg-zinc-700"
                  type="submit"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border p-6 border-zinc-800 bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-white">Your Posts</h2>
          <p className="mb-6 text-zinc-400">
            Manage your blog posts stored in your GitHub repository.
          </p>
          <Link
            className="inline-flex items-center gap-2 rounded-lg  px-4 py-2 text-black transition-colors bg-white ext-black hover:bg-zinc-200"
            href="/posts/new"
          >
            + Create New Post
          </Link>
        </div>
      </main>
    </div>
  );
}
