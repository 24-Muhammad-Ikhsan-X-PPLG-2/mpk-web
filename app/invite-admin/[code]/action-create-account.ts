"use server";
import { createClient, createClientAdmin } from "@/lib/supabase/server";
import { InviteCodeType } from "@/types/db";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function CreateAccountServerAction(formData: FormData) {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const code = formData.get("code") as string;
  if (!email || !username || !password || !code) {
    return {
      error: "Bad request!",
    };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/admin");
  }
  try {
    const { data } = (await supabase
      .from("invite_code")
      .select("person, is_used, expires_at, id")
      .eq("code", code)
      .maybeSingle()) as PostgrestMaybeSingleResponse<InviteCodeType>;
    if (!data) {
      return {
        error: "Kode tidak valid!",
      };
    }
    const supabaseAdmin = await createClientAdmin();
    const now = new Date();
    const expiresDate = new Date(data.expires_at);
    if (now > expiresDate) {
      const { error: errorDelete } = await supabaseAdmin
        .from("invite_code")
        .delete()
        .eq("id", data.id);
      if (errorDelete) {
        return {
          error: errorDelete.message,
        };
      }
      return {
        error: "Kode sudah kedaluwarsa!",
      };
    }
    if (Number(data.person) === Number(data.is_used)) {
      return {
        error: "Kode sudah tidak bisa dipakai!",
      };
    }
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("username, email")
      .or(`username.eq.${username},email.eq.${email}`)
      .maybeSingle();

    if (existingUser) {
      // Cek mana yang duplikat untuk memberikan pesan error yang spesifik
      const isEmailTaken = existingUser.email === email;
      return {
        error: isEmailTaken
          ? "Email sudah dipakai!"
          : "Username sudah dipakai!",
      };
    }
    const { error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        username,
        email,
        role: "admin",
      },
      email_confirm: true,
    });
    if (error) {
      return {
        error: error.message,
      };
    }
    const { error: ErrorInviteCode } = await supabaseAdmin
      .from("invite_code")
      .update({
        is_used: String(Number(data.is_used) + 1),
      })
      .eq("code", code);
    if (ErrorInviteCode) {
      return {
        error: ErrorInviteCode.message,
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
