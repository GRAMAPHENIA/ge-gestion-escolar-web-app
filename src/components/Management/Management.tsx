import React from "react";
import { FaChalkboardTeacher, FaClipboardCheck, FaUsers } from "react-icons/fa";

const Management = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Gestión de Estudiantes */}
      <div className="p-8 bg-zinc-900/50 rounded-lg border border-zinc-800">
        <div className="flex items-center gap-6">
          <FaUsers className="w-12 h-12 text-emerald-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">Gestión de Estudiantes</h3>
            <p className="text-zinc-400 text-sm sm:text-base">
              Registra y organiza información de estudiantes, asistencia y notas.
            </p>
          </div>
        </div>
      </div>

      {/* Gestión de Clases */}
      <div className="p-8 bg-zinc-900/50 rounded-lg border border-zinc-800">
        <div className="flex items-center gap-6">
          <FaChalkboardTeacher className="w-12 h-12 text-emerald-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">Gestión de Clases</h3>
            <p className="text-zinc-400 text-sm sm:text-base">
              Planifica y organiza tus clases de manera eficiente y moderna.
            </p>
          </div>
        </div>
      </div>

      {/* Gestión de Evaluaciones */}
      <div className="p-8 bg-zinc-900/50 rounded-lg border border-zinc-800">
        <div className="flex items-center gap-6">
          <FaClipboardCheck className="w-12 h-12 text-emerald-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">Gestión de Evaluaciones</h3>
            <p className="text-zinc-400 text-sm sm:text-base">
              Lleva un control de los resultados de los exámenes y actividades evaluativas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Management;