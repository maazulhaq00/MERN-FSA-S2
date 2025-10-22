// src/pages/ExpoDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";

export default function ExpoDetails() {
  const { id } = useParams();
  const [expo, setExpo] = useState(null);
  const imageUrl = "http://localhost:1308/uploads/";

  const fetchExpo = async () => {
    try {
      const response = await axios.get(`http://localhost:1308/expo/${id}`);
      setExpo(response.data.expo);
    } catch (error) {
      console.error("Error fetching expo:", error);
    }
  };

  useEffect(() => {
    fetchExpo();
  }, []);

  if (!expo) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="300"
          image={imageUrl + expo.expoimage}
          alt={expo.title}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {expo.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Theme: {expo.theme}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Date: {new Date(expo.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Description: {expo.description || "No description provided."}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Status: {expo.status}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
