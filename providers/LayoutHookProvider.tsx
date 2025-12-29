"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { FC, PropsWithChildren } from "react";

type LayoutHookProviderProps = PropsWithChildren & {
  fontPlusJakartaSans: NextFontWithVariable;
};

const LayoutHookProvider: FC<LayoutHookProviderProps> = ({
  children,
  fontPlusJakartaSans,
}) => {
  const { noScroll } = useLayout();
  return (
    <body
      className={`${fontPlusJakartaSans.className} ${
        fontPlusJakartaSans.variable
      } antialiased overflow-x-hidden ${noScroll ? "overflow-y-hidden" : ""}`}
    >
      {children}
    </body>
  );
};

export default LayoutHookProvider;
