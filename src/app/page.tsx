"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaHandsHelping, FaComments } from "react-icons/fa";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa"; // Íconos para el dashboard
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import { MdAccountCircle } from "react-icons/md"; // Icono para el avatar

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

  const handleLoginRedirect = () => {
    router.push("/inicio-de-sesion");
  };

  const handleRegisterRedirect = () => {
    router.push("/registro");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert("Error al cerrar sesión");
    setUser(null);
  };

  const handleDashboardRedirect = () => {
    router.push("/tablero");
  };

  const handleScrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col mx-auto text-gray-200 px-8 sm:px-20 pt-8 max-w-7xl">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-4 mb-8 p-4">
        <h1 className="text-4xl font-bold text-teal-400">GE</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4 relative">
              <span className="text-sm">Hola, {user.email}</span>

              {/* Avatar with Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 hover:bg-teal-500 text-white"
                >
                  <MdAccountCircle size={24} />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700 p-4 space-y-2">
                    <button
                      onClick={handleDashboardRedirect}
                      className="w-full px-4 py-2 text-left text-gray-200 hover:bg-teal-500/50 rounded-lg border border-gray-700"
                    >
                      Ir al Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-gray-200 hover:bg-rose-500/50 rounded-lg border border-gray-700"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={handleRegisterRedirect}
                className="flex items-center px-4 py-2 bg-teal-600/20 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 transition duration-100 rounded-md"
              >
                <FaUserPlus /> <span className="ml-2">Registrarse</span>
              </button>
              <button
                onClick={handleLoginRedirect}
                className="flex items-center px-4 py-3 bg-cyan-600/20 hover:bg-cyan-500/20 text-cyan-400 hover:cyan-teal-300 transition duration-100 rounded-md"
              >
                <FaSignInAlt /><span className="ml-2">Login</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-40 flex items-center justify-center bg-gradient-to-r from-teal-600/30 via-slate-700/50 to-slate-800 rounded-lg shadow-lg text-center mb-8 p-10">
        <div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Simplifica la Gestión Escolar
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Organiza tareas, estudiantes y evaluaciones en un solo lugar con
            herramientas modernas y eficientes.
          </p>
          {user ? (
            <button
              onClick={handleDashboardRedirect}
              className="flex mx-auto items-center px-4 py-2 bg-cyan-600/20 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition duration-100 rounded-md"
            >
              Acceder al Dashboard
            </button>
          ) : (
            <button
              onClick={handleScrollToForm}
              className="flex mx-auto items-center px-4 py-2 bg-cyan-600/20 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition duration-100 rounded-md"
            >
              Contactate
            </button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col gap-8">
        {/* Gestión de Estudiantes */}
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-8">
          <div className="flex-1 flex flex-col justify-center px-8 sm:px-20 bg-teal-600/30 text-left rounded-lg">
            <h3 className="text-4xl font-bold text-teal-400 mb-4">
              Gestión de Estudiantes
            </h3>
            <p className="text-lg text-gray-400">
              Registra y organiza información de estudiantes, asistencia y
              notas.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center bg-slate-800 rounded-lg">
            <p className="text-lg text-gray-300 p-8 sm:p-16 text-right">
              Diseña, consulta y modifica la información de tus estudiantes de
              manera intuitiva, todo organizado en un solo lugar.
            </p>
          </div>
        </div>

        {/* Gestión de Clases */}
        <div className="flex flex-col sm:flex-row-reverse items-center sm:items-stretch gap-8">
          <div className="flex-1 flex flex-col justify-center px-8 sm:px-20 bg-teal-600/30 text-left rounded-lg">
            <h3 className="text-4xl font-bold text-teal-400 mb-4">
              Gestión de Clases
            </h3>
            <p className="text-lg text-gray-400">
              Planifica y organiza tus clases de manera eficiente y moderna.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center bg-slate-800 rounded-lg">
            <p className="text-lg text-gray-300 p-8 sm:p-16">
              Accede a una interfaz fácil de usar para gestionar el horario de
              clases, materias y recursos para los estudiantes.
            </p>
          </div>
        </div>

        {/* Gestión de Evaluaciones */}
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-8">
          <div className="flex-1 flex flex-col justify-center px-8 sm:px-20 bg-teal-600/30 text-left rounded-lg">
            <h3 className="text-4xl font-bold text-teal-400 mb-4">
              Gestión de Evaluaciones
            </h3>
            <p className="text-lg text-gray-400">
              Lleva un control de los resultados de los exámenes y actividades
              evaluativas.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center bg-slate-800 rounded-lg">
            <p className="text-lg text-gray-300 p-8 sm:p-16 text-right">
              Organiza y consulta los resultados de los exámenes de manera
              ordenada y accesible.
            </p>
          </div>
        </div>

        {/* Quienes Somos Section */}
        <div className="bg-gradient-to-r from-teal-600/30 via-slate-700/50 to-slate-800 rounded-lg shadow-lg p-8">
          <h3 className="text-4xl font-bold text-teal-400 mb-4 text-center">
            ¿Quiénes Somos?
          </h3>
          <div className="flex items-center gap-6 mb-6 justify-center">
            <FaUsers size={50} color="#4fd1c5" />
            <p className="text-lg text-gray-400 max-w-lg text-center">
              Somos un equipo diverso de profesionales con pasión por la
              educación y la tecnología. Nuestro propósito es ofrecer soluciones
              innovadoras para optimizar la gestión escolar y mejorar la
              experiencia tanto para educadores como para estudiantes.
            </p>
          </div>
        </div>

        {/* Nuestra Misión Section */}
        <div className="bg-gradient-to-l from-teal-600/30 via-slate-700/50 to-slate-800 rounded-lg shadow-lg p-8">
          <h3 className="text-4xl font-bold text-teal-400 mb-4 text-center">
            Nuestra Misión
          </h3>
          <div className="flex items-center gap-6 mb-6 justify-center">
            <FaHandsHelping size={50} color="#4fd1c5" />
            <p className="text-lg text-gray-400 max-w-lg text-center">
              Nos dedicamos a crear plataformas digitales que ayuden a las
              instituciones educativas a organizar y gestionar sus actividades
              de manera más efectiva. Buscamos mejorar la comunicación, el
              seguimiento académico y la administración dentro de las escuelas.
            </p>
          </div>
        </div>

        {/* Testimonios Section */}
        <div className="bg-gradient-to-r from-teal-600/30 via-slate-700/50 to-slate-800 rounded-lg shadow-lg p-8">
          <h3 className="text-4xl font-bold text-teal-400 mb-4 text-center">
            ¿Quién Nos Recomienda?
          </h3>
          <div className="flex items-center gap-6 mb-6 justify-center">
            <FaComments size={50} color="#4fd1c5" />
            <p className="text-lg text-gray-400 max-w-lg text-center">
              “Gestioné mi institución de manera más eficiente desde que
              utilizamos la plataforma GE. El equipo de soporte es increíble y
              siempre está disponible.”
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div
          id="contact-form"
          className="bg-slate-800 rounded-lg shadow-lg p-8 mb-8"
        >
          <h3 className="text-4xl font-bold text-teal-400 mb-4 text-center">
            Contacto
          </h3>
          <p className="text-lg text-gray-400 mb-6 text-center">
            Si tienes alguna consulta o deseas más información, ¡contáctanos!
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Tu Nombre"
              className="px-4 py-2 rounded-md bg-gray-700 text-gray-200"
            />
            <input
              type="email"
              placeholder="Tu Email"
              className="px-4 py-2 rounded-md bg-gray-700 text-gray-200"
            />
            <textarea
              placeholder="Tu Mensaje"
              className="px-4 py-2 rounded-md bg-gray-700 text-gray-200"
              rows={4}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600/20 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 transition duration-100 rounded-md"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
