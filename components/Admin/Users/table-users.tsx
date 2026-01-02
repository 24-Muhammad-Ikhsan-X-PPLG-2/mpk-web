"use client";

import { useAsyncEffect } from "@/hooks/useAsyncEffect";
import { createClient } from "@/lib/supabase/client";
import { ProfileType } from "@/types/db";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { DeleteAkunServerAction } from "./action-delete";
import ErrorModal from "@/components/error-modal";
import ButtonDeleteUser from "./button-delete-user";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

const supabase = createClient();

const TableUsers = () => {
  const [users, setUsers] = useState<ProfileType[] | null>(null);
  const [errorDelete, setErrorDelete] = useState("");
  const usersRef = useRef<ProfileType[]>(null);
  const { isLoading } = useAsyncEffect(async () => {
    const { data } = await supabase.from("profiles").select();
    setUsers(data);
  }, []);
  useEffect(() => {
    usersRef.current = users;
  }, [users]);
  useEffect(() => {
    const channel = supabase
      .channel("profiles_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        handlePayload
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const handlePayload = (
    payload: RealtimePostgresChangesPayload<ProfileType>
  ) => {
    if (payload.eventType === "INSERT") {
      const newItem = payload.new;
      setUsers((prev) => {
        if (prev) {
          return [...prev, newItem];
        }
        return [newItem];
      });
    }
    if (payload.eventType === "UPDATE") {
      const newItem = payload.new;
      setUsers((prev) => {
        if (!prev) return [];
        const index = prev.findIndex((item) => item.id === newItem.id);
        if (index === -1) return prev;
        const items = [...prev];
        items[index] = newItem;
        return items;
      });
    }
    if (payload.eventType === "DELETE") {
      const oldItem = payload.old;
      setUsers((prev) => {
        if (!prev) return prev;
        const newItems = prev.filter((item) => item.id !== oldItem.id);
        return newItems;
      });
    }
  };
  return (
    <>
      <ErrorModal errorDelete={errorDelete} setErrorDelete={setErrorDelete} />
      <div className="max-h-[90vh] overflow-x-auto bg-white rounded-xl">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="sticky top-0 bg-white ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">Nama Akun</th>
              <th className="px-3 py-2 whitespace-nowrap">Email Akun</th>
              <th className="px-3 py-2 whitespace-nowrap">Role</th>
              <th className="px-3 py-2 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {!isLoading &&
              users?.map((user, idx) => (
                <tr key={idx} className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{user.email}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{user.role}</td>
                  <td className="px-3 py-2 whitespace-nowrap flex items-center gap-2">
                    <Link href={`/admin/user/edit/${user.id}`}>
                      <button className="bg-primary px-5 py-1.5 text-sm text-white font-semibold rounded cursor-pointer">
                        Edit
                      </button>
                    </Link>

                    <ButtonDeleteUser
                      setErrorDelete={setErrorDelete}
                      id={user.id}
                    />
                  </td>
                </tr>
              ))}
            {isLoading &&
              Array.from({ length: 3 }).map((_, idx) => (
                <tr key={idx} className="*:text-gray-900 *:first:font-medium">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <td key={idx} className="px-3 py-2 w-[150px] h-2">
                      <div className="bg-gray-500 w-full h-full p-1.5 animate-pulse rounded-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableUsers;
