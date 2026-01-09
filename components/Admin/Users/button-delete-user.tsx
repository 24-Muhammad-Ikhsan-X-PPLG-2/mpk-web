"use client";

import { Dispatch, FC, SetStateAction } from "react";
type ButtonDeleteUserProps = {
  setShowModalDelete: Dispatch<SetStateAction<null | string>>;
  isLoading: boolean;
  id: string;
};

const ButtonDeleteUser: FC<ButtonDeleteUserProps> = ({
  isLoading,
  setShowModalDelete,
  id,
}) => {
  const handleDeleteUser = () => {
    setShowModalDelete(id);
  };
  return (
    <button
      disabled={isLoading}
      className="bg-red-600 px-5 py-1.5 text-sm text-white font-semibold rounded cursor-pointer"
      onClick={handleDeleteUser}
    >
      Delete
    </button>
  );
};

export default ButtonDeleteUser;
