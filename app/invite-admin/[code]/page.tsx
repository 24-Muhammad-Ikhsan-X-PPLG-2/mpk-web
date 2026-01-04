import { appName } from "@/lib/server/utils";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import CreateAccount from "./create-account";

export const metadata: Metadata = {
  title: `${appName} - Buat akun admin`,
};

const Page = async ({ params }: { params: Promise<{ code: string }> }) => {
  const { code } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/admin");
  }
  const { data } = await supabase
    .from("invite_code")
    .select()
    .eq("code", code)
    .maybeSingle();
  if (!data) {
    return redirect("/invite-admin");
  }
  return (
    <>
      <CreateAccount code={code} />
    </>
  );
};

export default Page;
