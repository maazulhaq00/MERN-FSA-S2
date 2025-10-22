import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
  Typography,
} from "@mui/material";
import axios from "axios";

const ExpoRegistrationForm = () => {
  const { id: expoIdFromParam } = useParams();

  const [form, setForm] = useState({
    expoId: expoIdFromParam || "",
    boothId: "",
  });

  const [exhibitorId, setExhibitorId] = useState("");
  const [booths, setBooths] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // ✅ Fetch Exhibitor ID from token (via profile endpoint)
  useEffect(() => {
    const fetchExhibitor = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:1308/exhibitor/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const id = res.data.exhibitor._id;
        setExhibitorId(id);
      } catch (err) {
        console.error("Error fetching exhibitor:", err);
        setAlert({ message: "Failed to load exhibitor profile", type: "error" });
      }
    };

    fetchExhibitor();
  }, []);

  // ✅ Load available booths for selected Expo
  useEffect(() => {
    if (form.expoId) {
      axios
        .get(`http://localhost:1308/booth?expoId=${form.expoId}`)
        .then((res) => {
          const availableBooths = res.data.booths?.filter(
            (booth) => booth.status === "available"
          );
          setBooths(availableBooths || []);
        })
        .catch(() => {
          setAlert({ message: "Booth data fetch error", type: "error" });
        });
    }
  }, [form.expoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit application with token in header
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!form.expoId || !form.boothId || !exhibitorId || !token) {
      return setAlert({
        message: "Please select a booth. Token or data missing.",
        type: "error",
      });
    }

    try {
      const res = await axios.post(
        "http://localhost:1308/application",
        {
          exhibitorId,
          expoId: form.expoId,
          boothId: form.boothId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlert({ message: "Application submitted successfully!", type: "success" });
      setForm((prev) => ({ ...prev, boothId: "" }));
    } catch (err) {
      const msg = err.response?.data?.message || "Application failed.";
      setAlert({ message: msg, type: "error" });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Expo Registration
      </Typography>

      {alert.message && (
        <Alert severity={alert.type} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Expo ID"
            name="expoId"
            value={form.expoId}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            label="Select Booth"
            name="boothId"
            value={form.boothId}
            onChange={handleInputChange}
            fullWidth
          >
            {booths.length > 0 ? (
              booths.map((booth) => (
                <MenuItem key={booth._id} value={booth._id}>
                  Booth #{booth.boothNumber} - {booth.size}, Floor {booth.floor}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No booths available</MenuItem>
            )}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Submit Application
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpoRegistrationForm;
