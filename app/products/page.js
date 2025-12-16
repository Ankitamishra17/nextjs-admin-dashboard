"use client";
import {useState, useEffect} from "react";
import {
  Typography,
  Container,
  TextField,
   MenuItem,
  Pagination,
   Select,
   Grid,
   Card,
   CardMedia ,
     CardContent,

  CircularProgress,
} from "@mui/material";
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
      <Container>
        <h2>Products</h2>
        <TextField
          label="Search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          sx={{ mr: 2 }}
        />
        <Select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          displayEmpty
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.slug} value={c.slug}>
              {c.name}
            </MenuItem>
          ))}
        </Select>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {list.map((p) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={p.id}
                onClick={() => router.push(`/products/${p.id}`)}
              >
                <Card sx={{ cursor: "pointer" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={p.thumbnail}
                    alt={p.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{p.title}</Typography>
                    <Typography>
                      ₹{p.price} • {p.category} • ⭐{p.rating}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
