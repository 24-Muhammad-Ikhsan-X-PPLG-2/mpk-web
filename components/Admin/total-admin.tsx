"use client";
import { fetchTotalAdmin } from "@/lib/client/utils";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

const TotalAdmin = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["total-admin"],
    queryFn: fetchTotalAdmin,
  });
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
          {isLoading ? "Loading..." : data}
        </p>
      </div>
    </div>
  );
};

export default TotalAdmin;
