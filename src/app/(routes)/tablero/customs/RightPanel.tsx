// src/components/Dashboard/RightPanel.tsx

import React from "react";

interface RightPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ isOpen, onToggle }) => {
  return (
    <div
      className={`transition-all duration-200 absolute right-0 top-0 z-30 bg-[#2d3136] ${
        isOpen ? "w-72" : "w-0"
      }`}
      style={{ height: "100vh" }}
    >
      <div className="flex justify-end p-4">
        <button
          className="text-zinc-400 hover:text-zinc-200"
          onClick={onToggle}
        >
          {isOpen ? "Cerrar" : "Abrir"} Panel
        </button>
      </div>

      {isOpen && (
        <div className="p-4">
          {/* Aquí puedes agregar contenido específico del panel */}
          <p className="text-zinc-300">Contenido del panel</p>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
