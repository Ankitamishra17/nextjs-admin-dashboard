"use client";

import React, { useEffect, useState, use } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProtectedClient from "../../../components/ProtectedClient";
import useProductsStore from "../../../store/useProductsStore";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const fetchById = useProductsStore((s) => s.fetchById);
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchById(id).then(setProduct).catch(console.error);
  }, [id]);

  if (!product)
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
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 3, mb: 2 }}
          onClick={() => router.push("/products")}
        >
          Back to Products
        </Button>

        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Grid container spacing={4}>
            {/* Images */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: 2,
                }}
              >
                {product.images.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    alt={product.title}
                    sx={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 2,
                      border: "1px solid #eee",
                    }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {product.title}
              </Typography>

              <Typography
                variant="h5"
                color="primary"
                fontWeight="bold"
                gutterBottom
              >
                ₹{product.price}
              </Typography>

              <Typography color="text.secondary">
                Category: {product.category}
              </Typography>

              <Typography color="text.secondary">
                Rating: ⭐ {product.rating}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight="bold">
                Description
              </Typography>

              <Typography color="text.secondary" mt={1}>
                {product.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ProtectedClient>
  );
}
