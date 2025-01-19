"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { GoOrganization, GoRepo, GoSignOut } from "react-icons/go";
import { AiOutlineSetting } from "react-icons/ai";
import {
  PiCalendarDots,
  PiCertificate,
  PiChair,
  PiChalkboardTeacher,
  PiChartBar,
  PiHouseLine,
} from "react-icons/pi";
import InstitutionPanel from "@/components/Institutions/InstitutionPanel";
import InstitutionMain from "@/components/Institutions/InstitutionMain";

const Dashboard = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("institucion");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { name: "Institución", route: "institucion", icon: <GoOrganization /> },
    { name: "Cursos", route: "cursos", icon: <GoRepo /> },
    { name: "Clases", route: "clases", icon: <PiChalkboardTeacher /> },
    { name: "Estudiantes", route: "estudiantes", icon: <PiChair /> },
    { name: "Evaluaciones", route: "evaluaciones", icon: <PiChartBar /> },
    { name: "Notas", route: "notas", icon: <PiCertificate /> },
    { name: "Calendario", route: "calendario", icon: <PiCalendarDots /> },
  ];

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
      } else {
        router.push("/inicio-de-sesion");
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/inicio-de-sesion");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="text-zinc-200 bg-zinc-950 h-screen flex justify-center items-center">
        Cargando...
      </div>
    );
  }

  const getPanelContent = () => {
    switch (selectedSection) {
      case "institucion":
        return <InstitutionPanel />;
      case "calendario":
        return <p>Detalles del calendario y las tareas.</p>;
      case "cursos":
        return <p>Lista de cursos disponibles.</p>;
      case "estudiantes":
        return <p>Datos y gestión de estudiantes.</p>;
      case "clases":
        return <p>Información sobre clases y horarios.</p>;
      case "evaluaciones":
        return <p>Gestión de evaluaciones y resultados.</p>;
      case "notas":
        return <p>Notas y promedios de los estudiantes.</p>;
      default:
        return <p>Selecciona una sección para ver más información.</p>;
    }
  };

  const getMainContent = () => {
    switch (selectedSection) {
      case "institucion":
        return <InstitutionMain />;
      case "calendario":
        return <p>Calendario interactivo y tareas.</p>;
      case "cursos":
        return <p>Gestión completa de cursos.</p>;
      case "estudiantes":
        return <p>Sección para administrar estudiantes.</p>;
      case "clases":
        return <p>Vista principal de clases.</p>;
      case "evaluaciones":
        return <p>Resultados y gestión de evaluaciones.</p>;
      case "notas":
        return <p>Gestión de calificaciones y reportes.</p>;
      default:
        return <p>Selecciona una sección desde el menú.</p>;
    }
  };

  const AvatarMenu = () => (
    <div className="relative ">
      {/* Botón Avatar */}
      <button
        className="w-9 h-9 bg-cyan-600/20 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition duration-100 rounded-full flex items-center justify-center cursor-pointer text-xs"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {user ? user.email?.charAt(0).toUpperCase() : "?"}{" "}
        {/* Comprobación de null/undefined */}
      </button>

      {/* Menú Desplegable */}
      {isMenuOpen && (
        <div className="absolute right-0 top-10 p-4 mt-2 w-72 bg-zinc-900 text-gray-100 rounded-md shadow-lg z-20">
          {/* Información del Usuario */}
          {user && (
            <div className="px-4 py-2 border-b border-gray-600">
              <p className="text-sm font-medium">Hola,</p>
              <p className="text-sm font-semibold truncate">{user.email}</p>
            </div>
          )}

          {/* Opciones */}
          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700"
            onClick={() => {
              supabase.auth.signOut();
              router.push("/"); // Redirige al inicio después de cerrar sesión
            }}
          >
            <GoSignOut className="mr-2 text-xl" /> Cerrar sesión
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700"
            onClick={() => alert("Configuración aún no implementada")}
          >
            <AiOutlineSetting className="mr-2 text-xl" /> Configuración
          </button>
        </div>
      )}
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col">
        {/* Barra superior con avatar */}
        <div className="w-full bg-zinc-900/50 pl-20 pr-4 py-2 flex justify-between items-center border-b border-zinc-700">
          <h1 className="text-xl font-semibold">Bienvenido al Tablero</h1>
          <AvatarMenu /> {/* Aquí insertamos AvatarMenu */}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Barra lateral */}
          <aside
            className={`bg-zinc-900/80 backdrop-blur-3xl border-zinc-700/50 border-r transition-all duration-100 z-30 absolute lg:relative  ${
              isAsideOpen ? "w-56" : "w-[50px]"
            } flex flex-col justify-stretch`}
            onMouseEnter={() => setIsAsideOpen(true)}
            onMouseLeave={() => setIsAsideOpen(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              zIndex: 30,
            }}
          >
            <div className="flex items-center justify-left p-3 space-x-4">
              <div className="w-6 h-6 p-2 flex items-center justify-center rounded-full bg-cyan-600/20 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition duration-100 text-xs">
                T
              </div>
              {isAsideOpen && (
                <span className="ml-3 text-sm text-cyan-400"></span>
              )}
            </div>

            <div>
              <div
                onClick={() => router.push("/")}
                className="flex items-center space-x-4 px-2 py-2 mx-2 my-2 cursor-pointer rounded-md text-zinc-400/75 hover:text-cyan-300 hover:bg-zonc-300/5"
              >
                <span className="text-xl">
                  <PiHouseLine />
                </span>
                {isAsideOpen && <span className="text-sm">Volver</span>}
              </div>
              <div className="border-b border-zinc-700 mt-2 mx-2"></div>
            </div>

            <div className="flex flex-col space-y-2 p-2">
              {menuItems.map((item) => (
                <div
                  key={item.route}
                  onClick={() => setSelectedSection(item.route)}
                  className={`flex items-center space-x-4 pl-[6px] py-2 rounded-[3px] transition-colors cursor-pointer hover:bg-zinc-700/50 ${
                    selectedSection === item.route
                      ? "bg-zinc-600/40 hover:bg-zinc-500/20 text-zinc-300 hover:text-zinc-300 transition duration-100"
                      : "text-zinc-400/75 hover:text-zinc-300 hover:bg-zinc-300/5"
                  }`}
                >
                  <span className="text-xl ">{item.icon}</span>
                  {isAsideOpen && (
                    <span className="text-sm font-medium ">{item.name}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="border-b border-zinc-700  mx-2"></div>
          </aside>

          <aside
            className="w-1/4 bg-zinc-950/80 pl-auto border-r border-zinc-700 "
            style={{ position: "relative" }}
          >
            <h2 className="text-xl px-3 pl-16 border-b pb-4 border-zinc-700 flex items-center">
              {getPanelContent()}
            </h2>
          </aside>

          <main className="flex-1 bg-zinc-950  p-6 overflow-y-auto max-h-screen">
            {getMainContent()}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
