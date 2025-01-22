"use client";

import React, { useState, useEffect } from "react";
import InstitutionForm from "./InstitutionForm/InstitutionForm";
import { Institution } from "@/types/institutions/types";
import { BsPlus } from "react-icons/bs";

const InstitutionPanel = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  // Función para obtener instituciones desde la API
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

  // Callback para manejar la creación de una nueva institución
  const handleInstitutionCreated = async (newInstitution: Institution) => {
    // Agrega la nueva institución al estado local
    setInstitutions((prevInstitutions) => [...prevInstitutions, newInstitution]);

    // Sincroniza las instituciones con la API
    await fetchInstitutions();
  };

  return (
    <div className="mx-4">
      <h3 className="text-2xl font-bold my-4">Panel de Instituciones</h3>
      <p className="text-sm text-neutral-500 mb-6">
        Donde podés encontrar información breve o herramientas rápidas para
        gestionar tus instituciones.
      </p>
      <h4 className="flex items-center text-xl text-zinc-200 pb-4">
        <BsPlus className="h-8 w-8" /> Agregar institución
      </h4>
      <div>
        <InstitutionForm onInstitutionCreated={handleInstitutionCreated} />
      </div>
    </div>
  );
};

export default InstitutionPanel;
