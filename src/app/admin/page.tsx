"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/lib/api";

export default function AdminPage() {
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Selecciona un Cliente</h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {clients?.map((client) => (
          <li
            key={client.id}
            onClick={() => router.push(`/admin/${client.id}`)}
            className="border p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="font-semibold">{client.name}</div>
            {client.logoUrl && (
              <img
                src={client.logoUrl}
                className="w-16 h-16 mt-2 object-contain"
                alt={client.name}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
