"use client";
import z from "zod";

export const FormSchemaTambahUsers = z.object({
  name: z.string().min(3, {
    error: "Nama Akun minimal 3 karakter!",
  }),
  email: z.email({
    error: "Email tidak valid!",
  }),
  role: z.string().nonempty({
    error: "Role tidak boleh kosong!",
  }),
  password: z.string().min(8, {
    error: "Password minimal 8 karakter!",
  }),
});

export const FormLoginSchema = z.object({
  email: z.email({
    error: "Invalid email address!",
  }),
  password: z.string().nonempty({
    error: "Password is required!",
  }),
});

export const FormSchemaInviteAdmin = z.object({
  code: z.string().nonempty("Kode tidak boleh kosong!"),
});

export const FormSchemaTambahSeminar = z.object({
  nama: z.string().nonempty({
    error: "Nama Seminar tidak boleh kosong!",
  }),
  deskripsi: z.string(),
  tgl: z.string().nonempty({
    error: "Tanggal tidak boleh kosong!",
  }),
});

export const FormSchemaCreateAccountFromCode = z.object({
  username: z
    .string()
    .nonempty("Username tidak boleh kosong")
    .min(3, "Username minimal 3 karakter!"),
  email: z.email("Email tidak valid!").nonempty("Email tidak boleh kosong!"),
  password: z
    .string()
    .nonempty("Password tidak boleh kosong!")
    .min(8, "Password minimal 8 karakter!"),
});

export const FormSchemaEditSeminar = z.object({
  nama: z.string().nonempty({
    error: "Nama Seminar tidak boleh kosong!",
  }),
  deskripsi: z.string(),
  tgl: z.string().nonempty({
    error: "Tanggal tidak boleh kosong!",
  }),
});
