"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addClient, getClients } from "@/lib/api";
import { Client } from "@/types";

export default function ClientsPage() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<Client>();
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
  const mutation = useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
      reset();
    },
  });

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add Client</h2>
      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="space-y-4"
      >
        <input
          {...register("name")}
          placeholder="Client Name"
          className="border p-2 w-full"
        />
        <input
          {...register("logoUrl")}
          placeholder="Logo URL"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-8">Clients</h3>
      <ul className="mt-2 space-y-2">
        {clients?.map((c) => (
          <li key={c.id} className="border p-2">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
