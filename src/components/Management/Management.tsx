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
  <div className="flex bg-[#212327] rounded-lg shadow-md overflow-hidden p-4">
    <Image width={100} height={100} src={image} alt={title} className="w-auto h-40 object-cover hover:scale-110 transition-all ease-in-out " />
    <div className="p-4 flex flex-col justify-between h-full">
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
      image: "/file.svg", // Imagen de ejemplo
      title: "ejemplo uno",
      description: "Find out what's new and download the update today.",
      category: "noticia",
    },
    {
      image: "/file.svg", // Imagen de ejemplo
      title: "ejemplo dos",
      description: "Today, Epic launches Fab, a one-stop destination where you can...",
      category: "noticia",
    },
    {
      image: "/file.svg", // Imagen de ejemplo
      title: "ejemplo tres",
      description: "Dive into Epic Games' announcements from Unreal Fest...",
      category: "noticia",
    },
  ];

  return (
    <section className="my-40 pt-40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Ultimas Noticias</h2>
        <button className="text-sm text-white bg-none hover:bg-zinc-700 py-2 px-8 border border-neutral-700 rounded-full transition">
          Ver todas las noticias <FaArrowRightLong className="inline h-3 w-3 ml-2" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-left gap-12">
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
