import { supabase } from "@/supabase/supabaseClient";
import { Institution } from "@/types/institutions/types";
import Image from "next/image";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";

// Definimos el tipo adecuado para los datos del formulario
type InstitutionFormData = Partial<Institution> & {
  image?: File | null; // 'image' puede ser un archivo o null
};

const InstitutionForm = ({
  onInstitutionCreated,
}: {
  onInstitutionCreated: (institution: Institution) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<InstitutionFormData>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] })); // Para el campo de la imagen
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Activar el estado de carga
    setErrorMessage(null); // Resetear el mensaje de error

    try {
      console.log("Enviando datos a Supabase:", formData);

      // Verificar si ya existe una institución con el mismo nombre
      const { data: existingInstitutions, error: fetchError } = await supabase
        .from("institutions")
        .select("name")
        .eq("name", formData.name);

      if (fetchError) {
        console.error("Error al verificar duplicación:", fetchError.message);
        setErrorMessage("Hubo un error al verificar la institución.");
        setLoading(false);
        return;
      }

      if (existingInstitutions && existingInstitutions.length > 0) {
        setErrorMessage("Ya existe una institución con ese nombre.");
        setLoading(false);
        return;
      }

      // Si no hay duplicación, proceder con la inserción
      const { data, error } = await supabase.from("institutions").insert([
        {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          address: formData.address,
          city: formData.city,
          country: formData.country,
        },
      ]);

      if (error) {
        console.error("Error al agregar la institución:", error.message);
        setErrorMessage(
          "Hubo un problema al agregar la institución. Inténtalo nuevamente."
        );
      } else {
        console.log("Institución agregada con éxito:", data);
        // Llamamos a la función `onInstitutionCreated` para pasar la nueva institución
        if (data) {
          onInstitutionCreated(data[0]); // Pasamos la primera institución creada
        }
        // Limpiar el formulario
        setFormData({});
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setErrorMessage("Hubo un error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false); // Desactivar el estado de carga
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
          className="w-full p-2 mb-2 text-sm bg-[#404045]  rounded-md text-zinc-400 placeholder:text-neutral-400/50"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 text-sm bg-[#404045]  rounded-md text-zinc-400 placeholder:text-neutral-400/50"
        />
        <input
          type="tel"
          name="phone_number"
          placeholder="Teléfono"
          value={formData.phone_number || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 text-sm bg-[#404045]  rounded-md text-zinc-400 placeholder:text-neutral-400/50"
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 text-sm bg-[#404045]  rounded-md text-zinc-400 placeholder:text-neutral-400/50"
        />

        {/* Icono de carga de archivo */}
        <label
          htmlFor="file-upload"
          className="flex items-end justify-left cursor-pointer p-2 mb-2 text-sm w-full bg-zinc-900/80 border border-zinc-700/50 rounded-md text-zinc-400 placeholder:text-zinc-600/70"
        >
          {/* Ícono de React Icons (FiUpload) */}
          <FiUpload className="w-5 h-5 text-zinc-400 flex items-end" />
          <span className="text-zinc-600 text-sm ml-2">subir foto</span>
        </label>

        {/* Input para cargar el archivo (oculto) */}
        <input
          id="file-upload"
          type="file"
          name="image"
          onChange={handleChange}
          className="hidden"
        />

        {/* Mostrar miniatura del archivo si se seleccionó */}
        {formData.image && (
          <div className="mt-2">
            <Image
              height={10}
              width={10}
              src={URL.createObjectURL(formData.image)}
              alt="Miniatura"
              className="w-full h-20 object-cover rounded-md border border-zinc-700"
            />
          </div>
        )}
      </div>

      {/* Mostrar mensaje de error si existe */}
      {errorMessage && (
        <div className="absolute bottom-4 left-1/2 text-rose-400 mt-2 text-sm border border-rose-500/20 bg-rose-500/20 py-2 px-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Botón con texto "Cargando..." o spinner */}
      <button
        type="submit"
        disabled={loading}
        className="bg-orange-600/20 hover:bg-orange-500/20 text-sm text-orange-400 hover:text-orange-300 transition duration-100 rounded-md px-4 py-2 mt-4 flex justify-center items-center "
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
