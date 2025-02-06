"use client";

import React from "react";
import { Merriweather, Fira_Code } from "next/font/google";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const firaCode = Fira_Code({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Page = () => {
  return (
    <div className={`${firaCode.className} w-full flex flex-col justify-center items-center bg-[#1a1a1b] min-h-screen py-10 px-6`}>
      <div className="max-w-5xl p-10 bg-[#212327] text-gray-200 rounded-lg shadow-lg">
        <h1 className={`${merriweather.className} text-3xl font-bold text-orange-400 `}>
          Términos y Condiciones
        </h1>
        <p className="text-sm text-zinc-400 italic mb-10">
          Última actualización: [ Jueves, <span className={`${merriweather.className} italic text-orange-400`}>6</span> de febrero de <span className={`${merriweather.className} italic text-orange-400`}>2025</span> ]
        </p>

        <p className="mb-4">
          Bienvenido a <strong>Gestión Escolar</strong>. Al acceder y utilizar
          nuestro sitio web{' '}
          <a
            href="https://gestionescolar.vercel.app"
            className="text-orange-400 underline hover:text-orange-300"
          >
            https://gestionescolar.vercel.app
          </a>
          , aceptas los siguientes términos y condiciones.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>1</span>. Uso de la Plataforma</h2>
        <p className="mb-4">
          Esta plataforma está destinada a la gestión educativa. Al utilizarla, te
          comprometes a:
        </p>
        <ul className="list-disc list-inside text-zinc-400 italic space-y-1">
          <li>No utilizar la aplicación para actividades ilícitas.</li>
          <li>Proporcionar información veraz y actualizada.</li>
          <li>No intentar acceder a datos de otros usuarios sin autorización.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>2</span>. Registro de Usuario</h2>
        <p className="mb-4">
          Para acceder a ciertas funciones, es necesario registrarse. Al hacerlo, te
          comprometes a:
        </p>
        <ul className="list-disc list-inside text-zinc-400 italic space-y-1">
          <li>Mantener la confidencialidad de tu contraseña.</li>
          <li>Notificar cualquier acceso no autorizado a tu cuenta.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>3</span>. Propiedad Intelectual</h2>
        <p className="mb-4 text-zinc-400">
          Todo el contenido y diseño de Gestión Escolar es propiedad exclusiva de los
          desarrolladores y no puede ser copiado o distribuido sin autorización.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>4</span>. Limitación de Responsabilidad</h2>
        <p className="mb-4">No nos hacemos responsables por:</p>
        <ul className="list-disc list-inside text-zinc-400 italic space-y-1">
          <li>Errores o interrupciones en el servicio.</li>
          <li>Pérdida de datos debido a fallos técnicos.</li>
          <li>Uso indebido de la plataforma por parte de los usuarios.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>5</span>. Modificaciones</h2>
        <p className="mb-4 text-zinc-400">
          Nos reservamos el derecho de modificar estos términos en cualquier momento.
          Los cambios entrarán en vigor una vez publicados en el sitio web.
        </p>

        <p className="mt-6">
          Si tenes preguntas, contáctanos en{' '}
          <a
            href="mailto:gestiones@hexagono.xyz"
            className="text-orange-400 underline hover:text-orange-300"
          >
            gestiones@hexagono.xyz
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Page;
