import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Container, Grid, Stack, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [alerts, setAlerts] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  // Fetch exercises on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const storedUserId = user?._id;

    if (!storedUserId) {
      navigate('/Login');
      return;
    }

    // Fetch exercises from API
    axios
      .get(`http://localhost:1001/workouttraking/user/${storedUserId}`)
      .then((res) => {
        // console.log(res.data);
        setExercises(res.data.tracking);
      })
      .catch((err) => {
        console.log("Fetch Exercises Error:", err);
        setAlerts({
          message: 'Failed to load exercises.',
          type: 'error',
        });
      });
  }, [navigate]);

  // Delete exercise function
  const handleDelete = (exerciseId) => {
    axios
      .delete(`http://localhost:1001/workouttraking/${exerciseId}`)
      .then((res) => {
        setAlerts({
          message: 'Exercise deleted successfully!',
          type: 'success',
        });
        // Remove deleted exercise from local state
        setExercises((prev) => prev.filter((exercise) => exercise._id !== exerciseId));
      })
      .catch((err) => {
        console.log('Delete Exercise Error:', err);
        setAlerts({
          message: 'Failed to delete exercise.',
          type: 'error',
        });
      });
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
      <br />
      <h1 className="center">Exercises List</h1>

<style jsx>{`
  .center {
    text-align: center;  /* Centering the text */
    margin-bottom: 20px; /* Optional, adds space below the heading */
    font-size: 2rem; /* Adjust the font size */
    color: #333; /* Optional, changes the text color */
    font-weight: bold; /* Optional, makes text bold */
  }
`}</style>

    <Box sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          {/* Display Alerts */}
          {alerts.message && <Alert severity={alerts.type}>{alerts.message}</Alert>}

          {/* Grid to display exercises */}
          <Grid container spacing={3}>
            {exercises.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="h5">No exercises found. Please add some!</Typography>
              </Grid>
            ) : (
              exercises.map((exercise) => (
                <Grid item xs={12} md={4} key={exercise._id}>
                  <Card sx={{ p: 3, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {exercise.exercisename}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Sets:</strong> {exercise.sets}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Reps:</strong> {exercise.reps}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Weights:</strong> {exercise.weights} kg
                    </Typography>
                    <Typography variant="body1">
                      <strong>Notes:</strong> {exercise.notes}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Category:</strong> {exercise.workcategoryID?.workout_name || 'Unknown'}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={() => handleDelete(exercise._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Stack>
      </Container>
    </Box>
  </>
  );
};

export default DisplayExercises;
