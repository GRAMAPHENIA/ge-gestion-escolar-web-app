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
      title: "Herramientas simples",
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
      title: "Buen Rendimiento",
      description:
        "Optimizado para manejar grandes volúmenes de datos sin sacrificar velocidad.",
      image: "/rendimiento.jpg",
      reference: "Gestión Integral",
    },
  ];

  return (
    <div>
      {/* Cards de características */}
      <div className="mt-6">
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
      <div className="my-20 text-center">
        <button className="px-6 py-3 bg-white/5 backdrop-blur-md hover:bg-orange-400/70 text-white rounded-full transition-colors ease-in-out ">
          Ver más características
        </button>
      </div>
    </div>
  );
};

export default FeaturesGrid;
