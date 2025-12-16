"use client";
import React, { useEffect, useState,use } from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
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
        <div>Loading...</div>
      </ProtectedClient>
    );

  return (
    <ProtectedClient>
      <Container>
        <Button onClick={() => router.push("/products")}>
          Back to Products
        </Button>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            {product.images.map((img, i) => (
              <Box
                key={i}
                mb={1}
                component="img"
                src={img}
                alt={product.title}
                width="100%"
              />
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">{product.title}</Typography>
            <Typography variant="h6">₹{product.price}</Typography>
            <Typography>Category: {product.category}</Typography>
            <Typography>Rating: {product.rating}</Typography>
            <Box mt={2}>
              <Typography>{product.description}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ProtectedClient>
  );
}
