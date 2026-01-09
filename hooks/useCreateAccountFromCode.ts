"use client";

import { CreateAccountServerAction } from "@/app/invite-admin/[code]/action-create-account";
import { FormSchemaCreateAccountFromCode } from "@/schema/schema-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type FormSchemaType = z.infer<typeof FormSchemaCreateAccountFromCode>;

const useCreateAccountFromCode = ({ code }: { code: string }) => {
  const [errorSupabase, setErrorSupabase] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchemaCreateAccountFromCode),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const handleCreateAccount: SubmitHandler<FormSchemaType> = async ({
    email,
    password,
    username,
  }) => {
    setErrorSupabase("");
    setIsLoading(true);
    const formData = new FormData();
    formData.set("email", email);
    formData.set("username", username);
    formData.set("password", password);
    formData.set("code", code);
    const { error } = await CreateAccountServerAction(formData);
    if (error) {
      setErrorSupabase(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.push("/signin");
  };
  const handleCloseError = () => setErrorSupabase("");
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  return {
    register,
    handleSubmit,
    errors,
    errorSupabase,
    handleCreateAccount,
    handleCloseError,
    handleTogglePassword,
    showPassword,
    isLoading,
  };
};

export default useCreateAccountFromCode;
