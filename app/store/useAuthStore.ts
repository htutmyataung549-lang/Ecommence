import { create } from "zustand";

interface UserProfile {
  name: string;
  avatar: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserProfile | null;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated:
    typeof window !== "undefined"
      ? !!localStorage.getItem("platzi_token")
      : false,
  token:
    typeof window !== "undefined" ? localStorage.getItem("platzi_token") : null,

  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("platzi_user") || "null")
      : null,

  login: (token, user) => {
    localStorage.setItem("platzi_token", token);
    localStorage.setItem("platzi_user", JSON.stringify(user));
    if (typeof window !== "undefined") {
      document.cookie = `platzi_token=${token}; path=/; max-age=86400; SameSite=Strict; Secure`;
    }

    set({ isAuthenticated: true, token, user });
  },

  logout: () => {
    localStorage.removeItem("platzi_token");
    localStorage.removeItem("platzi_user");
    if (typeof window !== "undefined") {
      document.cookie =
        "platzi_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    }
    set({ isAuthenticated: false, token: null, user: null });
  },
}));
