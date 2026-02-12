import { auth } from "@/auth";
import { DashboardContent } from "@/components/DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const username = session.user.username || "";

  return <DashboardContent username={username} />;
}
