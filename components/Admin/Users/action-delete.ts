"use server";

import { createClient, createClientAdmin } from "@/lib/supabase/server";

export async function DeleteAkunServerAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) {
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
    const { data: dataProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    const { data: targetProfile } = await supabase
      .from("profiles")
      .select()
      .eq("id", id)
      .maybeSingle();
    if (user.id === id) {
      return {
        error: "Tidak bisa hapus user sendiri!!",
      };
    }
    if (!dataProfile) {
      return {
        error: "Akun kamu tidak ada role. Akses dibatasi.",
      };
    }
    if (dataProfile.role !== "super-admin") {
      return {
        error: "Akun kamu tidak bisa menghapus akun ini. Akses dibatasi.",
      };
    }
    if (targetProfile?.role === "super-admin") {
      return {
        error: "Tidak diizinkan menghapus sesama super-admin!",
      };
    }
    const supabaseAdmin = await createClientAdmin();

    const { error } = await supabaseAdmin.auth.admin.deleteUser(id, false);
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
      error: "Unexpected error!",
    };
  }
}
