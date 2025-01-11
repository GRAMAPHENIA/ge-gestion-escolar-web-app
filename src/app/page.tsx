// pages/index.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null); // Tipo explícito para el usuario

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
      authListener.subscription.unsubscribe(); // Limpieza del listener
    };
  }, []);

  // Función para cerrar sesión

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert("Error al cerrar sesión");
    setUser(null); // Asegurarse de que el estado del usuario se actualice
  };

  // Funciones para redirigir al inicio de sesión y al tablero
  const handleLoginRedirect = () => {
    window.location.href = "/inicio-de-secion"; // Redirige a la página de login
  };

  // Función para redirigir al tablero
  const handleDashboardRedirect = () => {
    window.location.href = "/tablero"; // Redirige al tablero del usuario
  };

  // Contenido de la página
  return (
    <div className="grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-900 text-gray-200">
      {/* Barra Superior */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-gray-800 shadow-md rounded">
        <h1 className="text-4xl font-bold text-teal-400">GE</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Hola, {user.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-left bg-rose-600/20 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition duration-100 rounded-md"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="flex items-center px-4 py-2 text-left bg-teal-600/20 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 transition duration-100 rounded-md"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl">Bienvenido de nuevo, {user.email}</h2>
            <p>Accede a tu tablero para gestionar tus actividades.</p>
            <button
              onClick={handleDashboardRedirect}
              className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md transition"
            >
              Ir al Tablero
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl">Bienvenido a la Gestión Escolar</h2>
            <p>
              Inicia sesión para gestionar tus instituciones, estudiantes y más.
            </p>
            <button
              onClick={handleLoginRedirect}
              className=" px-4 py-2 text-left bg-teal-600/20 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 transition duration-100 rounded-md"
            >
              Iniciar Sesión
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a className="text-teal-400 hover:underline" href="#">
          Footer 1
        </a>
        <a className="text-teal-400 hover:underline" href="#">
          Footer 2
        </a>
        <a className="text-teal-400 hover:underline" href="#">
          Footer 3
        </a>
      </footer>
    </div>
  );
}
