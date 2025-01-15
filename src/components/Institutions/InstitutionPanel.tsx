// src/components/InstitutionPanel/InstitutionPanel.tsx
"use client";

import React from "react";
// import { FaPlus } from "react-icons/fa"; // Importa los iconos que deseas
import { PiPlus } from "react-icons/pi";

const InstitutionPanel = () => {
  return (
    <div className="">
      <h3 className="text-2xl font-bold mb-4">Panel de Instituciones</h3>
      <p className="text-sm text-gray-400 mb-6">
        Aquí podés encontrar información breve o herramientas rápidas para
        gestionar tus instituciones.
      </p>
      <ul className="space-y-4 text-gray-300">
        {/* <li className="flex items-center space-x-3 hover:text-cyan-300 cursor-pointer transition-all">
          <GoOrganization className="text-cyan-400" size={20} />
          <span>Ver todas las instituciones</span>
        </li> */}
        <li className="flex items-center space-x-4 px-2 py-2 mx-2 my-2 cursor-pointer rounded-md text-gray-400/75 hover:text-cyan-400 hover:bg-cyan-300/5">
          <PiPlus 
            className="text-green-400 p-[4px] rounded-[4px] h-[25px] w-auto bg-cyan-300/5 "
            size={20}
          />
          <span>Agregar institución</span>
        </li>
        {/* <li className="flex items-center space-x-3 hover:text-cyan-300 cursor-pointer transition-all">
          <FaChartLine className="text-cyan-400" size={20} />
          <span>Estadísticas rápidas</span>
        </li> */}
      </ul>
    </div>
  );
};

export default InstitutionPanel;
