// src/data/authHelpers.ts

import { supabase } from "@/supabase/supabaseClient";
import { NextRouter } from "next/router";

export const checkUserSession = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => void,
  setLoading: (loading: boolean) => void,
  router: NextRouter
) => {
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    router.push("/login");
  } else {
    setUser(data.user);
  }
  setLoading(false);
};

export const handleAuthStateChange = (router: NextRouter) =>
  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") {
      router.push("/login");
    }
  });
