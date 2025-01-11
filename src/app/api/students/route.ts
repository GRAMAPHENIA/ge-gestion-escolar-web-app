import { NextResponse } from "next/server";
import { supabase } from "@/supabase/supabaseClient";

export async function GET() {
  const { data, error } = await supabase.from("students").select("*");
  if (error) {
    console.error("Error al obtener estudiantes:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const student = await req.json();
    const { data, error } = await supabase.from("students").insert([student]);
    if (error) {
      console.error("Error al agregar estudiante:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("Error al procesar solicitud:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
