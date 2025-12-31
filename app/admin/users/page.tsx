"use client";
import AdminLayout from "@/components/Admin/layout/AdminLayout";
import TableUsers from "@/components/Admin/Users/table-users";
import TambahModal from "@/components/Admin/Users/tambah-modal";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const Users = () => {
  const [showModalTambah, setShowModalTambah] = useState(false);
  return (
    <>
      <AdminLayout pageActive="Users" pageName="Users" title="Manage Users">
        <TableUsers />
        <TambahModal
          showModal={showModalTambah}
          setShowModal={setShowModalTambah}
        />
        <button
          className="text-white flex mt-3 cursor-pointer bg-green-500 px-5 text-center justify-center items-center py-2 rounded-xl hover:bg-green-500/85 transition duration-150 active:scale-90"
          onClick={() => setShowModalTambah(true)}
        >
          <Plus className="size-6" /> Tambah
        </button>
      </AdminLayout>
    </>
  );
};

export default Users;
