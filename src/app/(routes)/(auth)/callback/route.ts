import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Función para manejar las solicitudes GET
export async function GET(request: Request) {
  // Extrae los parámetros de la URL y el origen de la solicitud
  const { searchParams, origin } = new URL(request.url);
  
  // Obtiene el parámetro "code" de la URL, que se usa para intercambiar por una sesión en Supabase
  const code = searchParams.get("code");
  
  // Obtiene el parámetro "next" para redirigir al usuario después del login, o usa "/" por defecto
  const next = searchParams.get("next") ?? "/";

  // Si existe el código de autenticación en la URL
  if (code) {
    // Crea una instancia del cliente de Supabase
    const supabase = createClient();
    
    // Intercambia el código por una sesión de usuario en Supabase
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    // Si no hubo error al intercambiar el código, procede con la redirección
    if (!error) {
      // Obtiene el encabezado "x-forwarded-host", útil para entornos con balanceadores de carga
      const forwardedHost = request.headers.get("x-forwarded-host");
      
      // Verifica si estamos en un entorno de desarrollo
      const isLocalEnv = process.env.NODE_ENV === "development";
      
      if (isLocalEnv) {
        // Si estamos en desarrollo, no hay balanceador de carga, así que usamos el origen directamente
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // Si hay un balanceador de carga, usamos el host original antes del balanceador
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        // Si no hay encabezado "x-forwarded-host", usamos el origen de la solicitud
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Si no se pudo autenticar al usuario, lo redirige a una página de error
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
