// LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";
import { PiEye, PiEyeClosed } from "react-icons/pi";

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
      router.push("/"); // Redirigir al dashboard
    }
  };

  return (
    <div className="flex items-center justify-center w-1/3 bg-gray-900 text-gray-200">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-teal-400 mb-6">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
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
              className="mt-2 block w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition focus:outline-none focus:ring-0"
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
                className="mt-2 block w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition focus:outline-none focus:ring-0"
                placeholder="Ingresa tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute right-0 top-0 h-full px-4 bg-gray-700 border border-l border-teal-600/70 flex items-center justify-center text-gray-400 hover:text-teal-300 rounded-r-lg"
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
            className="w-full px-4 py-2 text-center bg-teal-600/20 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 transition duration-100 rounded-md"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">
          ¿No tienes una cuenta?{" "}
          <a
            href="/registro"
            className="text-teal-400 hover:underline hover:text-teal-300"
          >
            Regístrate aquí
          </a>
        </p>
        <p className="mt-2 text-sm text-center text-gray-400">
          ¿Olvidaste tu contraseña?{" "}
          <a
            href="/recuperar"
            className="text-teal-400 hover:underline hover:text-teal-300"
          >
            Recuperar contraseña
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
