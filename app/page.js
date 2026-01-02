"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username: form.username.trim(),
        password: form.password.trim(),
      });

      setAuth({
        token: res.data.accessToken,
        user: res.data,
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: "blur(10px)",
          }}
        >
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" fontWeight="bold">
              Admin Panel
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Secure login to dashboard
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: "bold",
                background:
                  "linear-gradient(135deg, #667eea, #764ba2)",
              }}
            >
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
