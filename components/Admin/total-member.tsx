"use client";

import { fetchMembers } from "@/lib/client/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const TotalMember = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });
  return (
    <div className="bg-white p-5 shadow w-full h-80 max-h-80 overflow-y-auto rounded-xl">
      <p className="text-gray-600 text-base font-semibold">Team Member</p>
      <div className="flex flex-col w-full gap-5 mt-5">
        {!isLoading &&
          data?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Image
                width={48}
                height={48}
                src={item.avatar_url ? item.avatar_url : "/img/logo.webp"}
                className="lg:size-12 size-10"
                alt=""
              />
              <div className="flex flex-col ">
                <p className="font-semibold">{item.username}</p>
                <p className="font-medium text-gray-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        {isLoading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 w-full bg-neutral-400 p-2 rounded-xl animate-pulse"
            >
              <div className="lg:size-12 size-10 rounded-full bg-gray-500" />
              <div className="flex flex-col ">
                <div className="w-15 h-2 bg-gray-500 rounded-full"></div>
                <div className="bg-gray-500 rounded-full w-24 h-2 mt-2"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TotalMember;
