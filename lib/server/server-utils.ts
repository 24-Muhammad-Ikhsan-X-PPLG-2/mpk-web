"use server";

import { createClient } from "@supabase/supabase-js";

export const checkOldPassword = async (email: string, password: string) => {
  const tempSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
  const { error } = await tempSupabase.auth.signInWithPassword({
    email,
    password,
  });
  return !error;
};
