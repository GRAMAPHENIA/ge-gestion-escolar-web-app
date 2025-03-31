import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validaciones del backend
    if (!email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (userError && userError.code !== "PGRST116") {
      return NextResponse.json(
        { error: "Error al verificar el usuario" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "El correo electrónico ya está registrado" },
        { status: 400 }
      );
    }

    // Registrar al usuario en Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 500 }
      );
    }

    // Insertar el usuario en la tabla "users"
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: authData.user?.id, // Asegúrate de usar el id del usuario autenticado
        auth_id: authData.user?.id, // Usa el mismo id para auth_id
        email,
      },
    ]);

    if (dbError) {
      console.error("Error al insertar en la base de datos:", dbError);
      return NextResponse.json(
        { error: "Error al guardar los datos del usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Usuario registrado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
