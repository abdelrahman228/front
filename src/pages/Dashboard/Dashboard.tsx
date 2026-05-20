import { useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useLanguage } from "../../i18n";
import { useMessagesStore } from "../../store/messages";

const Dashboard = () => {
  const { messages, loading, error, fetchMessages } = useMessagesStore();
  const { t } = useLanguage();

  useEffect(() => {
    void fetchMessages();
  }, [fetchMessages]);

  return (
    <DashboardLayout title={t("messages")}>
      <section className="grid gap-4">
        {loading && <div className="panel text-muted">{t("loadingMessages")}</div>}
        {error && <div className="panel text-red-300">{error}</div>}
        {!loading && messages.length === 0 && <div className="panel text-muted">{t("noMessages")}</div>}
        {messages.map((message) => (
          <article className="panel" key={message._id}>
            <p className="leading-8 text-white">{message.content || t("attachment")}</p>
            {message.attachments?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {message.attachments.map((attachment) => (
                  <a
                    className="rounded-lg border border-border px-3 py-2 text-sm text-muted"
                    href={attachment}
                    key={attachment}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("attachment")}
                  </a>
                ))}
              </div>
            ) : null}
            <time className="mt-4 block text-xs text-muted">
              {message.createdAt ? new Date(message.createdAt).toLocaleString("ar-EG") : ""}
            </time>
          </article>
        ))}
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
