import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { confirmEmail } from "../../api/auth";
import AuthLayout from "../../components/AuthLayout";
import { useLanguage } from "../../i18n";
import { otpSchema } from "../../utils/validation";
import type { z } from "zod";

type OtpForm = z.infer<typeof otpSchema>;

const ConfirmEmail = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const form = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email: (location.state as { email?: string } | null)?.email || "" }
  });

  const onSubmit = async (values: OtpForm) => {
    setLoading(true);
    try {
      await confirmEmail(values);
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={t("confirmEmailTitle")} subtitle={t("confirmEmailSubtitle")}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <input className="input" type="email" placeholder={t("email")} {...form.register("email")} />
        <p className="text-sm text-red-300">{form.formState.errors.email?.message}</p>
        <input className="input" inputMode="numeric" placeholder={t("code")} {...form.register("otp")} />
        <p className="text-sm text-red-300">{form.formState.errors.otp?.message}</p>
        <button className="btn w-full" disabled={loading} type="submit">
          {loading ? t("confirming") : t("confirm")}
        </button>
      </form>
      <Link className="mt-5 block text-sm text-muted" to="/resend-confirm-email">
        {t("resendCode")}
      </Link>
    </AuthLayout>
  );
};

export default ConfirmEmail;
