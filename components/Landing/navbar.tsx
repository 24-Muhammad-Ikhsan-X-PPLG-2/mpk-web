"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { useState } from "react";
import Image from "next/image";

export const listNavbar = [
  {
    display: "Tentang",
    link: "#about",
  },
  {
    display: "Seminar",
    link: "#seminar",
  },
  {
    display: "Visi & Misi",
    link: "#visi",
  },
];
const Navbar = () => {
  const { user } = useAuth();
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <>
      <MobileNav show={showMobileNav} setShow={setShowMobileNav} />

      <nav className="bg-[#D4AF37] w-full lg:h-19.75 h-14 lg:p-2 p-1 px-4 lg:px-28 lg:px-24 fixed top-0 z-999">
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex gap-2 items-center">
            <Image
              alt="Logo"
              width={48}
              height={48}
              src="/img/logo.webp"
              className="lg:w-12 md:w-10 w-8"
            />
            <Link href={"#"} className="text-white lg:text-lg font-bold">
              MPK LETRIS 2
            </Link>
          </div>
          <div className="lg:flex gap-7 hidden">
            {listNavbar.map((item, idx) => (
              <Link
                href={item.link}
                key={idx}
                className={`font-semibold ${
                  item.display == "Surat" ? "text-[#dacc86]" : "text-white"
                }`}
              >
                {item.display}
              </Link>
            ))}
          </div>
          {user ? (
            <Link href={"/admin"}>
              <button className="bg-transparent border border-slate-200 w-fit h-10.75 p-2 text-lg shadow-2xl rounded-lg text-white font-semibold lg:block hidden cursor-pointer">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link href={"/signin"}>
              <button className="bg-transparent border border-slate-200 w-fit h-10.75 p-2 text-lg shadow-2xl rounded-lg text-white font-semibold lg:block hidden cursor-pointer">
                SignIn
              </button>
            </Link>
          )}
          <button
            className="w-8 h-fit lg:hidden"
            onClick={() => setShowMobileNav((prev) => !prev)}
          >
            <img src={"/img/button-nav.webp"} className="w-8" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
