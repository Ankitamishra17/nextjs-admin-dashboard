import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  user: null,

  // Restore auth from localStorage
  initialize: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        set({
          token,
          user: JSON.parse(user),
        });
      }
    }
  },

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
