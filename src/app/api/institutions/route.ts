// 📌 Ruta: /api/institutions/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/supabase/supabaseClient";
import { Institution } from "@/types/institutions/types";
import { validateInstitution } from "@/types/institutions/validations";

/**
 * @description Obtiene la lista de todas las instituciones registradas.
 * @returns JSON con las instituciones o un mensaje de error.
 */
export async function GET() {
  try {
    const { data, error } = await supabase.from("institutions").select("*");

    if (error) {
      throw new Error(`Error al obtener las instituciones: ${error.message}`);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * @description Crea una nueva institución.
 * @param request Request con los datos de la institución en formato JSON.
 * @returns JSON con la institución creada o un mensaje de error.
 */
export async function POST(request: Request) {
  try {
    const body: Institution = await request.json();

    // Validar los datos antes de insertarlos
    if (!validateInstitution(body)) {
      return NextResponse.json({ error: "Los datos enviados no son válidos." }, { status: 400 });
    }

    const { data, error } = await supabase.from("institutions").insert(body).select();

    if (error) {
      throw new Error(`Error al crear la institución: ${error.message}`);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * @description Actualiza una institución existente.
 * @param request Request con los datos de la institución en formato JSON.
 * @returns JSON con la institución actualizada o un mensaje de error.
 */
export async function PUT(request: Request) {
  try {
    const body: Institution = await request.json();

    // Validar los datos antes de actualizarlos
    if (!validateInstitution(body)) {
      return NextResponse.json({ error: "Los datos enviados no son válidos." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("institutions")
      .update(body)
      .eq("id", body.id)
      .select();

    if (error) {
      throw new Error(`Error al actualizar la institución: ${error.message}`);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * @description Elimina una institución.
 * @param request Request con el ID de la institución a eliminar.
 * @returns JSON con un mensaje de éxito o un mensaje de error.
 */
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const { error } = await supabase
      .from("institutions")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Error al eliminar la institución: ${error.message}`);
    }

    return NextResponse.json({ message: "Institución eliminada con éxito" }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}