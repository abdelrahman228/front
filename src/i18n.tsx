import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Language = "ar" | "en";

type LanguageContextValue = {
  language: Language;
  isArabic: boolean;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.ar) => string;
};

const translations = {
  ar: {
    brand: "وشوشني",
    languageButton: "English",
    anonymousMessages: "رسائل مجهولة، بلا ضوضاء",
    homeTitle: "وشوشني يخلّي الناس تبعتلك رأيها بصراحة وببساطة.",
    homeSubtitle: "أنشئ حسابك، شارك رابطك، واستقبل الرسائل في لوحة هادئة ومنظمة.",
    startNow: "ابدأ الآن",
    myAccount: "حسابي",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    newMessage: "رسالة جديدة",
    sampleMessage: "استمر، أسلوبك في الكلام مريح ويشجع الناس تتكلم.",
    shareLink: "رابط المشاركة",
    messages: "الرسائل",
    profile: "الحساب",
    settings: "الإعدادات",
    logout: "خروج",
    dashboard: "لوحة التحكم",
    sendTitle: "اكتب رسالتك",
    sendSubtitle: "رسالتك ستصل بدون إظهار هويتك.",
    writeHere: "اكتب هنا...",
    sending: "جاري الإرسال...",
    send: "إرسال",
    sent: "تم إرسال الرسالة",
    loginSubtitle: "ادخل إلى رسائلك ولوحة حسابك.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    loggingIn: "جاري الدخول...",
    forgotPassword: "نسيت كلمة المرور؟",
    createAccount: "إنشاء حساب",
    signupSubtitle: "اكتب الاسم بصيغة First Last بحروف إنجليزية ليتوافق مع النظام الحالي.",
    name: "الاسم",
    phone: "الهاتف",
    confirmPassword: "تأكيد كلمة المرور",
    passwordHint: "استخدم حروفًا إنجليزية كبيرة وصغيرة ورقمًا.",
    creating: "جاري الإنشاء...",
    haveAccount: "لديك حساب؟",
    confirmEmailTitle: "تأكيد البريد",
    confirmEmailSubtitle: "اكتب الكود المكوّن من 6 أرقام الذي وصل إلى بريدك.",
    code: "الكود",
    confirming: "جاري التأكيد...",
    confirm: "تأكيد",
    resendCode: "إرسال كود جديد",
    forgotTitle: "استعادة كلمة المرور",
    forgotSubtitle: "سنرسل لك كود تحقق على البريد المسجل.",
    sendCode: "إرسال الكود",
    resetTitle: "كلمة مرور جديدة",
    resetSubtitle: "اختر كلمة مرور تحتوي حروفًا إنجليزية كبيرة وصغيرة ورقمًا.",
    newPassword: "كلمة المرور الجديدة",
    saving: "جاري الحفظ...",
    savePassword: "حفظ كلمة المرور",
    verifyTitle: "تحقق من الكود",
    verifySubtitle: "أدخل كود التحقق لإكمال العملية.",
    verifying: "جاري التحقق...",
    verify: "تحقق",
    noMessages: "لا توجد رسائل بعد.",
    loadingMessages: "جاري تحميل الرسائل...",
    attachment: "مرفق",
    accountData: "بيانات الحساب",
    profileName: "الاسم",
    profileEmail: "البريد",
    copy: "نسخ",
    copied: "تم النسخ",
    loadingProfile: "جاري تحديث البيانات...",
    passwordSettings: "تغيير كلمة المرور",
    oldPassword: "كلمة المرور الحالية",
    save: "حفظ"
  },
  en: {
    brand: "Woshweshni",
    languageButton: "العربية",
    anonymousMessages: "Anonymous messages, without the noise",
    homeTitle: "Woshweshni lets people send honest thoughts simply.",
    homeSubtitle: "Create your account, share your link, and receive messages in a calm dashboard.",
    startNow: "Start now",
    myAccount: "My account",
    login: "Log in",
    signup: "Sign up",
    newMessage: "New message",
    sampleMessage: "Keep going. Your way of speaking feels comfortable and invites people to talk.",
    shareLink: "Share link",
    messages: "Messages",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    dashboard: "Dashboard",
    sendTitle: "Write your message",
    sendSubtitle: "Your message will arrive without revealing your identity.",
    writeHere: "Write here...",
    sending: "Sending...",
    send: "Send",
    sent: "Message sent",
    loginSubtitle: "Access your messages and account dashboard.",
    email: "Email",
    password: "Password",
    loggingIn: "Logging in...",
    forgotPassword: "Forgot password?",
    createAccount: "Create account",
    signupSubtitle: "Use First Last in English to match the current system.",
    name: "Name",
    phone: "Phone",
    confirmPassword: "Confirm password",
    passwordHint: "Use English uppercase, lowercase letters, and a number.",
    creating: "Creating...",
    haveAccount: "Already have an account?",
    confirmEmailTitle: "Confirm email",
    confirmEmailSubtitle: "Enter the 6-digit code sent to your email.",
    code: "Code",
    confirming: "Confirming...",
    confirm: "Confirm",
    resendCode: "Send a new code",
    forgotTitle: "Recover password",
    forgotSubtitle: "We will send a verification code to your registered email.",
    sendCode: "Send code",
    resetTitle: "New password",
    resetSubtitle: "Choose a password with English uppercase, lowercase letters, and a number.",
    newPassword: "New password",
    saving: "Saving...",
    savePassword: "Save password",
    verifyTitle: "Verify code",
    verifySubtitle: "Enter the verification code to continue.",
    verifying: "Verifying...",
    verify: "Verify",
    noMessages: "No messages yet.",
    loadingMessages: "Loading messages...",
    attachment: "Attachment",
    accountData: "Account data",
    profileName: "Name",
    profileEmail: "Email",
    copy: "Copy",
    copied: "Copied",
    loadingProfile: "Refreshing account data...",
    passwordSettings: "Change password",
    oldPassword: "Current password",
    save: "Save"
  }
} as const;

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem("language") === "en" ? "en" : "ar"));

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      isArabic: language === "ar",
      toggleLanguage: () => setLanguage((current) => (current === "ar" ? "en" : "ar")),
      t: (key) => translations[language][key]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
};
