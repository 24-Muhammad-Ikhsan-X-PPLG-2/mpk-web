import { createClient } from "@/lib/supabase/server";
import EditSeminar from "./client";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { appName } from "@/lib/server/utils";

export const metadata: Metadata = {
  title: `${appName} - Edit Seminar`,
};

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  return <EditSeminar id={id} />;
};

export default Page;
