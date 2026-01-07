"use client";
import { ProfileType, SeminarPhotoType } from "@/types/db";
import { createClient } from "../supabase/client";
import { PostgrestResponse } from "@supabase/supabase-js";

const supabase = createClient();

export const formatTanggalLengkap = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatKeSistemAman = (dateString: string) => {
  const parts = dateString.split(/[-/]/); // Bisa split pakai - atau /

  if (parts.length !== 3) return "Format tidak valid";

  const [d, m, y] = parts;

  // Memastikan bulan dan tanggal selalu 2 digit (padding)
  const day = d.padStart(2, "0");
  const month = m.padStart(2, "0");

  return `${y}-${month}-${day}`;
};

export const formatTanggalIndoKeSistem = (dateString: string): string => {
  // 1. Buat kamus bulan Indonesia
  const bulanIndo: { [key: string]: string } = {
    januari: "01",
    februari: "02",
    maret: "03",
    april: "04",
    mei: "05",
    juni: "06",
    juli: "07",
    agustus: "08",
    september: "09",
    oktober: "10",
    november: "11",
    desember: "12",
  };

  // 2. Pecah string berdasarkan spasi
  // Contoh: "29 Desember 2025" -> ["29", "Desember", "2025"]
  const parts = dateString.trim().split(/\s+/);

  if (parts.length !== 3) return "Format tidak valid";

  const [d, m, y] = parts;

  // 3. Ambil angka bulan dari kamus (ubah ke lowercase dulu)
  const month = bulanIndo[m.toLowerCase()];

  if (!month) return "Bulan tidak valid";

  // 4. Pastikan tanggal 2 digit (misal "5" jadi "05")
  const day = d.padStart(2, "0");

  // 5. Gabungkan jadi YYYY-MM-DD
  return `${y}-${month}-${day}`;
};

export async function UploadGambarSeminar(gambar: File) {
  const fileExt = gambar.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const { data: DataStorage, error: ErrorStorage } = await supabase.storage
    .from("seminar")
    .upload(`/${fileName}`, gambar, {
      cacheControl: "3600",
      upsert: false,
    });
  if (ErrorStorage) {
    return { error: ErrorStorage.message, path: null };
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from("seminar").getPublicUrl(DataStorage.path);
  return {
    error: null,
    path: publicUrl,
  };
}

export async function HapusGambarSeminar(fullPath: string) {
  const path = new URL(fullPath).pathname.split("/seminar/")[1];
  const { error } = await supabase.storage.from("seminar").remove([path]);
  if (error) {
    return {
      error: error.message,
    };
  }
  return {
    error: null,
  };
}

export const fetchMembers: () => Promise<ProfileType[] | null> = async () => {
  const { data } = (await supabase
    .from("profiles")
    .select()) as PostgrestResponse<ProfileType>;
  return data;
};

export const fetchTotalAdmin = async (): Promise<number> => {
  const { data } = (await supabase
    .from("profiles")
    .select()) as PostgrestResponse<ProfileType>;
  if (data) {
    return data.length;
  }
  return 0;
};

export const fetchSeminars = async (): Promise<SeminarPhotoType[] | null> => {
  const { data } = (await supabase
    .from("seminar_photo")
    .select()) as PostgrestResponse<SeminarPhotoType>;
  return data;
};
