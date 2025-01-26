"use client";

import React, { useState, useEffect } from "react";
import InstitutionCard from "./InstitutionCard/InstitutionCard";
import { Institution } from "@/types/institutions/types";
import { getPublicImageUrl } from "@/supabase/supabaseClient";
import SkeletonImage from "@/components/Esqueletons/SkeletonImage";

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

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Mostrar un mensaje de error si ocurre un problema
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-gray-200 pl-4">
      {/* Grid para mostrar las instituciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {institutions.map((institution) => {
          const imageUrl = institution.image_url
            ? getPublicImageUrl(institution.image_url) // Usa la función para obtener la URL pública
            : null;

          return (
            <InstitutionCard
              key={institution.id}
              institution={institution}
              imageUrl={imageUrl || <SkeletonImage />} // Pasar la URL de la imagen o un esqueleto
            />
          );
        })}
      </div>
    </div>
  );
};

export default InstitutionMain;
