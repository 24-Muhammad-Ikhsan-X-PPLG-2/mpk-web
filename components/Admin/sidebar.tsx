"use client";
import {
  ArrowLeft,
  ArrowRight,
  CirclePlus,
  House,
  LogOut,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import LogoutModal from "./logout-modal";

const tabs = [
  {
    icon: <House />,
    display: "Dashboard",
    link: "/admin",
  },
  {
    icon: <CirclePlus />,
    display: "Tambah seminar",
    link: "/admin/seminar/tambah",
  },
  {
    icon: <Users />,
    display: "Users",
    link: "/admin/users",
  },
];

type SidebarProps = {
  showHalfSidebar: boolean;
  setShowHalfSidebar: Dispatch<SetStateAction<boolean>>;
  pageActive?: string;
};

const Sidebar: FC<SidebarProps> = ({
  showHalfSidebar,
  setShowHalfSidebar,
  pageActive = "Dashboard",
}) => {
  const [showModalLogout, setShowModalLogout] = useState(false);
  return (
    <>
      <LogoutModal setShow={setShowModalLogout} show={showModalLogout} />
      <div
        className={`bg-secondary h-screen fixed hidden md:flex flex-col justify-between left-0 transition-all duration-150 z-999 ${
          showHalfSidebar ? "w-20" : "w-64"
        }`}
      >
        <div className="h-full w-full">
          <div className="w-full h-[20%] flex justify-center items-center">
            <Link href={"/admin"}>
              {showHalfSidebar ? (
                <img src="/img/logo.png" className="w-15" alt="" />
              ) : (
                <p className="text-white font-bold text-2xl">
                  MPK <span className="text-primary">Admin</span>
                </p>
              )}
            </Link>
          </div>
          <div
            className={`w-full flex flex-col gap-5 justify-center items-center ${
              !showHalfSidebar ? "pl-10" : "pl-6"
            }`}
          >
            {tabs.map((item, idx) => (
              <Link
                href={item.link}
                key={idx}
                className="flex items-center justify-center w-full cursor-pointer"
              >
                <div className="flex items-center w-full gap-2">
                  <div
                    className={`size-6 ${
                      item.display.toLowerCase() == pageActive.toLowerCase()
                        ? "text-primary"
                        : "text-neutral-400"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {!showHalfSidebar && (
                    <p
                      className={`font-semibold ${
                        item.display.toLowerCase() == pageActive.toLowerCase()
                          ? "text-white"
                          : "text-neutral-400"
                      }`}
                    >
                      {item.display}
                    </p>
                  )}
                </div>
                <div
                  className={`rounded-xl w-1 h-6 ${
                    item.display.toLowerCase() == pageActive.toLowerCase()
                      ? "bg-primary"
                      : "bg-neutral-400"
                  }`}
                ></div>
              </Link>
            ))}
            <div
              className="flex items-center justify-center w-full cursor-pointer"
              onClick={() => setShowModalLogout(true)}
            >
              <div className="flex items-center w-full gap-2">
                <div className={`size-6 text-neutral-400`}>
                  <LogOut />
                </div>
                {!showHalfSidebar && (
                  <p className={`font-semibold text-neutral-400`}>Logout</p>
                )}
              </div>
              <div className={`rounded-xl w-1 h-6 bg-neutral-400`}></div>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4 flex w-full justify-between items-center">
          {!showHalfSidebar && (
            <p className="text-white font-bold text-xs">Made By Ikhsan</p>
          )}
          <div
            className="bg-neutral-200 rounded-full p-1 cursor-pointer hidden md:block"
            onClick={() => setShowHalfSidebar((prev) => !prev)}
          >
            {showHalfSidebar ? (
              <ArrowRight className="lg:size-8 size-6 text-secondary" />
            ) : (
              <ArrowLeft className="lg:size-8 size-6 text-secondary" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
