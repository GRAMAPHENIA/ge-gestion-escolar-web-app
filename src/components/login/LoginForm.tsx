// LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";
import { PiArrowLeft, PiEye, PiEyeClosed } from "react-icons/pi";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Correo o contraseña incorrectos.");
    } else {
      router.push("/tablero"); // Redirigir al dashboard
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-stretch bg-[#292a2d]">
      <div className="flex flex-col justify-center p-6 bg-[#212327] px-10 lg:px-20 h-screen">
        {/* Botón de volver en la parte superior izquierda */}
        <button
          onClick={() => router.push("/")} // Navega hacia la Home
          className="absolute top-4 right-4 text-zinc-200 hover:text-orange-300 border border-zinc-700/50 rounded-full p-2 transition duration-100 bg-neutral-700/50"
          aria-label="Volver"
        >
          <PiArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-3xl font-bold text-zinc-200">Iniciar Sesión</h1>
        <h2 className="text-zinc-500">Accede a tu cuenta</h2>
        <form onSubmit={handleLogin} className="space-y-6 mt-10">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full px-4 py-2 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0"
                placeholder="Ingresa tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute right-0 top-0 h-full px-4 bg-zinc-900/50 border border-l border-orange-600/70 flex items-center justify-center text-gray-400 hover:text-orange-300 rounded-r-lg"
                aria-label={
                  passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {passwordVisible ? (
                  <PiEyeClosed className="w-5 h-5" />
                ) : (
                  <PiEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex justify-center items-center fixed bottom-8 left-0 w-full">
              <p className="px-4 py-2 text-left bg-rose-600/10 text-rose-400 rounded-md border border-rose-300/10">
                {error}
              </p>
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-center bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-md"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">
          ¿No tienes una cuenta?{" "}
          <a
            href="/registro"
            className="text-orange-400 hover:underline hover:text-orange-300"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
