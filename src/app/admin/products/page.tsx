"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  getCategoriesByClient,
  getClients,
  getProductsByClient,
} from "@/lib/api";
import { Product } from "@/types";
import { useState } from "react";
import withAdminProtection from "@/auth/withAdminProtection";

function ProductsPage() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<Product>();
  const [clientId, setClientId] = useState("");
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
  const { data: categories } = useQuery({
    queryKey: ["categories", clientId],
    queryFn: () => getCategoriesByClient(clientId),
    enabled: !!clientId,
  });
  const { data: products } = useQuery({
    queryKey: ["products", clientId],
    queryFn: () => getProductsByClient(clientId),
    enabled: !!clientId,
  });
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", clientId] });
      reset();
    },
  });

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

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
            placeholder="Product Name"
            className="border p-2 w-full"
          />
          <input
            type="number"
            step="0.01"
            {...register("price")}
            placeholder="Price"
            className="border p-2 w-full"
          />
          <input
            {...register("imageUrl")}
            placeholder="Image URL"
            className="border p-2 w-full"
          />
          <select {...register("categoryId")} className="border p-2 w-full">
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      )}

      <h3 className="text-lg font-semibold mt-8">Products</h3>
      <ul className="mt-2 space-y-2">
        {products?.map((prod) => (
          <li key={prod.id} className="border p-2">
            {prod.name} - ${prod.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withAdminProtection(ProductsPage);
