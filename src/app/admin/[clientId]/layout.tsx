import { ReactNode } from "react";

export default function ClientAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Panel del Cliente</h1>
        {/* Puedes agregar botón de volver o logout aquí */}
      </header>
      {children}
    </div>
  );
}
