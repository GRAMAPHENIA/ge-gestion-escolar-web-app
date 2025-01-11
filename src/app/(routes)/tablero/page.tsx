"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const Tablero = () => {
  const [user, setUser] = useState<User | null>(null); // Estado del usuario
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user); // Guardar el usuario si está autenticado
      } else {
        router.push("/inicio-de-secion"); // Redirigir al login si no está autenticado
      }
      setLoading(false); // Finalizar la carga
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/inicio-de-secion"); // Redirigir si el usuario cierra sesión
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe(); // Limpieza del listener
    };
  }, [router]);

  if (loading) {
    return <div className="text-gray-200">Cargando...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        {user && <p className="mb-4">Bienvenido, {user.email}</p>}
        <p>Este es tu panel de control. Aquí puedes gestionar tus datos.</p>
        {/* Agrega aquí más contenido del dashboard */}
      </div>
    </ProtectedRoute>
  );
};

export default Tablero;
