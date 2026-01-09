"use client";

import { createClient } from "@/lib/supabase/client";
import { FormSchemaInviteAdmin } from "@/schema/schema-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type FormSchemaType = z.infer<typeof FormSchemaInviteAdmin>;

const supabase = createClient();

const useInviteAdmin = () => {
  const [errorSupabase, setErrorSupabase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchemaInviteAdmin),
    defaultValues: {
      code: "",
    },
  });
  const handleCodeVerification: SubmitHandler<FormSchemaType> = async ({
    code,
  }) => {
    setIsLoading(true);
    setErrorSupabase("");
    const { error, data } = await supabase
      .from("invite_code")
      .select()
      .eq("code", code)
      .maybeSingle();
    if (error) {
      setErrorSupabase(error.message);
      setIsLoading(false);
      return;
    }
    if (!data) {
      setErrorSupabase("Kode undangan salah!");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.push(`/invite-admin/${code}`);
  };
  const handleCloseError = () => setErrorSupabase("");
  return {
    register,
    handleSubmit,
    handleCodeVerification,
    errors,
    errorSupabase,
    handleCloseError,
    isLoading,
  };
};

export default useInviteAdmin;
