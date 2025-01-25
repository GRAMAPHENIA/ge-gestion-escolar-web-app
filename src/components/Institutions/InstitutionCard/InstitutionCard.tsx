// InstitutionCard.tsx

import { Institution } from "@/types/institutions/types";
import Image from "next/image";
import { BiEdit, BiTrash } from "react-icons/bi";

interface InstitutionCardProps {
  institution: Institution;
  imageUrl: string | React.ReactNode;
  onEdit: () => void; // Función para manejar la edición
  onDelete: () => void; // Función para manejar la eliminación
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({
  institution,
  imageUrl,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border border-zinc-700/50 rounded-lg bg-zinc-800 overflow-hidden">
      <div className="w-full h-48">
        {typeof imageUrl === "string" ? (
          <Image
            height={300}
            width={300}
            src={imageUrl}
            alt={institution.image_url}
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all duration-100"
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
      <div className="border-b border-zinc-700/50  mb-10"/>
      <div className="flex justify-end space-x-2 p-4">
        <button
          onClick={onEdit}
          className="p-2 text-zinc-400 hover:text-zinc-300 rounded-lg bg-zinc-400/5 hover:bg-zinc-400/10 transition-all duration-100"
        >
          <BiEdit className="h-5 w-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-zinc-400 hover:text-zinc-300 rounded-lg bg-zinc-400/5 hover:bg-zinc-400/10 transition-all duration-100"
        >
          <BiTrash className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default InstitutionCard;
