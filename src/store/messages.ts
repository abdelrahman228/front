import { create } from "zustand";
import { getMessages } from "../api/messages";
import type { Message } from "../types/message";

type MessagesState = {
  messages: Message[];
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
};

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  loading: false,
  error: null,
  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getMessages();
      set({ messages: response.data?.data?.messages || [], loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : "فشل الحصول على الرسائل";
      set({ loading: false, error: message });
    }
  }
}));
