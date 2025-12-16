"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/useAuthStore";

export default function ProtectedClient({ children }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) router.push("/");
  }, [token, router]);

  if (!token) return null; // or loading UI
  return <>{children}</>;
}
