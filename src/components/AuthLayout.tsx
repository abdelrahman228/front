import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import LanguageToggle from "./LanguageToggle";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  const { t } = useLanguage();

  return (
    <main className="page-shell justify-center">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link to="/" className="text-2xl font-bold text-white">
            {t("brand")}
          </Link>
          <LanguageToggle />
        </div>
        <section className="panel">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
