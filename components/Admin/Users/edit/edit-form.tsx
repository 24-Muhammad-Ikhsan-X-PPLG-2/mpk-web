"use client";

import { ProfileType } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { EditAkunServerAction } from "./action-edit";
import ErrorModal from "@/components/error-modal";

type EditFormProps = {
  id: string;
  userEdit: ProfileType;
  user: ProfileType;
};

const formSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter!"),
  role: z.string().nonempty("Role tidak boleh kosong!"),
  desc: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const EditForm: FC<EditFormProps> = ({ id, userEdit, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: userEdit.role,
      username: userEdit.username,
      desc: userEdit.desc,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorEdit, setErrorEdit] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleEditAkun: SubmitHandler<FormSchemaType> = async ({
    role,
    username,
    desc,
  }) => {
    setIsLoading(true);
    setErrorEdit("");
    setIsSuccess(false);
    const formData = new FormData();
    formData.set("role", role);
    formData.set("username", username);
    formData.set("id", id);
    formData.set("desc", desc);
    const { error } = await EditAkunServerAction(formData);
    if (error) {
      setErrorEdit(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 1500);
  };

  return (
    <>
      <ErrorModal errorDelete={errorEdit} setErrorDelete={setErrorEdit} />
      <div className="w-full min-h-[70vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit(handleEditAkun)}
          className="bg-white md:w-150 h-fit w-full md:p-3 p-5 rounded-xl relative"
        >
          <div
            id="body_modal_tambah"
            className="flex flex-col w-full items-center mt-5 gap-2"
          >
            <div className="flex flex-col md:w-fit w-full">
              <label
                htmlFor="name"
                className={`font-semibold mb-1 text-base ${
                  errors.username ? "text-red-600" : "text-secondary"
                }`}
              >
                Nama Akun
              </label>
              <input
                type="text"
                id="name"
                className={`md:w-100 w-full py-1.5 outline-none px-4 rounded-full border ${
                  errors.username
                    ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                    : "bg-slate-200 border-slate-600"
                }`}
                placeholder="Contoh: Muhammad Ikhsan"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-600">{errors.username?.message}</p>
              )}
            </div>
            <div className="flex flex-col md:w-fit w-full">
              <label
                htmlFor="desc"
                className={`font-semibold mb-1 text-base ${
                  errors.desc ? "text-red-600" : "text-secondary"
                }`}
              >
                Deskripsi Akun
              </label>
              <textarea
                id="desc"
                className={`md:w-100 w-full py-2 outline-none px-2 rounded-xl border ${
                  errors.username
                    ? "bg-red-300 border-red-600 placeholder:text-red-500 text-red-600"
                    : "bg-slate-200 border-slate-600"
                }`}
                placeholder="Contoh: Muhammad Ikhsan"
                {...register("desc")}
              ></textarea>
              {errors.username && (
                <p className="text-red-600">{errors.username?.message}</p>
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
              {errors.role ? (
                <p className="text-red-600">{errors.role?.message}</p>
              ) : (
                <p className=" text-black font-normal hover:underline cursor-pointer">
                  Change password
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
              {isLoading ? "Process.." : isSuccess ? "Sukses" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
