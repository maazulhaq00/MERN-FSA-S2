

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const CardHeader = styled(Box)(() => ({
  display: "flex",
  padding: "16px 24px",
  justifyContent: "center",
  alignItems: "center",
}));

const Title = styled("h2")(() => ({
  fontSize: "1.2rem",
  fontWeight: "600",
}));

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const imageUrl = "http://localhost:1308/uploads/";

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const image = localStorage.getItem("image");

    if (!name || !email) {
      navigate("/login");
    } else {
      setAdmin({
        name: name || "",
        email: email || "",
        image: image || "",
      });
    }

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 10 }} />;

  return (
    <Paper sx={{ p: 4, maxWidth: 500, margin: "auto", mt: 4 }}>
      <CardHeader>
        <Title>Admin Profile</Title>
      </CardHeader>

      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <img
          src={
            admin.image
              ? `${imageUrl}${admin.image}`
              : "/default-avatar.png"
          }
          alt={admin.name}
          width={120}
          height={120}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "15px",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-avatar.png";
          }}
        />

        <Typography variant="h6" gutterBottom>
          {admin.name}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {admin.email}
        </Typography>
      </Box>

      <Box mt={4} display="flex" gap={2} justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/dashboard/editprofile")}
         
        >
          Edit Profile
        </Button>
        <Button
          variant="contained"
          color="primary"
           onClick={() => navigate("/dashboard/changeprofilepassword")}
        >
          Change password
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminProfile;

