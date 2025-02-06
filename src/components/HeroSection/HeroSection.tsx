// HeroSection.tsx
import React from "react";

import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"], // Puedes elegir los pesos que necesites
  subsets: ["latin"],
  style: ["normal", "italic"], // Si necesitas cursiva
  display: "swap",
});

type HeroSectionProps = {
  user: boolean;
  handleDashboardRedirect: () => void;
  handleScrollToForm: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  user,
  handleDashboardRedirect,
  handleScrollToForm,
}) => {
  return (
    <section className="max-w-7xl mx-auto text-white mt-16 lg:py-0 sm:mt-5 flex flex-col md:flex-row items-center justify-between px-4 lg:px-0">
      {/* Contenido del lado izquierdo */}
      <div className="absolute flex flex-col justify-center text-center z-10 w-full md:w-1/2 md:text-left md:mb-0">
        <p className="text-xl sm:text-2xl">
          <small
            className={`${merriweather.className} mt-4 text-2xl text-center text-gray-400`}
          >
            Gestión escolar
          </small>
        </p>
        <h2
          className={`${merriweather.className} my-10 text-7xl text-left text-zinc-200 `}
        >
          Organizate en minutos{" "}
          <span className="bg-clip-text bg-gradient-to-r text-orange-400">
            Crecé sin límites
          </span>
        </h2>
        <p
          className={`${merriweather.className} mt-4 text-sm max-w-80 mb-10 text-left text-gray-400 italic`}
        >
          Optimiza las operaciones y mejora la experiencia educativa con nuestra
          solución completa.
        </p>
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          {user ? (
            <button
              onClick={handleDashboardRedirect}
              className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-full transition-colors"
            >
              Administrar instituciones
            </button>
          ) : (
            <button
              onClick={handleScrollToForm}
              className="px-6 py-3 border border-white/20 hover:bg-zinc-600/20 text-white rounded-full transition-colors"
            >
              Contáctanos
            </button>
          )}
          <button className="px-6 py-3 bg-white/5 backdrop-blur-md hover:bg-zinc-400/20 text-white rounded-full transition-colors">
            Más información
          </button>
        </div>
      </div>

      {/* Video de fondo para móviles */}
      <div className="inset-0 -z-10 w-full h-full md:hidden">
        <video
          className="w-full h-full object-cover brightness-75 contrast-100 saturate-125"
          src="/video-hero/video-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="inset-0 bg-gradient-to-t from-[#303344aa] to-transparent"></div>
      </div>

      {/* Luz y video en pantallas más grandes */}
      <div className="hidden md:flex relative w-full md:w-full justify-center items-center">
        {/* Luz de fondo */}
        <div className="absolute right-4 bottom-4 lg:right-10 lg:bottom-8 blur-[300px] w-[150px] h-[200px] sm:w-[200px] sm:h-[300px] lg:w-[300px] lg:h-[300px] bg-orange-400 rounded-3xl"></div>

        {/* Card del lado derecho */}
        <div className="relative translate-x-44 w-full md:w-[600px] lg:w-[930px] h-auto sm:h-[400px] md:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden ">
          <video
            className="relative inset-0 w-full h-full object-cover brightness-80 rounded-3xl max-w-none"
            src="/video-hero/video-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/90 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
