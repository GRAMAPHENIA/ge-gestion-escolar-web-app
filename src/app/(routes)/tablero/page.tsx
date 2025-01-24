// src/app/dashboard/page.tsx

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
import MainContent from "@/components/Dashboard/MainContent";
import PanelContent from "@/components/Dashboard/PanelContent";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

const Dashboard = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false); // Estado para abrir/cerrar el primer aside
  const [isSecondAsideOpen, setIsSecondAsideOpen] = useState(true); // Estado para abrir/cerrar el segundo aside
  const [selectedSection, setSelectedSection] = useState("institucion"); // Sección seleccionada
  const [user, setUser] = useState<User | null>(null); // Información del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú desplegable del avatar
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

  const AvatarMenu = () => (
    <div className="relative">
      {/* Botón del avatar para desplegar el menú */}
      <button
        className="w-9 h-9 bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-full flex items-center justify-center cursor-pointer text-xs"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {user ? user.email?.charAt(0).toUpperCase() : "?"}
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="absolute right-0 top-8 p-4 mt-2 w-72 bg-zinc-800 text-gray-100 rounded-md shadow-lg z-20 border border-zinc-800">
          {/* Información del usuario */}
          {user && (
            <div className="px-4 py-2 border-b border-gray-600">
              <p className="text-sm font-medium">Hola,</p>
              <p className="text-sm font-semibold truncate">{user.email}</p>
            </div>
          )}

          {/* Opciones del menú */}
          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 p-2 mt-4 rounded-full bg-zinc-800/70 hover:bg-zinc-700/40"
            onClick={() => {
              supabase.auth.signOut();
              router.push("/");
            }}
          >
            <GoSignOut className="mr-2 text-xl" /> Cerrar sesión
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 p-2 mt-2 rounded-full bg-zinc-800/70 hover:bg-zinc-700/40"
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
        <div className="w-full  pl-20 pr-4 py-2 flex justify-end items-center">
          <AvatarMenu />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Primer aside: Menú lateral */}
          <aside
            className={`bg-[#212327] transition-all duration-200 z-30 absolute lg:relative  ${
              isAsideOpen ? "w-56" : "w-[60px]"
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
              <div className="w-6 h-6 p-2 mt-2 flex items-center justify-center rounded-full bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 text-xs">
                T
              </div>
              {isAsideOpen && (
                <span className="ml-3 text-sm text-orange-400"></span>
              )}
            </div>

            <div>
              <div
                onClick={() => router.push("/")}
                className="flex items-center space-x-4 px-2 py-2 mx-2 my-2 cursor-pointer rounded-md text-zinc-400/75 hover:text-zinc-300 hover:bg-zinc-300/5"
              >
                <span className="text-xl">
                  <PiHouseLine className="w-6 h-6" />
                </span>
                {isAsideOpen && <span className="text-sm">Volver</span>}
              </div>
              <div className="border-b border-zinc-700 mt-2 mx-2"></div>
            </div>

            <div className="flex flex-col space-y-4 p-3">
              {menuItems.map((item) => (
                <div
                  key={item.route}
                  onClick={() => setSelectedSection(item.route)}
                  className={`flex items-center space-x-4 px-[6px] py-2 rounded-[3px] transition-colors cursor-pointer hover:bg-zinc-700/50 ${
                    selectedSection === item.route
                      ? "bg-neutral-600/40 hover:bg-neutral-500/20 text-zinc-300 hover:text-zinc-300 transition duration-200"
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

          {/* Segundo aside: Panel lateral derecho */}
          <aside
            className={`transition-all duration-200 ml-12 bg-[#292a2d] ${
              isSecondAsideOpen ? "w-1/5" : "w-10"
            }`}
          >
            <div className="relative flex items-center justify-start mt-4">
              <div className="group relative pl-4">
                <button
                  className="flex justify-center items-center rounded text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700 h-8 w-8 ml-3"
                  onClick={() => setIsSecondAsideOpen((prev) => !prev)}
                >
                  {isSecondAsideOpen ? (
                    <LuPanelLeftClose className="h-6 w-6" />
                  ) : (
                    <LuPanelRightClose className="h-6 w-6" />
                  )}
                </button>
                {/* Tool Tip */}
                <span className="absolute left-4 top-12 -translate-y-1/3 bg-zinc-900 text-zinc-200 text-xs rounded-md px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 before:content-[''] before:absolute before:top-[-14px] before:left-1/4 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-zinc-900 w-fit before:z-10 select-none whitespace-nowrap">
                  {isSecondAsideOpen ? "Cerrar panel" : "Abrir panel"}
                </span>
              </div>
            </div>
            {isSecondAsideOpen && (
              <div className="p-4">
                <PanelContent selectedSection={selectedSection} />
              </div>
            )}
          </aside>

          {/* Contenido principal */}
          <main className="flex-1 bg-[#292a2d]  p-6 overflow-y-auto max-h-screen">
            <MainContent selectedSection={selectedSection} />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
