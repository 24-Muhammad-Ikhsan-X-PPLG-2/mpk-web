"use client";
import AdminLayout from "@/components/Admin/layout/AdminLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Maximize, Pencil, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { AddSeminar } from "./action";
import { createClient } from "@/lib/supabase/client";
import ErrorModal from "@/components/error-modal";
import { UploadGambarSeminar } from "@/lib/client/utils";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

const TambahSeminar = () => {
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
    resolver: zodResolver(formSchema),
    defaultValues: {
      deskripsi: "",
      nama: "",
      tgl: "",
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
  return (
    <>
      <ErrorModal errorDelete={errorImg} setErrorDelete={setErrorImg} />
      <AdminLayout
        pageName={`Seminar / Tambah`}
        title={`Tambah Seminar`}
        pageActive="Tambah seminar"
      >
        <AnimatePresence mode="wait">
          {fullscreenImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 z-9999 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center px-4"
            >
              <div
                className="w-[450px] h-[600px] relative"
                ref={fullscreenImgRef}
              >
                <div
                  className="absolute right-5 top-5 cursor-pointer"
                  onClick={() => handleMaximizeImg(false)}
                >
                  <X className="size-6 text-white mix-blend-difference" />
                </div>
                <img
                  src={
                    previewUrl
                      ? previewUrl
                      : "https://placehold.co/450x600?text=Placeholder"
                  }
                  loading="lazy"
                  className="rounded-xl w-full h-full object-cover object-center"
                  alt=""
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full h-full min-h-[70vh] flex items-center justify-center">
          <form
            onSubmit={handleSubmit(handleOnTambahSeminar)}
            className="bg-white lg:w-fit w-full h-fit rounded-xl shadow p-4 relative"
          >
            <div className="flex lg:flex-row flex-col w-full items-center lg:items-start gap-4">
              <div>
                <div className="w-fit h-fit relative">
                  <div
                    className="absolute bottom-2 left-2 bg-black/50 rounded-full backdrop-blur-sm p-2 cursor-pointer"
                    onClick={() => handleMaximizeImg(true)}
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
                    onChange={handleFileChange}
                  />
                  {previewUrl ? (
                    <Image
                      width={450}
                      height={600}
                      src={previewUrl}
                      className="w-[225px] h-[300px] object-cover object-center rounded-xl"
                      alt=""
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://placehold.co/450x600?text=Not+Found";
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      width={450}
                      height={600}
                      src={"https://placehold.co/450x600?text=Placeholder"}
                      className="w-[225px] h-[300px] object-cover object-center rounded-xl"
                      alt=""
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://placehold.co/450x600?text=Not+Found";
                      }}
                      loading="lazy"
                      unoptimized
                    />
                  )}
                </div>
                {errorImg && (
                  <p className="text-red-600 text-wrap mt-1 flex justify-center items-center max-w-[225px]">
                    {errorImg}
                  </p>
                )}
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 w-full lg:w-fit gap-5">
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
                    type="submit"
                    className="lg:hidden block w-fit text-white font-semibold rounded-xl cursor-pointer px-7 py-2 bg-primary bottom-5 right-5"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="absolute lg:block hidden w-fit text-white font-semibold rounded-xl cursor-pointer px-7 py-2 bg-primary bottom-5 right-5 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? "Uploading..." : "Simpan"}
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default TambahSeminar;
