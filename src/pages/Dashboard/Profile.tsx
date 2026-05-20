import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProfile } from "../../api/auth";
import DashboardLayout from "../../components/DashboardLayout";
import { useLanguage } from "../../i18n";
import { useAuthStore } from "../../store/auth";
import type { User } from "../../types/user";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user, setUser } = useAuthStore();
  const { t } = useLanguage();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const response = await getProfile();
        setUser(response.data?.data?.account as User);
      } finally {
        setLoading(false);
      }
    };
    void loadProfile();
  }, [setUser]);

  const profileId = user?._id || user?.id || "";
  const shareUrl = `${window.location.origin}/send/${profileId}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success(t("copied"));
  };

  return (
    <DashboardLayout title={t("profile")}>
      <section className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="panel">
          <p className="text-sm text-muted">{t("profileName")}</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{user?.username || `${user?.firstName || ""} ${user?.lastName || ""}`}</h2>
          <p className="mt-3 text-muted">{user?.email}</p>
          {loading && <p className="mt-4 text-sm text-muted">{t("loadingProfile")}</p>}
        </div>
        <div className="panel">
          <p className="text-sm text-muted">{t("shareLink")}</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input className="input" readOnly value={profileId ? shareUrl : t("loadingProfile")} />
            <button className="btn" disabled={!profileId} type="button" onClick={copyLink}>
              {copied ? t("copied") : t("copy")}
            </button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Profile;
