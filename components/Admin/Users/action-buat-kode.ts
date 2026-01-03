"use server";

import { createClient } from "@/lib/supabase/server";

export async function BuatKodeInviteServerAction(formData: FormData) {
  const banyakOrang = formData.get("banyak_orang") as string;
  const expiresDay = formData.get("expires") as string;
  if (!banyakOrang || !expiresDay) {
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
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Number(expiresDay));
    const { error } = await supabase.from("invite_code").insert({
      code: inviteCode,
      person: banyakOrang,
      expires_at: expiresAt.toISOString(),
      is_used: "0",
    });
    if (error) {
      return {
        error: error.message,
      };
    }
    return {
      error: null,
      code: inviteCode,
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
