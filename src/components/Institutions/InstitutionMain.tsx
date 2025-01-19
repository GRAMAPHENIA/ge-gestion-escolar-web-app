// src/components/Instituciones.tsx
"use client";

import React from "react";
import InstitutionCard from "./InstitutionCard/InstitutionCard";

const InstitutionMain = () => {
  return (
    <div className="text-gray-200  ">
      <h2 className="text-2xl font-bold mb-10">Gestión de Instituciones</h2>

      {/* Grid para mostrar instituciones */}
      <InstitutionCard />
    </div>
  );
};

export default InstitutionMain;
