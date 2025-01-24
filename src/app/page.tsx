"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/supabase/supabaseClient";

import Management from "@/components/Management/Management";
import HeroSection from "@/components/HeroSection/HeroSection";
import { LuCircleUserRound, LuMessageSquareQuote } from "react-icons/lu";
import { BiChevronDown, BiSend } from "react-icons/bi";
import { FaHands, FaUsers } from "react-icons/fa";
import FeaturesGrid from "@/components/Features/FeaturesGrid";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleLoginRedirect = () => router.push("/inicio-de-sesion");
  const handleRegisterRedirect = () => router.push("/registro");
  const handleDashboardRedirect = () => router.push("/tablero");

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert("Error al cerrar sesión");
    setUser(null);
  };

  const handleScrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#292a2d] relative overflow-hidden px-4 md:px-10 lg:px-40">
      <div className="relative">
        {/* Header */}
        <header className="max-w-7xl mx-auto py-6 ">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-zinc-400">GE</h1>

            {/* NavBar */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  {/* <span className="text-sm text-zinc-50">
                    Bienvenido, {user.email}
                  </span> */}
                  <div className="relative z-50">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex px-4 py-2 bg-zinc-500/10 text-white rounded-lg hover:bg-zinc-400/10 transition-colors border border-zinc-700/50"
                    >
                      <LuCircleUserRound className="w-5 h-5 text-zinc-400" />
                      <BiChevronDown
                        className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ml-2 ${
                          isMenuOpen ? "-rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-xl border border-zinc-700 overflow-hidden">
                        <button
                          onClick={handleDashboardRedirect}
                          className="w-full px-4 py-2 text-left text-zinc-200 hover:bg-zinc-700 transition-colors"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-red-400 hover:bg-zinc-700 transition-colors"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLoginRedirect}
                    className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    Ingresar
                  </button>
                  <button
                    onClick={handleRegisterRedirect}
                    className="px-4 py-2 bg-zinc-500/10 text-white rounded-full hover:bg-zinc-400/10 transition-colors border border-zinc-700/50"
                  >
                    Registrarse
                  </button>
                </div>
              )}
            </div>
          </nav>
        </header>

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
        <section className="max-w-7xl mx-auto  mb-4" id="contact-form">
          <div className="bg-[#212327] rounded-lg border border-zinc-800 p-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-400 text-center mb-8">
              ¿Listo para transformar tu institución?
            </h2>
            <form className="space-y-4">
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
