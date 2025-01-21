// src/components/Dashboard/AvatarMenu.tsx

import React from "react";
import { supabase } from "@/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

interface AvatarMenuProps {
  user: User | null;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-zinc-200">{user?.email}</span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-500"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default AvatarMenu;
