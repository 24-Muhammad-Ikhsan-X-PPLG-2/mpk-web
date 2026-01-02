"use server";

import { createClient, createClientAdmin } from "@/lib/supabase/server";

export async function TambahAkunServerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  if (!name || !email || !password || !role) {
    return {
      error: "Bad request!",
    };
  }
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        error: "User belum login!",
      };
    }
    const { data: DataProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    if (!DataProfile) {
      return {
        error: "Akun tidak punya role. Akses dibatasi.",
      };
    }
    if (DataProfile.role !== "super-admin") {
      return {
        error: "Akun kamu tidak bisa memakai fitur ini. Akses dibatasi.",
      };
    }
    const supabaseAdmin = await createClientAdmin();

    const { data: existingUser, error: checkError } = await supabase
      .from("profiles")
      .select("email, username")
      .or(`email.eq.${email},username.eq.${name}`)
      .maybeSingle();

    if (existingUser) {
      if (existingUser.email === email)
        return { error: "Email sudah digunakan!" };
      if (existingUser.username === name)
        return { error: "Username sudah digunakan!" };
    }

    const { error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        username: name,
        desc: "I'm mpk broo!",
        role,
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
