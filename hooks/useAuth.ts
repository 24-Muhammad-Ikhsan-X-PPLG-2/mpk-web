"use client";
import { createClient } from "@/lib/supabase/client";
import { ProfileType } from "@/types/db";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const supabase = createClient();
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id)
          .maybeSingle();
        setUser(user);
        setProfile(data);
      }
    })();
  }, []);
  return {
    user,
    profile,
  };
};

export default useAuth;
