"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import NextTopLoader from "nextjs-toploader";
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
      <NextTopLoader showSpinner={false} color="#FFA240" />
      {children}
    </body>
  );
};

export default LayoutHookProvider;
