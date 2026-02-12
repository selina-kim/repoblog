import { DashboardSidebar } from "@/components/DashboardSidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <DashboardSidebar session={session} />
      <div className="flex flex-1 flex-col">
        <main className="flex h-full flex-col justify-start p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
