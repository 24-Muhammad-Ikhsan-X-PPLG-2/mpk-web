"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { useAsyncEffect } from "@/hooks/useAsyncEffect";
import { createClient } from "@/lib/supabase/client";
import { SeminarPhotoType } from "@/types/db";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import PreviewModal from "./preview-modal";
import DeleteModal, { deleteModalType } from "./delete-modal";
import Link from "next/link";

const supabase = createClient();
const DaftarSeminar = () => {
  const [seminars, setSeminars] = useState<SeminarPhotoType[] | null>(null);
  const { changeNoScroll } = useLayout();
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewModal, setPreviewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<deleteModalType | null>(null);
  const seminarsRef = useRef<SeminarPhotoType[] | null>(null);
  const { isLoading } = useAsyncEffect(async () => {
    const { data } = await supabase.from("seminar_photo").select();
    setSeminars(data);
  }, []);
  useEffect(() => {
    seminarsRef.current = seminars;
  }, [seminars]);
  useEffect(() => {
    if (previewModal) {
      changeNoScroll(true);
    } else {
      changeNoScroll(false);
    }
  }, [previewModal]);
  useEffect(() => {
    const channel = supabase
      .channel("seminar_photo_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "seminar_photo" },
        handleRealtime
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const showPreview = (url: string) => {
    setPreviewUrl(url);
    setPreviewModal(true);
  };
  const handleRealtime = (
    payload: RealtimePostgresChangesPayload<SeminarPhotoType>
  ) => {
    if (payload.eventType === "INSERT") {
      const newItem = payload.new;
      setSeminars((prev) => {
        if (prev) {
          return [...prev, newItem];
        }
        return [newItem];
      });
    }
    if (payload.eventType === "UPDATE") {
      const newItem = payload.new;
      setSeminars((prev) => {
        if (!prev) return [];
        const index = prev.findIndex((item) => item.id === newItem.id);
        if (index === -1) return prev;
        const updatedItems = [...prev];
        updatedItems[index] = newItem;
        return updatedItems;
      });
    }
    if (payload.eventType === "DELETE") {
      const oldItem = payload.old;
      setSeminars((prev) => {
        if (!prev) return prev;
        const newItems = prev.filter((item) => item.id !== oldItem.id);
        return newItems;
      });
    }
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
        <div className="overflow-x-auto rounded-xl bg-white border border-gray-300 shadow-sm">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="*:font-medium *:text-gray-900">
                <th className="px-3 py-2 whitespace-nowrap">Nama Seminar</th>
                <th className="px-3 py-2 whitespace-nowrap">Tgl</th>
                <th className="px-3 py-2 ">Gambar</th>
                <th className="px-3 py-2 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {seminars?.map((item, idx) => (
                <tr key={idx} className="text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">{item.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.tgl}</td>
                  <td
                    className="px-3 py-2 "
                    onClick={() => showPreview(item.img_url)}
                  >
                    <button className="bg-green-500 px-5 py-1.5 text-sm font-semibold cursor-pointer text-white rounded">
                      Lihat
                    </button>
                  </td>
                  <td className="px-3 py-2 flex gap-2 items-center">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default DaftarSeminar;
