"use client";

import { SignIn } from "@/app/signin/action";
import { FormLoginSchema } from "@/schema/schema-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type FormLoginSchemaType = z.infer<typeof FormLoginSchema>;

const useSignin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorSupabase, setErrorSupabase] = useState("");
  const router = useRouter();
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
    router.push("/admin");
  };
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleCloseError = () => {
    setErrorSupabase("");
  };
  return {
    showPassword,
    isLoading,
    register,
    handleSubmit,
    errorSupabase,
    errors,
    handleLogin,
    handleTogglePassword,
    handleCloseError,
  };
};

export default useSignin;
