import { Loader } from "@/components/Loader";

export default function Loading() {
  const titleSkeleton = (
    <div className="mb-4 h-10 w-full animate-pulse rounded-lg bg-gray-300" />
  );
  const dateSkeleton = (
    <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
  );
  const authorSkeleton = (
    <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
  );
  const descriptionSkeleton = (
    <div className="mt-4 h-6 w-full animate-pulse rounded bg-gray-200" />
  );
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          {titleSkeleton}
          {dateSkeleton}
          {authorSkeleton}
          {descriptionSkeleton}
        </div>
        <div className="max-w-none rounded-lg border border-gray-200 bg-white p-8">
          <div className="flex min-h-100 items-center justify-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Loader />
              Loading content...
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
