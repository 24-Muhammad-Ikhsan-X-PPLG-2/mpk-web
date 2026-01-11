"use client";

import { TambahAkunServerAction } from "@/components/Admin/Users/action-tambah";
import { FormSchemaTambahUsers } from "@/schema/schema-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type FormSchemaType = z.infer<typeof FormSchemaTambahUsers>;

type useTambahUserProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const useTambahUser = ({ setShowModal }: useTambahUserProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchemaTambahUsers),
    defaultValues: {
      email: "",
      name: "",
      role: "",
      password: "",
    },
  });
  const handleTambahAkun: SubmitHandler<FormSchemaType> = async ({
    email,
    name,
    password,
    role,
  }) => {
    setIsLoading(true);
    setErrorSubmit("");
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("role", role);
    const { error } = await TambahAkunServerAction(formData);
    if (error) {
      setErrorSubmit(error);
      setIsLoading(false);
      setShowModal(false);
      return;
    }
    setIsLoading(false);
    reset();
    setShowModal(false);
  };
  return {
    isLoading,
    errorSubmit,
    handleSubmit,
    register,
    errors,
    handleTambahAkun,
    reset,
    setErrorSubmit,
  };
};

export default useTambahUser;
