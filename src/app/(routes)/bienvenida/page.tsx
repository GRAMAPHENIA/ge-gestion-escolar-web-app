"use client";

import { useRouter } from "next/navigation";
import { PiArrowLeft } from "react-icons/pi";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-40 flex flex-col justify-center items-stretch bg-[#292a2d] ">
      <div className="flex flex-col justify-center p-6 bg-[#212327] px-10 lg:px-24 h-screen">
        {/* Botón de volver en la parte superior izquierda */}
        <button
          onClick={() => router.push("/")} // Navega hacia la Home
          className="absolute top-4 right-4 text-zinc-200 hover:text-orange-300 border border-zinc-700/50 rounded-full p-2 transition duration-100 bg-neutral-700/50"
          aria-label="Volver"
        >
          <PiArrowLeft className="w-4 h-4" />
        </button>

        {/* Título y mensaje de bienvenida */}
        <h1 className={`${merriweather.className} text-3xl font-bold text-orange-400`}>
          ¡Bienvenido/a!
        </h1>
        <h2 className={`${merriweather.className} text-sm font-thin text-zinc-400 italic`}>
          Estás a un paso de completar tu registro.
        </h2>

        {/* Mensaje principal */}
        <div className="mt-10 space-y-6">
          <p className={`${merriweather.className} text-zinc-200 text-lg`}>
            Hemos enviado un correo electrónico a tu dirección de correo. Por
            favor, verifica tu bandeja de entrada y haz clic en el enlace de
            confirmación para activar tu cuenta.
          </p>
          <p className={`${merriweather.className} text-zinc-400 text-sm italic`}>
            Si no encuentras el correo, revisa la carpeta de spam o solicita un
            nuevo enlace de confirmación.
          </p>
        </div>

        {/* Botón para reenviar el correo de confirmación (opcional) */}
        <button
          onClick={() => {
            // Aquí puedes agregar la lógica para reenviar el correo de confirmación
            alert("Se ha reenviado el correo de confirmación.");
          }}
          className={`${merriweather.className} w-full mt-10 px-4 py-2 text-center bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-md`}
        >
          Reenviar correo de confirmación
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;