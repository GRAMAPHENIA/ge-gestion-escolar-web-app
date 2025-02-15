"use client";

import React, { useState, useEffect } from "react";
import InstitutionForm from "./InstitutionForm/InstitutionForm";
import { Institution } from "@/types/institutions/types";

const InstitutionPanel = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  /**
   * @description Obtiene las instituciones desde la API.
   */
  const fetchInstitutions = async () => {
    try {
      const response = await fetch("/api/institutions");
      if (!response.ok) {
        throw new Error("Error al obtener las instituciones");
      }
      const data: Institution[] = await response.json();
      setInstitutions(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Llama a la función `fetchInstitutions` cuando el componente se monta
  useEffect(() => {
    fetchInstitutions();
  }, []);

  /**
   * @description Maneja la creación de una nueva institución.
   * @param newInstitution La nueva institución creada.
   */
  const handleInstitutionCreated = (newInstitution: Institution) => {
    setInstitutions((prevInstitutions) => [
      ...prevInstitutions,
      newInstitution,
    ]);
  };

  return (
    <div className="mx-4">
      <h3 className="text-2xl font-bold my-4">Panel de Instituciones</h3>
      <p className="text-sm text-neutral-500 mb-6">
        Donde podés encontrar información breve o herramientas rápidas para
        gestionar tus instituciones.
      </p>
      <InstitutionForm onInstitutionCreated={handleInstitutionCreated} />
    </div>
  );
};

export default InstitutionPanel;
