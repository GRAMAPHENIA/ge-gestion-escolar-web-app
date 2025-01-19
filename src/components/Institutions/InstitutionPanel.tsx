// src/components/InstitutionPanel/InstitutionPanel.tsx
"use client";

import React from "react";
import InstitutionForm from "./InstitutionForm/InstitutionForm";

const InstitutionPanel = () => {
  return (
    <div className="">
      <h3 className="text-2xl font-bold my-4">Panel de Instituciones</h3>

      <p className="text-sm text-gray-400 mb-6">
        Donde podés encontrar información breve o herramientas rápidas para
        gestionar tus instituciones.
      </p>

      <h4 className="text-xl text-zinc-200 pb-4">Aregar institucion</h4>

      <div className="">
        <InstitutionForm />
      </div>
    </div>
  );
};

export default InstitutionPanel;
