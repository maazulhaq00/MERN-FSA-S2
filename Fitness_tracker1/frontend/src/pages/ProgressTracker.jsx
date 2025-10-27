import React, { useState, useEffect } from "react";
import { Box, Button, Card, Container, MenuItem, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProgressTracker = () => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState({
    BodyWeight: "",
    Runtime: "",
    Chest: "",
    Waist: "",
    Hip: "",
    Liftingweights: "",
    Shoulderwidth: "",
    Sleevelength: "",
    Neck: "",
    bodyfat: "",
    Date: "",
    userId: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    // Fetch user details to get userId (assuming the user is logged in)
    const user = JSON.parse(localStorage.getItem("user"));
    const storedUserId = user?._id;

    if (!storedUserId) {
      navigate("/Login");
      return;
    }

    setProgress((prev) => ({ ...prev, userId: storedUserId }));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!progress.userId) {
      setAlert({
        message: "Please login first.",
        type: "error",
      });
      return;
    }

    try {
      await axios.post("http://localhost:1001/progresstrack", progress);
      setAlert({
        message: "Progress saved successfully!",
        type: "success",
      });
      // Clear form after success
      setProgress({
        BodyWeight: "",
        Runtime: "",
        Chest: "",
        Waist: "",
        Hip: "",
        Liftingweights: "",
        Shoulderwidth: "",
        Sleevelength: "",
        Neck: "",
        bodyfat: "",
        Date: "",
        userId: "",
      });
    } catch (err) {
      console.error("Error saving progress:", err.message);
      setAlert({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };
  useEffect(() => {
    const bgElements = document.querySelectorAll("[data-setbg]");
    bgElements.forEach((el) => {
      const bg = el.getAttribute("data-setbg");
      el.style.backgroundImage = `url(${bg})`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
    });
  }, []);

  return (
    <>
    <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb-bg.jpg" style={{ height: 220 }}>
        <div className="container">
          <div className="breadcrumb-text text-center"></div>
        </div>
      </section>
    <Box
      sx={{
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        py: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            background: "#fff",
            padding: { xs: 3, sm: 5 },
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
            Add Your Progress
          </Typography>

          <Stack spacing={2.5} mt={3}>
            <TextField
              fullWidth
              label="Body Weight (kg)"
              name="BodyWeight"
              type="number"
              value={progress.BodyWeight}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Runtime (min)"
              name="Runtime"
              type="number"
              value={progress.Runtime}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Chest (cm)"
              name="Chest"
              type="number"
              value={progress.Chest}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Waist (cm)"
              name="Waist"
              type="number"
              value={progress.Waist}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Hip (cm)"
              name="Hip"
              type="number"
              value={progress.Hip}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Lifting Weights (kg)"
              name="Liftingweights"
              type="number"
              value={progress.Liftingweights}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Shoulder Width (cm)"
              name="Shoulderwidth"
              type="number"
              value={progress.Shoulderwidth}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Sleeve Length (cm)"
              name="Sleevelength"
              type="number"
              value={progress.Sleevelength}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Neck (cm)"
              name="Neck"
              type="number"
              value={progress.Neck}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Body Fat (%)"
              name="bodyfat"
              type="number"
              value={progress.bodyfat}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Date"
              name="Date"
              type="date"
              value={progress.Date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#ff5722",
                py: 1.4,
                fontWeight: 600,
                fontSize: 16,
                "&:hover": {
                  backgroundColor: "#e64a19",
                },
              }}
            >
              Save Progress
            </Button>
          </Stack>

          {alert.message && (
            <Box mt={2}>
              <Typography
                variant="body2"
                sx={{
                  color: alert.type === "error" ? "#d32f2f" : "#388e3c",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {alert.message}
              </Typography>
            </Box>
          )}
        </Card>
      </Container>
    </Box>
    </>
  );
};

export default ProgressTracker;
