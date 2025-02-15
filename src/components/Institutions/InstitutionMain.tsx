"use client";

import React, { useState, useEffect } from "react";
import InstitutionCard from "./InstitutionCard/InstitutionCard";
import { Institution } from "@/types/institutions/types";
import SkeletonImage from "@/components/Esqueletons/SkeletonImage";
import InstitutionForm from "./InstitutionForm/InstitutionForm";
import toast from "react-hot-toast";

const InstitutionMain = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingInstitution, setEditingInstitution] = useState<Institution | null>(null);

  /**
   * @description Obtiene las instituciones desde la API.
   */
  const fetchInstitutions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/institutions");
      if (!response.ok) {
        throw new Error("Error al cargar las instituciones.");
      }
      const data = await response.json();
      setInstitutions(data);
    } catch {
      setError("No se pudieron cargar las instituciones.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar instituciones al montar el componente
  useEffect(() => {
    fetchInstitutions();
  }, []);

  /**
   * @description Maneja la eliminación de una institución.
   * @param institutionId El ID de la institución a eliminar.
   */
  const handleDelete = async (institutionId: string) => {
    try {
      const response = await fetch("/api/institutions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: institutionId }),
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la institución.");
      }

      setInstitutions((prev) =>
        prev.filter((inst) => inst.id !== Number(institutionId))
      );
      toast.success("Institución eliminada con éxito!");
    } catch {
      toast.error("Hubo un error al eliminar la institución.");
    }
  };

  /**
   * @description Maneja la edición de una institución.
   * @param institution La institución a editar.
   */
  const handleEdit = (institution: Institution) => {
    setEditingInstitution(institution);
  };

  /**
   * @description Maneja la actualización de una institución.
   * @param updatedInstitution La institución actualizada.
   */
  const handleInstitutionUpdated = (updatedInstitution: Institution) => {
    setInstitutions((prev) =>
      prev.map((inst) =>
        inst.id === updatedInstitution.id ? updatedInstitution : inst
      )
    );
    setEditingInstitution(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-gray-200 pl-4">
      {editingInstitution && (
        <InstitutionForm
          institutionToEdit={editingInstitution}
          onInstitutionUpdated={handleInstitutionUpdated}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {institutions.map((institution) => (
          <InstitutionCard
            key={institution.id}
            institution={institution}
            imageUrl={institution.image_url || <SkeletonImage />}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default InstitutionMain;