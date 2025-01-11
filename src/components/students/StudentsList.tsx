"use client";

import { useStudents } from "@/hooks/useStudents";
import { useEffect } from "react";

export default function StudentsList() {
  const { students, loading, error, fetchStudents, addStudent, deleteStudent } =
    useStudents();

  useEffect(() => {
    fetchStudents(); // Cargar estudiantes al montar el componente
  }, [fetchStudents]);

  const handleAddStudent = async () => {
    const newStudent = {
      name: "Nuevo Alumno",
      age: 20,
      classe: "3B",
      assistance: true,
      notes: { math: 8, science: 9 },
      observations: "Buen desempeño",
    };
    await addStudent(newStudent);
  };

  const handleDeleteStudent = async (id: number) => {
    await deleteStudent(id);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Lista de Estudiantes</h1>
      <button onClick={handleAddStudent}>Agregar Estudiante</button>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.classe}
            <button onClick={() => handleDeleteStudent(student.id!)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
