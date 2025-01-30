"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/supabase/supabaseClient";

import Management from "@/components/Management/Management";
import HeroSection from "@/components/HeroSection/HeroSection";
import { LuMessageSquareQuote } from "react-icons/lu";
import { BiSend } from "react-icons/bi";
import { FaHands, FaUsers } from "react-icons/fa";
import FeaturesGrid from "@/components/Features/FeaturesGrid";
import Header from "@/components/Header/Header";

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
    <div className="min-h-screen bg-[#292a2d] relative overflow-hidden px-4 sm:px-6 md:px-10 lg:px-20">
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
        <div className="bg-[#212327] rounded-lg border border-zinc-800 p-8">
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-400 mb-6 text-center">
            ¿Quiénes Somos?
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
            <FaUsers className="w-16 h-16 text-zinc-400" />
            <p className="text-lg text-zinc-400 max-w-2xl text-center md:text-left">
              Somos un equipo diverso de profesionales con pasión por la
              educación y la tecnología. Nuestro propósito es ofrecer soluciones
              innovadoras para optimizar la gestión escolar y mejorar la
              experiencia tanto para educadores como para estudiantes.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-[#212327] rounded-lg border border-zinc-800 p-8">
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-400 mb-6 text-center">
            Nuestra Misión
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
            <FaHands className="w-16 h-16 text-zinc-400" />
            <p className="text-lg text-zinc-400 max-w-2xl text-center md:text-left">
              Nos dedicamos a crear plataformas digitales que ayuden a las
              instituciones educativas a organizar y gestionar sus actividades
              de manera más efectiva. Buscamos mejorar la comunicación, el
              seguimiento académico y la administración dentro de las escuelas.
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-[#212327] rounded-lg border border-zinc-800 p-8">
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-400 mb-6 text-center">
            ¿Quién Nos Recomienda?
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
            <LuMessageSquareQuote className="w-16 h-16 text-zinc-400" />
            <blockquote className="text-lg text-zinc-400 max-w-2xl text-center md:text-left italic">
              Gestioné mi institución de manera más eficiente desde que
              utilizamos la plataforma GE. El equipo de soporte es increíble y
              siempre está disponible.
            </blockquote>
          </div>
        </div>

        {/* Contact Section */}
        <section className="max-w-7xl mx-auto mb-4" id="contact-form">
          <div className="bg-[#212327] rounded-lg border border-zinc-800 p-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-400 text-center mb-8">
              ¿Listo para transformar tu institución?
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tu Nombre"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <input
                type="email"
                placeholder="Tu Email"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <textarea
                placeholder="Tu Mensaje"
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-zinc-500 text-white rounded-md hover:bg-zinc-600 transition-colors flex items-center justify-center gap-2"
              >
                <BiSend className="w-4 h-4" />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
