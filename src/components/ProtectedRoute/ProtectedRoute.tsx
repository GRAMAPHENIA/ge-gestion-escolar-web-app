"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        router.push("/inicio-de-secion"); // Redirigir si no está autenticado
      }
      setLoading(false); // Finalizar la carga
    };

    checkUser();
  }, [router]);

  if (loading) {
    return <div className="text-gray-200">Cargando...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
