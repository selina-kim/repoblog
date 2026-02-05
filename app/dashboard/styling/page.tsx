import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function StylingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Blog Styling</h2>
        <p className="mt-1 text-sm text-gray-600">
          Customize the appearance of your blog
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Blog Appearance & Layout
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Configure post container padding, title styles, background colors,
            and overall layout
          </p>
        </div>
        <div className="p-6">
          <p className="text-gray-600">
            Settings for container padding, title styling, background colors
            coming soon...
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            MDX Content Styling
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Customize typography, headings, code blocks, images, and other
            markdown elements inside posts
          </p>
        </div>
        <div className="p-6">
          <p className="text-gray-600">
            Editor for typography, headings, spacing, colors, images, etc.
            coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
