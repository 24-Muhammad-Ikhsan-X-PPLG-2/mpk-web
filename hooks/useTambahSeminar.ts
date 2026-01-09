"use client";

import { AddSeminar } from "@/app/admin/seminar/tambah/action";
import { UploadGambarSeminar } from "@/lib/client/utils";
import { FormSchemaTambahSeminar } from "@/schema/schema-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import imageCompression from "browser-image-compression";

type FormSchemaType = z.infer<typeof FormSchemaTambahSeminar>;

const useTambahSeminar = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fullscreenImg, setFullscreenImg] = useState(false);
  const [errorImg, setErrorImg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchemaTambahSeminar),
    defaultValues: {
      deskripsi: "",
      nama: "",
      tgl: "",
    },
  });
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setErrorImg("");
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setErrorImg("File harus berupa gambar");
        return;
      }
      setSelectedFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };
  const handleOnTambahSeminar: SubmitHandler<FormSchemaType> = async ({
    deskripsi,
    nama,
    tgl,
  }) => {
    setErrorImg("");
    setIsLoading(true);
    if (!selectedFile) {
      setErrorImg("Image Seminar tidak boleh kosong!");
      setIsLoading(false);
      return;
    }
    let fileToUpload = selectedFile;
    if (selectedFile.type !== "image/webp") {
      console.log("Mengompres gambar...");
      const compressBlob = await imageCompression(selectedFile, {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: "image/webp",
      });
      console.log("Pengompresan gambar selesai.");
      const compressedFile = new File([compressBlob], "image.webp", {
        type: "image/webp",
      });
      fileToUpload = compressedFile;
    }
    const { path, error: ErrorUpload } = await UploadGambarSeminar(
      fileToUpload
    );
    if (ErrorUpload) {
      setErrorImg(ErrorUpload);
      setIsLoading(false);
      return;
    }
    if (!path) {
      setErrorImg("Unknown Error");
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.set("name", nama);
    formData.set("deskripsi", deskripsi);
    formData.set("tgl", tgl);
    formData.set("img_path", path);
    const { error } = await AddSeminar(formData);
    if (error) {
      setErrorImg(error);
      setIsLoading(false);
      return;
    }
    router.push("/admin");
  };
  const handleMaximizeImg = (state: boolean) => {
    if (!previewUrl) {
      setErrorImg("Masukkan gambar terlebih dahulu!");
      return;
    }
    setFullscreenImg(state);
  };
  return {
    register,
    handleSubmit,
    fullscreenImg,
    setFullscreenImg,
    errorImg,
    isLoading,
    handleFileChange,
    handleOnTambahSeminar,
    handleMaximizeImg,
    errors,
    setErrorImg,
    previewUrl,
  };
};

export default useTambahSeminar;
