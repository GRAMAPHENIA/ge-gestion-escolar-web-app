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
    <section className="relative max-w-7xl rounded-3xl text-white py-16 mt-20 flex items-center mx-auto">
      {/* Contenido del lado izquierdo */}
      <div className="z-10 w-1/2 flex flex-col justify-center">
        <p className="text-2xl mb-10">
          GE <small className="text-lg ">Gestion escolar</small>
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Organizate en minutos{" "}
          <span className="bg-clip-text bg-gradient-to-r text-orange-400">
            Crecé sin límites
          </span>
        </h2>
        <p className="text-zinc-400 text-lg mb-6 max-w-96 text-pretty">
          Optimiza las operaciones y mejora la experiencia educativa con nuestra
          solución completa.
        </p>
        <div className="flex gap-4">
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

      {/* Luz */}
      <div className="absolute right-10 bottom-8 blur-3xl w-[500px] h-[400px] bg-orange-300 rounded-3xl"></div>

      {/* Card del lado derecho */}
      <div className="absolute right-0 w-[930px] h-[550px] bg-[#212327] rounded-3xl">
        {/* Aquí puedes colocar una imagen o contenido adicional si lo necesitas */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-70 brightness-75 contrast-100 saturate-125 rounded-3xl "
          src="/video-hero/video-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1} // Para evitar que el video sea accesible
        />
      </div>
    </section>
  );
};

export default HeroSection;
