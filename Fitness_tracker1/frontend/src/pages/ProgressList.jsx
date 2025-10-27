import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProgressList = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  
  const fetchProgress = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      navigate("/Login");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:1001/progresstrack/user/${userId}`);
      setProgressData(res.data.tracking || []);
    } catch (err) {
      console.error("Failed to fetch progress data:", err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchProgress();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    setDeletingId(id);
    
    try {
      await axios.delete(`http://localhost:1001/progresstrack/${id}`);
      setProgressData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete. Try again.");
    } finally {
      setDeletingId(null);
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
  }, [loading]);

  if (loading) {
    return <Typography align="center" mt={5}>Loading progress data...</Typography>;
  }

  return (
    <>
      <section
        className="breadcrumb-section set-bg"
        data-setbg="img/breadcrumb-bg.jpg"
        style={{ height: 220 }}
      >
        <div className="container">
          <div className="breadcrumb-text text-center"></div>
        </div>
      </section>

      <Box sx={{ backgroundColor: "#f8f8f8", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            fontWeight={600}
            gutterBottom
            sx={{ mb: 4 }}
          >
            My Progress Records
          </Typography>

          {progressData.length === 0 ? (
            <Typography align="center" mt={4}>No records found.</Typography>
          ) : (
            <Grid container spacing={4}>
              {progressData.map((entry) => (
                <Grid item xs={12} md={6} key={entry._id}>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      backgroundColor: "#fff",
                      boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Date: {new Date(entry.Date).toLocaleDateString()}
                      </Typography>
                      <Stack spacing={1.2}>
                        <Typography>Body Weight: {entry.BodyWeight} kg</Typography>
                        <Typography>Runtime: {entry.Runtime} min</Typography>
                        <Typography>Chest: {entry.Chest} cm</Typography>
                        <Typography>Waist: {entry.Waist} cm</Typography>
                        <Typography>Hip: {entry.Hip} cm</Typography>
                        <Typography>Lifting Weights: {entry.Liftingweights} kg</Typography>
                        <Typography>Shoulder Width: {entry.Shoulderwidth} cm</Typography>
                        <Typography>Sleeve Length: {entry.Sleevelength} cm</Typography>
                        <Typography>Neck: {entry.Neck} cm</Typography>
                        <Typography>Body Fat: {entry.bodyfat}%</Typography>
                      </Stack>
                    </Box>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => handleDelete(entry._id)}
                      disabled={deletingId === entry._id}
                    >
                      {deletingId === entry._id ? "Deleting..." : "Delete"}
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ProgressList;
