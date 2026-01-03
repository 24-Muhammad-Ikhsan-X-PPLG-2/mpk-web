"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { ChangePasswordServerAction } from "./change-password-action";
import ErrorModal from "@/components/error-modal";

const formSchema = z.object({
  password_lama: z.string().nonempty("Password lama tidak boleh kosong!"),
  password_baru: z.string().nonempty("Password baru tidak boleh kosong!"),
  confirm_password: z
    .string()
    .nonempty("Konfirmasi password tidak boleh kosong!"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errorChangePassword, setErrorChangePassword] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password_baru: "",
      password_lama: "",
      confirm_password: "",
    },
  });
  const resetState = () => {
    setIsLoading(true);
    setIsSuccess(false);
    setErrorChangePassword("");
  };
  const handleChangePassword: SubmitHandler<FormSchemaType> = async ({
    confirm_password,
    password_baru,
    password_lama,
  }) => {
    resetState();
    if (password_baru !== confirm_password) {
      setError("confirm_password", {
        message: "Konfirmasi password tidak valid!",
      });
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.set("password_lama", password_lama);
    formData.set("password_baru", password_baru);
    formData.set("confirm_password", confirm_password);
    const { error } = await ChangePasswordServerAction(formData);
    if (error) {
      setErrorChangePassword(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 1500);
  };
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm((prev) => !prev);
  };
  return (
    <>
      <ErrorModal
        errorDelete={errorChangePassword}
        setErrorDelete={setErrorChangePassword}
      />
      <div className="w-full min-h-[70vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="bg-white md:w-150 h-fit w-full md:p-3 p-5 rounded-xl relative"
        >
          <div
            id="body_modal_tambah"
            className="flex flex-col w-full items-center mt-5 gap-5"
          >
            <div className="flex flex-col md:w-fit w-full">
              <label
                htmlFor="password_lama"
                className={`font-semibold mb-1 text-base ${
                  errors.password_lama ? "text-red-600" : "text-secondary"
                }`}
              >
                Password Lama
              </label>
              <div
                className={`md:w-100 w-full flex items-center gap-1 outline-none rounded-full border ${
                  errors.password_lama
                    ? "bg-red-300 border-red-600 placeholder:text-red-600 text-red-600"
                    : "bg-slate-200 border-slate-600"
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="password_lama"
                  className="outline-none px-4 py-1.5 w-full"
                  placeholder="Masukan password lama kamu..."
                  {...register("password_lama")}
                />
                <div
                  className="pr-4 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <Eye className="size-6" />
                  ) : (
                    <EyeOff className="size-6" />
                  )}
                </div>
              </div>
              {errors.password_lama && (
                <p className="text-red-600">{errors.password_lama?.message}</p>
              )}
            </div>
            <div className="flex flex-col md:w-fit w-full">
              <label
                htmlFor="password_baru"
                className={`font-semibold mb-1 text-base ${
                  errors.password_baru ? "text-red-600" : "text-secondary"
                }`}
              >
                Password Baru
              </label>
              <div
                className={`md:w-100 w-full flex items-center gap-1 outline-none rounded-full border ${
                  errors.password_baru
                    ? "bg-red-300 border-red-600 placeholder:text-red-600 text-red-600"
                    : "bg-slate-200 border-slate-600"
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="password_baru"
                  className="outline-none px-4 py-1.5 w-full"
                  placeholder="Masukan password baru kamu..."
                  {...register("password_baru")}
                />
                <div
                  className="pr-4 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <Eye className="size-6" />
                  ) : (
                    <EyeOff className="size-6" />
                  )}
                </div>
              </div>
              {errors.password_baru && (
                <p className="text-red-600">{errors.password_baru?.message}</p>
              )}
            </div>
            <div className="flex flex-col md:w-fit w-full">
              <label
                htmlFor="confirm_password"
                className={`font-semibold mb-1 text-base ${
                  errors.confirm_password ? "text-red-600" : "text-secondary"
                }`}
              >
                Konfirmasi Password
              </label>
              <div
                className={`md:w-100 w-full flex items-center gap-1 outline-none rounded-full border ${
                  errors.confirm_password
                    ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                    : "bg-slate-200 border-slate-600"
                }`}
              >
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  id="confirm_password"
                  className="outline-none px-4 py-1.5 w-full"
                  placeholder="Ulangi password kamu..."
                  {...register("confirm_password")}
                />
                <div
                  className="pr-4 cursor-pointer"
                  onClick={handleTogglePasswordConfirm}
                >
                  {showPasswordConfirm ? (
                    <Eye className="size-6" />
                  ) : (
                    <EyeOff className="size-6" />
                  )}
                </div>
              </div>
              {errors.confirm_password && (
                <p className="text-red-600">
                  {errors.confirm_password?.message}
                </p>
              )}
            </div>
          </div>
          <div
            id="footer_modal_tambah"
            className="flex flex-col items-center mt-5 mb-6 w-full"
          >
            <button
              disabled={isLoading}
              className={`md:w-100 w-full rounded-full text-center text-white font-semibold py-2 cursor-pointer active:scale-90 transition duration-150 disabled:bg-gray-500 relative ${
                isSuccess
                  ? "bg-green-500 hover:bg-green-500/85"
                  : "bg-yellow-500 hover:bg-yellow-500/85"
              }`}
              type="submit"
            >
              {isLoading
                ? "Process.."
                : isSuccess
                ? "Sukses"
                : "Ganti Password"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordForm;
