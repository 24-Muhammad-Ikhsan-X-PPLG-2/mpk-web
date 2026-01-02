"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { listNavbar } from "./navbar";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { AnimatePresence, motion } from "motion/react";

type MobileNavProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const MobileNav: FC<MobileNavProps> = ({ setShow, show }) => {
  const { user } = useAuth();
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bg-primary p-2 w-32 h-fit right-2 z-9999 rounded-xl flex flex-col items-center top-16"
        >
          {listNavbar.map((item, idx) => (
            <Link
              href={item.link}
              className="text-white font-semibold text-base mb-1"
              key={idx}
            >
              {item.display}
            </Link>
          ))}
          {user ? (
            <Link href={"/admin"}>
              <button className="w-full mt-1 py-1.5 text-white font-semibold px-4 bg-primary border border-slate-200 rounded text-center text-sm">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link href={"/signin"}>
              <button className="w-full mt-1 py-1.5 text-white font-semibold px-4 bg-primary border border-slate-200 rounded text-center text-sm">
                Login
              </button>
            </Link>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
