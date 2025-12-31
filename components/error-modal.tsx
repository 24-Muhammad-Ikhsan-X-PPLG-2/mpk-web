"use client";

import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLayout } from "@/contexts/LayoutContext";

type ErrorModalProps = {
  errorDelete: string;
  setErrorDelete: Dispatch<SetStateAction<string>>;
};

const ErrorModal: FC<ErrorModalProps> = ({ errorDelete, setErrorDelete }) => {
  const { changeNoScroll } = useLayout();
  useEffect(() => {
    if (errorDelete.trim() !== "") {
      changeNoScroll(true);
    } else {
      changeNoScroll(false);
    }
  }, [errorDelete]);
  return (
    <AnimatePresence mode="wait">
      {errorDelete.trim() !== "" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black/50 backdrop-blur-sm px-4 z-9999"
          onClick={() => setErrorDelete("")}
        >
          <div className="w-100 h-fit flex justify-center items-center p-4 bg-red-300 border border-red-600 rounded-xl">
            <p className="text-red-600 text-center">{errorDelete}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
