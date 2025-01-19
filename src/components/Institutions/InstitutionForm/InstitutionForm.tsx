import { supabase } from "@/supabase/supabaseClient";
import { Institution } from "@/types/institutions/types";
import React, { useState } from "react";

const InstitutionForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Institution>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        setErrorMessage("Hubo un problema al agregar la institución. Inténtalo nuevamente.");
      } else {
        console.log("Institución agregada con éxito:", data);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setErrorMessage("Hubo un error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name || ""}
            onChange={handleChange}
            required
            className="p-2 mb-2 text-sm bg-zinc-900/80 border border-zinc-700/50 rounded-md text-zinc-400 placeholder:text-zinc-600/70"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            required
            className="p-2 mb-2 text-sm bg-zinc-900/80 border border-zinc-700/50 rounded-md text-zinc-400 placeholder:text-zinc-600/70"
          />
          <input
            type="tel"
            name="phone_number"
            placeholder="Teléfono"
            value={formData.phone_number || ""}
            onChange={handleChange}
            required
            className="p-2 mb-2 text-sm bg-zinc-900/80 border border-zinc-700/50 rounded-md text-zinc-400 placeholder:text-zinc-600/70"
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={formData.address || ""}
            onChange={handleChange}
            required
            className="p-2 mb-2 text-sm bg-zinc-900/80 border border-zinc-700/50 rounded-md text-zinc-400 placeholder:text-zinc-600/70"
          />
        </div>

        {/* Mostrar mensaje de error si existe */}
        {errorMessage && (
          <div className="text-rose-400 mt-2 text-sm">{errorMessage}</div>
        )}

        {/* Botón con texto "Cargando..." o spinner */}
        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-600/20 hover:bg-cyan-500/20 text-sm text-cyan-400 hover:text-cyan-300 transition duration-100 rounded-md px-4 py-2 mt-4 flex justify-center items-center"
        >
          {loading ? (
            <>
              <span className="animate-pulse text-cyan-400">Cargando...</span>
            </>
          ) : (
            "Agregar Institución"
          )}
        </button>
      </form>
    </div>
  );
};

export default InstitutionForm;
