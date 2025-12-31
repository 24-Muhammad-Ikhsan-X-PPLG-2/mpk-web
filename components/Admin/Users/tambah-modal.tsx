"use client";
import { Eye, EyeOff, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

type TambahModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

// buat besok bikin form yaaaaaa

const TambahModal: FC<TambahModalProps> = ({ setShowModal, showModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {} = useForm();
  const modalRef = useRef<HTMLDivElement>(null);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed w-full h-full z-9999 top-0 left-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4"
        >
          <div
            className="bg-white md:w-150 h-fit w-full md:p-3 p-5 rounded-xl relative"
            ref={modalRef}
          >
            <div
              className="absolute top-3 right-3 cursor-pointer"
              onClick={handleCloseModal}
            >
              <X className="size-6 text-black" />
            </div>
            <div id="header_modal_tambah" className="text-center text-black">
              <p className="font-semibold text-lg">Tambah Akun</p>
            </div>
            <div
              id="body_modal_tambah"
              className="flex flex-col w-full items-center mt-5 gap-2"
            >
              <div className="flex flex-col md:w-fit w-full">
                <label
                  htmlFor="name"
                  className="text-secondary font-semibold mb-1 text-base"
                >
                  Nama Akun
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-slate-200 md:w-100 w-full py-1.5 outline-none px-4 rounded-full border border-slate-600"
                  placeholder="Contoh: Muhammad Ikhsan"
                />
              </div>
              <div className="flex flex-col md:w-fit w-full">
                <label
                  htmlFor="email"
                  className="text-secondary font-semibold mb-1 text-base"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-slate-200 md:w-100 w-full py-1.5 outline-none px-4 rounded-full border border-slate-600"
                  placeholder="Contoh: emailkamu@email.com"
                />
              </div>
              <div className="flex flex-col md:w-fit w-full">
                <label
                  htmlFor="password"
                  className="text-secondary font-semibold mb-1 text-base"
                >
                  Password
                </label>
                <div className="bg-slate-200 md:w-100 w-full  outline-none  rounded-full border border-slate-600 flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Contoh: ......"
                    className="outline-none w-full py-1.5 px-4"
                  />
                  <div
                    className="text-black cursor-pointer size-6 mr-4"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <Eye className="" />
                    ) : (
                      <EyeOff className="" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              id="footer_modal_tambah"
              className="flex flex-col items-center mt-5 mb-6 w-full"
            >
              <button className="md:w-100 w-full rounded-full text-center text-white font-semibold bg-green-500 py-2 cursor-pointer hover:bg-green-500/85 active:scale-90 transition duration-150">
                Simpan
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TambahModal;
