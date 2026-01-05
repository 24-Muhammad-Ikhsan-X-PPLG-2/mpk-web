"use client";
import { createClient } from "@/lib/supabase/client";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type LogoutModalProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const supabase = createClient();

const LogoutModal: FC<LogoutModalProps> = ({ setShow, show }) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !isLoading
      ) {
        setShow(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("Login terlebih dahulu!");
      return;
    }
    await supabase.auth.signOut();
    setIsLoading(false);
    router.push("/signin");
  };
  const handleCloseModal = () => {
    if (isLoading) return;
    setShow(false);
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
              <p className="font-semibold text-lg">Logout</p>
              <X className="size-6 cursor-pointer" onClick={handleCloseModal} />
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
  );
};

export default LogoutModal;
