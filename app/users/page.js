"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useUsersStore from "../../store/useUsersStore";
import ProtectedClient from "../../components/ProtectedClient";
import { useRouter } from "next/navigation";

export default function UsersList() {
  const { list, total, loading, fetchList, limit, skip } = useUsersStore();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchList({ query: q, limit: 10, skip: (page - 1) * 10 });
  }, [page, q]);

  return (
    <ProtectedClient>
      <Container maxWidth="lg">
        {/* Header */}
        <Box mt={4} mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Users Management
          </Typography>
          <Typography color="text.secondary">
            Search and manage registered users
          </Typography>
        </Box>

        {/* Search */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search users by name or email"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/*Table */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={4}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f4f6f8" }}>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Gender</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell><b>Company</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {list.map((u) => (
                  <TableRow
                    key={u.id}
                    hover
                    onClick={() => router.push(`/users/${u.id}`)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f0f4ff",
                      },
                    }}
                  >
                    <TableCell>
                      {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {u.gender}
                    </TableCell>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell>{u.company?.name || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(total / 10)}
            page={page}
            onChange={(e, v) => setPage(v)}
            color="primary"
          />
        </Box>
      </Container>
    </ProtectedClient>
  );
}
