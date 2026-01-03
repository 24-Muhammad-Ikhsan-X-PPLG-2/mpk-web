import { createClient } from "@/lib/supabase/server";
import EditSeminar from "./client";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { appName } from "@/lib/server/utils";

export const metadata: Metadata = {
  title: `${appName} - Edit Seminar`,
};

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const supabase = await createClient();
  const { id } = await params;
  const { data } = await supabase
    .from("seminar_photo")
    .select()
    .eq("id", id)
    .maybeSingle();
  if (!data) {
    redirect("/admin");
  }
  return <EditSeminar seminar={data} id={id} />;
};

export default Page;
