"use client";

import { useState } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { PiEye, PiEyeClosed } from "react-icons/pi";
// import ServiceFeaturesForm from "./ServiceFeaturesForm";
// import Image from "next/image";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isPasswordTyped, setIsPasswordTyped] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!termsAccepted) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      // Intentar crear el usuario con Supabase Auth
      const { data: authResponse, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (authError) {
        setError("Hubo un error al crear tu cuenta: " + authError.message);
        return;
      }

      // Validar que el usuario se haya creado
      if (authResponse.user) {
        const { id: authId } = authResponse.user;

        // Intentar guardar datos adicionales en la tabla `users`
        const { error: userError } = await supabase.from("users").insert([
          {
            auth_id: authId, // ID del usuario autenticado
            email, // Correo del usuario
          },
        ]);

        if (userError) {
          console.error(
            "Error al guardar en la tabla 'users':",
            userError.message
          );
          setError(
            "El usuario se creó, pero hubo un problema al guardar los datos adicionales."
          );
          return;
        }

        setSuccess(
          "Usuario creado correctamente. Por favor, verifica tu correo."
        );
      }
    } catch (err) {
      console.error("Error desconocido:", err);
      setError("Hubo un problema inesperado. Intenta nuevamente.");
    }
  };

  const getPasswordStrength = () => {
    if (password.length > 8 && /\d/.test(password) && /[A-Z]/.test(password)) {
      return "Fuerte";
    } else if (password.length > 4) {
      return "Media";
    }
    return "Débil";
  };

  return (
    <div className="flex flex-col justify-center items-stretch bg-[#292a2d] ">
      <div className="flex flex-col justify-center p-6 bg-[#212327] px-20 h-screen">
        <h1 className="text-3xl font-bold text-zinc-200">Empezá</h1>
        <h2 className="text-zinc-500">Crea una nueva cuenta</h2>
        <form onSubmit={handleSignup} className="space-y-6 mt-10">
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordTyped(true);
                }}
                className="mt-2 block w-full px-4 py-2 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0"
                placeholder="Crea una contraseña"
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
            {isPasswordTyped && (
              <p
                className={`text-xs mt-2 ${
                  getPasswordStrength() === "Fuerte"
                    ? "text-emerald-400"
                    : getPasswordStrength() === "Media"
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                Contraseña: {getPasswordStrength()}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full px-4 py-2 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0"
                placeholder="Repite tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                className="absolute right-0 top-0 h-full px-4 bg-zinc-900/50 border border-l border-orange-600/70 flex items-center justify-center text-gray-400 hover:text-orange-300 rounded-r-lg"
                aria-label={
                  confirmPasswordVisible
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                {confirmPasswordVisible ? (
                  <PiEyeClosed className="w-5 h-5" />
                ) : (
                  <PiEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="relative flex">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted((prev) => !prev)}
              className="appearance-none w-5 h-5 border border-l border-orange-600/70 rounded-sm bg-zinc-900/50 checked:bg-orange-500/50 checked:border-none mr-2"
            />
            <label
              htmlFor="terms"
              className="absolute p-1 top-0 left-0 w-5 h-5 flex items-center justify-center pointer-events-none"
            >
              {termsAccepted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </label>
            <p>
              Acepta los{" "}
              <a
                href="/terminos-y-condiciones"
                className="text-orange-400 hover:underline"
              >
                términos y condiciones.
              </a>
            </p>
          </div>
          {error && (
            <div className="flex justify-center items-center fixed bottom-8 left-0 w-full">
              <p className="px-4 py-2 text-left bg-rose-600/10 text-rose-400 rounded-md border border-rose-300/10">
                {error}
              </p>
            </div>
          )}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-center bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-md "
          >
            Crear Cuenta
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/inicio-de-sesion"
            className="text-zinc-400 hover:underline hover:text-zinc-300 underline underline-offset-1
             decoration-orange-500"
          >
            Inicia sesión aquí
          </a>
        </p>
        <p className="text-center mt-4 text-xs text-zinc-500">
          Al continuar, aceptas los{" "}
          <span className="text-zinc-400 underline underline-offset-1 hover:cursor-pointer hover:text-zinc-300">
            Términos de Servicios
          </span>{" "}
          y la{" "}
          <span className="text-zinc-400 underline underline-offset-1 hover:cursor-pointer hover:text-zinc-300">
            Política de Privacidad
          </span>{" "}
          de Gestión Escolar, y consientes recibir correos electrónicos
          periódicos con actualizaciones.
        </p>
      </div>

      {/* Seccion de Anuncios del servicio */}
    </div>
  );
};

export default SignupForm;
