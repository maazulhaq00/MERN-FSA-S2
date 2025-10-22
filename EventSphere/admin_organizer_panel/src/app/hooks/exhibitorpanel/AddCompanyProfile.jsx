import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const AddCompanyProfile = () => {
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    contactNumber: "",
    productsServices: "",
    description: "",
    logo: null,
    existingLogo: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const fileInputRef = useRef(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setForm({ ...form, logo: file, existingLogo: previewURL });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAlert({ message: "", type: "" });

    try {
      const formData = new FormData();
      formData.append("companyName", form.companyName);
      formData.append("email", form.email);
      formData.append("contactNumber", form.contactNumber);
      formData.append("productsServices", form.productsServices);
      formData.append("description", form.description);

      if (form.logo) {
        formData.append("logo", form.logo);
      }

      // Get token from localStorage (make sure token is stored there)
      const token = localStorage.getItem("token");
      console.log("Sending token:", token);

      const response = await axios.post("http://localhost:1308/exhibitor", formData, {
        headers: {
          "Authorization": token,  // Token directly without "Bearer"
          // Do NOT set Content-Type manually, axios handles multipart boundary automatically
        },
      });

      setForm({
        companyName: "",
        email: "",
        contactNumber: "",
        productsServices: "",
        description: "",
        logo: null,
        existingLogo: "",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      setAlert({ message: "Details added successfully", type: "success" });
    } catch (error) {
      console.error("Error submitting form:", error);

      if (error.response) {
        setAlert({ message: error.response.data.message || "Failed to add details", type: "error" });
      } else {
        setAlert({ message: "Network or server error", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <Typography variant="h5" mb={2}>
        Add Company Profile
      </Typography>

      {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Contact Number"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Products / Services"
            name="productsServices"
            value={form.productsServices}
            onChange={handleChange}
            fullWidth
            multiline
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          {form.existingLogo && (
            <Box mt={1}>
              <img
                src={form.existingLogo}
                alt="Logo Preview"
                width={100}
                style={{ borderRadius: 8 }}
              />
            </Box>
          )}

          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddCompanyProfile;
