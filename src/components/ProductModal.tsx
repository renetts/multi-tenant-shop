"use client";

import { useForm } from "react-hook-form";
import { addProduct } from "@/lib/api"; // función para agregar producto
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductModal({
  onClose,
  clientId,
}: {
  onClose: () => void;
  clientId: string;
}) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => addProduct({ ...data, clientId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", clientId] });
      reset();
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-lg font-bold">Agregar Producto</h2>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <input
            {...register("name")}
            placeholder="Nombre"
            className="border p-2 w-full"
          />
          <input
            {...register("category")}
            placeholder="Categoría"
            className="border p-2 w-full"
          />
          <input
            {...register("price")}
            type="number"
            step="0.01"
            placeholder="Precio"
            className="border p-2 w-full"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
