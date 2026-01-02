"use client";

import { useState } from "react";
import { listNavbar } from "./navbar";
import Link from "next/link";

const MobileNav = () => {
  const [showDropdow, setShowDropdown] = useState(false);
  return (
    <>
      <div className="fixed bg-primary p-2 w-32 h-fit right-3 rounded-xl flex flex-col items-center -bottom-28">
        {listNavbar.map((item, idx) => (
          <Link
            href={item.link}
            className="text-white font-semibold text-lg"
            key={idx}
          >
            {item.display}
          </Link>
        ))}
      </div>
      <button className="w-8 h-fit lg:hidden">
        <img src={"/img/button-nav.png"} className="w-8" />
      </button>
    </>
  );
};

export default MobileNav;
