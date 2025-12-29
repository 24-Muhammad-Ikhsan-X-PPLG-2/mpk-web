"use server";

import { createClient } from "@/lib/supabase/server";
import { formatTanggalLengkap } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function editSeminar(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const tgl = formatTanggalLengkap(formData.get("tgl") as string);
  const id = formData.get("id") as string;
  const img_file = formData.get("img_file") as File | null;
  let pathImg = formData.get("img_path") as string;
  if (img_file) {
    const fileExt = img_file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const { error, data } = await supabase.storage
      .from("seminar")
      .upload(`/${fileName}`, img_file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) return { error: error.message };
    const {
      data: { publicUrl },
    } = supabase.storage.from("seminar").getPublicUrl(data.path);
    pathImg = publicUrl;
  }
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
  return redirect(`/admin/seminar/edit/${id}`);
}
