import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Función para obtener la URL pública de una imagen almacenada en el bucket
export const getPublicImageUrl = (imagePath: string) => {
  try {
    // Desestructurando la respuesta correctamente
    const { data } = supabase.storage
      .from('institution-images') // El nombre de tu bucket
      .getPublicUrl(imagePath);

    // Verificando si no se obtuvo la URL pública
    if (!data || !data.publicUrl) {
      console.error("No se pudo obtener la URL de la imagen.");
      return '';
    }

    return data.publicUrl; // Retornamos la URL pública
  } catch (err) {
    console.error("Error al obtener la URL de la imagen:", err);
    return '';
  }
};
