"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCategory, getCategoriesByClient, getClients } from "@/lib/api";
import { Category } from "@/types";
import { useState } from "react";
import withAdminProtection from "@/auth/withAdminProtection";

function CategoriesPage() {
  const queryClient = useQueryClient();
  const [clientId, setClientId] = useState("");
  const { register, handleSubmit, reset } = useForm<Category>();
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
  const { data: categories } = useQuery({
    queryKey: ["categories", clientId],
    queryFn: () => getCategoriesByClient(clientId),
    enabled: !!clientId,
  });
  const mutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", clientId] });
      reset();
    },
  });

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>

      <select
        className="border p-2 w-full mb-4"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      >
        <option value="">Select Client</option>
        {clients?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {clientId && (
        <form
          onSubmit={handleSubmit((data) =>
            mutation.mutate({ ...data, clientId })
          )}
          className="space-y-4"
        >
          <input
            {...register("name")}
            placeholder="Category Name"
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      )}

      <h3 className="text-lg font-semibold mt-8">Categories</h3>
      <ul className="mt-2 space-y-2">
        {categories?.map((cat) => (
          <li key={cat.id} className="border p-2">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withAdminProtection(CategoriesPage);
