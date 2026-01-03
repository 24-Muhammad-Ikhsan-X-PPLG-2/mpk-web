"use server";
import { checkOldPassword } from "@/lib/server/server-utils";
import { createClient, createClientAdmin } from "@/lib/supabase/server";

export async function ChangePasswordServerAction(formData: FormData) {
  const passwordLama = formData.get("password_lama") as string;
  const passwordBaru = formData.get("password_baru") as string;
  const confirmPassword = formData.get("confirm_password") as string;
  if (!passwordLama || !passwordBaru || !confirmPassword) {
    return {
      error: "Bad request!",
    };
  }
  if (passwordBaru !== confirmPassword) {
    return {
      error: "Konfirmasi password tidak valid!",
    };
  }
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        error: "User belum login!",
      };
    }
    const supabaseAdmin = await createClientAdmin();
    const checkPassword = await checkOldPassword(
      user.email ?? "",
      passwordLama
    );
    if (!checkPassword) {
      return {
        error: "Password Lama tidak valid!",
      };
    }
    const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: passwordBaru,
    });
    if (error) {
      return {
        error: error.message,
      };
    }
    const { error: ErrorLogin } = await supabase.auth.signInWithPassword({
      email: user.email ?? "",
      password: passwordBaru,
    });
    if (ErrorLogin) {
      return {
        error: ErrorLogin.message,
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
