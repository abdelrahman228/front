import { Link } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../i18n";
import { useAuthStore } from "../store/auth";

const Home = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { t } = useLanguage();

  return (
    <main className="page-shell justify-center gap-10">
      <header className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          {t("brand")}
        </Link>
        <LanguageToggle />
      </header>
      <section className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold text-muted">{t("anonymousMessages")}</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">{t("homeTitle")}</h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">{t("homeSubtitle")}</p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn" to={accessToken ? "/dashboard" : "/signup"}>
              {t("startNow")}
            </Link>
            <Link className="btn-secondary" to={accessToken ? "/dashboard/profile" : "/login"}>
              {accessToken ? t("myAccount") : t("login")}
            </Link>
          </div>
        </div>
        <div className="panel space-y-4">
          <div className="rounded-lg border border-border bg-background/70 p-4">
            <p className="text-sm text-muted">{t("newMessage")}</p>
            <p className="mt-3 leading-7 text-white">{t("sampleMessage")}</p>
          </div>
          <div className="rounded-lg border border-border bg-background/70 p-4">
            <p className="text-sm text-muted">{t("shareLink")}</p>
            <p className="mt-3 break-all text-white">/send/user-id</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
