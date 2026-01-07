"use client";

import { LogoutServerAction } from "@/components/Admin/action-logout";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogout = async () => {
    setIsLoading(true);
    const { error } = await LogoutServerAction();
    if (error) {
      setIsLoading(false);
      setError(error);
      return;
    }
    router.push("/signin");
  };
  return {
    handleLogout,
    error,
    setError,
    isLoading,
  };
};

export default useLogout;
