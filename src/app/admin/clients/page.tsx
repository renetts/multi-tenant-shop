"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addClient, getClients } from "@/lib/api";
import { Client } from "@/types";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import withAdminProtection from "@/auth/withAdminProtection";

function ClientsPage() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm<Client>();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const mutation = useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      reset();
      setPreviewUrl(null);
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileRef = ref(storage, `logos/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setValue("logoUrl", url); // 🔥 Sets the form value
      setPreviewUrl(url);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add Client</h2>
      <form
        onSubmit={handleSubmit((data) => {
          mutation.mutate(data);
        })}
        className="space-y-4"
      >
        <input
          {...register("name")}
          placeholder="Client Name"
          className="border p-2 w-full"
        />

        {/* 👇 Image Upload Field */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-contain border"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={uploading}
        >
          Save
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-8">Clients</h3>
      <ul className="mt-2 space-y-2">
        {clients?.map((c) => (
          <li key={c.id} className="border p-2 flex items-center space-x-4">
            {c.logoUrl && (
              <img
                src={c.logoUrl}
                alt={c.name}
                className="w-10 h-10 object-contain"
              />
            )}
            <span>{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withAdminProtection(ClientsPage);
