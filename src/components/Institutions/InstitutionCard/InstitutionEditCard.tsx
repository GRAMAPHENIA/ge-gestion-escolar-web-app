import React, { useState } from "react";
import { Institution } from "@/types/institutions/types";

interface InstitutionEditCardProps {
  institution: Institution;
  onClose: () => void;
  onSave: (updatedInstitution: Institution) => void;
}

const InstitutionEditCard: React.FC<InstitutionEditCardProps> = ({
  institution,
  onClose,
  onSave,
}) => {
  // Estados para manejar los campos editables
  const [name, setName] = useState(institution.name || "");
  const [city, setCity] = useState(institution.city || "");
  const [province, setProvince] = useState(institution.province || "");
  const [phoneNumber, setPhoneNumber] = useState(
    institution.phone_number || ""
  );
  const [email, setEmail] = useState(institution.email || "");
  const [description, setDescription] = useState(institution.description || ""); // Asegúrate de que sea una cadena vacía

  // Función para guardar los cambios
  const handleSave = () => {
    const updatedInstitution = {
      ...institution,
      name,
      city,
      province,
      phone_number: phoneNumber,
      email,
      description,
    };
    onSave(updatedInstitution);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-30">
      <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Editar Institución</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-zinc-700 rounded-lg"
            placeholder="Nombre"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 bg-zinc-700 rounded-lg"
            placeholder="Ciudad"
          />
          <input
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full p-2 bg-zinc-700 rounded-lg"
            placeholder="Provincia"
          />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 bg-zinc-700 rounded-lg"
            placeholder="Teléfono"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-zinc-700 rounded-lg"
            placeholder="Email"
          />
          <textarea
            value={description} // Asegúrate de que siempre sea una cadena vacía
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-zinc-700 rounded-lg"
            placeholder="Descripción"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstitutionEditCard;
