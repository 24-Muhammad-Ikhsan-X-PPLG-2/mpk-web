import React, { Suspense } from "react";
import Signin from "./signin";
import { Metadata } from "next";
import { appName } from "@/lib/server/utils";

export const metadata: Metadata = {
  title: `${appName} - Sign In`,
};

const Page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Signin />
    </Suspense>
  );
};

export default Page;
