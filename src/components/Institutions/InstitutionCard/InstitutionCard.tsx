import { supabase } from '@/supabase/supabaseClient';
import { Institution } from '@/types/institutions/types';
import React, { useEffect, useState } from 'react';
import { BsBuildingGear } from 'react-icons/bs';

const InstitutionCard = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      const { data, error } = await supabase.from("institutions").select("*");
      if (error) {
        console.error("Error fetching institutions:", error);
      } else {
        setInstitutions(data || []);
      }
    };

    fetchInstitutions();
  }, []);

  // Toggle active status
  const handleToggleActive = async (id: number, isActive: boolean) => {
    const { error } = await supabase
      .from("institutions")
      .update({ is_active: !isActive })
      .eq("id", id);

    if (error) {
      console.error("Error toggling active status:", error);
    } else {
      setInstitutions((prev) =>
        prev.map((inst) =>
          inst.id === id ? { ...inst, is_active: !isActive } : inst
        )
      );
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("institutions").delete().eq("id", id);

    if (error) {
      console.error("Error deleting institution:", error);
    } else {
      setInstitutions((prev) => prev.filter((inst) => inst.id !== id));
    }
  };

  // Handle edit (to be implemented, e.g., open a modal)
  const handleEdit = (institution: Institution) => {
    console.log("Editing institution:", institution);
  };

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      {institutions.length === 0 ? (
        <div className="col-span-1 md:col-span-3 text-center text-gray-400">
          No hay instituciones registradas.
        </div>
      ) : (
        institutions.map((institution) => (
          <div
            key={institution.id}
            className="bg-zinc-900/50 border border-zinc-700/50 p-4 rounded-md shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="flex text-xl font-bold">
                <span
                  className={`text-4xl p-4 border rounded-md ${
                    institution.is_active
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-zinc-900 text-zinc-500"
                  }`}
                >
                  <BsBuildingGear />
                </span>
                <span className="ml-4">{institution.name}</span>
              </p>
              <button
                onClick={() =>
                  handleToggleActive(institution.id, institution.is_active)
                }
                className={`px-3 py-1 rounded-md transition ${
                  institution.is_active
                    ? "bg-cyan-600/20 text-cyan-400 hover:bg-cyan-500/20"
                    : "bg-zinc-700/50 text-zinc-400 hover:bg-zinc-600/50"
                }`}
              >
                {institution.is_active ? "Activo" : "Inactivo"}
              </button>
            </div>
            <p>
              <strong>Email:</strong> {institution.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {institution.phone_number}
            </p>
            <p>
              <strong>Dirección:</strong> {institution.address}
            </p>
            <p>
              <strong>Ciudad:</strong> {institution.city}
            </p>
            <p>
              <strong>País:</strong> {institution.country}
            </p>
            <div className="flex mt-4 space-x-2">
              <button
                onClick={() => handleEdit(institution)}
                className="flex items-center px-4 py-2 text-left bg-sky-600/5 hover:bg-sky-500/10 text-sky-400 hover:text-sky-300 border border-zinc-700/50 transition duration-100 rounded-md"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(institution.id)}
                className="flex items-center px-4 py-2 text-left bg-rose-600/5 hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 border border-zinc-700/50 transition duration-100 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default InstitutionCard;
