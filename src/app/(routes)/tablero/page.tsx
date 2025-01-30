// src/app/dashboard/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { GoOrganization, GoRepo } from "react-icons/go";

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

import AvatarMenu from "./customs/AvatarMenu";
import { Tooltip } from "react-tooltip";

const Dashboard = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false); // Estado para abrir/cerrar el primer aside
  const [isSecondAsideOpen, setIsSecondAsideOpen] = useState(true); // Estado para abrir/cerrar el segundo aside
  const [selectedSection, setSelectedSection] = useState("institucion"); // Sección seleccionada
  const [user, setUser] = useState<User | null>(null); // Información del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú desplegable del avatar
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

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col">
        {/* Barra superior con avatar */}
        <div className="w-full  pl-20 pr-4 py-2 flex justify-end items-center">
          <AvatarMenu user={user} />
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
                  data-tooltip-id="panel-tooltip"
                  className="flex justify-center items-center rounded text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700 h-8 w-8 ml-3"
                  onClick={() => setIsSecondAsideOpen((prev) => !prev)}
                >
                  {isSecondAsideOpen ? (
                    <LuPanelLeftClose className="h-6 w-6" />
                  ) : (
                    <LuPanelRightClose className="h-6 w-6" />
                  )}
                </button>

                {/* Tooltip de configuración */}
                <Tooltip
                  id="panel-tooltip"
                  border="1px solid #434343"
                  place="right-end"
                  content={isSecondAsideOpen ? "Cerrar panel" : "Abrir panel"}
                  className="custom-tooltip z-50"
                />
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
