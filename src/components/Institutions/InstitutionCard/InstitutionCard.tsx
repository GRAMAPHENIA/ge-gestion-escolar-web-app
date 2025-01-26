import { Institution } from "@/types/institutions/types";
import Image from "next/image";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import clsx from "clsx"; // Importar clsx

import "react-tooltip/dist/react-tooltip.css"; // Asegúrate de importar el CSS
import { GoGear } from "react-icons/go";

interface InstitutionCardProps {
  institution: Institution;
  imageUrl: string | React.ReactNode;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({
  institution,
  imageUrl,
}) => {
  // Estado para manejar el color del círculo
  const [color, setColor] = useState("orange-400");

  // Función para cambiar el color al hacer clic
  const handleColorChange = () => {
    // Lógica para cambiar el color
    setColor(color === "orange-400" ? "blue-400" : "orange-400"); // Cambia entre naranja y azul
  };

  // Definir filtro para la imagen dependiendo del color
  const imageFilter = color === "blue-400" ? "saturate(0.1)" : "saturate(1)";

  return (
    <div className="border border-zinc-700/50 rounded-lg bg-zinc-800 overflow-hidden">
      <header className="flex justify-between items-center px-2 py-2 bg-zinc-900/50 text-sm text-white">
        {/* Tooltip para el círculo de color */}
        <span
          className="cursor-pointer text-amber-100"
          data-tooltip-id="color-tooltip" // Asocia el tooltip al id
          data-tooltip-content={color === "blue-400" ? "Activar institución" : "Desactivar institución"} // Contenido dinámico
        >
          {/* Círculo con color predeterminado y posibilidad de cambiarlo */}
          <div
            onClick={handleColorChange}
            className={clsx("w-4 h-4 rounded-full cursor-pointer", {
              "bg-orange-400/100 hover:bg-orange-400/70": color === "orange-400",
              "bg-blue-400/100 hover:bg-blue-400/70": color === "blue-400",
            })}
          ></div>
        </span>
        {/* Define el tooltip con el id correspondiente */}
        <Tooltip
          id="color-tooltip"
          place="top"
          className="custom-tooltip" // Usar una clase CSS personalizada
        />
        
        <h2 className="flex justify-between-2">{institution.name}</h2>

        {/* Tooltip para el ícono de configuración */}
        <span
          className="cursor-pointer text-zinc-500"
          data-tooltip-id="config-tooltip" // Asocia el tooltip al id
          data-tooltip-content="Configuración" // Define el contenido del tooltip
        >
          {/* Icono de configuración */}
          <GoGear className="text-xl" />
        </span>
        {/* Define el tooltip con el id correspondiente */}
        <Tooltip
          id="config-tooltip"
          place="top"
          className="custom-tooltip" // Usar una clase CSS personalizada
        />
      </header>
      <div className="border-b border-zinc-700/50 " />
      <div className="w-full h-48">
        {typeof imageUrl === "string" ? (
          <Image
            height={300}
            width={300}
            src={imageUrl}
            alt={institution.image_url}
            className="w-full h-full object-cover border-b border-zinc-700/50"
            style={{ filter: imageFilter }} // Aplicar el filtro de saturación
          />
        ) : (
          imageUrl
        )}
      </div>
      <div className="mt-4 px-4">
        <h3 className="text-xl font-semibold">{institution.name}</h3>
        <p className="text-sm text-gray-400">
          {institution.city} {institution.province}
        </p>
        <p className="text-sm text-gray-400">{institution.phone_number}</p>
        <p className="text-sm text-gray-400">{institution.email}</p>
        <p className="mt-2 text-gray-300 text-sm">{institution.description}</p>
      </div>
    </div>
  );
};

export default InstitutionCard;
