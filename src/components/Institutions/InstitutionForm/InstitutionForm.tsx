// InstitutionForm.tsx
import { supabase } from "@/supabase/supabaseClient";
import { Institution } from "@/types/institutions/types";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-hot-toast";

type InstitutionFormData = Omit<Institution, "id" | "created_at" | "image_url" | "website" | "description" | "is_active"> & {
  image?: File;
};

const InstitutionForm = ({
  onInstitutionCreated,
}: {
  onInstitutionCreated: (institution: Institution) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<InstitutionFormData>({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    province: "",
    country: "",
    image: undefined,
    user_id: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user ID:", error.message);
        return;
      }
      setFormData((prev) => ({ ...prev, user_id: data?.user?.id || "" }));
    };
    fetchUserId();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.user_id) {
        toast.error("El usuario no está autenticado.");
        setLoading(false);
        return;
      }

      // Verificar si ya existe una institución con el mismo nombre
      const { data: existingInstitutions, error: fetchError } = await supabase
        .from("institutions")
        .select("name")
        .eq("name", formData.name);

      if (fetchError) {
        throw new Error("Error al verificar duplicación.");
      }

      if (existingInstitutions && existingInstitutions.length > 0) {
        toast.error("Ya existe una institución con ese nombre.");
        setLoading(false);
        return;
      }

      // Subir imagen si se seleccionó
      let imageUrl: string | null = null;
      if (formData.image) {
        const allowedTypes = ["image/jpeg", "image/png"];
        const maxFileSize = 5 * 1024 * 1024; // 5 MB

        if (!allowedTypes.includes(formData.image.type)) {
          toast.error(
            "Solo se permiten imágenes JPEG o PNG. Tipo de archivo: " +
              formData.image.type
          );
          setLoading(false);
          return;
        }

        if (formData.image.size > maxFileSize) {
          toast.error(
            `La imagen no debe superar los 5 MB. Tamaño actual: ${(formData.image.size / (1024 * 1024)).toFixed(
              2
            )} MB`
          );
          setLoading(false);
          return;
        }

        const uniqueFileName = `${Date.now()}-${formData.image.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("institution-images")
          .upload(`images/${uniqueFileName}`, formData.image);

        if (uploadError) {
          toast.error(uploadError.message || "Error al subir la imagen.");
          setLoading(false);
          return;
        }

        imageUrl = uploadData?.path || null;
      }

      // Insertar datos de la institución
      const { data, error } = await supabase.from("institutions").insert([
        {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          address: formData.address,
          city: formData.city,
          province: formData.province,
          country: formData.country,
          image_url: imageUrl,
          user_id: formData.user_id,
        },
      ]);

      if (error) {
        throw new Error("Error al agregar la institución.");
      }

      if (data) {
        toast.success("Institución creada con éxito!");
        onInstitutionCreated(data[0]);
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          address: "",
          city: "",
          province: "",
          country: "",
          image: undefined,
          user_id: formData.user_id,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Hubo un error inesperado.");
      } else {
        toast.error("Ocurrió un error desconocido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 text-sm bg-[#404045] rounded-md text-zinc-400 placeholder:text-neutral-400/50"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 text-sm bg-[#404045] rounded-md text-zinc-400 placeholder:text-neutral-400/50"
        />
        <input
          type="tel"
          name="phone_number"
          placeholder="Teléfono"
          value={formData.phone_number || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 text-sm bg-[#404045] rounded-md text-zinc-400 placeholder:text-neutral-400/50"
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 text-sm bg-[#404045] rounded-md text-zinc-400 placeholder:text-neutral-400/50"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center cursor-pointer p-2 mb-2 text-sm w-full bg-zinc-900/80 border border-zinc-700/50 rounded-md text-zinc-400 placeholder:text-zinc-600/70"
        >
          <FiUpload className="w-5 h-5 text-zinc-400" />
          <span className="ml-2 text-zinc-600 text-sm">Subir foto</span>
        </label>
        <input
          id="file-upload"
          type="file"
          name="image"
          onChange={handleChange}
          className="hidden"
        />

        {formData.image && (
          <div className="mt-2">
            <Image
              height={100}
              width={100}
              src={URL.createObjectURL(formData.image)}
              alt="Miniatura"
              className="w-full h-16 object-cover rounded-md border border-zinc-700"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-600/20 hover:bg-orange-500/20 text-sm text-orange-400 hover:text-orange-300 transition duration-100 rounded-md px-4 py-2 mt-4 flex justify-center items-center"
      >
        {loading ? (
          <span className="animate-pulse text-orange-400">Cargando...</span>
        ) : (
          "Agregar Institución"
        )}
      </button>
    </form>
  );
};

export default InstitutionForm;
