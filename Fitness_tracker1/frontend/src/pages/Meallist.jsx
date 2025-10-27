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

const Meallist = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;

      if (!userId) {
        navigate("/Login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:1001/meals/user/${userId}`);
        // console.log(res.data);
        setMeals(res.data.Meal || []);
      } catch (err) {
        console.error("Fetch meals error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meal?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:1001/meals/${id}`);
      setMeals((prev) => prev.filter((meal) => meal._id !== id));
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
    return <Typography align="center" mt={5}>Loading meals...</Typography>;
  }

  return (
    <>
      <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb-bg.jpg" style={{ height: 220 }}>
        <div className="container">
          <div className="breadcrumb-text text-center"></div>
        </div>
      </section>

      <Box sx={{ backgroundColor: "#f8f8f8", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" fontWeight={600} gutterBottom sx={{ mb: 4 }}>
            My Meal Progress
          </Typography>

          {meals.length === 0 ? (
            <Typography align="center" mt={4}>No meals found.</Typography>
          ) : (
            <Grid container spacing={4}>
              {meals.map((meal) => (
                <Grid item xs={12} sm={6} md={4} key={meal._id}>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      backgroundColor: "#fff",
                      boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {meal.mealname}
                      </Typography>
                      <Stack spacing={1.2}>
                        <Typography>Calories: {meal.mealcalories}</Typography>
                        <Typography>Protein: {meal.mealprotein}g</Typography>
                        <Typography>Fats: {meal.mealfats}g</Typography>
                        <Typography>Carbs: {meal.mealcarbs}g</Typography>
                        <Typography>
                          Category: {meal.mealtypeid?.Mealtype || "Unknown"}
                        </Typography>
                      </Stack>
                    </Box>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => handleDelete(meal._id)}
                      disabled={deletingId === meal._id}
                    >
                      {deletingId === meal._id ? "Deleting..." : "Delete"}
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

export default Meallist;
