// src/components/Dashboard/PanelContent.tsx

import React from "react";
import InstitutionPanel from "../Institutions/InstitutionPanel";

interface PanelContentProps {
  selectedSection: string;
}

const PanelContent: React.FC<PanelContentProps> = ({ selectedSection }) => {
  const renderContent = () => {
    switch (selectedSection) {
      case "institucion":
        return <InstitutionPanel />;
      case "calendario":
        return <p>Detalles del calendario y las tareas.</p>;
      case "cursos":
        return <p>Lista de cursos disponibles.</p>;
      case "estudiantes":
        return <p>Datos y gestión de estudiantes.</p>;
      case "clases":
        return <p>Información sobre clases y horarios.</p>;
      case "evaluaciones":
        return <p>Gestión de evaluaciones y resultados.</p>;
      case "notas":
        return <p>Notas y promedios de los estudiantes.</p>;
      default:
        return <p>Selecciona una sección para ver más información.</p>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default PanelContent;
