"use client";

import { useAsyncEffect } from "@/hooks/useAsyncEffect";
import { createClient } from "@/lib/supabase/client";
import { ProfileType } from "@/types/db";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DeleteAkunServerAction } from "./action-delete";
import ErrorModal from "@/components/error-modal";
import ButtonDeleteUser from "./button-delete-user";

const supabase = createClient();

const TableUsers = () => {
  const [users, setUsers] = useState<ProfileType[] | null>(null);
  const [errorDelete, setErrorDelete] = useState("");
  const { isLoading } = useAsyncEffect(async () => {
    const { data } = await supabase.from("profiles").select();
    setUsers(data);
  }, []);

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
