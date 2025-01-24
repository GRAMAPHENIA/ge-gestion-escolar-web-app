// src/components/ServiceFeatures.tsx

import React from "react";

const ServiceFeaturesForm: React.FC = () => {
  return (
    <section className="flex flex-col justify-center items-center text-zinc-300 mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Bienvenido a{" "}
        <span className="text-4xl font-bold text-center text-orange-400">
          Gestión Escolar
        </span>
      </h1>
      <p className="text-center text-lg mb-4 w-[300px]">
        La plataforma para gestionar tu institución educativa con eficiencia.
      </p>
    </section>
  );
};

export default ServiceFeaturesForm;
