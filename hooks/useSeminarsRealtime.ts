"use client";

import { fetchSeminars } from "@/lib/client/utils";
import { createClient } from "@/lib/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const supabase = createClient();

const useSeminarsRealtime = () => {
  const queryClient = useQueryClient();
  const { isLoading, data: seminars } = useQuery({
    queryKey: ["seminars"],
    queryFn: fetchSeminars,
  });
  useEffect(() => {
    const channel = supabase
      .channel("seminar_photo_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "seminar_photo" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["seminars"] });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return {
    isLoading,
    seminars,
  };
};

export default useSeminarsRealtime;
