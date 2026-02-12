"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { FileIcon } from "@/src/assets/icons/FileIcon";
import { PaletteIcon } from "@/src/assets/icons/PaletteIcon";
import { handleSignOut } from "../actions/auth";

const navItems = [
  {
    name: "Manage Content",
    href: "/dashboard",
    icon: <FileIcon className="h-5 w-5" />,
  },
  {
    name: "Appearance",
    href: "/dashboard/appearance",
    icon: <PaletteIcon className="h-5 w-5" />,
  },
];

interface DashboardSidebarProps {
  session: Session;
}

export function DashboardSidebar({ session }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname?.startsWith(item.href));

          return (
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              href={item.href}
              key={item.href}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <div className="mb-3 text-sm text-gray-600">
          {session.user.username}
        </div>
        <form action={handleSignOut}>
          <button
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-50"
            type="submit"
          >
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
