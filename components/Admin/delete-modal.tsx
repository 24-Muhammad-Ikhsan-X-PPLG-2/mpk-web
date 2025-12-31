"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { createClient } from "@/lib/supabase/client";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ErrorModal from "../error-modal";
import { HapusGambarSeminar } from "@/lib/client/utils";
import { PostgrestResponse } from "@supabase/supabase-js";
import { SeminarPhotoType } from "@/types/db";

export type deleteModalType = {
  id: string;
  name: string;
};

type DeleteModalProps = {
  setShow: Dispatch<SetStateAction<deleteModalType | null>>;
  show: deleteModalType | null;
};

const supabase = createClient();

const DeleteModal: FC<DeleteModalProps> = ({ setShow, show }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [errorDelete, setErrorDelete] = useState("");
  const { changeNoScroll } = useLayout();
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShow(null);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  useEffect(() => {
    if (show) {
      changeNoScroll(true);
    } else {
      changeNoScroll(false);
    }
  }, [show]);
  const handleDeleteItem = async () => {
    if (!show) return;
    const { data } = (await supabase
      .from("seminar_photo")
      .select()) as PostgrestResponse<SeminarPhotoType>;
    if (!data) {
      setErrorDelete("Tidak ada data untuk dihapus");
      return;
    }
    if (data.length == 1) {
      setErrorDelete(
        "Tidak bisa dihapus, karena kalau ini dihapus ga ada foto seminar yang tersedia di web!"
      );
      setShow(null);
      return;
    }
    const seminarIndex = data.findIndex((item) => item.id === show.id);
    const seminar = data[seminarIndex];
    const { error } = await supabase
      .from("seminar_photo")
      .delete()
      .eq("id", show.id);
    const { error: ErrorHapus } = await HapusGambarSeminar(seminar.img_url);
    setShow(null);
    if (error) {
      setErrorDelete(error.message);
    } else {
      setErrorDelete("");
    }
    if (ErrorHapus) {
      setErrorDelete(ErrorHapus);
    } else {
      setErrorDelete("");
    }
  };
  return (
    <>
      <ErrorModal errorDelete={errorDelete} setErrorDelete={setErrorDelete} />
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
                <p className="font-semibold text-lg">Delete Item</p>
                <X
                  className="size-6 cursor-pointer"
                  onClick={() => setShow(null)}
                />
              </div>
              <div
                id="body_modal_delete"
                className="p-4 border-b border-gray-400"
              >
                <p className="font-medium">Yakin mau delete item?</p>
              </div>
              <div
                className="p-4 flex items-center justify-end gap-2"
                id="footer_modal_delete"
              >
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-xl font-semibold cursor-pointer"
                  onClick={handleDeleteItem}
                >
                  Seterah
                </button>
                <button
                  className="px-6 py-2 bg-gray-500 text-white rounded-xl font-semibold cursor-pointer"
                  onClick={() => setShow(null)}
                >
                  G
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteModal;
