"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function SignIn(form: FormData) {
  const supabase = await createClient();
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  if (!email || !password) {
    return {
      error: "Bad request!",
    };
  }
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: error.message };
    }
    revalidatePath("/", "layout");
    return redirect("/admin");
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Unexpected error!",
    };
  }
}
