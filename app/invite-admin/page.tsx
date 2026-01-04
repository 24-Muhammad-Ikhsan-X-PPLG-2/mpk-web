import { appName } from "@/lib/server/utils";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import InviteAdmin from "./invite-admin";
export const metadata: Metadata = {
  title: `${appName} - Kode Invite Admin`,
};

const Page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/admin");
  }
  return (
    <>
      <InviteAdmin />
    </>
  );
};

export default Page;
