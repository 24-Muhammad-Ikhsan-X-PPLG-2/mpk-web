import AdminLayout from "@/components/Admin/layout/AdminLayout";
import EditForm from "@/components/Admin/Users/edit/edit-form";
import { appName } from "@/lib/server/utils";
import { createClient } from "@/lib/supabase/server";
import { ProfileType } from "@/types/db";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${appName} - Edit User`,
};

const UserEdit = async ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = await createClient();
  const { id } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: DataUser } = (await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id)
    .maybeSingle()) as PostgrestMaybeSingleResponse<ProfileType>;
  const { data } = (await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .maybeSingle()) as PostgrestMaybeSingleResponse<ProfileType>;
  if (!data) {
    return redirect("/admin");
  }
  return (
    <>
      <AdminLayout
        pageActive="Edit User"
        pageName="User / Edit"
        title="Edit User"
      >
        <EditForm id={id} userEdit={data} user={DataUser!} />
      </AdminLayout>
    </>
  );
};

export default UserEdit;
