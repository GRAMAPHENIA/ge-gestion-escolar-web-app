// src/components/Dashboard/PanelContent.tsx

import React from "react";

interface PanelContentProps {
  selectedSection: string;
}

const PanelContent: React.FC<PanelContentProps> = ({ selectedSection }) => {
  const renderContent = () => {
    switch (selectedSection) {
      case "institucion":
        return "Contenido de Instituciones";
      case "estudiantes":
        return "Contenido de Estudiantes";
      case "clases":
        return "Contenido de Clases";
      case "evaluaciones":
        return "Contenido de Evaluaciones";
      default:
        return "Selecciona una sección.";
    }
  };

  return <div>{renderContent()}</div>;
};

export default PanelContent;
