// HeroSection
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
    <section className="max-w-7xl mx-auto relative flex items-center justify-center bg-[#212327] rounded-3xl text-center p-16">
      <div>
        <h2 className="flex flex-col text-4xl md:text-5xl font-bold mb-6">
          Organizate en minutos <span className="bg-clip-text bg-gradient-to-r text-orange-400 ">Crecé sin límites</span>
        </h2>
        <p className="text-zinc-400 text-lg mb-8">
          Optimiza las operaciones y mejora la experiencia educativa con nuestra
          solución completa.
        </p>
        <div className="flex justify-center gap-4">
          {user ? (
            <button
              onClick={handleDashboardRedirect}
              className="px-4 py-2 bg-zinc-500/10 text-white rounded-full hover:bg-zinc-400/10 transition-colors border border-zinc-700/50"
            >
              Administrar instituciones
            </button>
          ) : (
            <button
              onClick={handleScrollToForm}
              className="px-4 py-2 bg-zinc-500/10 text-white rounded-full hover:bg-zinc-400/10 transition-colors border border-zinc-700/50"
            >
              Contáctanos
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
