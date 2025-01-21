// src/components/Dashboard/Sidebar.tsx

import React from "react";

interface SidebarProps {
  isAsideOpen: boolean;
  setIsAsideOpen: (value: boolean) => void;
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isAsideOpen,
  setIsAsideOpen,
  selectedSection,
  setSelectedSection,
}) => {
  const sections = [
    { id: "institucion", label: "Instituciones" },
    { id: "estudiantes", label: "Estudiantes" },
    { id: "clases", label: "Clases" },
    { id: "evaluaciones", label: "Evaluaciones" },
  ];

  return (
    <nav
      className={`${
        isAsideOpen ? "w-64" : "w-20"
      } bg-zinc-800 flex flex-col h-full overflow-hidden`}
    >
      <button
        onClick={() => setIsAsideOpen(!isAsideOpen)}
        className="p-4 text-zinc-200 hover:bg-zinc-700"
      >
        {isAsideOpen ? "<" : ">"}
      </button>

      <ul className="flex-1 flex flex-col">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => setSelectedSection(section.id)}
              className={`w-full px-4 py-2 text-left ${
                selectedSection === section.id
                  ? "bg-teal-600 text-white"
                  : "text-zinc-200 hover:bg-zinc-700"
              }`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
