"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/useAuthStore";

export default function ProtectedClient({ children }) {
  const router = useRouter();
  const { token, initialize } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initialize();
  }, []);

  useEffect(() => {
    if (mounted && !token) {
      router.push("/login");
    }
  }, [mounted, token]);

  if (!mounted) return null;

  return token ? children : null;
}
