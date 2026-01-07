"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import NextTopLoader from "nextjs-toploader";
import { FC, PropsWithChildren } from "react";

type LayoutHookProviderProps = PropsWithChildren & {
  fontPlusJakartaSans: NextFontWithVariable;
};

const queryClient = new QueryClient();

const LayoutHookProvider: FC<LayoutHookProviderProps> = ({
  children,
  fontPlusJakartaSans,
}) => {
  const { noScroll } = useLayout();
  return (
    <QueryClientProvider client={queryClient}>
      <body
        className={`${fontPlusJakartaSans.className} ${
          fontPlusJakartaSans.variable
        } antialiased overflow-x-hidden ${noScroll ? "overflow-y-hidden" : ""}`}
      >
        <NextTopLoader showSpinner={false} color="#FFA240" />
        {children}
      </body>
    </QueryClientProvider>
  );
};

export default LayoutHookProvider;
