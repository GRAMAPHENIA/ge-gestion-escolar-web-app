"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { GoCalendar, GoOrganization, GoRepo, GoSignOut } from "react-icons/go";
import {
  PiCertificate,
  PiChair,
  PiChalkboardTeacher,
  PiChartBar,
} from "react-icons/pi";

const Dashboard = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("institucion"); // Estado para la sección seleccionada
  const [user, setUser] = useState<User | null>(null); // Estado para el usuario
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const menuItems = [
    { name: "Institución", route: "institucion", icon: <GoOrganization /> },
    { name: "Cursos", route: "cursos", icon: <GoRepo /> },
    { name: "Clases", route: "clases", icon: <PiChalkboardTeacher /> },
    { name: "Estudiantes", route: "estudiantes", icon: <PiChair /> },
    { name: "Evaluaciones", route: "evaluaciones", icon: <PiChartBar /> },
    { name: "Notas", route: "notas", icon: <PiCertificate /> },
    { name: "Calendario", route: "calendario", icon: <GoCalendar /> },
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
      <div className="text-gray-200 bg-gray-900 h-screen flex justify-center items-center">
        Cargando...
      </div>
    );
  }

  // Contenidos dinámicos
  const getPanelContent = () => {
    switch (selectedSection) {
      case "institucion":
        return <p>Información sobre las instituciones.</p>;
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
        return <p>Vista principal de Instituciones.</p>;
      case "calendario":
        return <p>Calendario interactivo y tareas.</p>;
      case "cursos":
        return <p>Gestión completa de cursos. </p>;
      case "estudiantes":
        return (
          <p>
            Sección para administrar estudiantes. <PiChair />
          </p>
        );
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

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-900 text-gray-200">
        {/* Aside Menu */}
        <aside
          className={`bg-gray-900 border-r border-gray-700 transition-all duration-200 z-30 absolute lg:relative ${
            isAsideOpen ? "w-64" : "w-[53px]"
          } flex flex-col justify-between`}
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
          <div className="flex flex-col space-y-2 p-2">
            {menuItems.map((item) => (
              <div
                key={item.route}
                onClick={() => setSelectedSection(item.route)} // Cambia la sección seleccionada
                className={`flex items-center space-x-4 p-2 rounded-md transition-colors cursor-pointer hover:bg-gray-700/50 ${
                  selectedSection === item.route ? "bg-gray-700" : ""
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isAsideOpen && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Secondary Panel */}
        <aside
          className="w-[20%] bg-gray-900/50 p-4 pl-20 z-20 relative flex-shrink-0 h-full border-r border-gray-700"
          style={{ position: "relative" }}
        >
          <h2 className="text-lg font-medium mb-4">
            {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
          </h2>{" "}
          {/* Mostrar nombre de la sección */}
          <div>{getPanelContent()}</div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-gray-900/50 p-2 shadow-md flex justify-between">
            <h1 className="text-lg ">Gestion Escolar</h1>
            <div className="flex items-center space-x-4">
              {user ? (
                <span>Hola, {user.email}</span>
              ) : (
                <span>No estás logueado</span>
              )}
              <button
                className="flex items-center px-2 py-2 text-left bg-rose-600/20 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition duration-100 rounded-md
"
                onClick={() => {
                  // Lógica para cerrar sesión
                  supabase.auth.signOut();
                  router.push("/inicio-de-sesion");
                }}
              >
                <GoSignOut />
              </button>
            </div>
          </header>

          {/* Content */}
          <section className="flex-1 bg-gray-950/50 p-8">
            <h2 className="text-3xl font-bold mb-4 capitalize">
              {selectedSection}
            </h2>
            <div>{getMainContent()}</div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
