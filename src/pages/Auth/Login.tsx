import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../api/auth";
import AuthLayout from "../../components/AuthLayout";
import { useLanguage } from "../../i18n";
import { useAuthStore } from "../../store/auth";
import { loginSchema } from "../../utils/validation";
import type { z } from "zod";

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);
  const { t } = useLanguage();
  const form = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginForm) => {
    setLoading(true);
    try {
      const response = await login(values);
      const data = response.data?.data || {};
      const credentials = data.account || data;

      if (credentials?.access_token && credentials?.refresh_token) {
        setTokens(credentials.access_token, credentials.refresh_token);
        toast.success(t("login"));
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/verify-otp", { state: { email: values.email, mode: "login" } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={t("login")} subtitle={t("loginSubtitle")}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label className="label" htmlFor="email">
            {t("email")}
          </label>
          <input className="input" id="email" type="email" {...form.register("email")} />
          <p className="mt-1 text-sm text-red-300">{form.formState.errors.email?.message}</p>
        </div>
        <div>
          <label className="label" htmlFor="password">
            {t("password")}
          </label>
          <input className="input" id="password" type="password" {...form.register("password")} />
          <p className="mt-1 text-sm text-red-300">{form.formState.errors.password?.message}</p>
        </div>
        <button className="btn w-full" disabled={loading} type="submit">
          {loading ? t("loggingIn") : t("login")}
        </button>
      </form>
      <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm text-muted">
        <Link to="/forgot-password">{t("forgotPassword")}</Link>
        <Link to="/signup">{t("createAccount")}</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
