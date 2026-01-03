import AdminLayout from "@/components/Admin/layout/AdminLayout";
import ChangePasswordForm from "@/components/Admin/Users/change-password/change-password-form";

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
