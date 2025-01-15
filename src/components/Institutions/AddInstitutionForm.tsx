// src/components/AddInstitutionForm.tsx
import React, { useState } from "react";
import { PiPlus } from "react-icons/pi";

const AddInstitutionForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="flex items-center space-x-4 px-2 py-2 mx-2 my-2 cursor-pointer rounded-md text-gray-400/75 hover:text-cyan-400 hover:bg-cyan-300/5"
      >
        <PiPlus
          className="text-green-400 p-[4px] rounded-[4px] h-[25px] w-auto bg-cyan-300/5"
          size={20}
        />
        <span className="ml-2">Agregar institución</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-neutral-950/50 backdrop-blur-sm z-[1000]" // Z-index alto
          style={{ zIndex: 1000 }} // Estilo inline para evitar conflictos
        >
          <div className="bg-gray-800 text-white p-6 rounded-md shadow-lg max-w-sm w-full z-[1100]">
            <h2 className="text-xl font-semibold mb-4">Agregar institución</h2>
            <button
              onClick={toggleModal}
              className="flex items-center px-4 py-2 text-left bg-cyan-600/20 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition duration-100 rounded-md
"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInstitutionForm;
