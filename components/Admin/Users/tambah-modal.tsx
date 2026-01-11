"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, X } from "lucide-react";
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
import { TambahAkunServerAction } from "./action-tambah";
import ErrorModal from "@/components/error-modal";
import { useClickOutside } from "@/hooks/useClickOutside";
import { FormSchemaTambahUsers } from "@/schema/schema-zod";
import useTambahUser from "@/hooks/useTambahUser";

type TambahModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const TambahModal: FC<TambahModalProps> = ({ setShowModal, showModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    errorSubmit,
    errors,
    handleSubmit,
    handleTambahAkun,
    isLoading,
    register,
    reset,
    setErrorSubmit,
  } = useTambahUser({ setShowModal });
  const modalRef = useRef<HTMLFormElement>(null);
  useClickOutside(modalRef, () => setShowModal(false));
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (!showModal) {
      reset();
    }
  }, [showModal]);
  return (
    <>
      <ErrorModal errorDelete={errorSubmit} setErrorDelete={setErrorSubmit} />
      <AnimatePresence mode="wait">
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full z-9999 top-0 left-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4"
          >
            <form
              onSubmit={handleSubmit(handleTambahAkun)}
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
                <p className="font-semibold text-lg">Tambah Akun</p>
              </div>
              <div
                id="body_modal_tambah"
                className="flex flex-col w-full items-center mt-5 gap-2"
              >
                <div className="flex flex-col md:w-fit w-full">
                  <label
                    htmlFor="name"
                    className={`font-semibold mb-1 text-base ${
                      errors.name ? "text-red-600" : "text-secondary"
                    }`}
                  >
                    Nama Akun
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`md:w-100 w-full py-1.5 outline-none px-4 rounded-full border ${
                      errors.name
                        ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                        : "bg-slate-200 border-slate-600"
                    }`}
                    placeholder="Contoh: Muhammad Ikhsan"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-600">{errors.name?.message}</p>
                  )}
                </div>
                <div className="flex flex-col md:w-fit w-full">
                  <label
                    htmlFor="email"
                    className={`${
                      errors.email ? "text-red-600" : "text-secondary"
                    } font-semibold mb-1 text-base`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`md:w-100 w-full py-1.5 outline-none px-4 rounded-full border ${
                      errors.email
                        ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                        : "bg-slate-200 border-slate-600"
                    }`}
                    placeholder="Contoh: emailkamu@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email?.message}</p>
                  )}
                </div>
                <div className="flex flex-col md:w-fit w-full">
                  <label
                    htmlFor="role"
                    className={`${
                      errors.role ? "text-red-600" : "text-secondary"
                    } font-semibold mb-1 text-base`}
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className={`md:w-100 w-full py-1.5 outline-none px-2 rounded-full border ${
                      errors.role
                        ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                        : "bg-slate-200 border-slate-600"
                    }`}
                    {...register("role")}
                  >
                    <option value="" defaultChecked>
                      Pilih role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-600">{errors.role?.message}</p>
                  )}
                </div>
                <div className="flex flex-col md:w-fit w-full">
                  <label
                    htmlFor="password"
                    className={`${
                      errors.password ? "text-red-600" : "text-secondary"
                    } font-semibold mb-1 text-base`}
                  >
                    Password
                  </label>
                  <div
                    className={`md:w-100 w-full  outline-none  rounded-full border flex items-center ${
                      errors.password
                        ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                        : "bg-slate-200 border-slate-600"
                    }`}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Contoh: ......"
                      className="outline-none w-full py-1.5 px-4"
                      {...register("password")}
                    />
                    <div
                      className={`cursor-pointer size-6 mr-4 ${
                        errors.password ? "text-red-600" : "text-black"
                      }`}
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <Eye className="" />
                      ) : (
                        <EyeOff className="" />
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-600">{errors.password?.message}</p>
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
                  {isLoading ? "Process..." : "Simpan"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TambahModal;
