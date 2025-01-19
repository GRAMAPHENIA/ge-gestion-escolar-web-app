import { supabase } from "@/supabase/supabaseClient";
import { Institution } from "@/types/institutions/types";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical, BsBuildingGear } from "react-icons/bs";

const InstitutionCard = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

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
      setOpenMenu(null); // Cierra el menú contextual
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("institutions").delete().eq("id", id);

    if (error) {
      console.error("Error deleting institution:", error);
    } else {
      setInstitutions((prev) => prev.filter((inst) => inst.id !== id));
      setOpenMenu(null); // Cierra el menú contextual
    }
  };

  const handleEdit = (institution: Institution) => {
    console.log("Editing institution:", institution);
    setOpenMenu(null); // Cierra el menú contextual
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
            className="relative bg-zinc-900/50 border border-zinc-700/50 p-4 rounded-md shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="flex text-xl font-bold">
                <span
                  className={`text-4xl p-4 border border-zinc-700/50 rounded-md ${
                    institution.is_active
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-zinc-900 text-zinc-500"
                  }`}
                >
                  <BsBuildingGear />
                </span>
                <span className="ml-4">{institution.name}</span>
              </p>
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenu((prev) =>
                      prev === institution.id ? null : institution.id
                    )
                  }
                  className="text-gray-400 hover:text-gray-200 p-2 rounded-full focus:outline-none"
                >
                  <BsThreeDotsVertical size={20} />
                </button>
                {openMenu === institution.id && (
                  <ul className="absolute right-0 mt-2 w-40 bg-zinc-800 rounded-md shadow-lg border border-zinc-700 text-sm">
                    <li>
                      <button
                        onClick={() =>
                          handleToggleActive(institution.id, institution.is_active)
                        }
                        className="block w-full text-left px-4 py-2 hover:bg-zinc-700 text-gray-300"
                      >
                        {institution.is_active ? "Desactivar" : "Activar"}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleEdit(institution)}
                        className="block w-full text-left px-4 py-2 hover:bg-zinc-700 text-gray-300"
                      >
                        Editar
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(institution.id)}
                        className="block w-full text-left px-4 py-2 hover:bg-zinc-700 text-red-400"
                      >
                        Eliminar
                      </button>
                    </li>
                  </ul>
                )}
              </div>
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
          </div>
        ))
      )}
    </div>
  );
};

export default InstitutionCard;
