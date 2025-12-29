"use server";

import { createClient } from "@/lib/supabase/server";
import { formatTanggalLengkap } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function AddSeminar(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const tgl = formatTanggalLengkap(formData.get("tgl") as string);
  const img_file = formData.get("img_file") as File;
  const fileExt = img_file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;
  const { data: DataStorage, error: ErrorStorage } = await supabase.storage
    .from("seminar")
    .upload(`/${fileName}`, img_file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (ErrorStorage) {
    return {
      error: ErrorStorage.message,
    };
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from("seminar").getPublicUrl(DataStorage.path);
  const { error } = await supabase.from("seminar_photo").insert({
    img_url: publicUrl,
    name,
    deskripsi,
    tgl,
  });
  if (error) {
    return {
      error: error.message,
    };
  }
  return redirect(`/admin/`);
}
