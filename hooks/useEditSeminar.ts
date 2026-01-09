"use client";

import {
  formatTanggalIndoKeSistem,
  HapusGambarSeminar,
  UploadGambarSeminar,
} from "@/lib/client/utils";
import { FormSchemaEditSeminar } from "@/schema/schema-zod";
import { SeminarPhotoType } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import imageCompression from "browser-image-compression";
import { editSeminar } from "@/app/admin/seminar/edit/[id]/action";

type FormSchemaType = z.infer<typeof FormSchemaEditSeminar>;

const useEditSeminar = ({
  seminar,
  id,
}: {
  seminar: SeminarPhotoType | null;
  id: number;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fullscreenImg, setFullscreenImg] = useState(false);
  const [errorEdit, setErrorEdit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchemaEditSeminar),
    defaultValues: {
      deskripsi: seminar ? seminar.deskripsi : "",
      nama: seminar ? seminar.name : "",
      tgl: seminar ? formatTanggalIndoKeSistem(seminar.tgl) : "",
    },
  });
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Tolong pilihnya file gambar!!!");
        return;
      }
      setSelectedFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };
  const handleOnEditSeminar: SubmitHandler<FormSchemaType> = async ({
    deskripsi,
    nama,
    tgl,
  }) => {
    if (!seminar) return;
    let img_path = seminar.img_url;
    setIsLoading(true);
    setIsSuccess(false);
    if (selectedFile) {
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
      const { error: ErrorUpload, path } = await UploadGambarSeminar(
        fileToUpload
      );
      if (ErrorUpload) {
        setErrorEdit(ErrorUpload);
        setIsLoading(false);
        return;
      }
      if (!path) {
        setErrorEdit("Unknown error");
        setIsLoading(false);
        return;
      }
      img_path = path;
      const { error: ErrorHapus } = await HapusGambarSeminar(seminar.img_url);
      if (ErrorHapus) {
        setErrorEdit(ErrorHapus);
        setIsLoading(false);
        return;
      }
    }
    const formData = new FormData();
    formData.set("name", nama);
    formData.set("deskripsi", deskripsi);
    formData.set("tgl", tgl);
    formData.set("id", id.toString());
    formData.set("img_path", img_path);

    const { error } = await editSeminar(formData);
    if (error) {
      setErrorEdit(error);
    }
    setIsLoading(false);
    router.refresh();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 1500);
  };
  return {
    register,
    handleSubmit,
    errors,
    previewUrl,
    fullscreenImg,
    setFullscreenImg,
    errorEdit,
    isLoading,
    isSuccess,
    handleFileChange,
    handleOnEditSeminar,
    setErrorEdit,
    router,
  };
};

export default useEditSeminar;
