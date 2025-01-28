import React from 'react';

const Page = () => {
  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-gray-800 text-gray-200 rounded-lg"
      aria-label="Términos y Condiciones de Gestión Escolar"
    >
      <h1 className="text-3xl font-bold mb-4">Términos y Condiciones</h1>
      <p className="text-sm mb-6">Última actualización: [Fecha]</p>

      <p className="mb-4">
        Bienvenido a <strong>Gestión Escolar</strong>. Al acceder y utilizar
        nuestro sitio web{' '}
        <a
          href="https://gestionescolar.vercel.app"
          className="text-teal-400 underline hover:text-teal-300"
        >
          https://gestionescolar.vercel.app
        </a>
        , aceptas los siguientes términos y condiciones.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Uso de la Plataforma</h2>
      <p className="mb-4">
        Esta plataforma está destinada a la gestión educativa. Al utilizarla, te
        comprometes a:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>No utilizar la aplicación para actividades ilícitas.</li>
        <li>Proporcionar información veraz y actualizada.</li>
        <li>No intentar acceder a datos de otros usuarios sin autorización.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Registro de Usuario</h2>
      <p className="mb-4">
        Para acceder a ciertas funciones, es necesario registrarse. Al hacerlo, te
        comprometes a:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Mantener la confidencialidad de tu contraseña.</li>
        <li>Notificar cualquier acceso no autorizado a tu cuenta.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Propiedad Intelectual</h2>
      <p className="mb-4">
        Todo el contenido y diseño de Gestión Escolar es propiedad exclusiva de los
        desarrolladores y no puede ser copiado o distribuido sin autorización.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Limitación de Responsabilidad</h2>
      <p className="mb-4">
        No nos hacemos responsables por:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Errores o interrupciones en el servicio.</li>
        <li>Pérdida de datos debido a fallos técnicos.</li>
        <li>Uso indebido de la plataforma por parte de los usuarios.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Modificaciones</h2>
      <p className="mb-4">
        Nos reservamos el derecho de modificar estos términos en cualquier momento.
        Los cambios entrarán en vigor una vez publicados en el sitio web.
      </p>

      <p>
        Si tienes preguntas, contáctanos en{' '}
        <a
          href="mailto:tu-email@ejemplo.com"
          className="text-teal-400 underline hover:text-teal-300"
        >
          tu-email@ejemplo.com
        </a>
        .
      </p>
    </div>
  );
};

export default Page;
