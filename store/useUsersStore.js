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
  async fetchList({ query = "", limit = 10, skip = 0 } = {}) {
    set({ loading: true });

    try {
      // Fetch all users (DummyJSON has 100 total)
      const res = await axios.get(`${API}/users?limit=100`);

      let users = res.data.users || [];

      // Client-side filtering
      if (query) {
        const q = query.toLowerCase();

        users = users.filter(
          (u) =>
            u.firstName.toLowerCase().includes(q) ||
            u.lastName.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.gender.toLowerCase().includes(q) ||
            u.company?.name?.toLowerCase().includes(q),
        );
      }

      const total = users.length;

      // Apply pagination after filtering
      const paginated = users.slice(skip, skip + limit);

      set({
        list: paginated,
        total,
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
