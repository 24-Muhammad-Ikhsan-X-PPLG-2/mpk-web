"use client";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

type PreviewModalProps = {
  previewModal: boolean;
  setPreviewModal: Dispatch<SetStateAction<boolean>>;
  previewUrl: string;
};

const PreviewModal: FC<PreviewModalProps> = ({
  previewModal,
  setPreviewModal,
  previewUrl,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setPreviewModal(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <AnimatePresence>
      {previewModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full fixed left-0 top-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-9999 px-4"
        >
          <div className="w-[450px] h-[600px] relative" ref={modalRef}>
            <div
              className="absolute top-5 right-5"
              onClick={() => setPreviewModal(false)}
            >
              <X className="size-6 cursor-pointer text-white mix-blend-difference" />
            </div>
            <img
              src={
                previewUrl === ""
                  ? "https://placehold.co/450x600?text=Not+Found"
                  : previewUrl
              }
              loading="lazy"
              className="w-full h-full object-cover object-center rounded-xl"
              alt=""
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewModal;
