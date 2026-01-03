import { Metadata } from "next";
import TambahSeminar from "./tambah-seminar";
import { appName } from "@/lib/server/utils";

export const metadata: Metadata = {
  title: `${appName} - Tambah Seminar`,
};

const Page = () => {
  return <TambahSeminar />;
};

export default Page;
