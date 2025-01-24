import Image from "next/image";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface NewsCardProps {
  image: string;
  title: string;
  description: string;
  category: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, title, description, category }) => (
  <div className="flex bg-[#212327] rounded-lg overflow-hidden hover:bg-[#25282c] transition-colors duration-200 ease-in-out group border border-zinc-700/50">
    <div className="relative w-48 h-44 overflow-hidden">
      {/* Solo la imagen tendrá el efecto de escala */}
      <Image
        width={600}
        height={600}
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col justify-between p-4">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-zinc-400 mt-2">{description}</p>
      <span className="mt-4 w-fit text-xs bg-zinc-700/50 text-zinc-300 py-1 px-3 rounded-md">
        {category}
      </span>
    </div>
  </div>
);

const Management: React.FC = () => {
  const news = [
    {
      image: "/lanzamiento.jpg",
      title: "Lanzamiento de la versión 1.0",
      description: "Hoy, Hexágono lanza Gestion escolar, un destino único donde puedes...",
      category: "Noticia",
    },
    {
      image: "/seguridad.jpg",
      title: "Ejemplo Dos",
      description: "Today, Epic launches Fab, a one-stop destination where you can...",
      category: "Noticia",
    },
    {
      image: "/seguridad.jpg",
      title: "Ejemplo Tres",
      description: "Dive into Epic Games' announcements from Unreal Fest...",
      category: "Noticia",
    },
  ];

  return (
    <section className="my-20 pt-40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Noticias</h2>
        <button className="text-sm text-white bg-none hover:bg-zinc-700 py-2 px-8 border border-neutral-700 rounded-full transition duration-200">
          Ver todas las noticias <FaArrowRightLong className="inline h-3 w-3 ml-2" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-left gap-8">
        {news.map((item, index) => (
          <NewsCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </section>
  );
};

export default Management;
