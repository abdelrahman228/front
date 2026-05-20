import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { sendMessage } from "../api/messages";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../i18n";
import { messageSchema } from "../utils/validation";
import type { z } from "zod";

type MessageForm = z.infer<typeof messageSchema>;

const SendMessage = () => {
  const { receiverId } = useParams();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const form = useForm<MessageForm>({ resolver: zodResolver(messageSchema) });

  const onSubmit = async (values: MessageForm) => {
    if (!receiverId) return;
    setLoading(true);
    try {
      await sendMessage(receiverId, values);
      toast.success(t("sent"));
      form.reset({ content: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell justify-center">
      <section className="mx-auto w-full max-w-xl panel">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link to="/" className="text-2xl font-bold text-white">
            {t("brand")}
          </Link>
          <LanguageToggle />
        </div>
        <h1 className="text-3xl font-bold text-white">{t("sendTitle")}</h1>
        <p className="mt-2 text-sm leading-6 text-muted">{t("sendSubtitle")}</p>
        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <textarea className="input min-h-40 resize-y" placeholder={t("writeHere")} {...form.register("content")} />
          <p className="text-sm text-red-300">{form.formState.errors.content?.message}</p>
          <button className="btn w-full" disabled={loading || !receiverId} type="submit">
            {loading ? t("sending") : t("send")}
          </button>
        </form>
      </section>
    </main>
  );
};

export default SendMessage;
