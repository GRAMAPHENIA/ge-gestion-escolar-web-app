"use client";

import { useRouter } from "next/navigation";
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
    <div className="w-full flex flex-col justify-center items-center bg-[#292a2d] min-h-screen">
      <div className="flex flex-col justify-center items-center p-6 bg-[#212327] px-10 lg:px-24">
        <h1 className={`${merriweather.className} text-3xl font-bold text-orange-400 mb-4`}>
          ¡Bienvenido!
        </h1>
        <p className={`${merriweather.className} text-sm font-thin text-zinc-400 italic mb-6`}>
          Has iniciado sesión correctamente.
        </p>
        <button
          onClick={() => router.push("/tablero")}
          className={`${merriweather.className} px-4 py-2 text-center bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-md`}
        >
          Ir al Tablero
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;