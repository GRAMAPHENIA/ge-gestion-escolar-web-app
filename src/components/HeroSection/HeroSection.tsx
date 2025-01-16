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
    <section className="relative flex items-center justify-center bg-zinc-900/50 rounded-lg border border-zinc-800 text-center p-16">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
          Simplifica la Gestión Escolar
        </h2>
        <p className="text-zinc-400 text-lg mb-8">
          Optimiza las operaciones y mejora la experiencia educativa con nuestra solución completa.
        </p>
        <div className="flex justify-center gap-4">
          {user ? (
            <button
              onClick={handleDashboardRedirect}
              className="px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
            >
              Ir al Dashboard
            </button>
          ) : (
            <button
              onClick={handleScrollToForm}
              className="px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
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
