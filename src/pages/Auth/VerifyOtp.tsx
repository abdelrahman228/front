import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmLogin, verifyOtp } from "../../api/auth";
import AuthLayout from "../../components/AuthLayout";
import { useLanguage } from "../../i18n";
import { useAuthStore } from "../../store/auth";
import { otpSchema } from "../../utils/validation";
import type { z } from "zod";

type OtpForm = z.infer<typeof otpSchema>;

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);
  const { t } = useLanguage();
  const state = (location.state as { email?: string; mode?: "login" | "reset" } | null) || {};
  const form = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email: state.email || "" }
  });

  const onSubmit = async (values: OtpForm) => {
    setLoading(true);
    try {
      if (state.mode === "login") {
        const response = await confirmLogin(values);
        const credentials = response.data?.data?.account || response.data?.data || response.data;
        setTokens(credentials.access_token, credentials.refresh_token);
        navigate("/dashboard", { replace: true });
      } else {
        await verifyOtp(values);
        navigate("/reset-password", { state: values });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={t("verifyTitle")} subtitle={t("verifySubtitle")}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <input className="input" type="email" placeholder={t("email")} {...form.register("email")} />
        <p className="text-sm text-red-300">{form.formState.errors.email?.message}</p>
        <input className="input" inputMode="numeric" placeholder={t("code")} {...form.register("otp")} />
        <p className="text-sm text-red-300">{form.formState.errors.otp?.message}</p>
        <button className="btn w-full" disabled={loading} type="submit">
          {loading ? t("verifying") : t("verify")}
        </button>
      </form>
    </AuthLayout>
  );
};

export default VerifyOtp;
