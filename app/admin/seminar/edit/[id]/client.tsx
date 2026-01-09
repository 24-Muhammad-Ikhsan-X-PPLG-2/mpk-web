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
import { createClient } from "@/lib/supabase/client";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { useClickOutside } from "@/hooks/useClickOutside";
import useEditSeminar from "@/hooks/useEditSeminar";
import { useAsyncEffect } from "@/hooks/useAsyncEffect";
import Loading from "./loading";

type EditSeminarProps = {
  id: number;
};

const supabase = createClient();

const fetchSeminar = async (id: number): Promise<SeminarPhotoType | null> => {
  const { data } = (await supabase
    .from("seminar_photo")
    .select()
    .eq("id", id)
    .maybeSingle()) as PostgrestMaybeSingleResponse<SeminarPhotoType>;
  return data;
};

const EditSeminar: FC<EditSeminarProps> = ({ id }) => {
  const [seminar, setSeminar] = useState<SeminarPhotoType | null>(null);
  const {
    errorEdit,
    errors,
    fullscreenImg,
    handleFileChange,
    handleOnEditSeminar,
    handleSubmit,
    isLoading,
    isSuccess,
    previewUrl,
    register,
    setFullscreenImg,
    setErrorEdit,
    router,
  } = useEditSeminar({ id, seminar });
  const fullscreenImgRef = useRef<HTMLDivElement>(null);
  useClickOutside(fullscreenImgRef, () => setFullscreenImg(false));
  const { isLoading: isLoadingSeminar } = useAsyncEffect(async () => {
    const dataSeminar = await fetchSeminar(id);
    if (!dataSeminar) {
      router.push("/admin");
      return;
    }
    setSeminar(dataSeminar);
  }, []);
  if (!seminar && isLoadingSeminar) {
    return <Loading />;
  }
  if (!seminar) {
    return (
      <>
        <div>Not Found</div>
      </>
    );
  }
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
