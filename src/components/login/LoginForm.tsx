// LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Hook para redirección
import { supabase } from "@/supabase/supabaseClient";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Controla la visibilidad de la contraseña
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
      setError(error.message);
    } else {
      alert("Login exitoso");
      router.push("/"); // Redirigir al tablero
    }
  };

  return (
    <div className="flex items-center justify-center w-1/3 bg-gray-900 text-gray-200">
      {/* Contenedor principal */}
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Título del formulario */}
        <h1 className="text-3xl font-bold text-center text-teal-400 mb-6">
          Iniciar Sesión
        </h1>
        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Campo de correo electrónico */}
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
              className="mt-2 block w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          {/* Campo de contraseña con botón para mostrar/ocultar */}
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
                className="mt-2 block w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                placeholder="Ingresa tu contraseña"
                required
              />
              {/* Botón para alternar visibilidad de contraseña */}
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-teal-300"
              >
                {passwordVisible ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {/* Indicador de seguridad de la contraseña */}
            <div className="h-2 mt-2 w-full bg-gray-600 rounded">
              <div
                className={`h-full rounded ${
                  password.length > 8
                    ? "bg-green-500"
                    : password.length > 4
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${Math.min(password.length * 10, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {password.length > 8
                ? "Contraseña segura"
                : password.length > 4
                ? "Contraseña media"
                : "Contraseña débil"}
            </p>
            {/* Consejo para crear una contraseña segura */}
            <p className="text-sm text-gray-400 mt-2">
              Consejo: Usa al menos 8 caracteres, combinando letras, números y
              símbolos.
            </p>
          </div>
          {/* Mensaje de error si ocurre algún problema */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-center bg-teal-600/20 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 transition duration-100 rounded-md"
          >
            Iniciar Sesión
          </button>
        </form>
        {/* Enlace para registrarse */}
        <p className="mt-4 text-sm text-center text-gray-400">
          ¿No tienes una cuenta?{" "}
          <a
            href="/registro"
            className="text-teal-400 hover:underline hover:text-teal-300"
          >
            Regístrate aquí
          </a>
        </p>
        {/* Enlace para recuperar contraseña */}
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
