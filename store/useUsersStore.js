import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore";

const API = "https://dummyjson.com";

const useUsersStore = create((set, get) => ({
  list: [],
  total: 0,
  loading: false,
  query: "",
  limit: 10,
  skip: 0,
  async fetchList({ query, limit = 10, skip = 0 } = {}) {
    set({ loading: true });
    try {
      const url = query
        ? `${API}/users/search?q=${encodeURIComponent(
            query
          )}&limit=${limit}&skip=${skip}`
        : `${API}/users?limit=${limit}&skip=${skip}`;
      const res = await axios.get(url);
      set({
        list: res.data.users || res.data.products || [],
        total: res.data.total || 0,
        loading: false,
        query,
        limit,
        skip,
      });
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },
  async fetchById(id) {
    set({ loading: true });
    try {
      const res = await axios.get(`${API}/users/${id}`);
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },
}));

export default useUsersStore;
