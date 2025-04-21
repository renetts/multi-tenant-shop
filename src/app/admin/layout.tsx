// app/admin/layout.tsx
"use client";

import { FiLogOut } from "react-icons/fi";
import { Home, Users, Package, Network } from "lucide-react";

import { ReactNode } from "react";
import Link from "next/link";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <Home size={18} /> },
  { name: "Clients", href: "/admin/clients", icon: <Users size={18} /> },
  { name: "Products", href: "/admin/products", icon: <Package size={18} /> },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: <Network size={18} />,
  },
];

function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const router = useRouter();
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-lg flex flex-col">
        <div className="h-16 flex items-center justify-center bg-blue-700 text-white text-2xl font-bold tracking-wide">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ name, href, icon }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                pathname === href
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {icon}
              {name}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="m-6 flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          <FiLogOut /> Logout
        </button>
        <div className="p-4 text-xs text-gray-500">© 2025 Your Company</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-xl shadow p-6">{children}</div>
      </main>
    </div>
  );
}

export default AdminLayout;
