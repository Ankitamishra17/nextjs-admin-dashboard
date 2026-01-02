"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TextField,
  MenuItem,
  Pagination,
  Select,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useProductsStore from "../../store/useProductsStore";
import ProtectedClient from "../../components/ProtectedClient";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const { list, total, loading, fetchList } = useProductsStore();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchList({ query: q, category, limit: 10, skip: (page - 1) * 10 });
  }, [page, q, category]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((r) => setCategories(r.data))
      .catch(() => {});
  }, []);

  return (
    <ProtectedClient>
      <Container maxWidth="lg">
        {/* Header */}
        <Box mt={4} mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Products
          </Typography>
          <Typography color="text.secondary">
            Browse and manage available products
          </Typography>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              placeholder="Search products"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              sx={{ minWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Select
              value={category}
              displayEmpty
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              sx={{ minWidth: 220 }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((c) => (
                <MenuItem key={c.slug} value={c.slug}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Paper>

        {/* Loading */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {list.map((p) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={p.id}
                onClick={() => router.push(`/products/${p.id}`)}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                    height: "100%",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={p.thumbnail}
                    alt={p.title}
                  />

                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {p.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      ₹{p.price} • {p.category}
                    </Typography>

                    <Typography variant="body2">
                      ⭐ {p.rating}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/*  Pagination */}
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
