"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { PiArrowLeft, PiEye, PiEyeClosed } from "react-icons/pi";
import { useRouter } from "next/navigation";

import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"], // Puedes elegir los pesos que necesites
  subsets: ["latin"],
  style: ["normal", "italic"], // Si necesitas cursiva
  display: "swap",
});

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

  const router = useRouter();

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/tablero"); // Redirige a una página segura si ya está logueado
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

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
      const { data: authResponse, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (authError) {
        setError("Hubo un error al crear tu cuenta: " + authError.message);
        return;
      }

      if (authResponse.user) {
        const { id: authId } = authResponse.user;

        const { error: userError } = await supabase.from("users").insert([
          {
            auth_id: authId,
            email,
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
    <div className="w-full flex flex-col justify-center items-stretch bg-[#292a2d]">
      <div className="flex flex-col justify-center p-6 bg-[#212327] px-10 lg:px-20 h-screen">
        <button
          onClick={() => router.push("/tablero")}
          className="absolute top-4 right-4 text-zinc-200 hover:text-orange-300 border border-zinc-700/50 rounded-full p-2 transition duration-100 bg-neutral-700/50"
          aria-label="Volver"
        >
          <PiArrowLeft className="w-4 h-4" />
        </button>
        <h1
          className={`${merriweather.className} text-3xl font-bold text-white`}
        >
          Empezá
        </h1>
        <h2
          className={`${merriweather.className} text-sm font-thin text-zinc-400 italic`}
        >
          Crea una nueva cuenta
        </h2>
        <form onSubmit={handleSignup} className="space-y-6 mt-10">
          <div>
            <label
              htmlFor="email"
              className={`${merriweather.className} text-sm font-thin text-zinc-200`}
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
              aria-describedby="email-helper"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className={`${merriweather.className} text-sm font-thin text-zinc-200`}
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
                aria-describedby="password-helper"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute right-0 top-0 h-full px-4 bg-zinc-900/50 backdrop-blur-xl border border-l border-orange-600/70 flex items-center justify-center text-gray-400 hover:text-orange-300 rounded-r-lg"
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
                id="password-strength-helper"
              >
                Contraseña: {getPasswordStrength()}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className={`${merriweather.className} text-sm font-thin text-zinc-200`}
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
                aria-describedby="confirm-password-helper"
              />
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                className="absolute right-0 top-0 h-full px-4 bg-zinc-900/50 backdrop-blur-xl border border-l border-orange-600/70 flex items-center justify-center text-gray-400 hover:text-orange-300 rounded-r-lg"
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
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted((prev) => !prev)}
              className="appearance-none w-5 h-5 border border-orange-600/50 rounded-sm bg-zinc-900/50 checked:bg-orange-500/10 checked:border-orange-400 mr-2 relative 
              before:absolute before:inset-0 before:flex before:items-center before:justify-center before:opacity-0 before:content-['✔'] before:text-orange-400 before:text-xs checked:before:opacity-100"
            />
            <label
              htmlFor="terms"
              className={`${merriweather.className} flex text-xs items-center space-x-1 text-zinc-300 cursor-pointer italic`}
            >
              <span>
                Acepto los{" "}
                <a
                  href="/terminos-y-condiciones"
                  className="text-orange-400 hover:underline hover:text-orange-300"
                >
                  términos y condiciones
                </a>{" "}
                y la{" "}
                <a
                  href="/politica-de-privacidad"
                  className="text-orange-400 hover:underline hover:text-orange-300"
                >
                  política de privacidad
                </a>
                .
              </span>
            </label>
          </div>

          {error && (
            <div className="flex justify-center items-center fixed bottom-8 left-0 w-full">
              <p className="px-4 py-2 text-left bg-rose-600/10 backdrop-blur-lg text-rose-400 rounded-md border border-rose-300/10">
                {error}
              </p>
            </div>
          )}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-center bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-md"
          >
            Crear Cuenta
          </button>
        </form>
        <p
          className={`${merriweather.className} mt-4 text-sm text-center text-gray-400`}
        >
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/inicio-de-sesion"
            className="text-orange-400 hover:underline hover:text-orange-300"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
