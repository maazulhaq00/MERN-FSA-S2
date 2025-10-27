import React, { useState, useEffect } from "react";
import { Box, Button, Card, Container, MenuItem, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProgressTracker = () => {
  const navigate = useNavigate();
  const [categoryArr, setCategoryArr] = useState([]);

  const [progress, setProgress] = useState({
    mealname: "",
    mealcalories: "",
    mealprotein: "",
    mealfats: "",
    mealcarbs: "",
    mealtypeid: "",
  });
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:1001/mealstypes');
      // console.log(response.data);
      setCategoryArr(response.data.categories || []);
    } catch (err) {
      console.log('Category Fetch Error:', err.message);
    }
  };

  // useEffect(() => {
 
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const storedUserId = user?._id;

  //   if (!storedUserId) {
  //     navigate('/Login');
  //     return;
  //   }

  //   setProduct((prev) => ({ ...prev, userId: storedUserId }));
  // }, [navigate]);
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    // Fetch user details to get userId (assuming the user is logged in)
    const user = JSON.parse(localStorage.getItem("user"));
    const storedUserId = user?._id;

    if (!storedUserId) {
      navigate("/Login");
      return;
    }
    fetchData();

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
      await axios.post("http://localhost:1001/meals", progress);
      setAlert({
        message: "Progress saved successfully!",
        type: "success",
      });
      // Clear form after success
      setProgress({
        mealname: "",
        mealcalories: "",
        mealprotein: "",
        mealfats: "",
        mealcarbs: "",
        mealtypeid: "",
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
                label="Meal Name"
                name="mealname"
                type="text"
                value={progress.mealname}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Meal Calories"
                name="mealcalories"
                type="number"
                value={progress.mealcalories}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Meal Protein"
                name="mealprotein"
                type="number"
                value={progress.mealprotein}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Meal Fats"
                name="mealfats"
                type="number"
                value={progress.mealfats}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Meal Carbs"
                name="mealcarbs"
                type="number"
                value={progress.mealcarbs}
                onChange={handleChange}
              />


              <TextField
                fullWidth
                select
                label="Meal Category"
                name="mealtypeid"
                value={progress.mealtypeid}
                onChange={handleChange}
              >
                {categoryArr.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.Mealtype}
                  </MenuItem>
                ))}
              </TextField>
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
