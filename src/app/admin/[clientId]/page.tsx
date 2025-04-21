// app/admin/[clientId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductsByClient } from "@/lib/api";
import ProductActions from "@/components/ProductActions"; // Ver abajo

export default function ClientDashboard() {
  const { clientId } = useParams();

  const { data: products } = useQuery({
    queryKey: ["products", clientId],
    queryFn: () => getProductsByClient(clientId as string),
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Productos</h2>
      <table className="w-full border text-sm text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Categoría</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.category}</td>
              <td className="p-2 border">${p.price}</td>
              <td className="p-2 border">
                <ProductActions product={p} clientId={clientId as string} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}