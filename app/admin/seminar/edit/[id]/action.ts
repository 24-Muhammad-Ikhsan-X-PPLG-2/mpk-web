"use server";

import { createClient } from "@/lib/supabase/server";
import { formatTanggalLengkap } from "@/lib/server/utils";
import { redirect } from "next/navigation";

export async function editSeminar(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const tgl = formatTanggalLengkap(formData.get("tgl") as string);
  const id = formData.get("id") as string;
  const pathImg = formData.get("img_path") as string;
  if (!name || !deskripsi || !tgl || !id || !pathImg) {
    return {
      error: "Bad request!",
    };
  }
  try {
    const { error } = await supabase
      .from("seminar_photo")
      .update({
        name,
        deskripsi,
        tgl,
        img_url: pathImg,
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
