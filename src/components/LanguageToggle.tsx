import { useLanguage } from "../i18n";

const LanguageToggle = () => {
  const { toggleLanguage, t } = useLanguage();

  return (
    <button className="btn-secondary min-h-10 px-4 py-2 text-sm" type="button" onClick={toggleLanguage}>
      {t("languageButton")}
    </button>
  );
};

export default LanguageToggle;
