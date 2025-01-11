'use client'

import { useState } from "react";
import { supabase } from "@/supabase/supabaseClient";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Usuario creado correctamente. Por favor, verifica tu correo."
      );
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm text-gray-200"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 rounded-md transition"
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
