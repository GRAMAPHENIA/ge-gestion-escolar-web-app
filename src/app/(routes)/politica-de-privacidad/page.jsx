import React from 'react';

const PoliticaDePrivacidad = () => {
  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-gray-800 text-gray-200 rounded-lg"
      aria-label="Política de Privacidad de Gestión Escolar"
    >
      <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
      <p className="text-sm mb-6">Última actualización: [Fecha]</p>

      <p className="mb-4">
        En <strong>Gestión Escolar</strong>, accesible desde{' '}
        <a
          href="https://gestionescolar.vercel.app"
          className="text-teal-400 underline hover:text-teal-300"
        >
          https://gestionescolar.vercel.app
        </a>
        , la privacidad de nuestros usuarios es una prioridad. En esta Política
        de Privacidad explicamos qué información recopilamos, cómo la utilizamos y
        cómo protegemos tus datos.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Información que recopilamos</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Nombre y dirección de correo electrónico.</li>
        <li>Información de acceso (usuario y contraseña encriptados).</li>
        <li>Datos de uso, como interacciones con la aplicación.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Cómo usamos tu información</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Proporcionar y mejorar nuestros servicios.</li>
        <li>Personalizar la experiencia del usuario.</li>
        <li>Responder consultas y brindar soporte.</li>
        <li>Garantizar la seguridad de la plataforma.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        3. Compartición de datos con terceros
      </h2>
      <p className="mb-4">
        No vendemos ni compartimos tu información personal con terceros, excepto
        cuando sea necesario para cumplir con la ley o mejorar nuestro servicio con
        proveedores confiables.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Seguridad de los datos</h2>
      <p className="mb-4">
        Implementamos medidas de seguridad adecuadas para proteger tu información
        contra accesos no autorizados o pérdidas.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Derechos del usuario</h2>
      <p className="mb-4">
        Tienes derecho a:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Acceder, rectificar o eliminar tus datos personales.</li>
        <li>Retirar tu consentimiento para el uso de datos.</li>
        <li>
          Contactarnos para ejercer estos derechos a través de nuestro correo:{' '}
          <a
            href="mailto:tu-email@ejemplo.com"
            className="text-teal-400 underline hover:text-teal-300"
          >
            tu-email@ejemplo.com
          </a>
          .
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        6. Cambios en esta política
      </h2>
      <p className="mb-4">
        Podemos actualizar esta Política de Privacidad ocasionalmente.
        Notificaremos cualquier cambio importante en nuestra página web.
      </p>
      <p>
        Si tienes dudas sobre esta Política de Privacidad, contáctanos en{' '}
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

export default PoliticaDePrivacidad;
