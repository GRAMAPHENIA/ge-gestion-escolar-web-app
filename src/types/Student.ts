export interface Student {
    id?: number; // Será opcional si lo genera Supabase automáticamente.
    name: string;
    age: number;
    classe: string;
    assistance: boolean;
    notes: Record<string, number | string>; // Especificamos que los valores son números o cadenas.
    observations: string;
  }
  