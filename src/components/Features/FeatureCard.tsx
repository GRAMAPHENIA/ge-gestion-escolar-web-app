import Image from "next/image";
import React from "react";
import { IconType } from "react-icons";

interface FeatureCardProps {
  Icon: IconType;
  title: string;
  description: string;
  image: string;
  reference: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
  image,
  reference,
}) => {
  return (
    <section className="flex justify-between rounded-lg py-20">
      {/* Columna con el Icono, Título y Descripción */}
      <section className="flex flex-col justify-center sm:justify-start p-4 relative z-20">
        {/* Fondo naranja detrás del ícono */}
        <div className="absolute top-9 left-9 w-10 h-10 bg-orange-500 blur-md rounded-full -z-10"></div>

        {/* Ícono y texto */}
        <Icon className="w-20 h-20 p-4 rounded-xl text-orange-400 transition duration-300 transform bg-neutral-500/10 backdrop-blur-md z-10" />
        <small className="mt-2">{reference}</small>
        <h3 className="text-6xl mt-4 font-semibold text-white w-[500px]">{title}</h3>
        <article className="mt-4 sm:mt-0 flex-1">
          <p className="text-zinc-400 text-center sm:text-left w-[300px] mt-4">
            {description}
          </p>
        </article>

        {/* Botón de llamada a la acción */}
        <div className="mt-6">
          <button className="px-6 py-3 bg-white/5 backdrop-blur-md hover:bg-orange-400/70 text-white rounded-full transition-colors duration-200">
            Más detalles
          </button>
        </div>
      </section>

      {/* Columna con la Imagen */}
      <section className="relative flex justify-center items-center z-10">
        {/* Luz detrás del fondo del section */}
        <div className="absolute right-14 bottom-22 blur-3xl w-[125px] h-[250px] bg-orange-400 rounded-full -z-10"></div>

        {/* Fondo del section */}
        <div className="">
          <Image
            width={1080} // Ajusta el tamaño de la imagen según sea necesario
            height={1080}
            src={image}
            alt={title}
            className="object-cover rounded-2xl h-[350px] w-[550px]"
          />
        </div>
      </section>
    </section>
  );
};

export default FeatureCard;
