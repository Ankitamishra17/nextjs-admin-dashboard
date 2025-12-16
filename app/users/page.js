"use client";
import React, { useEffect, useState, useCallback } from "react";
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
} from "@mui/material";
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
      <Container>
        <h2>Users</h2>
        <TextField
          label="Search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          fullWidth
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((u) => (
                  <TableRow
                    key={u.id}
                    hover
                    onClick={() => router.push(`/users/${u.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.gender}</TableCell>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell>{u.company?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Pagination
          sx={{ mt: 2 }}
          count={Math.ceil(total / 10)}
          page={page}
          onChange={(e, v) => setPage(v)}
        />
      </Container>
    </ProtectedClient>
  );
}
