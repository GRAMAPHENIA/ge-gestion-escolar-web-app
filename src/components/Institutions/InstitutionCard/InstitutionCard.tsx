"use client";

import React from "react";
import { Institution } from "@/types/institutions/types";
import Image from "next/image";
import { FiEdit, FiTrash } from "react-icons/fi";

type InstitutionCardProps = {
  institution: Institution;
  imageUrl: string | React.ReactNode;
  onEdit?: (institution: Institution) => void;
  onDelete?: (institutionId: string) => void;
};

const InstitutionCard = ({
  institution,
  imageUrl,
  onEdit,
  onDelete,
}: InstitutionCardProps) => {
  const imagenValida =
    typeof imageUrl === "string" &&
    (imageUrl.startsWith("http") || imageUrl.startsWith("/"))
      ? imageUrl
      : "/file.svg";

  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{institution.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit?.(institution)}
            className="text-blue-500 hover:text-blue-400"
          >
            <FiEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete?.(institution.id.toString())}
            className="text-red-500 hover:text-red-400"
          >
            <FiTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
      {typeof imageUrl === "string" ? (
        <Image
          src={imagenValida}
          alt={institution.name}
          width={200}
          height={200}
          className="w-full h-32 object-cover rounded-md"
        />
      ) : imageUrl instanceof File ? (
        <p>Archivo de imagen cargado, pero no procesado.</p>
      ) : (
        imageUrl
      )}
      <p className="text-sm text-neutral-400 mt-2">{institution.email}</p>
      <p className="text-sm text-neutral-400">{institution.phone_number}</p>
    </div>
  );
};

export default InstitutionCard;
