import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExhibitorUpdatedProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:1308/exhibitor/profile", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setProfile(res.data.exhibitor);
    } catch (err) {
      console.error("Error loading profile", err);
      setAlert({ message: "Failed to load profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ mt: 5, mx: "auto", display: "block" }} />;
  }

  if (!profile) return null;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Company Profile
      </Typography>

      {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography><strong>Company Name:</strong> {profile.companyName}</Typography>
          <Typography><strong>Email:</strong> {profile.email}</Typography>
          <Typography><strong>Contact Number:</strong> {profile.contactNumber}</Typography>
          <Typography><strong>Products/Services:</strong> {profile.productsServices}</Typography>
          <Typography><strong>Description:</strong> {profile.description}</Typography>

          {/* ✅ Updated logo shown below description */}
          {profile.logo && (
            <>
              <Typography><strong>Company Logo:</strong></Typography>
              <img
                src={`http://localhost:1308/exhibitoruploads/${profile.logo}`}
                alt="Company Logo"
                width={140}
                height={140}
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                  marginTop: "5px"
                }}
              />
            </>
          )}

          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/companyprofile")}
          >
            Edit Company Profile
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ExhibitorUpdatedProfile;
