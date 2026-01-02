"use client";

import React, { useEffect, useState, use } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProtectedClient from "../../../components/ProtectedClient";
import useUsersStore from "../../../store/useUsersStore";
import { useRouter } from "next/navigation";

export default function UserPage({ params }) {
  const { id } = use(params);
  const fetchById = useUsersStore((s) => s.fetchById);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchById(id).then(setUser).catch(console.error);
  }, [id]);

  if (!user)
    return (
      <ProtectedClient>
        <Box
          minHeight="60vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      </ProtectedClient>
    );

  return (
    <ProtectedClient>
      <Container maxWidth="md">
        {/* 🔙 Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 3, mb: 2 }}
          onClick={() => router.push("/users")}
        >
          Back to Users
        </Button>

        {/* 👤 User Card */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>

          <Typography color="text.secondary" gutterBottom>
            User Profile Information
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phone} />
            <Info label="Gender" value={user.gender} />
            <Info label="Company" value={user.company?.name || "-"} />
            <Info
              label="Address"
              value={`${user.address?.address}, ${user.address?.city}`}
            />
          </Box>
        </Paper>
      </Container>
    </ProtectedClient>
  );
}

/* 🔹 Small reusable UI component (no logic change) */
function Info({ label, value }) {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}
