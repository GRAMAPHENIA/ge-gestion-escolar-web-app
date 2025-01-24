// components/FeaturesGrid.tsx
import React from "react";
import FeatureCard from "./FeatureCard";
import { BsDatabase } from "react-icons/bs";
import { BiShield } from "react-icons/bi";
import { FiZap } from "react-icons/fi";

const FeaturesGrid: React.FC = () => {
  const features = [
    {
      Icon: BsDatabase,
      title: "Admisnistra con herramientas simples e integrales.",
      description:
        "Todos los aspectos de tu institución desde una única plataforma intuitiva.",
      image: "/volumen-de-datos.jpg",
      reference: "Gestión Integral",
    },
    {
      Icon: BiShield,
      title: "Seguridad Avanzada",
      description:
        "Protección de datos de última generación y cumplimiento con normativas educativas.",
      image: "/seguridad.jpg",
      reference: "Gestión Integral",
    },
    {
      Icon: FiZap,
      title: "Alto Rendimiento",
      description:
        "Optimizado para manejar grandes volúmenes de datos sin sacrificar velocidad.",
      image: "/rendimiento.jpg",
      reference: "Gestión Integral",
    },
  ];

  return (
    <div>
      {/* Cards de características */}
      <div className="space-y-6 mt-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            Icon={feature.Icon}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            reference={feature.reference}
          />
        ))}
      </div>

      {/* Botón para más contenido */}
      <div className="my-40 text-center">
        <button className="px-6 py-3 text-white bg-zinc-600 rounded-md hover:bg-zinc-500 transition duration-200">
          Ver más características
        </button>
      </div>
    </div>
  );
};

export default FeaturesGrid;
