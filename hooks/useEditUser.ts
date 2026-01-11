"use client";

import { EditAkunServerAction } from "@/components/Admin/Users/edit/action-edit";
import { FormSchemaEditUser } from "@/schema/schema-zod";
import { ProfileType } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type FormSchemaType = z.infer<typeof FormSchemaEditUser>;

const useEditUser = ({
  userEdit,
  id,
}: {
  userEdit: ProfileType;
  id: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchemaEditUser),
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
  return {
    register,
    handleSubmit,
    errors,
    errorEdit,
    isLoading,
    isSuccess,
    handleEditAkun,
    setErrorEdit,
  };
};

export default useEditUser;
