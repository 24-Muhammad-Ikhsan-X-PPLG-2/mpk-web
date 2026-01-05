"use client";
import AdminLayout from "@/components/Admin/layout/AdminLayout";
import {
  formatKeSistemAman,
  formatTanggalIndoKeSistem,
  HapusGambarSeminar,
  UploadGambarSeminar,
} from "@/lib/client/utils";
import { SeminarPhotoType } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { Maximize, Pencil, SquareParking, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { editSeminar } from "./action";
import ErrorModal from "@/components/error-modal";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import Image from "next/image";

type EditSeminarProps = {
  id: number;
  seminar: SeminarPhotoType;
};

const formSchema = z.object({
  nama: z.string().nonempty({
    error: "Nama Seminar tidak boleh kosong!",
  }),
  deskripsi: z.string(),
  tgl: z.string().nonempty({
    error: "Tanggal tidak boleh kosong!",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const EditSeminar: FC<EditSeminarProps> = ({ id, seminar }) => {
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
    resolver: zodResolver(formSchema),
    defaultValues: {
      deskripsi: seminar.deskripsi ?? "",
      nama: seminar.name,
      tgl: formatTanggalIndoKeSistem(seminar.tgl),
    },
  });
  const fullscreenImgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        fullscreenImgRef.current &&
        !fullscreenImgRef.current.contains(e.target as Node)
      ) {
        setFullscreenImg(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);
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
  return (
    <>
      <ErrorModal errorDelete={errorEdit} setErrorDelete={setErrorEdit} />
      <AdminLayout
        pageName={`Seminar / Edit / ${seminar.name}`}
        title={`Edit Seminar "${seminar.name}"`}
        pageActive="Seminar edit"
      >
        <AnimatePresence mode="wait">
          {fullscreenImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center z-9999 px-4"
            >
              <div
                className="w-[450px] h-[600px] relative"
                ref={fullscreenImgRef}
              >
                <div
                  className="absolute right-5 top-5 cursor-pointer"
                  onClick={() => setFullscreenImg(false)}
                >
                  <X className="size-6 text-white mix-blend-difference" />
                </div>
                <img
                  src={previewUrl ? previewUrl : seminar.img_url}
                  loading="lazy"
                  className="rounded-xl w-full h-full object-cover object-center"
                  alt=""
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full h-full flex min-h-[70vh] items-center justify-center">
          <form
            onSubmit={handleSubmit(handleOnEditSeminar)}
            className="bg-white lg:w-fit w-full h-fit rounded-xl shadow p-4 relative"
          >
            <div className="flex lg:flex-row flex-col w-full items-center lg:items-start gap-4">
              <div className="w-fit h-fit relative">
                <div
                  className="absolute bottom-2 left-2 bg-black/50 rounded-full backdrop-blur-sm p-2 cursor-pointer"
                  onClick={() => setFullscreenImg(true)}
                >
                  <Maximize className="size-6 text-white" />
                </div>
                <label
                  className="absolute bottom-2 right-2 bg-black/50 rounded-full backdrop-blur-sm p-2 cursor-pointer"
                  htmlFor="img_file"
                >
                  <Pencil className="size-6 text-white" />
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="img_file"
                  accept="image/*"
                  name="seminar_img"
                  onChange={handleFileChange}
                />

                <Image
                  width={225}
                  height={300}
                  src={previewUrl ? previewUrl : seminar.img_url}
                  className="w-[225px] h-[300px] object-cover object-center rounded-xl"
                  alt=""
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/450x600?text=Not+Found";
                  }}
                  loading="lazy"
                />
              </div>
              <div className="grid lg:grid-cols-2 w-full lg:w-fit grid-cols-1 gap-5">
                <div className="flex flex-col gap-3 w-full">
                  <div className="lg:w-80 w-full mt-1 flex flex-col gap-1">
                    <label
                      htmlFor="name"
                      className="text-secondary font-semibold lg:text-lg text-base"
                    >
                      Nama Seminar<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`outline-none border px-2 py-2 lg:w-80 w-full rounded-xl ${
                        errors.nama
                          ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                          : "bg-neutral-200 border-slate-400"
                      }`}
                      placeholder="Contoh: Pentingnya pendidikan."
                      {...register("nama")}
                    />
                    {errors.nama && (
                      <p className="text-red-600 lg:text-base text-sm">
                        {errors.nama.message}
                      </p>
                    )}
                  </div>
                  <div className="lg:w-80 w-full mt-1 flex flex-col gap-1">
                    <label
                      htmlFor="deskripsi"
                      className="text-secondary font-semibold lg:text-lg text-base"
                    >
                      Deskripsi Seminar
                    </label>
                    <textarea
                      id="deskripsi"
                      placeholder="Contoh: Seminar yg menjelaskan tentang seputaran pendidikan untuk menuju kesejahteraan."
                      className="outline-none bg-neutral-200 border border-slate-400 px-2 py-2 lg:w-80 w-full rounded-xl min-h-40"
                      {...register("deskripsi")}
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <div className="lg:w-80 w-full mt-1 flex flex-col gap-1">
                    <label
                      htmlFor="tgl"
                      className="text-secondary font-semibold lg:text-lg text-base"
                    >
                      Tanggal<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="tgl"
                      type="date"
                      className={`outline-none border px-2 py-2 lg:w-80 w-full rounded-xl ${
                        errors.tgl
                          ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                          : "bg-neutral-200 border-slate-400"
                      }`}
                      {...register("tgl")}
                    />
                    {errors.tgl && (
                      <p className="text-red-600 lg:text-base text-sm">
                        {errors.tgl.message}
                      </p>
                    )}
                  </div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className={`lg:hidden block w-fit text-white font-semibold rounded-xl cursor-pointer px-7 py-2 bottom-5 right-5 disabled:bg-gray-500 transition duration-200 ${
                      isSuccess ? "bg-green-500" : "bg-primary"
                    }`}
                  >
                    {isLoading
                      ? "Memproses..."
                      : isSuccess
                      ? "Sukses"
                      : "Simpan"}
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`absolute transition duration-200 lg:block hidden w-fit text-white font-semibold rounded-xl cursor-pointer px-7 py-2 bottom-5 right-5 disabled:bg-gray-500 ${
                isSuccess ? "bg-green-500" : "bg-primary"
              }`}
            >
              {isLoading ? "Memproses..." : isSuccess ? "Sukses" : "Simpan"}
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditSeminar;
