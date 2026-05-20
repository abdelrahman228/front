import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { updatePassword } from "../../api/auth";
import DashboardLayout from "../../components/DashboardLayout";
import { useLanguage } from "../../i18n";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    newPassword: z.string().min(8, "كلمة المرور الجديدة لا تقل عن 8 أحرف"),
    confirmNewPassword: z.string().min(8, "تأكيد كلمة المرور مطلوب")
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmNewPassword"]
  });

type PasswordForm = z.infer<typeof passwordSchema>;

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const form = useForm<PasswordForm>({ resolver: zodResolver(passwordSchema) });

  const onSubmit = async (values: PasswordForm) => {
    setLoading(true);
    try {
      await updatePassword(values);
      toast.success(t("save"));
      form.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title={t("settings")}>
      <section className="panel max-w-xl">
        <h2 className="mb-5 text-xl font-bold text-white">{t("passwordSettings")}</h2>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <input className="input" type="password" placeholder={t("oldPassword")} {...form.register("oldPassword")} />
          <p className="text-sm text-red-300">{form.formState.errors.oldPassword?.message}</p>
          <input className="input" type="password" placeholder={t("newPassword")} {...form.register("newPassword")} />
          <p className="text-sm text-red-300">{form.formState.errors.newPassword?.message}</p>
          <input className="input" type="password" placeholder={t("confirmPassword")} {...form.register("confirmNewPassword")} />
          <p className="text-sm text-red-300">{form.formState.errors.confirmNewPassword?.message}</p>
          <button className="btn" disabled={loading} type="submit">
            {loading ? t("saving") : t("save")}
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
};

export default Settings;
