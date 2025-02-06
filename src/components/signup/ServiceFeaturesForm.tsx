// src/components/ServiceFeatures.tsx

import React from "react";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"], // Puedes elegir los pesos que necesites
  subsets: ["latin"],
  style: ["normal", "italic"], // Si necesitas cursiva
  display: "swap",
});

const ServiceFeaturesForm: React.FC = () => {
  return (
    <section className="flex flex-col justify-center items-center text-zinc-300 mx-auto">
      <h1 className={`${merriweather.className} text-4xl font-thin text-white`}>
        Bienvenido a{" "}
        <span className="text-4xl font-bold text-center text-orange-400">
          Gestión Escolar
        </span>
      </h1>
      <p className={`${merriweather.className} text-md font-thin text-white italic`}>
        La plataforma para organizar tus instituciónes con eficiencia.
      </p>
    </section>
  );
};

export default ServiceFeaturesForm;
