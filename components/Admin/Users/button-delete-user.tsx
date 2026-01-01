"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { DeleteAkunServerAction } from "./action-delete";

type ButtonDeleteUserProps = {
  setErrorDelete: Dispatch<SetStateAction<string>>;
  id: string;
};

const ButtonDeleteUser: FC<ButtonDeleteUserProps> = ({
  setErrorDelete,
  id,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteUser = async () => {
    setErrorDelete("");
    setIsLoading(true);
    const formData = new FormData();
    formData.set("id", id);
    const { error } = await DeleteAkunServerAction(formData);
    if (error) {
      setErrorDelete(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };
  return (
    <button
      disabled={isLoading}
      className="bg-red-600 disabled:bg-gray-500 px-5 py-1.5 text-sm text-white font-semibold rounded cursor-pointer"
      onClick={handleDeleteUser}
    >
      {isLoading ? "Process..." : "Delete"}
    </button>
  );
};

export default ButtonDeleteUser;
