// HeroSection.tsx
import React from "react";

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
    <section className="relative max-w-7xl mx-auto text-white mt-16 lg:py-0 sm:mt-10 flex flex-col md:flex-row items-center justify-between px-4 lg:px-0">
      {/* Contenido del lado izquierdo */}
      <div className="relative flex flex-col justify-center text-center z-10 w-full md:w-1/2 md:text-left md:mb-0">
        <p className="text-xl sm:text-2xl mb-6">
          GE <small className="text-lg">Gestión escolar</small>
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Organizate en minutos{" "}
          <span className="bg-clip-text bg-gradient-to-r text-orange-400">
            Crecé sin límites
          </span>
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mb-6 max-w-96 mx-auto md:mx-0">
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
      <div className="absolute inset-0 -z-10 w-full h-full md:hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#303344aa] to-transparent"></div>
      </div>

      {/* Luz y video en pantallas más grandes */}
      <div className="hidden md:flex relative w-full md:w-1/2 justify-center items-center">
        {/* Luz de fondo */}
        <div className="absolute right-4 bottom-4 lg:right-10 lg:bottom-8 blur-[300px] w-[150px] h-[200px] sm:w-[200px] sm:h-[300px] lg:w-[300px] lg:h-[300px] bg-orange-400 rounded-3xl"></div>

        {/* Card del lado derecho */}
        <div className="relative w-full md:w-[600px] lg:w-[930px] h-auto sm:h-[400px] md:h-[450px] lg:h-[550px] bg-[#303344aa] rounded-3xl overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-100 saturate-125 rounded-3xl"
            src="/video-hero/video-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
