"use client";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { DeleteAkunServerAction } from "./action-delete";

type DeleteUserModalProps = {
  show: string | null;
  setShow: Dispatch<SetStateAction<string | null>>;
  setErrorDelete: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

const DeleteUserModal: FC<DeleteUserModalProps> = ({
  setShow,
  show,
  setErrorDelete,
  setIsLoading,
  isLoading,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !isLoading
      ) {
        setShow(null);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleDeleteItem = async () => {
    if (!show) return;
    const idAccount = show;
    setErrorDelete("");
    setIsLoading(true);
    const formData = new FormData();
    formData.set("id", idAccount);
    const { error } = await DeleteAkunServerAction(formData);
    if (error) {
      setErrorDelete(error);
      setIsLoading(false);
      setShow(null);
      return;
    }
    setIsLoading(false);
    setShow(null);
  };
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black/50 backdrop-blur-sm px-4 z-9999"
        >
          <div
            className="bg-white w-100 h-fit rounded-xl shadow relative"
            ref={modalRef}
          >
            <div
              id="head_modal_delete"
              className="border-b border-gray-400 p-4 flex items-center justify-between"
            >
              <p className="font-semibold text-lg">Delete User</p>
              <X
                className="size-6 cursor-pointer"
                onClick={() => {
                  if (!isLoading) {
                    setShow(null);
                  }
                }}
              />
            </div>
            <div
              id="body_modal_delete"
              className="p-4 border-b border-gray-400"
            >
              <p className="font-medium">Yakin mau delete user ini?</p>
              <p className="font-medium text-red-600">
                penghapusan user ini tidak bisa dikembalikan seperti semula.
              </p>
            </div>
            <div
              className="p-4 flex items-center justify-end gap-2"
              id="footer_modal_delete"
            >
              <button
                disabled={isLoading}
                className="px-6 py-2 bg-red-500 text-white rounded-xl font-semibold cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
                onClick={handleDeleteItem}
              >
                {isLoading ? "Memproses..." : "Iya"}
              </button>
              <button
                disabled={isLoading}
                className="px-6 py-2 bg-gray-500 text-white rounded-xl font-semibold cursor-pointer disabled:cursor-not-allowed"
                onClick={() => setShow(null)}
              >
                Tidak
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteUserModal;
