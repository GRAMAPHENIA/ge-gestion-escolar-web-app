const GlasmorphismCard = () => {
  return (
    <section className="flex flex-col items-center justify-center p-4 relative z-20 w-full sm:w-auto bg-slate-400/5 backdrop-blur-3xl rounded-lg">
      {/* Fondo naranja detrás del ícono */}
      <div className="absolute w-2 h-2 bg-orange-400 blur-[7px] rounded-full -z-10"></div>
    </section>
  );
};

export default GlasmorphismCard;
