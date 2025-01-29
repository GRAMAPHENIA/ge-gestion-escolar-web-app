"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { LuLoader } from "react-icons/lu";

export default function GoogleSignin() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://fpajlkdagwlguqmbmyxb.supabase.co/auth/v1/callback",
        },
      });

      if (error) {
        throw error;
      }
    } catch {
      toast({
        title: "Por favor, intenta de nuevo.",
        description: "Hubo un error al iniciar sesión con Google.",
      });
      setIsGoogleLoading(false);
    }
  }

  return (
    <button type="button" onClick={signInWithGoogle} disabled={isGoogleLoading}>
      {isGoogleLoading ? (
        <LuLoader className="mr-2 size-4 animate-spin" />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2"
        />
      )}{" "}
      Iniciar sesión con Google
    </button>
  );
}
