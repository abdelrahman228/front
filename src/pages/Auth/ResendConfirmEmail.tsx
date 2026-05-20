import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resendConfirmEmail } from "../../api/auth";
import AuthLayout from "../../components/AuthLayout";
import { useLanguage } from "../../i18n";
import { emailSchema } from "../../utils/validation";
import type { z } from "zod";

type EmailForm = z.infer<typeof emailSchema>;

const ResendConfirmEmail = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const form = useForm<EmailForm>({ resolver: zodResolver(emailSchema) });

  const onSubmit = async (values: EmailForm) => {
    setLoading(true);
    try {
      await resendConfirmEmail(values);
      navigate("/confirm-email", { state: { email: values.email } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={t("resendCode")} subtitle={t("confirmEmailSubtitle")}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <input className="input" type="email" placeholder={t("email")} {...form.register("email")} />
        <p className="text-sm text-red-300">{form.formState.errors.email?.message}</p>
        <button className="btn w-full" disabled={loading} type="submit">
          {loading ? t("sending") : t("sendCode")}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResendConfirmEmail;
