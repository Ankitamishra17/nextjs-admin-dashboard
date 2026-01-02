"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";
import ProtectedClient from "../../components/ProtectedClient";
import useAuthStore from "../../store/useAuthStore";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return (
    <ProtectedClient>
      {/* Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            Admin Dashboard
          </Typography>

          <Box>
            <Button
              variant="contained"
              sx={{ mr: 1, backgroundColor: "#ffffff", color: "#764ba2" }}
              onClick={() => router.push("/users")}
            >
              Users
            </Button>

            <Button
              variant="contained"
              sx={{ mr: 1, backgroundColor: "#ffffff", color: "#764ba2" }}
              onClick={() => router.push("/products")}
            >
              Products
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/*Dashboard Content */}
      <Container maxWidth="lg">
        <Paper
          elevation={4}
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Dashboard
          </Typography>

          <Typography color="text.secondary">
            Welcome to the admin dashboard. Use the navigation buttons above to
            manage users and products.
          </Typography>
        </Paper>
      </Container>
    </ProtectedClient>
  );
}
