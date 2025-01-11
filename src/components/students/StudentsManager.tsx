"use client";

import { useState, useEffect, FormEvent } from "react";

interface Student {
  id: number;
  name: string;
  age: number;
}

const StudentsManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Omit<Student, "id">>({ name: "", age: 0 });
  const [error, setError] = useState<string | null>(null);

  // Obtener estudiantes
  const fetchStudents = async (): Promise<void> => {
    try {
      const response = await fetch("/api/students");
      const data: Student[] | { error: string } = await response.json();

      if (!response.ok) {
        throw new Error((data as { error: string }).error || "Error al obtener estudiantes");
      }
      setStudents(data as Student[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  // Agregar estudiante
  const addStudent = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
      const data: Student[] | { error: string } = await response.json();

      if (!response.ok) {
        throw new Error((data as { error: string }).error || "Error al agregar estudiante");
      }

      setStudents((prev) => [...prev, (data as Student[])[0]]);
      setNewStudent({ name: "", age: 0 }); // Resetear formulario
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gestión de Estudiantes</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={addStudent} className="mb-6">
        <div className="mb-4">
          <label className="block mb-2">Nombre</label>
          <input
            type="text"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Edad</label>
          <input
            type="number"
            value={newStudent.age || ""}
            onChange={(e) => setNewStudent({ ...newStudent, age: Number(e.target.value) })}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-teal-100 rounded-md hover:bg-teal-500"
        >
          Agregar Estudiante
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Lista de Estudiantes</h2>
      <ul className="space-y-2">
        {students.map((student) => (
          <li
            key={student.id}
            className="p-4 bg-gray-700 rounded-md flex justify-between items-center"
          >
            <span>
              {student.name} - {student.age} años
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsManager;
