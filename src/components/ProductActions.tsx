// components/ProductActions.tsx
"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function ProductActions({ product, clientId }: any) {
  const handleEdit = () => {
    // mostrar modal o redirigir
    alert("Editar " + product.name);
  };

  const handleDelete = () => {
    // lógica para eliminar
    alert("Eliminar " + product.name);
  };

  return (
    <div className="flex gap-2">
      <button onClick={handleEdit} className="text-blue-600 hover:underline">
        <Pencil size={16} />
      </button>
      <button onClick={handleDelete} className="text-red-600 hover:underline">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
