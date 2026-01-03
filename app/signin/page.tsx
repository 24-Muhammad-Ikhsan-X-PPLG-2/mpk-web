import React, { Suspense } from "react";
import Signin from "./signin";

const Page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Signin />
    </Suspense>
  );
};

export default Page;
