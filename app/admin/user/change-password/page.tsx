import AdminLayout from "@/components/Admin/layout/AdminLayout";
import ChangePasswordForm from "@/components/Admin/Users/change-password/change-password-form";
import { appName } from "@/lib/server/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${appName} - Change Password`,
};

const ChangePassword = () => {
  return (
    <>
      <AdminLayout
        pageActive="Change Password"
        pageName="User / Change Password"
        title="Change Password"
      >
        <ChangePasswordForm />
      </AdminLayout>
    </>
  );
};

export default ChangePassword;
