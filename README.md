# Next.js Admin Dashboard

A responsive admin dashboard built using Next.js, Material-UI, Zustand, and DummyJSON APIs.

## 🚀 Tech Stack
- Next.js (App Router)
- Material-UI (MUI)
- Zustand (State Management)
- NextAuth
- DummyJSON API

## ✨ Features
- Admin Authentication
- Protected Routes
- Users Management (List + Detail)
- Products Management (List + Detail)
- Search, Pagination & Filters
- Responsive UI
- Client-side caching

## 🔐 Authentication
Uses DummyJSON login API:
POST https://dummyjson.com/auth/login

## 🧠 State Management
Zustand is used for:
- Authentication state
- Users data
- Products data

Chosen for its simplicity, minimal boilerplate, and built-in async handling.

## ⚡ Performance Optimizations
- API-side pagination
- React.memo for reusable components
- useCallback / useMemo
- Zustand caching to avoid repeat API calls

## 📦 Installation

```bash
npm install
npm run dev
