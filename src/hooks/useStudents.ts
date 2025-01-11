"use client";

import { useState } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { Student } from "@/types/Student"; // Ajusta la ruta según tu proyecto.

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener todos los estudiantes
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from("students").select("*");
      if (error) {
        throw new Error(error.message);
      }
      setStudents(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ocurrió un error desconocido");
    } finally {
      setLoading(false);
    }
  };

  // Agregar un estudiante
  const addStudent = async (student: Student) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from("students").insert([student]);
      if (error) {
        throw new Error(error.message);
      }
      setStudents((prev) => [...prev, ...(data || [])]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ocurrió un error desconocido");
    } finally {
      setLoading(false);
    }
  };

  // Editar un estudiante
  const editStudent = async (id: number, updatedFields: Partial<Student>) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from("students")
        .update(updatedFields)
        .eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
      setStudents((prev) =>
        prev.map((student) => (student.id === id ? { ...student, ...updatedFields } : student))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ocurrió un error desconocido");
    } finally {
      setLoading(false);
    }
  };

  // Borrar un estudiante
  const deleteStudent = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from("students").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ocurrió un error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return {
    students,
    loading,
    error,
    fetchStudents,
    addStudent,
    editStudent,
    deleteStudent,
  };
};
