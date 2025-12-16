"use client";
import React, { useEffect, useState,use } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
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
        <div>Loading...</div>
      </ProtectedClient>
    );

  return (
    <ProtectedClient>
      <Container>
        <Button onClick={() => router.push("/users")}>Back to Users</Button>
        <Box mt={2}>
          <Typography variant="h5">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>Gender: {user.gender}</Typography>
          <Typography>Company: {user.company?.name}</Typography>
          <Typography>
            Address: {user.address?.address}, {user.address?.city}
          </Typography>
        </Box>
      </Container>
    </ProtectedClient>
  );
}
