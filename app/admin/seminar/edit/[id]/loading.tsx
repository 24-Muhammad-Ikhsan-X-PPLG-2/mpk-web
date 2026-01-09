"use client";

import AdminLayout from "@/components/Admin/layout/AdminLayout";

const Loading = () => {
  return (
    <>
      <AdminLayout
        pageActive="Seminar edit"
        pageName="Seminar / Edit / Loading..."
        title="Loading..."
      >
        <div className="w-full h-full flex min-h-[70vh] items-center justify-center">
          <div className="bg-white w-120 h-70 rounded-xl shadow p-4 flex justify-center items-center animate-pulse">
            <p className="text-xl font-bold">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Loading;
