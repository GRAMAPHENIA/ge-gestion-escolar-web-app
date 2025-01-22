// src/components/Instituciones.tsx
"use client";

import React, { useState } from "react";
import InstitutionCard from "./InstitutionCard/InstitutionCard";
import { Institution } from "@/types/institutions/types";

const InstitutionMain = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  return (
    <div className="text-gray-200  p-10">
      {/* <h2 className="text-2xl font-bold mb-10">Gestión de Instituciones</h2> */}

      {/* Grid para mostrar instituciones */}
      <InstitutionCard />
    </div>
  );
};

export default InstitutionMain;
