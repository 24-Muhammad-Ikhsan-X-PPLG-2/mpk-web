"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { BuatKodeInviteServerAction } from "./action-buat-kode";
import ErrorModal from "@/components/error-modal";

type BuatKodeInviteModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const formSchema = z.object({
  berapaBanyakOrang: z.string().nonempty("Masukan berapa banyak orang!"),
  expires: z.string().nonempty("Pilih kedaluwarsa kode!"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const BuatKodeInviteModal: FC<BuatKodeInviteModalProps> = ({
  setShowModal,
  showModal,
}) => {
  const modalRef = useRef<HTMLFormElement>(null);
  const modalCodeRef = useRef<HTMLDivElement>(null);
  const [showModalCode, setShowModalCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorBuatKode, setErrorBuatKode] = useState("");
  const [isSuccessCopy, setIsSuccessCopy] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      berapaBanyakOrang: "",
    },
  });
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !isLoading
      ) {
        setShowModal(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (!showModal) {
      reset();
    }
  }, [showModal]);
  const handleBuatKode: SubmitHandler<FormSchemaType> = async ({
    berapaBanyakOrang,
    expires,
  }) => {
    setIsLoading(true);
    setErrorBuatKode("");
    const formData = new FormData();
    formData.set("banyak_orang", berapaBanyakOrang);
    formData.set("expires", expires);
    const { error, code } = await BuatKodeInviteServerAction(formData);
    if (error) {
      setErrorBuatKode(error);
      setShowModal(false);
      return;
    }
    setIsLoading(false);
    setShowModal(false);
    setShowModalCode(code ?? "");
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCopyCode = async () => {
    if (showModalCode.trim() === "") return;
    await navigator.clipboard.writeText(showModalCode);
    setIsSuccessCopy(true);
    setTimeout(() => {
      setIsSuccessCopy(false);
    }, 2000);
  };
  return (
    <>
      <ErrorModal
        errorDelete={errorBuatKode}
        setErrorDelete={setErrorBuatKode}
      />
      <AnimatePresence mode="wait">
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full z-9999 top-0 left-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4"
          >
            <form
              onSubmit={handleSubmit(handleBuatKode)}
              className="bg-white md:w-150 h-fit w-full md:p-3 p-5 rounded-xl relative"
              ref={modalRef}
            >
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={handleCloseModal}
              >
                <X className="size-6 text-black" />
              </div>
              <div id="header_modal_tambah" className="text-center text-black">
                <p className="font-semibold text-lg">Buat kode undangan</p>
                <p className="text-gray-500 font-light">
                  Mempermudah seseorang untuk daftar menjadi admin.
                </p>
              </div>
              <div
                id="body_modal_tambah"
                className="flex flex-col w-full items-center mt-5 gap-2"
              >
                <div className="flex flex-col md:w-fit w-full">
                  <label
                    htmlFor="berapaBanyakOrang"
                    className={`font-semibold mb-1 text-base ${
                      errors.berapaBanyakOrang
                        ? "text-red-600"
                        : "text-secondary"
                    }`}
                  >
                    Untuk berapa banyak orang?
                  </label>
                  <input
                    type="number"
                    id="name"
                    className={`md:w-100 w-full py-1.5 outline-none px-4 rounded-full border ${
                      errors.berapaBanyakOrang
                        ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                        : "bg-slate-200 border-slate-600"
                    }`}
                    placeholder="Contoh: 5"
                    {...register("berapaBanyakOrang")}
                  />
                  {errors.berapaBanyakOrang && (
                    <p className="text-red-600">
                      {errors.berapaBanyakOrang?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:w-fit w-full">
                  <label
                    htmlFor="expires"
                    className={`${
                      errors.expires ? "text-red-600" : "text-secondary"
                    } font-semibold mb-1 text-base`}
                  >
                    Kedaluwarsa kode
                  </label>
                  <select
                    id="expires"
                    className={`md:w-100 w-full py-1.5 outline-none px-2 rounded-full border ${
                      errors.expires
                        ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                        : "bg-slate-200 border-slate-600"
                    }`}
                    {...register("expires")}
                  >
                    <option value="" defaultChecked>
                      Pilih kedaluwarsa kode
                    </option>
                    <option value="1">1 hari</option>
                    <option value="2">2 hari</option>
                    <option value="3">3 hari</option>
                    <option value="4">4 hari</option>
                    <option value="5">5 hari</option>
                    <option value="6">6 hari</option>
                    <option value="7">7 hari</option>
                    <option value="8">8 hari</option>
                    <option value="9">9 hari</option>
                    <option value="10">10 hari</option>
                  </select>
                  {errors.expires && (
                    <p className="text-red-600">{errors.expires?.message}</p>
                  )}
                </div>
              </div>
              <div
                id="footer_modal_tambah"
                className="flex flex-col items-center mt-5 mb-6 w-full"
              >
                <button
                  disabled={isLoading}
                  className="md:w-100 w-full rounded-full text-center text-white font-semibold bg-green-500 py-2 cursor-pointer hover:bg-green-500/85 active:scale-90 transition duration-150 disabled:bg-gray-500"
                  type="submit"
                >
                  {isLoading ? "Process..." : "Buat"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {showModalCode.trim() !== "" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full z-9999 top-0 left-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4"
          >
            <form
              className="bg-white md:w-150 h-fit w-full md:p-3 p-5 rounded-xl relative"
              ref={modalRef}
            >
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowModalCode("")}
              >
                <X className="size-6 text-black" />
              </div>
              <div id="header_modal_tambah" className="text-center text-black">
                <p className="font-semibold text-lg">Buat kode undangan</p>
                <p className="text-gray-500 font-light">
                  Mempermudah seseorang untuk daftar menjadi admin.
                </p>
              </div>
              <div
                id="body_modal_tambah"
                className="flex flex-col w-full items-center mt-5 gap-2 mb-5"
              >
                <div className="flex gap-3 items-center">
                  <p>Kode invite: {showModalCode}</p>
                  <div className="cursor-pointer" onClick={handleCopyCode}>
                    {isSuccessCopy ? (
                      <Check className="size-5" />
                    ) : (
                      <Copy className="size-5" />
                    )}
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BuatKodeInviteModal;
