import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import axios from "axios";

const BoothDetailsForm = () => {
  const { boothId } = useParams();
  const [products, setProducts] = useState("");
  const [staff, setStaff] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoothDetails = async () => {
      if (!boothId) {
        alert("Booth ID not found in URL.");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:1308/booth/details/${boothId}`);
        setProducts(res.data.products || "");

        // Set staff only if exists
        setStaff(res.data.staff?.length ? [...res.data.staff].reverse() : []);
      } catch (err) {
        console.error("Failed to load booth details", err);
        alert("Failed to load booth details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoothDetails();
  }, [boothId]);

  const handleStaffChange = (index, field, value) => {
    const updated = [...staff];
    updated[index][field] = value;
    setStaff(updated);

    const updatedErrors = [...errors];
    if (value.trim() !== "") {
      updatedErrors[index] = { ...updatedErrors[index], [field]: false };
      setErrors(updatedErrors);
    }
  };

  const addStaff = () => {
    setStaff([{ name: "", role: "", contact: "" }, ...staff]);
    setErrors([{ name: false, role: false, contact: false }, ...errors]);
  };

  const removeStaff = (index) => {
    const updatedStaff = [...staff];
    updatedStaff.splice(index, 1);
    setStaff(updatedStaff);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const validate = () => {
    let isValid = true;
    const newErrors = staff.map((s) => {
      const err = {
        name: !s.name.trim(),
        role: !s.role.trim(),
        contact: !s.contact.trim(),
      };
      if (err.name || err.role || err.contact) isValid = false;
      return err;
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!boothId) {
      alert("Booth ID missing.");
      return;
    }

    if (!validate()) {
      alert("Please fill all staff fields before saving.");
      return;
    }

    try {
      await axios.put(`http://localhost:1308/booth/details/${boothId}`, {
        products,
        staff,
      });

      alert("Booth details updated successfully!");
    } catch (error) {
      console.error("Error updating booth details:", error?.response?.data || error.message);
      alert("Failed to update booth details.");
    }
  };

  if (loading) return <Typography>Loading booth details...</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Manage Booth Details
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Products/Services Showcased"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
          fullWidth
        />

        <Typography variant="h6">Staff Information</Typography>

        {staff.map((s, i) => (
          <Box key={i} display="flex" gap={2} alignItems="center">
            <TextField
              label="Staff Name"
              value={s.name}
              onChange={(e) => handleStaffChange(i, "name", e.target.value)}
              error={errors[i]?.name}
              helperText={errors[i]?.name ? "Required" : ""}
              fullWidth
            />
            <TextField
              label="Role"
              value={s.role}
              onChange={(e) => handleStaffChange(i, "role", e.target.value)}
              error={errors[i]?.role}
              helperText={errors[i]?.role ? "Required" : ""}
              fullWidth
            />
            <TextField
              label="Contact"
              value={s.contact}
              onChange={(e) => handleStaffChange(i, "contact", e.target.value)}
              error={errors[i]?.contact}
              helperText={errors[i]?.contact ? "Required" : ""}
              fullWidth
            />
            <IconButton color="error" onClick={() => removeStaff(i)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Box display="flex" gap={2}>
          <Button onClick={addStaff} variant="outlined">
            Add Staff
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save Booth Details
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default BoothDetailsForm;
