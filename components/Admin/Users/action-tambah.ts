"use server";

import { createClientAdmin } from "@/lib/supabase/server";

export async function TambahAkunServerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!name || !email || !password) {
    return {
      error: "Bad request!",
    };
  }
  const supabase = await createClientAdmin();
  try {
    const { data: IsNameNotUnique } = await supabase
      .from("profiles")
      .select()
      .eq("username", name)
      .maybeSingle();
    const { data: IsEmailNotUnique } = await supabase
      .from("profiles")
      .select()
      .eq("email", email)
      .maybeSingle();
    if (IsNameNotUnique) {
      return {
        error: "Username sudah digunakan!",
      };
    }
    if (IsEmailNotUnique) {
      return {
        error: "Email sudah digunakan!",
      };
    }
    const { error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        username: name,
        desc: "I'm mpk broo!",
        role: "admin",
        email,
      },
      email_confirm: true,
    });
    if (error) {
      return {
        error: error.message,
      };
    }
    return {
      error: null,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Unexpected error",
    };
  }
}
