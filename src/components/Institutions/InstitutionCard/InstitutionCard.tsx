import { Institution } from "@/types/institutions/types";
import Image from "next/image";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import clsx from "clsx"; // Importar clsx

import "react-tooltip/dist/react-tooltip.css"; // Asegúrate de importar el CSS
import { GoGear } from "react-icons/go";
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";

interface InstitutionCardProps {
  institution: Institution;
  imageUrl: string | React.ReactNode;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({
  institution,
  imageUrl,
}) => {
  // Estado para manejar el color del círculo
  const [color, setColor] = useState("teal-400");

  // Función para cambiar el color al hacer clic
  const handleColorChange = () => {
    setColor(color === "teal-400" ? "cyan-400" : "teal-400"); // Cambia entre naranja y azul
  };

  // Definir filtro para la imagen dependiendo del color
  const imageFilter = color === "cyan-400" ? "saturate(0.1)" : "saturate(1)";

  return (
    <div className="border border-zinc-700/50 rounded-lg bg-zinc-800 overflow-hidden">
      <header className="flex justify-between items-center px-2 py-2 bg-zinc-900/50 text-sm text-white">
        {/* Círculo con efecto de glasmorfismo y un ícono dinámico */}
        <div
          onClick={handleColorChange}
          className={clsx(
            "relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer p-1 ",
            "bg-zinc-500/5 border border-zinc-700/50",
            {
              "bg-emerald-400/10 border border-emerald-400/10": color === "teal-400",
              "bg-zinc-400": color === "zinc-400",
            }
          )}
          data-tooltip-id="color-tooltip"
          data-tooltip-content={
            color === "cyan-400"
              ? "Activar institución"
              : "Desactivar institución"
          }
        >
          {/* Icono dinámico según el estado */}
          {color === "cyan-400" ? (
            <LuLightbulbOff className="text-neutral-500 text-xl" /> // Ícono cuando está activado
          ) : (
            <LuLightbulb className="text-emerald-400 text-xl" /> // Ícono cuando está desactivado
          )}

          {/* Círculo desenfocado detrás del botón */}
          <div
            className={clsx(
              "absolute w-4 h-4 bg-zinc-400 blur-[4px] rounded-full -z-10", // Cambiado a verde
              { "bg-zinc-400": color === "zinc-400" }
            )}
          />
        </div>

        <Tooltip id="color-tooltip" place="top" className="custom-tooltip" />

        <h2 className="flex justify-between-2">{institution.name}</h2>

        {/* Tooltip para el ícono de configuración */}
        <span
          className="cursor-pointer text-zinc-500"
          data-tooltip-id="config-tooltip"
          data-tooltip-content="Configuración"
        >
          <GoGear className="text-xl" />
        </span>
        <Tooltip id="config-tooltip" place="top" className="custom-tooltip" />
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
