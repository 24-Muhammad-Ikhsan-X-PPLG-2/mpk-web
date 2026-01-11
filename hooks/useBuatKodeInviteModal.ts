"use client";

import { BuatKodeInviteServerAction } from "@/components/Admin/Users/action-buat-kode";
import { FormSchemaBuatKodeInvite } from "@/schema/schema-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type FormSchemaType = z.infer<typeof FormSchemaBuatKodeInvite>;

type BuatKodeInviteModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const useBuatKodeInviteModal = ({ setShowModal }: BuatKodeInviteModalProps) => {
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
    resolver: zodResolver(FormSchemaBuatKodeInvite),
    defaultValues: {
      berapaBanyakOrang: "",
    },
  });
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
  return {
    isLoading,
    errorBuatKode,
    isSuccessCopy,
    register,
    handleSubmit,
    errors,
    reset,
    handleBuatKode,
    handleCloseModal,
    handleCopyCode,
    showModalCode,
    setShowModalCode,
    setErrorBuatKode,
  };
};

export default useBuatKodeInviteModal;
