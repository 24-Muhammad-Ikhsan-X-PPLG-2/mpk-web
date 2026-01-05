"use server";

import { createClient } from "@/lib/supabase/server";
import { formatTanggalLengkap } from "@/lib/server/utils";
import { redirect } from "next/navigation";

export async function AddSeminar(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const tgl = formatTanggalLengkap(formData.get("tgl") as string);
  const img_path = formData.get("img_path") as string;
  if (!name || !tgl || !img_path) {
    return {
      error: "Bad request!",
    };
  }
  try {
    const { error } = await supabase.from("seminar_photo").insert({
      img_url: img_path,
      name,
      deskripsi,
      tgl,
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
      error: "Unexpected error!",
    };
  }
}
