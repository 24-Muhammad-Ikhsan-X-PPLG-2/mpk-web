"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { SignIn } from "./action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const FormLoginSchema = z.object({
  email: z.email({
    error: "Invalid email address!",
  }),
  password: z.string().nonempty({
    error: "Password is required!",
  }),
});

type FormLoginSchemaType = z.infer<typeof FormLoginSchema>;

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorSupabase, setErrorSupabase] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormLoginSchemaType>({
    resolver: zodResolver(FormLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin: SubmitHandler<FormLoginSchemaType> = async ({
    email,
    password,
  }) => {
    setIsLoading(true);
    setErrorSupabase("");
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);
    const { error } = await SignIn(formData);
    if (error) {
      setIsLoading(false);
      if (error === "Invalid login credentials") {
        setErrorSupabase("Email atau password salah!");
      } else {
        setErrorSupabase(error);
      }
    }
  };
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleCloseError = () => {
    setErrorSupabase("");
  };
  return (
    <div className="min-h-screen flex justify-center items-center lg:bg-primary lg:px-4">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex justify-center items-center lg:gap-20 md:gap-7 bg-white md:rounded-[40px] lg:p-15 md:p-8 w-full h-auto lg:w-fit relative"
      >
        <div className="absolute "></div>
        <div className="flex flex-col justify-center items-center w-full md:w-auto px-4 md:px-0">
          <div className="" id="header">
            <img
              src="/img/logo.webp"
              className="block md:hidden w-32 mb-5 mx-auto"
              alt=""
            />
            <h1 className="text-text text-center md:text-5xl text-3xl font-bold">
              Sign In
            </h1>
            <AnimatePresence mode="wait">
              {errorSupabase !== "" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-[350px] h-13 flex justify-center items-center mt-5 bg-red-300 border border-red-600 rounded-xl relative"
                >
                  <X
                    className="size-5 absolute top-1 right-1 text-red-600 cursor-pointer"
                    onClick={handleCloseError}
                  />
                  <p className="text-red-600">{errorSupabase}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            className="mt-10 flex flex-col w-full md:w-auto transition-all duration-150"
            id="body"
          >
            <div className="flex flex-col">
              <input
                type="email"
                className={`md:w-100 p-4 h-12.5 w-full outline-none rounded-xl border ${
                  errors.email
                    ? "bg-red-300 border-red-600 placeholder:text-red-600 text-red-600"
                    : "bg-neutral-200 border-neutral-400 placeholder:font-semibold"
                }`}
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600 mt-1 text-base">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div
                className={`mt-7 md:w-100 w-full h-12.5 rounded-xl border flex items-center gap-1 relative ${
                  errors.password
                    ? "bg-red-300 border-red-600"
                    : "bg-neutral-200 border-neutral-400"
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  className={`p-4 outline-none w-[93%] h-full ${
                    errors.password
                      ? "placeholder:text-red-600"
                      : "placeholder:font-semibold"
                  }`}
                  placeholder="Password"
                  {...register("password")}
                />
                <div
                  onClick={handleTogglePassword}
                  className={`absolute right-4 ${
                    errors.password ? "text-red-600" : "text-neutral-500"
                  }`}
                >
                  {showPassword ? (
                    <Eye className="size-5 cursor-pointer" />
                  ) : (
                    <EyeOff className="size-5 cursor-pointer" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-600 mt-1 text-base">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-10" id="footer">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary not-disabled:hover:scale-105 transition duration-150 not-disabled:hover:-translate-y-1 not-disabled:active:scale-95 text-white font-semibold text-lg cursor-pointer w-full h-12 rounded-xl text-center disabled:bg-neutral-500 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <img
            src="/img/login-img/photo-pintu.webp"
            className="w-[320px] h-100 rounded-xl object-cover object-center"
            alt=""
          />
        </div>
      </form>
    </div>
  );
};

export default Signin;
