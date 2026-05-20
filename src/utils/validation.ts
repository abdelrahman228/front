import { z } from "zod";

const namePattern = /^[A-Z][a-z]{1,24}\s[A-Z][a-z]{1,24}$/;
const serverEmailPattern = /^[^\s@]+@[^\s@]+\.(com|net|edu)$/i;
const serverPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\w)[\w\d].{8,25}$/;

const serverEmail = z
  .string()
  .trim()
  .email("البريد الإلكتروني غير صحيح")
  .regex(serverEmailPattern, "البريد يجب أن ينتهي بـ .com أو .net أو .edu");

const serverPassword = z
  .string()
  .regex(
    serverPasswordPattern,
    "كلمة المرور يجب أن تكون 9 أحرف على الأقل وتحتوي حرفًا كبيرًا وحرفًا صغيرًا ورقمًا بالإنجليزية"
  );

export const signupSchema = z
  .object({
    username: z.string().trim().regex(namePattern, "اكتب الاسم كلمتين بالإنجليزية مثل Ahmed Ali"),
    email: serverEmail,
    phone: z.string().min(8, "رقم الهاتف قصير"),
    password: serverPassword,
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"]
  });

export const loginSchema = z.object({
  email: serverEmail,
  password: z.string().min(1, "كلمة المرور مطلوبة")
});

export const emailSchema = z.object({
  email: serverEmail
});

export const otpSchema = emailSchema.extend({
  otp: z.string().regex(/^\d{6}$/, "الكود مكون من 6 أرقام")
});

export const resetPasswordSchema = otpSchema
  .extend({
    Password: serverPassword,
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب")
  })
  .refine((data) => data.Password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"]
  });

export const messageSchema = z.object({
  content: z.string().trim().min(1, "اكتب رسالة أولًا").max(1000, "الرسالة طويلة جدًا")
});
