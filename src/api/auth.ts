import api from "./axios";

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type OtpPayload = {
  email: string;
  otp: string;
};

export type ResetPasswordPayload = OtpPayload & {
  Password: string;
  confirmPassword: string;
};

export const signup = (payload: SignupPayload) => api.post("/auth/signup", payload);
export const login = (payload: LoginPayload) => api.post("/auth/login", payload);
export const confirmEmail = (payload: OtpPayload) => api.patch("/auth/confirm-email", payload);
export const resendConfirmEmail = (payload: { email: string }) => api.patch("/auth/resend-confirm-email", payload);
export const forgotPassword = (payload: { email: string }) => api.post("/auth/request-forgot-password-code", payload);
export const verifyOtp = (payload: OtpPayload) => api.patch("/auth/verify-forgot-password-code", payload);
export const resetPassword = (payload: ResetPasswordPayload) => api.patch("/auth/reset-forgot-password-code", payload);
export const loginWithGoogle = (payload: { idToken: string }) => api.post("/auth/login/gmail", payload);
export const signupWithGoogle = (payload: { idToken: string }) => api.post("/auth/signup/gmail", payload);
export const confirmLogin = (payload: OtpPayload) => api.post("/auth/login/confirm", payload);
export const getProfile = () => api.get("/user");
export const updatePassword = (payload: { oldPassword: string; newPassword: string; confirmNewPassword: string }) =>
  api.patch("/user/update-password", payload);
export const uploadProfileImage = (payload: FormData) =>
  api.patch("/user/profile-image", payload, { headers: { "Content-Type": "multipart/form-data" } });
export const shareProfile = (userId: string) => api.get(`/user/${userId}/share-profile`);
