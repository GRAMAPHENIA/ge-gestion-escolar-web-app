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

const PoliticaDePrivacidad = () => {
  return (
    <div className={`${firaCode.className} w-full flex flex-col justify-center items-center bg-[#1a1a1b] min-h-screen py-10 px-6`}>
      <div className="max-w-5xl p-10 bg-[#212327] text-gray-200 rounded-lg shadow-lg">
        <h1 className={`${merriweather.className} text-3xl font-bold text-orange-400`}>
          Política de Privacidad
        </h1>
        <p className="text-sm text-zinc-400 italic mb-10">
          Última actualización: [ Jueves, <span className={`${merriweather.className} italic text-orange-400`}>6</span> de febrero de <span className={`${merriweather.className} italic text-orange-400`}>2025</span> ]
        </p>

        <p className="mb-4">
          En <strong>Gestión Escolar</strong>, accesible desde{' '}
          <a
            href="https://gestionescolar.app"
            className="text-orange-400 underline hover:text-orange-300"
          >
            https://gestionescolar.app
          </a>
          , la privacidad de nuestros usuarios es una prioridad.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>1</span>. Información que recopilamos</h2>
        <ul className="list-disc list-inside text-zinc-400 italic space-y-1">
          <li>Nombre y dirección de correo electrónico.</li>
          <li>Información de acceso (usuario y contraseña encriptados).</li>
          <li>Datos de uso, como interacciones con la aplicación.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>2</span>. Cómo usamos tu información</h2>
        <ul className="list-disc list-inside text-zinc-400 italic space-y-1">
          <li>Proporcionar y mejorar nuestros servicios.</li>
          <li>Personalizar la experiencia del usuario.</li>
          <li>Responder consultas y brindar soporte.</li>
          <li>Garantizar la seguridad de la plataforma.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>3</span>. Compartición de datos con terceros</h2>
        <p className="mb-4 text-zinc-400">
          No vendemos ni compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con la ley o mejorar nuestro servicio con proveedores confiables.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>4</span>. Seguridad de los datos</h2>
        <p className="mb-4 text-zinc-400">
          Implementamos medidas de seguridad adecuadas para proteger tu información contra accesos no autorizados o pérdidas.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>5</span>. Derechos del usuario</h2>
        <ul className="list-disc list-inside text-zinc-400 italic space-y-1">
          <li>Acceder, rectificar o eliminar tus datos personales.</li>
          <li>Retirar tu consentimiento para el uso de datos.</li>
          <li>
            Contactarnos para ejercer estos derechos a través de nuestro correo:{' '}
            <a
              href="mailto:gestiones@hexagono.xyz"
              className="text-orange-400 underline hover:text-orange-300"
            >
              gestiones@hexagono.xyz
            </a>
            .
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-white"><span className={`${merriweather.className} italic text-orange-400`}>6</span>. Cambios en esta política</h2>
        <p className="mb-4 text-zinc-400">
          Podemos actualizar esta Política de Privacidad ocasionalmente. Notificaremos cualquier cambio importante en nuestra página web.
        </p>
        <p>
          Si tenes dudas sobre esta Política de Privacidad, contáctanos en{' '}
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

export default PoliticaDePrivacidad;
