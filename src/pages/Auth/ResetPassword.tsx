import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import AuthLayout from "../../components/AuthLayout";
import { useLanguage } from "../../i18n";
import { resetPasswordSchema } from "../../utils/validation";
import type { z } from "zod";

type ResetForm = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const state = (location.state as { email?: string; otp?: string } | null) || {};
  const form = useForm<ResetForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: state.email || "", otp: state.otp || "" }
  });

  const onSubmit = async (values: ResetForm) => {
    setLoading(true);
    try {
      await resetPassword(values);
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={t("resetTitle")} subtitle={t("resetSubtitle")}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <input className="input" type="email" placeholder={t("email")} {...form.register("email")} />
        <input className="input" inputMode="numeric" placeholder={t("code")} {...form.register("otp")} />
        <input className="input" type="password" placeholder="Ahmed782@" {...form.register("Password")} />
        <p className="text-sm text-red-300">{form.formState.errors.Password?.message}</p>
        <input className="input" type="password" placeholder={t("confirmPassword")} {...form.register("confirmPassword")} />
        <p className="text-sm text-red-300">{form.formState.errors.confirmPassword?.message}</p>
        <button className="btn w-full" disabled={loading} type="submit">
          {loading ? t("saving") : t("savePassword")}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
