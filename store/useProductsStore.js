import {create} from 'zustand';
import axios from 'axios';


const API = 'https://dummyjson.com';


const useProductsStore = create((set) => ({
list: [],
total: 0,
loading: false,
query: '',
category: '',
limit: 10,
skip: 0,
async fetchList({ query, category, limit = 10, skip = 0 } = {}) {
set({ loading: true });
try {
let url = `${API}/products?limit=${limit}&skip=${skip}`;
if (query) url = `${API}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
if (category) url = `${API}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
const res = await axios.get(url);
set({ list: res.data.products || [], total: res.data.total || 0, loading: false, query, category, limit, skip });
} catch (err) {
set({ loading: false });
throw err;
}
},
async fetchById(id) {
set({ loading: true });
try {
const res = await axios.get(`${API}/products/${id}`);
set({ loading: false });
return res.data;
} catch (err) {
set({ loading: false });
throw err;
}
}
}));


export default useProductsStore;