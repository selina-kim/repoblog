import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json(
      {
        error:
          "Unauthorized - No access token. Please sign out and sign in again.",
      },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { slug } = body;

    // revalidate blog list page
    revalidatePath("/blog");

    // if specific slug provided, revalidate that post page
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    } else {
      // revalidate all blog post pages
      revalidatePath("/blog/[slug]", "page");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 },
    );
  }
}
