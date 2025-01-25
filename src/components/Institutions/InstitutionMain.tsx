"use client";

import React, { useState, useEffect } from "react";
import InstitutionCard from "./InstitutionCard/InstitutionCard";
import { Institution } from "@/types/institutions/types";
import { getPublicImageUrl } from "@/supabase/supabaseClient";
import SkeletonImage from "@/components/Esqueletons/SkeletonImage";
import InstitutionEditCard from "./InstitutionCard/InstitutionEditCard";
import InstitutionDeleteCard from "./InstitutionCard/InstitutionDeleteCard";

// Función para obtener instituciones desde la API
const fetchInstitutions = async (): Promise<Institution[]> => {
  const response = await fetch("/api/institutions");
  if (!response.ok) {
    throw new Error("Error al cargar las instituciones");
  }
  const data = await response.json();
  return data;
};

const InstitutionMain = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingInstitution, setEditingInstitution] =
    useState<Institution | null>(null);
  const [deletingInstitutionId, setDeletingInstitutionId] = useState<
    string | null
  >(null);

  // Cargar instituciones al montar el componente
  useEffect(() => {
    const loadInstitutions = async () => {
      setLoading(true);
      try {
        const data = await fetchInstitutions();
        setInstitutions(data);
      } catch {
        setError("No se pudieron cargar las instituciones.");
      } finally {
        setLoading(false);
      }
    };

    loadInstitutions();
  }, []);

  // Función para manejar la edición de una institución
  const handleEdit = (institution: Institution) => {
    setEditingInstitution(institution);
  };

  // Función para manejar la eliminación de una institución
  const handleDelete = (institutionId: string) => {
    setDeletingInstitutionId(institutionId);
  };

  // Función para guardar los cambios después de editar
  const handleSave = async (updatedInstitution: Institution) => {
    try {
      // Aquí puedes hacer una llamada a la API para actualizar la institución
      const response = await fetch(
        `/api/institutions/${updatedInstitution.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedInstitution),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la institución");
      }

      // Actualizar la lista de instituciones
      const updatedInstitutions = institutions.map((inst) =>
        inst.id === updatedInstitution.id ? updatedInstitution : inst
      );
      setInstitutions(updatedInstitutions);
      setEditingInstitution(null); // Cerrar el modal de edición
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  // Función para confirmar la eliminación de una institución
  const handleConfirmDelete = async () => {
    if (deletingInstitutionId) {
      try {
        // Aquí puedes hacer una llamada a la API para borrar la institución
        const response = await fetch(
          `/api/institutions/${deletingInstitutionId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Error al borrar la institución");
        }

        // Actualizar la lista de instituciones
        const updatedInstitutions = institutions.filter(
          (inst) => inst.user_id !== deletingInstitutionId
        );
        setInstitutions(updatedInstitutions);
        setDeletingInstitutionId(null); // Cerrar el modal de confirmación de borrado
      } catch (error) {
        console.error("Error al borrar la institución:", error);
      }
    }
  };

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Mostrar un mensaje de error si ocurre un problema
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-gray-200 px-4">
      {/* Grid para mostrar las instituciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {institutions.map((institution) => {
          const imageUrl = institution.image_url
            ? getPublicImageUrl(institution.image_url) // Usa la función para obtener la URL pública
            : null;

          return (
            <InstitutionCard
              key={institution.id}
              institution={institution}
              imageUrl={imageUrl || <SkeletonImage />} // Pasar la URL de la imagen o un esqueleto
              onEdit={() => handleEdit(institution)} // Manejar la edición
              onDelete={() => handleDelete(institution.user_id)} // Manejar la eliminación
            />
          );
        })}
      </div>

      {/* Modal de edición */}
      {editingInstitution && (
        <InstitutionEditCard
          institution={editingInstitution}
          onClose={() => setEditingInstitution(null)} // Cerrar el modal
          onSave={handleSave} // Guardar los cambios
        />
      )}

      {/* Modal de confirmación de borrado */}
      {deletingInstitutionId && (
        <InstitutionDeleteCard
          onConfirm={handleConfirmDelete} // Confirmar la eliminación
          onCancel={() => setDeletingInstitutionId(null)} // Cancelar la eliminación
        />
      )}
    </div>
  );
};

export default InstitutionMain;
