import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n";
import { logoutUser, useAuthStore } from "../store/auth";
import LanguageToggle from "./LanguageToggle";

type DashboardLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const DashboardLayout = ({ title, children }: DashboardLayoutProps) => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <main className="page-shell gap-6">
      <header className="flex flex-col gap-4 rounded-lg border border-border bg-surface/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/dashboard" className="text-2xl font-bold text-white">
          {t("brand")}
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm font-semibold">
          <NavLink className={({ isActive }) => (isActive ? "btn" : "btn-secondary")} to="/dashboard">
            {t("messages")}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "btn" : "btn-secondary")} to="/dashboard/profile">
            {t("profile")}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "btn" : "btn-secondary")} to="/dashboard/settings">
            {t("settings")}
          </NavLink>
          <LanguageToggle />
          <button className="btn-secondary" type="button" onClick={handleLogout}>
            {t("logout")}
          </button>
        </nav>
      </header>
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">{user?.email || t("dashboard")}</p>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </section>
      {children}
    </main>
  );
};

export default DashboardLayout;
