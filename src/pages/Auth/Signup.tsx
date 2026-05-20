import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";
import AuthLayout from "../../components/AuthLayout";
import { useLanguage } from "../../i18n";
import { signupSchema } from "../../utils/validation";
import type { z } from "zod";

type SignupForm = z.infer<typeof signupSchema>;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const form = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (values: SignupForm) => {
    setLoading(true);
    try {
      await signup(values);
      navigate("/confirm-email", { state: { email: values.email } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={t("signup")} subtitle={t("signupSubtitle")}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label className="label" htmlFor="username">
            {t("name")}
          </label>
          <input className="input" id="username" placeholder="Ahmed Ali" {...form.register("username")} />
          <p className="mt-1 text-sm text-red-300">{form.formState.errors.username?.message}</p>
        </div>
        <div>
          <label className="label" htmlFor="email">
            {t("email")}
          </label>
          <input className="input" id="email" type="email" {...form.register("email")} />
          <p className="mt-1 text-sm text-red-300">{form.formState.errors.email?.message}</p>
        </div>
        <div>
          <label className="label" htmlFor="phone">
            {t("phone")}
          </label>
          <input className="input" id="phone" {...form.register("phone")} />
          <p className="mt-1 text-sm text-red-300">{form.formState.errors.phone?.message}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="password">
              {t("password")}
            </label>
            <input className="input" id="password" type="password" placeholder="Ahmed782@" {...form.register("password")} />
            <p className="mt-1 text-xs text-muted">{t("passwordHint")}</p>
            <p className="mt-1 text-sm text-red-300">{form.formState.errors.password?.message}</p>
          </div>
          <div>
            <label className="label" htmlFor="confirmPassword">
              {t("confirmPassword")}
            </label>
            <input className="input" id="confirmPassword" type="password" placeholder="Ahmed782@" {...form.register("confirmPassword")} />
            <p className="mt-1 text-sm text-red-300">{form.formState.errors.confirmPassword?.message}</p>
          </div>
        </div>
        <button className="btn w-full" disabled={loading} type="submit">
          {loading ? t("creating") : t("createAccount")}
        </button>
      </form>
      <p className="mt-5 text-sm text-muted">
        {t("haveAccount")} <Link to="/login">{t("login")}</Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
