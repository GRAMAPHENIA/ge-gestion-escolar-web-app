// src/components/Dashboard/MainContent.tsx

import React from "react";
import InstitutionMain from "../Institutions/InstitutionMain";

interface MainContentProps {
  selectedSection: string;
}

const MainContent: React.FC<MainContentProps> = ({ selectedSection }) => {
  const renderMainContent = () => {
    switch (selectedSection) {
      case "institucion":
        return <InstitutionMain />;
      case "calendario":
        return <p>Calendario interactivo y tareas.</p>;
      case "cursos":
        return <p>Gestión completa de cursos.</p>;
      case "estudiantes":
        return <p>Sección para administrar estudiantes.</p>;
      case "clases":
        return <p>Vista principal de clases.</p>;
      case "evaluaciones":
        return <p>Resultados y gestión de evaluaciones.</p>;
      case "notas":
        return <p>Gestión de calificaciones y reportes.</p>;
      default:
        return <p>Selecciona una sección desde el menú.</p>;
    }
  };

  return <div>{renderMainContent()}</div>;
};

export default MainContent;
