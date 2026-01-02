"use server";
import { createClient, createClientAdmin } from "@/lib/supabase/server";

export async function EditAkunServerAction(formData: FormData) {
  const username = formData.get("username") as string;
  const role = formData.get("role") as string;
  const id = formData.get("id") as string;
  const desc = formData.get("desc") as string;
  if (!role || !username || !id || !desc) {
    return {
      error: "Bad request!",
    };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: "User belum login!",
    };
  }
  const { data: userSaatIni } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (!userSaatIni) {
    return {
      error: "Akun tidak ada profile. Akses dibatasi.",
    };
  }
  if (userSaatIni.role !== "super-admin") {
    return {
      error: "Akun kamu tidak bisa memakai fitur ini. Akses dibatasi.",
    };
  }
  const { data: CekUser } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", id) // Pastikan ID-nya bukan ID user yang sedang kita edit
    .maybeSingle();
  if (CekUser) {
    return {
      error: "Username sudah digunakan!",
    };
  }
  const { data: targetUser } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", id)
    .maybeSingle();
  if (targetUser?.role === "super-admin") {
    return {
      error: "Tidak diizinkan mengedit akun sesama super-admin!",
    };
  }
  const supabaseAdmin = await createClientAdmin();
  const { error } = await supabaseAdmin
    .from("profiles")
    .update({
      username,
      role,
      desc,
    })
    .eq("id", id);
  if (error) {
    return {
      error: error.message,
    };
  }
  return {
    error: null,
  };
}
