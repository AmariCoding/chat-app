import { create } from "zustand";

interface User {
  id: string;
  email: string;
}
interface ChatStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user: user }),
}));
