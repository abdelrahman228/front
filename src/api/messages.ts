import api from "./axios";

export const getMessages = () => api.get("/message/list");
export const getMessage = (messageId: string) => api.get(`/message/${messageId}`);
export const deleteMessage = (messageId: string) => api.delete(`/message/${messageId}`);
export const sendMessage = (receiverId: string, payload: FormData | { content: string }) =>
  api.post(`/message/${receiverId}`, payload, {
    headers: payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined
  });
