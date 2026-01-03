"use client";
import AdminLayout from "@/components/Admin/layout/AdminLayout";
import BuatKodeInviteModal from "@/components/Admin/Users/buat-kode-invite-modal";
import TableUsers from "@/components/Admin/Users/table-users";
import TambahModal from "@/components/Admin/Users/tambah-modal";
import { MailPlus, Plus } from "lucide-react";
import React, { useState } from "react";

const Users = () => {
  const [showModalTambah, setShowModalTambah] = useState(false);
  const [showModalBuatKode, setShowModalBuatKode] = useState(false);
  return (
    <>
      <AdminLayout pageActive="Users" pageName="Users" title="Manage Users">
        <TableUsers />
        <TambahModal
          showModal={showModalTambah}
          setShowModal={setShowModalTambah}
        />
        <BuatKodeInviteModal
          showModal={showModalBuatKode}
          setShowModal={setShowModalBuatKode}
        />

        <div className="flex gap-2">
          <button
            className="text-white flex mt-3 cursor-pointer bg-green-500 md:px-5 px-4 text-center justify-center items-center py-2 rounded-xl hover:bg-green-500/85 transition duration-150 active:scale-90 font-semibold gap-1 md:text-base text-sm"
            onClick={() => setShowModalTambah(true)}
          >
            <Plus className="md:size-6 sm:size-5 size-0 sm:block hidden" />{" "}
            Tambah
          </button>
          <button
            className="text-white flex mt-3 cursor-pointer bg-green-500 md:px-5 px-4 text-center justify-center items-center py-2 rounded-xl hover:bg-green-500/85 transition duration-150 active:scale-90 font-semibold gap-1 md:text-base text-sm"
            onClick={() => setShowModalBuatKode(true)}
          >
            <MailPlus className="md:size-6 sm:size-5 size-0 sm:block hidden" />{" "}
            Buat kode invite
          </button>
        </div>
      </AdminLayout>
    </>
  );
};

export default Users;
