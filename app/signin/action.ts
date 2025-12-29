"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function SignIn(form: FormData) {
  const supabase = await createClient();
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { error: error.message };
  }
  revalidatePath("/", "layout");
  return redirect("/admin");
}
