import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabase/supabaseClient";
import { Institution } from "@/types/institutions/types";
import { validateInstitution } from "@/types/institutions/validations";

type Context = { params: { id?: string } }; // 

/**
 * @description Actualiza una institución existente por su ID
 * @param request Request con los datos actualizados de la institución
 * @param context Objeto que contiene `params` con el ID de la institución
 */
export async function PUT(request: NextRequest, context: Context) {
  try {
    const id = context.params.id; // 

    if (!id) {
      return NextResponse.json({ error: "El ID es obligatorio." }, { status: 400 });
    }

    const body: Institution = await request.json();

    if (!validateInstitution(body)) {
      return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
    }

    const { data, error } = await supabase.from("institutions").update(body).eq("id", id).select();

    if (error) {
      throw new Error(`Error al actualizar la institución: ${error.message}`);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

/**
 * @description Elimina una institución por su ID
 * @param request Request con el ID en la URL
 * @param context Objeto que contiene `params` con el ID de la institución
 */
export async function DELETE(request: NextRequest, context: Context) {
  try {
    const id = context.params.id;

    if (!id) {
      return NextResponse.json({ error: "El ID es obligatorio." }, { status: 400 });
    }

    const { error } = await supabase.from("institutions").delete().eq("id", id);

    if (error) {
      throw new Error(`Error al eliminar la institución: ${error.message}`);
    }

    return NextResponse.json({ message: "Institución eliminada correctamente." }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
