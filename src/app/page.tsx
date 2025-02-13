"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/supabase/supabaseClient";

import Management from "@/components/Management/Management";
import HeroSection from "@/components/HeroSection/HeroSection";
// import { LuMessageSquareQuote } from "react-icons/lu";
// import { BiSend } from "react-icons/bi";
// import { FaHands, FaUsers } from "react-icons/fa";
import FeaturesGrid from "@/components/Features/FeaturesGrid";
import Header from "@/components/Header/Header";

import { BiSend } from "react-icons/bi";
import { Merriweather, Fira_Code } from "next/font/google";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const firacode = Fira_Code({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});


const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleDashboardRedirect = () => router.push("/tablero");

  const handleScrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el formulario
  };

  return (
    <div className="relative">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection
        user={!!user}
        handleDashboardRedirect={handleDashboardRedirect}
        handleScrollToForm={handleScrollToForm}
      />

      {/* Features Section */}
      <section className="max-w-7xl mx-auto space-y-4">
        <Management />

        {/* Features Grid */}
        <FeaturesGrid />
      </section>

      {/* About Us Section */}
      {/* <div className="bg-[#212327] rounded-lg border border-zinc-800 p-8">
        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-400 mb-6 text-center">
          ¿Quiénes Somos?
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
          <FaUsers className="w-16 h-16 text-zinc-400" />
          <p className="text-lg text-zinc-400 max-w-2xl text-center md:text-left">
            Somos un equipo diverso de profesionales con pasión por la educación
            y la tecnología. Nuestro propósito es ofrecer soluciones innovadoras
            para optimizar la gestión escolar y mejorar la experiencia tanto
            para educadores como para estudiantes.
          </p>
        </div>
      </div> */}

      {/* Mission Section */}
      {/* <div className="bg-[#212327] rounded-lg border border-zinc-800 p-8">
        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-400 mb-6 text-center">
          Nuestra Misión
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
          <FaHands className="w-16 h-16 text-zinc-400" />
          <p className="text-lg text-zinc-400 max-w-2xl text-center md:text-left">
            Nos dedicamos a crear plataformas digitales que ayuden a las
            instituciones educativas a organizar y gestionar sus actividades de
            manera más efectiva. Buscamos mejorar la comunicación, el
            seguimiento académico y la administración dentro de las escuelas.
          </p>
        </div>
      </div> */}

      {/* Testimonials Section */}
      {/* <div className="bg-[#212327] rounded-lg border border-zinc-800 p-8">
        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-400 mb-6 text-center">
          ¿Quién Nos Recomienda?
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
          <LuMessageSquareQuote className="w-16 h-16 text-zinc-400" />
          <blockquote className="text-lg text-zinc-400 max-w-2xl text-center md:text-left italic">
            Gestioné mi institución de manera más eficiente desde que utilizamos
            la plataforma GE. El equipo de soporte es increíble y siempre está
            disponible.
          </blockquote>
        </div>
      </div> */}

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto mb-20 lg:px-20" id="contact-form">
      <div className="bg-[#292a2d] rounded-lg border border-zinc-700 p-8">
        <h2
          className={`${merriweather.className} text-3xl font-bold text-orange-400 text-center mb-8`}
        >
          ¿Listo para transformar tu organización?
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tu Nombre"
            className={`${firacode.className} w-full px-4 py-3 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0`}
          />
          <input
            type="email"
            placeholder="Tu Email"
            className={`${firacode.className} w-full px-4 py-3 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0`}
          />
          <textarea
            placeholder="Tu Mensaje"
            rows={4}
            className={`${firacode.className} w-full px-4 py-3 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0`}
          />
          <button
            type="submit"
            className={`${merriweather.className} w-full px-6 py-3 bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-md flex items-center justify-center gap-2`}
          >
            <BiSend className="w-4 h-4" />
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
    </div>
  );
};

export default Home;
