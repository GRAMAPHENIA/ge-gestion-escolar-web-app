"use client";

import { useState } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { PiEye, PiEyeClosed } from "react-icons/pi";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmación de contraseña
  const [passwordVisible, setPasswordVisible] = useState(false); // Visibilidad de contraseña
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Visibilidad de confirmar contraseña
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false); // Términos aceptados
  const [isPasswordTyped, setIsPasswordTyped] = useState(false); // Nueva variable para saber si la contraseña fue escrita

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

    // Verificar si el correo ya está en uso antes de intentar crear el usuario
    const { data: userCheck, error: userCheckError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (userCheckError && userCheckError.code !== "PGRST116") {
      setError("Hubo un problema al verificar el correo.");
      return;
    }

    if (userCheck) {
      setError("Este correo ya está registrado.");
      return;
    }

    const {  error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError("Hubo un error al crear tu cuenta.");
      return;
    }

    setSuccess("Usuario creado correctamente. Por favor, verifica tu correo.");
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
    <div className="flex items-center justify-center w-1/3 bg-gray-900 text-gray-200">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-teal-400 mb-6">
          Crear Cuenta
        </h1>
        <form onSubmit={handleSignup} className="space-y-6">
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordTyped(true);
                }}
                className="mt-2 block w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition focus:outline-none focus:ring-0"
                placeholder="Crea una contraseña"
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
                className="mt-2 block w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition focus:outline-none focus:ring-0"
                placeholder="Repite tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible((prev) => !prev)
                }
                className="absolute right-0 top-0 h-full px-4 bg-gray-700 border border-l border-teal-600/70 flex items-center justify-center text-gray-400 hover:text-teal-300 rounded-r-lg"
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
              className="appearance-none w-5 h-5 border border-l border-teal-600/70 rounded-sm bg-gray-700 checked:bg-teal-500/50 checked:border-none mr-2"
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
                className="text-teal-400 hover:underline"
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
            className="w-full px-4 py-2 text-center bg-teal-600/20 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 transition duration-100 rounded-md "
          >
            Crear Cuenta
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/inicio-de-sesion"
            className="text-teal-400 hover:underline hover:text-teal-300"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
