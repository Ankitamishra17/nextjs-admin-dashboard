"use client";
import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import ProtectedClient from "../../components/ProtectedClient";
import useAuthStore from "../../store/useAuthStore";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return (
    <ProtectedClient>
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={4}
        >
          <Typography variant="h4">Dashboard</Typography>
          <Box>
            <Button variant="contained" onClick={() => router.push("/users")}>
              Users
            </Button>
            <Button sx={{ ml: 2 }} onClick={() => router.push("/products")}>
              Products
            </Button>
            <Button
              sx={{ ml: 2 }}
              color="error"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        <Box mt={4}>
          <Typography>
            Welcome to the admin dashboard. Use the left buttons to navigate.
          </Typography>
        </Box>
      </Container>
    </ProtectedClient>
  );
}
