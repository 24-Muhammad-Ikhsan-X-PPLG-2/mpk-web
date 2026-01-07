"use client";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import useLogout from "@/hooks/useLogout";
import { useClickOutside } from "@/hooks/useClickOutside";
import ErrorModal from "../error-modal";

type LogoutModalProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const LogoutModal: FC<LogoutModalProps> = ({ setShow, show }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { handleLogout, error, isLoading, setError } = useLogout();
  useClickOutside(modalRef, () => setShow(false), !isLoading);

  const handleCloseModal = () => {
    if (isLoading) return;
    setShow(false);
  };
  return (
    <>
      <ErrorModal errorDelete={error} setErrorDelete={setError} />
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
                <p className="font-semibold text-lg">Logout</p>
                <X
                  className="size-6 cursor-pointer"
                  onClick={handleCloseModal}
                />
              </div>
              <div
                id="body_modal_delete"
                className="p-4 border-b border-gray-400"
              >
                <p className="font-medium">Yakin mau keluar dari akun ini?</p>
              </div>
              <div
                className="p-4 flex items-center justify-end gap-2"
                id="footer_modal_delete"
              >
                <button
                  disabled={isLoading}
                  className="px-6 py-2 bg-red-500 text-white rounded-xl font-semibold cursor-pointer disabled:bg-gray-500"
                  onClick={handleLogout}
                >
                  {isLoading ? "Memproses..." : "Iya"}
                </button>
                <button
                  disabled={isLoading}
                  className="px-6 py-2 bg-gray-500 text-white rounded-xl font-semibold cursor-pointer"
                  onClick={() => setShow(false)}
                >
                  Tidak
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LogoutModal;
