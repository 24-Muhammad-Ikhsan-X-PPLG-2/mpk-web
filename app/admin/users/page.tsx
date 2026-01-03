import { Metadata } from "next";
import Users from "./users";
import { appName } from "@/lib/server/utils";

export const metadata: Metadata = {
  title: `${appName} - Manage Users`,
};

const Page = () => {
  return <Users />;
};

export default Page;
