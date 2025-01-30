// src/components/AvatarMenu.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import { GoSignOut } from "react-icons/go";
import { AiOutlineSetting } from "react-icons/ai";

interface AvatarMenuProps {
  user: User | null;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative">
      <button
        className="w-9 h-9 bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-full flex items-center justify-center cursor-pointer text-xs"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {user ? user.email?.charAt(0).toUpperCase() : "?"}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-8 p-4 mt-2 w-72 bg-zinc-800 text-gray-100 rounded-md shadow-lg z-20 border border-zinc-800">
          {user && (
            <div className="px-4 py-2 border-b border-gray-600">
              <p className="text-sm font-medium">Hola,</p>
              <p className="text-sm font-semibold truncate">{user.email}</p>
            </div>
          )}

          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 p-2 mt-4 rounded-full bg-zinc-800/70 hover:bg-zinc-700/40"
            onClick={() => {
              supabase.auth.signOut();
              router.push("/");
            }}
          >
            <GoSignOut className="mr-2 text-xl" /> Cerrar sesión
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 p-2 mt-2 rounded-full bg-zinc-800/70 hover:bg-zinc-700/40"
            onClick={() => alert("Configuración aún no implementada")}
          >
            <AiOutlineSetting className="mr-2 text-xl" /> Configuración
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;