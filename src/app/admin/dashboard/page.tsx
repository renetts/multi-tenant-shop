"use client";

import { useContext } from "react";
import { AuthContext } from "@/auth/AuthProvider";
import withAdminProtection from "@/auth/withAdminProtection";

function AdminDashboard() {
  const { user, role } = useContext(AuthContext);

  if (!user || role !== "admin") return null;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, Admin 👋
        </h1>
        <p className="text-gray-600">
          This is your admin dashboard where you can manage clients, products,
          and more.
        </p>

        {/* Example Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2 text-indigo-600">
              Clients
            </h2>
            <p className="text-gray-600">
              Manage client accounts and information.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2 text-indigo-600">
              Products
            </h2>
            <p className="text-gray-600">
              View and organize products for each client.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2 text-indigo-600">
              Categories
            </h2>
            <p className="text-gray-600">
              Define product categories per tenant.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAdminProtection(AdminDashboard);
