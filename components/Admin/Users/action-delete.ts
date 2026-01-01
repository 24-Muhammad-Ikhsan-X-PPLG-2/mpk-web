"use server";

import { createClientAdmin } from "@/lib/supabase/server";

export async function DeleteAkunServerAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) {
    return {
      error: "Bad request!",
    };
  }
  try {
    const supabase = await createClientAdmin();
    const { error } = await supabase.auth.admin.deleteUser(id, false);
    if (error) {
      return {
        error: error.message,
      };
    }
    return {
      error: null,
    };
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
