// // src/app/api/institutions/route.ts
// import { NextResponse } from 'next/server';
// import { supabase } from '@/supabase/supabaseClient';
// import { Institution } from '@/types/institutions/types';
// import { validateInstitution } from '@/types/institutions/validations';

// // GET: Listar instituciones
// export async function GET() {
//   try {
//     const { data, error } = await supabase.from('institutions').select('*');
//     if (error) {
//       throw new Error(`Error al obtener las instituciones: ${error.message}`);
//     }

//     return NextResponse.json(data);
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Error desconocido';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// // POST: Crear una institución
// export async function POST(request: Request) {
//   try {
//     const body: Institution = await request.json();

//     // Validación de datos
//     if (!validateInstitution(body)) {
//       return NextResponse.json(
//         { error: 'Los datos enviados no son válidos.' },
//         { status: 400 }
//       );
//     }

//     const { data, error } = await supabase.from('institutions').insert(body).select();
//     if (error) {
//       throw new Error(`Error al crear la institución: ${error.message}`);
//     }

//     return NextResponse.json(data, { status: 201 });
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Error desconocido';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// // PUT: Actualizar una institución
// export async function PUT(request: Request) {
//   try {
//     const body: Institution = await request.json();

//     // Validación de datos
//     if (!body.id || !validateInstitution(body)) {
//       return NextResponse.json(
//         {
//           error: 'Faltan datos obligatorios o los datos enviados no son válidos.',
//         },
//         { status: 400 }
//       );
//     }

//     const { data, error } = await supabase
//       .from('institutions')
//       .update(body)
//       .eq('id', body.id)
//       .select();

//     if (error) {
//       throw new Error(`Error al actualizar la institución: ${error.message}`);
//     }

//     return NextResponse.json(data);
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Error desconocido';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// // DELETE: Eliminar una institución
// export async function DELETE(request: Request) {
//   try {
//     const body: { id: string } = await request.json();

//     // Validación de datos
//     if (!body.id) {
//       return NextResponse.json(
//         { error: 'El campo ID es obligatorio para eliminar una institución.' },
//         { status: 400 }
//       );
//     }

//     const { error } = await supabase.from('institutions').delete().eq('id', body.id);
//     if (error) {
//       throw new Error(`Error al eliminar la institución: ${error.message}`);
//     }

//     return NextResponse.json(
//       { message: 'Institución eliminada correctamente.' },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Error desconocido';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }
