"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PiArrowLeft, PiEye, PiEyeClosed } from "react-icons/pi";
import { Merriweather, Fira_Code } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const firacode = Fira_Code({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isPasswordTyped, setIsPasswordTyped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validaciones del frontend
    if (!validateEmail(email)) {
      toast.error("Por favor, ingresa un correo válido.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      setIsLoading(false);
      return;
    }

    if (!termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones.");
      setIsLoading(false);
      return;
    }

    // Enviar datos al backend
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Hubo un error al crear tu cuenta.");
        setIsLoading(false);
        return;
      }

      toast.success("Usuario creado correctamente.");
      setIsLoading(false);
      router.push("/bienvenida");
    } catch (err) {
      console.error("Error desconocido:", err);
      toast.error("Hubo un problema inesperado. Intenta nuevamente.");
      setIsLoading(false);
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
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
            color: "#fb923c",
            background: "#ea580833",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
          },
        }}
      />
      <div className="flex flex-col justify-center p-6 bg-[#212327] px-10 lg:px-24 h-screen">
        <button
          onClick={() => router.push("/tablero")}
          className="absolute top-4 right-4 text-zinc-200 hover:text-orange-300 border border-zinc-700/50 rounded-full p-2 transition duration-100 bg-neutral-700/50"
          aria-label="Volver"
        >
          <PiArrowLeft className="w-4 h-4" />
        </button>
        <h1
          className={`${merriweather.className} text-3xl font-bold text-orange-400`}
        >
          Empezá
        </h1>
        <h2
          className={`${merriweather.className} text-sm font-thin text-zinc-400 italic`}
        >
          Crea una nueva cuenta
        </h2>
        <form onSubmit={handleSignup} className="space-y-6 mt-10">
          {/* Campos del formulario */}
          <div>
            <label
              htmlFor="email"
              className={`${firacode.className} text-sm font-thin text-zinc-200`}
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
              className={`${firacode.className} text-sm font-thin text-zinc-200`}
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
              >
                Contraseña: {getPasswordStrength()}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className={`${firacode.className} text-sm font-thin text-zinc-200`}
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
              className="appearance-none w-6 h-6 border border-orange-600/50 rounded-sm bg-zinc-900/50 checked:bg-orange-500/10 checked:border-orange-400 mr-2 relative before:absolute before:inset-0 before:flex before:items-center before:justify-center before:opacity-0 before:content-['✔'] before:text-orange-400 before:text-xs checked:before:opacity-100"
            />
            <label
              htmlFor="terms"
              className={`${firacode.className} flex text-xs items-center space-x-1 text-zinc-300 cursor-pointer italic`}
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

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              merriweather.className
            } w-full px-4 py-2 text-center bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Creando Cuenta..." : "Crear Cuenta"}
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
