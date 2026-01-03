import DaftarSeminar from "@/components/Admin/daftar-seminar";
import ImageWallpaper from "@/components/Admin/image-wallpaper";
import AdminLayout from "@/components/Admin/layout/AdminLayout";
import TotalAdmin from "@/components/Admin/total-admin";
import TotalMember from "@/components/Admin/total-member";
import { appName } from "@/lib/server/utils";
import { Database, Wifi } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${appName} - Dashboard admin`,
};

const Dashboard = () => {
  return (
    <>
      <AdminLayout>
        <section className="w-full">
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            id="barisan-atas"
          >
            <div className="bg-white shadow w-full rounded-xl gap-2 flex items-center p-3">
              <div className="bg-neutral-300 p-2 rounded-full">
                <Wifi className="lg:size-8 size-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <p className="text-secondary font-semibold lg:text-lg text-sm">
                  Status Server
                </p>
                <p className="text-green-500 font-medium lg:text-base text-xs">
                  Online
                </p>
              </div>
            </div>
            <div className="bg-white shadow w-full rounded-xl gap-2 flex items-center p-3">
              <div className="bg-neutral-300 p-2 rounded-full">
                <Database className="lg:size-8 size-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <p className="text-secondary font-semibold lg:text-lg text-sm">
                  Status DB
                </p>
                <p className="text-green-500 font-medium lg:text-base text-xs">
                  Online
                </p>
              </div>
            </div>
            <TotalAdmin />
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <TotalMember />
          <ImageWallpaper />
        </section>

        <DaftarSeminar />
      </AdminLayout>
    </>
  );
};

export default Dashboard;
