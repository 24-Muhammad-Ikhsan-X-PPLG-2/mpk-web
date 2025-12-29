"use client";
import { useAsyncEffect } from "@/hooks/useAsyncEffect";
import { createClient } from "@/lib/supabase/client";
import { Users } from "lucide-react";
import React, { useEffect, useState } from "react";

const supabase = createClient();
const TotalAdmin = () => {
  const [total, setTotal] = useState(0);
  const { isLoading } = useAsyncEffect(async () => {
    const { data } = await supabase.from("profiles").select();
    if (data) {
      setTotal(data.length);
    }
  }, []);
  return (
    <div className="bg-white shadow w-full rounded-xl gap-2 flex items-center p-3">
      <div className="bg-neutral-300 p-2 rounded-full">
        <Users className="lg:size-8 size-6 text-primary" />
      </div>
      <div className="flex flex-col">
        <p className="text-secondary font-semibold lg:text-lg text-sm">
          Total Admin
        </p>
        <p className="text-black font-medium lg:text-base text-xs">
          {isLoading ? "Loading..." : total}
        </p>
      </div>
    </div>
  );
};

export default TotalAdmin;
