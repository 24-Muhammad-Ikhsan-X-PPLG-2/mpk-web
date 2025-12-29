"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import Sidebar from "../sidebar";

type AdminLayoutProps = PropsWithChildren & {
  pageName?: string;
  title?: string;
  pageActive?: string;
};

const AdminLayout: FC<AdminLayoutProps> = ({
  children,
  pageName = "Dashboard",
  pageActive = "Dashboard",
  title = "Main Dashboard",
}) => {
  const [showHalfSidebar, setShowHalfSidebar] = useState(true);
  useEffect(() => {
    if (isMobile || isTablet) {
      setShowHalfSidebar(true);
    } else {
      setShowHalfSidebar(false);
    }
  }, [isMobile, isTablet]);
  return (
    <>
      <Sidebar
        setShowHalfSidebar={setShowHalfSidebar}
        showHalfSidebar={showHalfSidebar}
        pageActive={pageActive}
      />
      <div
        className={`pt-4 lg:pr-8 pr-3 w-screen min-h-screen pb-5 bg-neutral-200 pl-3 ${
          showHalfSidebar ? "md:pl-24" : "md:pl-68"
        }`}
      >
        <div
          className="w-full mb-5  flex justify-between items-center"
          id="header"
        >
          <div>
            <p className="text-neutral-500 font-semibold lg:text-sm text-xs">
              Admin / {pageName}
            </p>
            <p className="lg:text-4xl text-xl text-primary mt-2 font-bold">
              {title}
            </p>
          </div>
          <div className="bg-white shadow w-fit gap-2 cursor-pointer p-2 flex items-center rounded-full mr-4">
            <img src="/img/logo.png" className="lg:w-10 w-7" alt="" />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
