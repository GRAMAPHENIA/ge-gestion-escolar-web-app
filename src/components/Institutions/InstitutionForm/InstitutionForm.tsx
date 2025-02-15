/**
 * 📌 Ruta del archivo: src/components/InstitutionForm/InstitutionForm.tsx
 * Este componente maneja la creación y edición de instituciones, incluyendo la subida de imágenes al bucket de Supabase.
 */

"use client";
import { supabase } from "@/supabase/supabaseClient";
import { Institution } from "@/types/institutions/types";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// Definimos el tipo para los datos del formulario, excluyendo campos que no se manejan directamente aquí
type InstitutionFormData = Omit<
  Institution,
  "id" | "created_at" | "image_url" | "website" | "description" | "is_active"
> & {
  image?: File; // Campo opcional para manejar la imagen seleccionada por el usuario
};

// Props del componente: permite manejar eventos de creación y actualización de instituciones
type InstitutionFormProps = {
  onInstitutionCreated?: (institution: Institution) => void; // Callback cuando se crea una nueva institución
  onInstitutionUpdated?: (institution: Institution) => void; // Callback cuando se actualiza una institución existente
  institutionToEdit?: Institution | null; // Datos de la institución a editar (si aplica)
};

const InstitutionForm = ({
  onInstitutionCreated,
  onInstitutionUpdated,
  institutionToEdit,
}: InstitutionFormProps) => {
  const [loading, setLoading] = useState<boolean>(false); // Estado para manejar el estado de carga
  const [formData, setFormData] = useState<InstitutionFormData>({
    name: institutionToEdit?.name || "",
    email: institutionToEdit?.email || "",
    phone_number: institutionToEdit?.phone_number || "",
    address: institutionToEdit?.address || "",
    city: institutionToEdit?.city || "",
    province: institutionToEdit?.province || "",
    country: institutionToEdit?.country || "",
    image: undefined, // Imagen seleccionada por el usuario (opcional)
    user_id: institutionToEdit?.user_id || "", // ID del usuario autenticado
  });

  // Obtener el ID del usuario autenticado al cargar el componente
  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error al obtener el ID del usuario:", error.message);
        return;
      }
      setFormData((prev) => ({ ...prev, user_id: data?.user?.id || "" }));
    };
    fetchUserId();
  }, []);

  /**
   * @description Maneja los cambios en los campos del formulario.
   * Actualiza el estado `formData` según el campo modificado.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] })); // Actualiza la imagen seleccionada
    } else {
      setFormData((prev) => ({ ...prev, [name]: value })); // Actualiza otros campos
    }
  };

  /**
   * @description Maneja el envío del formulario.
   * Sube la imagen al bucket de Supabase (si se seleccionó una nueva) y guarda los datos en la base de datos.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.user_id) {
        toast.error("El usuario no está autenticado.");
        setLoading(false);
        return;
      }

      // Mantener la URL existente si no se selecciona una nueva imagen
      let imageUrl: string | null = institutionToEdit?.image_url || null;

      // Subir la imagen al bucket de Supabase si se seleccionó una nueva
      if (formData.image) {
        const uniqueFileName = `${Date.now()}-${formData.image.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("institution-images")
          .upload(`images/${uniqueFileName}`, formData.image);
        if (uploadError) {
          throw new Error(uploadError.message || "Error al subir la imagen.");
        }
        // Obtener la URL pública de la imagen subida
        const { data: publicUrlData } = await supabase.storage
          .from("institution-images")
          .getPublicUrl(uploadData.path);
        imageUrl = publicUrlData.publicUrl; // Actualizar la URL de la imagen
      }

      // Insertar o actualizar la institución en la base de datos
      if (institutionToEdit) {
        const { data, error } = await supabase
          .from("institutions")
          .update({
            name: formData.name,
            email: formData.email,
            phone_number: formData.phone_number,
            address: formData.address,
            city: formData.city,
            province: formData.province,
            country: formData.country,
            image_url: imageUrl, // Usar la nueva URL o mantener la existente
          })
          .eq("id", institutionToEdit.id)
          .select();
        if (error) {
          throw new Error("Error al actualizar la institución.");
        }
        if (data) {
          toast.success("Institución actualizada con éxito!");
          onInstitutionUpdated?.(data[0]); // Devuelve la institución actualizada
        }
      } else {
        const { data, error } = await supabase
          .from("institutions")
          .insert([
            {
              name: formData.name,
              email: formData.email,
              phone_number: formData.phone_number,
              address: formData.address,
              city: formData.city,
              province: formData.province,
              country: formData.country,
              image_url: imageUrl, // Usar la URL de la imagen subida
              user_id: formData.user_id,
            },
          ])
          .select();
        if (error) {
          throw new Error("Error al agregar la institución.");
        }
        if (data) {
          const newInstitution = data[0];
          toast.success("Institución creada con éxito!");
          onInstitutionCreated?.(newInstitution); // Notificar al padre sobre la creación
        }
      }

      // Limpiar el formulario después de enviar
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo para el nombre */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="mt-2 block w-full px-4 py-2 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0"
        required
      />

      {/* Campo para el correo electrónico */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Correo Electrónico"
        className="mt-2 block w-full px-4 py-2 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0"
        required
      />

      {/* Campo para el número de teléfono */}
      <input
        type="tel"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        placeholder="Número de Teléfono"
        className="mt-2 block w-full px-4 py-2 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0"
        required
      />

      {/* Campo para la dirección */}
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Dirección"
        className="mt-2 block w-full px-4 py-2 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0"
        required
      />

      {/* Sección para seleccionar una imagen */}
      <div className="flex flex-col items-center space-y-4">
        {/* Botón para seleccionar una imagen */}
        <label
          htmlFor="file-input"
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition duration-200 flex items-center space-x-2 w-full cursor-pointer"
        >
          <span>
            {institutionToEdit ? "Cambiar imagen" : "Seleccionar imagen"}
          </span>
        </label>

        {/* Input oculto para seleccionar archivos */}
        <input
          id="file-input"
          type="file"
          name="image"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Botón de envío del formulario */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-400/70 text-white p-2 rounded-md hover:bg-orange-400/80 transition duration-200"
      >
        {loading ? (
          <span className="animate-pulse">Cargando...</span>
        ) : institutionToEdit ? (
          "Actualizar Institución"
        ) : (
          "Agregar Institución"
        )}
      </button>
    </form>
  );
};

export default InstitutionForm;
