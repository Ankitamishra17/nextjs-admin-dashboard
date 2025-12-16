import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  user: null,

  setAuth: ({ token, user }) => {
    set({ token, user });

    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  logout: () => {
    set({ token: null, user: null });

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
}));

export default useAuthStore;
