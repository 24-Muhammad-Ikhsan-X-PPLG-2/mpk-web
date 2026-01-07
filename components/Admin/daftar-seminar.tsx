"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { useEffect, useState } from "react";
import PreviewModal from "./preview-modal";
import DeleteModal, { deleteModalType } from "./delete-modal";
import Link from "next/link";
import useSeminarsRealtime from "@/hooks/useSeminarsRealtime";

const DaftarSeminar = () => {
  const { isLoading, seminars } = useSeminarsRealtime();
  const { changeNoScroll } = useLayout();
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewModal, setPreviewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<deleteModalType | null>(null);
  useEffect(() => {
    if (previewModal) {
      changeNoScroll(true);
    } else {
      changeNoScroll(false);
    }
  }, [previewModal]);

  const showPreview = (url: string) => {
    setPreviewUrl(url);
    setPreviewModal(true);
  };

  return (
    <>
      <PreviewModal
        previewModal={previewModal}
        previewUrl={previewUrl}
        setPreviewModal={setPreviewModal}
      />
      <DeleteModal setShow={setDeleteModal} show={deleteModal} />
      <section className="w-full mt-5">
        {seminars && !isLoading ? (
          <div className="overflow-x-auto rounded-xl bg-white border border-gray-300 shadow-sm">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="*:font-medium *:text-gray-900">
                  <th className="px-3 py-2 ">Nama Seminar</th>
                  <th className="px-3 py-2 whitespace-nowrap">Tgl</th>
                  <th className="px-3 py-2 ">Gambar</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {seminars.map((item, idx) => (
                  <tr key={idx} className="text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 lg:w-100 w-fit">{item.name}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{item.tgl}</td>
                    <td
                      className="px-3 py-2"
                      onClick={() => showPreview(item.img_url)}
                    >
                      <button className="bg-green-500 px-5 py-1.5 text-sm font-semibold cursor-pointer text-white rounded">
                        Lihat
                      </button>
                    </td>
                    <td className="px-3 py-2  gap-2 ">
                      <div className="flex gap-2">
                        <Link href={`/admin/seminar/edit/${item.id}`}>
                          <button className="bg-primary px-5 py-1.5 text-sm text-white font-semibold rounded cursor-pointer">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="bg-red-600 px-5 py-1.5 text-sm text-white font-semibold rounded cursor-pointer"
                          onClick={() =>
                            setDeleteModal({
                              id: item.id,
                              name: item.name,
                            })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl bg-white border border-gray-300 shadow-sm p-5 flex justify-center items-center w-full h-35">
            <p className="text-xl font-bold">Loading, please wait...</p>
          </div>
        )}
      </section>
    </>
  );
};

export default DaftarSeminar;
